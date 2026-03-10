
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
import { Save, Loader2, ArrowLeft, Image as ImageIcon, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { AIPoweredSummary } from '@/components/admin/AIPoweredSummary';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function AdminContent() {
  const db = useFirestore();
  const { data: settings, loading, error: fetchError } = useDoc(db, 'settings/global');
  const { toast } = useToast();
  
  const [schoolName, setSchoolName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Synchronisation initiale des données depuis Firestore
  useEffect(() => {
    if (settings) {
      setSchoolName(settings.schoolName || '');
      setLogoUrl(settings.logoUrl || '');
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!db) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Connexion à la base de données impossible.",
      });
      return;
    }

    setIsSaving(true);
    
    const settingsRef = doc(db, 'settings', 'global');
    const updateData = {
      schoolName: schoolName.trim() || 'ESEPF',
      logoUrl: logoUrl.trim(),
      updatedAt: serverTimestamp()
    };
    
    // On utilise setDoc avec merge: true pour créer ou mettre à jour proprement
    setDoc(settingsRef, updateData, { merge: true })
      .then(() => {
        toast({
          title: "Réglages enregistrés",
          description: "L'identité visuelle a été mise à jour avec succès.",
        });
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

          {fetchError && (
            <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur de lecture</AlertTitle>
              <AlertDescription>
                Impossible de charger les réglages. Vérifiez que Firestore est activé dans votre console Firebase.
              </AlertDescription>
            </Alert>
          )}
          
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
