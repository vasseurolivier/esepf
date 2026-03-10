
"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useFirestore, useDoc, FirebaseClientProvider } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { AIPoweredSummary } from '@/components/admin/AIPoweredSummary';

function AdminContent() {
  const db = useFirestore();
  const { data: settings, loading } = useDoc(db ? `settings/global` : null);
  const { toast } = useToast();
  
  const [schoolName, setSchoolName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setSchoolName(settings.schoolName || 'ESEPF');
      setLogoUrl(settings.logoUrl || '');
    } else if (!loading) {
      setSchoolName('ESEPF');
    }
  }, [settings, loading]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "La base de données n'est pas initialisée.",
      });
      return;
    }

    setIsSaving(true);
    const settingsRef = doc(db, 'settings', 'global');
    const data = {
      schoolName: schoolName || 'ESEPF',
      logoUrl: logoUrl,
      updatedAt: new Date().toISOString()
    };
    
    // Mutation non-bloquante selon les guidelines
    setDoc(settingsRef, data, { merge: true })
      .then(() => {
        toast({
          title: "Succès",
          description: "Les paramètres ont été sauvegardés durablement.",
        });
        setIsSaving(false);
      })
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: settingsRef.path,
          operation: 'write',
          requestResourceData: data,
        });
        errorEmitter.emit('permission-error', permissionError);
        setIsSaving(false);
      });
  };

  if (loading) {
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
            <Link href="/">
              <Button variant="outline" size="sm" className="rounded-full">
                <ArrowLeft size={16} className="mr-2" /> Retour au site
              </Button>
            </Link>
          </div>
          
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-primary text-white p-8">
              <CardTitle className="text-2xl flex items-center gap-2">
                <ImageIcon size={24} className="text-secondary" />
                Identité Visuelle
              </CardTitle>
              <CardDescription className="text-white/70">
                Personnalisez le nom et le logo qui apparaîtront sur tout le site ESEPF.
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
                    className="rounded-xl h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoUrl" className="font-bold text-primary">URL du Logo (Lien direct)</Label>
                  <Input 
                    id="logoUrl" 
                    value={logoUrl} 
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://votre-image.com/logo.png"
                    className="rounded-xl h-12"
                  />
                  <p className="text-xs text-muted-foreground">
                    Utilisez un lien direct vers une image publique (PNG, JPG, SVG).
                  </p>
                </div>

                {logoUrl && (
                  <div className="p-6 bg-white rounded-xl border-2 border-dashed border-muted flex flex-col items-center">
                    <Label className="mb-4 text-xs uppercase font-bold text-muted-foreground">Aperçu du logo :</Label>
                    <div className="relative h-20 w-full flex justify-center items-center">
                      <img 
                        src={logoUrl} 
                        alt="Preview" 
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/200x100?text=Logo+Invalide';
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
                  {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" size={20} />}
                  Enregistrer les modifications
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
