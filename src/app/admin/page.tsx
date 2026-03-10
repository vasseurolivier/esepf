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
import { Save, Loader2 } from 'lucide-react';

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;

    setIsSaving(true);
    const settingsRef = doc(db, 'settings', 'global');
    
    setDoc(settingsRef, {
      schoolName,
      logoUrl,
    }, { merge: true })
      .then(() => {
        toast({
          title: "Succès",
          description: "Les paramètres ont été mis à jour avec succès.",
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de sauvegarder les modifications.",
        });
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-headline font-bold text-primary mb-8">Espace Administration</h1>
          
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-primary text-white p-8">
              <CardTitle className="text-2xl">Configuration de l'Établissement</CardTitle>
              <CardDescription className="text-white/70">
                Personnalisez l'identité visuelle de votre site ESEPF.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="schoolName" className="font-bold text-primary">Nom de l'école</Label>
                  <Input 
                    id="schoolName" 
                    value={schoolName} 
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Ex: ESEPF"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoUrl" className="font-bold text-primary">URL du Logo (Image)</Label>
                  <div className="flex gap-4">
                    <Input 
                      id="logoUrl" 
                      value={logoUrl} 
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="rounded-xl flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Collez l'URL d'une image hébergée pour mettre à jour le logo instantanément sur tout le site.
                  </p>
                </div>

                {logoUrl && (
                  <div className="p-4 bg-muted/50 rounded-xl border-2 border-dashed border-muted flex flex-col items-center">
                    <Label className="mb-4 text-xs uppercase font-bold text-muted-foreground">Aperçu du logo :</Label>
                    <div className="relative h-20 w-40">
                      <img src={logoUrl} alt="Preview" className="h-full w-full object-contain" />
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isSaving}
                  className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-6 rounded-xl transition-all shadow-lg"
                >
                  {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" size={20} />}
                  Enregistrer les modifications
                </Button>
              </form>
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
