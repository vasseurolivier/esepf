"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useFirestore, useDoc, FirebaseClientProvider } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, Lock, Image as ImageIcon, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const ADMIN_PASSWORD = 'Yesacademy888$';

function AdminContent() {
  const db = useFirestore();
  const { data: settings, loading: settingsLoading } = useDoc(db, 'settings/global');
  const { toast } = useToast();
  
  const [passwordInput, setPasswordInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Synchroniser les états avec Firestore
  useEffect(() => {
    if (settings) {
      setSchoolName(settings.schoolName || '');
      setLogoUrl(settings.logoUrl || '');
    }
  }, [settings]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsUnlocked(true);
      toast({ title: "Accès autorisé", description: "Bienvenue dans l'espace d'administration." });
    } else {
      toast({ variant: "destructive", title: "Accès refusé", description: "Mot de passe incorrect." });
    }
  };

  const handleSaveSettings = async () => {
    if (!db) return;

    setIsSaving(true);
    const settingsRef = doc(db, 'settings', 'global');
    
    const updateData = {
      schoolName: schoolName.trim() || 'ESEPF',
      logoUrl: logoUrl.trim(),
      updatedAt: serverTimestamp()
    };
    
    setDoc(settingsRef, updateData, { merge: true })
      .then(() => {
        toast({ 
          title: "Succès !", 
          description: "L'identité de l'établissement a été mise à jour avec succès." 
        });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: settingsRef.path,
          operation: 'write',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
        
        toast({ 
          variant: "destructive", 
          title: "Erreur de sauvegarde", 
          description: "Vérifiez vos règles Firestore ou votre connexion." 
        });
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  if (settingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <main className="min-h-screen bg-muted/30 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md rounded-3xl shadow-2xl border-none">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="text-primary" size={32} />
              </div>
              <CardTitle className="text-2xl font-headline font-bold">Administration</CardTitle>
              <CardDescription>Entrez le mot de passe pour gérer l'établissement.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUnlock} className="space-y-4">
                <Input 
                  type="password" 
                  placeholder="Mot de passe" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="h-12 rounded-xl text-center"
                  autoFocus
                />
                <Button type="submit" className="w-full bg-primary h-12 rounded-xl font-bold">
                  Déverrouiller
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-4xl font-headline font-bold text-primary">Identité du Site</h1>
              <p className="text-muted-foreground">Personnalisez le nom et l'image de marque de l'institution.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsUnlocked(false)} className="rounded-full">
                <Lock size={16} className="mr-2" /> Quitter
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm" className="rounded-full">
                  <ArrowLeft size={16} className="mr-2" /> Retour au site
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center gap-3 text-blue-800">
            <ShieldCheck className="text-blue-600" size={20} />
            <p className="text-sm font-medium">Connexion à la base de données active (Firestore)</p>
          </div>
          
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
            <CardHeader className="bg-primary text-white p-8">
              <CardTitle className="text-2xl flex items-center gap-2">
                <ImageIcon size={24} className="text-secondary" />
                Réglages de Branding
              </CardTitle>
              <CardDescription className="text-white/70 italic">Ces informations sont synchronisées en temps réel sur tout le site.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName" className="font-bold text-primary">Nom de l'établissement</Label>
                    <Input 
                      id="schoolName" 
                      value={schoolName} 
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="Ex: Institution ESEPF"
                      className="rounded-xl h-12 border-2 focus:border-primary"
                    />
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Le nom s'affichera dans le Header et le Hero.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logoUrl" className="font-bold text-primary">URL du Logo (ou Data URI)</Label>
                    <Input 
                      id="logoUrl" 
                      value={logoUrl} 
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://... ou data:image/png;base64,..."
                      className="rounded-xl h-12 border-2 focus:border-primary"
                    />
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Copiez le lien de votre image ici.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="font-bold text-primary">Aperçu du Logo</Label>
                  <div className="aspect-square bg-muted/20 rounded-[2rem] border-2 border-dashed border-muted flex items-center justify-center overflow-hidden p-6">
                    {logoUrl ? (
                      <img 
                        src={logoUrl} 
                        alt="Preview" 
                        className="max-h-full max-w-full object-contain drop-shadow-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=Logo+Non+Trouvé';
                        }}
                      />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <ImageIcon size={48} className="mx-auto mb-2 opacity-20" />
                        <p className="text-sm italic">Aucun logo configuré</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-muted">
                <Button 
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-16 rounded-2xl shadow-lg transform active:scale-95 transition-all text-lg"
                >
                  {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" size={24} />}
                  {isSaving ? 'Enregistrement en cours...' : 'Sauvegarder les modifications'}
                </Button>
              </div>
            </CardContent>
          </Card>
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