
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
import { cn } from '@/lib/utils';
import { Save, Loader2, ArrowLeft, Image as ImageIcon, Lock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { AIPoweredSummary } from '@/components/admin/AIPoweredSummary';

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
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
              <CardTitle className="text-2xl font-headline font-bold">Espace Sécurisé</CardTitle>
              <CardDescription>Veuillez entrer le mot de passe administrateur.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUnlock} className="space-y-4">
                <div className="space-y-2">
                  <Input 
                    type="password" 
                    placeholder="Mot de passe" 
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="h-12 rounded-xl border-muted focus:ring-secondary text-center"
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl">
                  Se connecter
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
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-headline font-bold text-primary">Administration</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsUnlocked(false)} className="rounded-full">
                <Lock size={16} className="mr-2" /> Verrouiller
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm" className="rounded-full">
                  <ArrowLeft size={16} className="mr-2" /> Retour au site
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-2xl flex items-center gap-3 text-green-800">
            <ShieldCheck className="text-green-600" size={20} />
            <p className="text-sm font-medium">Session administrateur active</p>
          </div>
          
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
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
                  disabled={isSaving}
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
