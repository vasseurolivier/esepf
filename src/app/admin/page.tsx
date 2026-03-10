"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useFirestore, useDoc, FirebaseClientProvider, useAuth, useUser } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, ArrowLeft, Image as ImageIcon, AlertCircle, LogIn, LogOut, ShieldCheck, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { AIPoweredSummary } from '@/components/admin/AIPoweredSummary';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function AdminContent() {
  const db = useFirestore();
  const auth = useAuth();
  const { user, loading: authLoading } = useUser(auth);
  const { data: settings, loading: settingsLoading } = useDoc(db, 'settings/global');
  const { data: userData, loading: userRoleLoading } = useDoc(db, user ? `users/${user.uid}` : null);
  const { toast } = useToast();
  
  const [schoolName, setSchoolName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const isAdmin = userData?.role === 'admin';

  useEffect(() => {
    if (settings) {
      setSchoolName(settings.schoolName || '');
      setLogoUrl(settings.logoUrl || '');
    }
  }, [settings]);

  const handleLogin = async () => {
    if (!auth) return;
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({ title: "Connexion réussie", description: "Vérification des droits d'accès..." });
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur de connexion", description: "Impossible de se connecter." });
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    toast({ title: "Déconnexion", description: "Vous avez été déconnecté." });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !isAdmin) return;

    setIsSaving(true);
    const settingsRef = doc(db, 'settings', 'global');
    const updateData = {
      schoolName: schoolName.trim() || 'ESEPF',
      logoUrl: logoUrl.trim(),
      updatedAt: serverTimestamp()
    };
    
    setDoc(settingsRef, updateData, { merge: true })
      .then(() => {
        toast({ title: "Réglages enregistrés", description: "L'identité visuelle a été mise à jour." });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: settingsRef.path,
          operation: 'write',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  if (authLoading || settingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-headline font-bold text-primary">Administration</h1>
            <div className="flex gap-2">
              {user ? (
                <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full">
                  <LogOut size={16} className="mr-2" /> Déconnexion
                </Button>
              ) : (
                <Button variant="secondary" size="sm" onClick={handleLogin} className="rounded-full font-bold">
                  <LogIn size={16} className="mr-2" /> Connexion Admin
                </Button>
              )}
              <Link href="/">
                <Button variant="outline" size="sm" className="rounded-full">
                  <ArrowLeft size={16} className="mr-2" /> Retour au site
                </Button>
              </Link>
            </div>
          </div>

          {!user ? (
            <Alert className="bg-primary/5 border-primary/20">
              <ShieldAlert className="h-4 w-4 text-primary" />
              <AlertTitle>Accès Restreint</AlertTitle>
              <AlertDescription>
                Veuillez vous connecter pour modifier les paramètres. Vos nouvelles règles de sécurité Firestore exigent une authentification.
              </AlertDescription>
            </Alert>
          ) : !isAdmin && !userRoleLoading ? (
            <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Permissions Insuffisantes</AlertTitle>
              <AlertDescription>
                Votre compte n'a pas le rôle "admin". Ajoutez le champ `role: "admin"` à votre document dans la collection `users` via la console Firebase.
                <br /><br />
                <strong>Votre UID :</strong> <code className="bg-destructive/10 px-2 py-1 rounded">{user.uid}</code>
              </AlertDescription>
            </Alert>
          ) : isAdmin ? (
            <Alert className="bg-green-50 border-green-200 text-green-800">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <AlertTitle>Accès Autorisé</AlertTitle>
              <AlertDescription>Vous êtes connecté en tant qu'administrateur.</AlertDescription>
            </Alert>
          ) : null}
          
          <Card className={cn("border-none shadow-xl rounded-3xl overflow-hidden bg-white transition-opacity", !isAdmin && "opacity-50 pointer-events-none")}>
            <CardHeader className="bg-primary text-white p-8">
              <CardTitle className="text-2xl flex items-center gap-2">
                <ImageIcon size={24} className="text-secondary" />
                Identité Visuelle
              </CardTitle>
              <CardDescription className="text-white/70">
                Configurez le nom et le logo affichés sur tout le site.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="schoolName" className="font-bold text-primary">Nom de l'établissement</Label>
                  <Input 
                    id="schoolName" 
                    value={schoolName} 
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Ex: ESEPF"
                    className="rounded-xl h-12 border-muted focus:ring-secondary"
                    required
                    disabled={!isAdmin}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoUrl" className="font-bold text-primary">URL du Logo (ex: https://...)</Label>
                  <Input 
                    id="logoUrl" 
                    value={logoUrl} 
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="Copiez l'adresse de l'image ici"
                    className="rounded-xl h-12 border-muted focus:ring-secondary"
                    disabled={!isAdmin}
                  />
                </div>

                {logoUrl && (
                  <div className="p-6 bg-muted/30 rounded-xl border-2 border-dashed border-muted flex flex-col items-center">
                    <Label className="mb-4 text-xs uppercase font-bold text-muted-foreground">Aperçu du logo :</Label>
                    <div className="relative h-24 w-full flex justify-center items-center">
                      <img 
                        src={logoUrl} 
                        alt="Aperçu" 
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/200x100?text=Lien+Invalide';
                        }}
                      />
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isSaving || !isAdmin}
                  className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-14 rounded-xl transition-all shadow-lg text-lg"
                >
                  {isSaving ? (
                    <><Loader2 className="animate-spin mr-2" /> Enregistrement...</>
                  ) : (
                    <><Save className="mr-2" size={20} /> Appliquer les changements</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <AIPoweredSummary />
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function AdminPage() {
  return (
    <FirebaseClientProvider>
      <AdminContent />
    </FirebaseClientProvider>
  );
}