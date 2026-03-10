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
import { Save, Loader2, ArrowLeft, Image as ImageIcon, Lock, ShieldCheck, Sparkles, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { AIPoweredSummary } from '@/components/admin/AIPoweredSummary';
import { generateLogo } from '@/ai/flows/generate-logo';

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
  const [isGenerating, setIsGenerating] = useState(false);

  // Charger les données initiales depuis Firestore
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

  const handleGenerateLogo = async () => {
    if (!schoolName) {
      toast({ variant: "destructive", title: "Nom manquant", description: "Veuillez d'abord saisir le nom de l'établissement." });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateLogo({ schoolName });
      setLogoUrl(result.imageUrl);
      toast({ title: "Logo généré", description: "L'IA a créé un nouveau logo. N'oubliez pas de l'appliquer pour l'enregistrer." });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Erreur IA", description: "La génération a échoué. Veuillez réessayer." });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!db) return;

    setIsSaving(true);
    const settingsRef = doc(db, 'settings', 'global');
    
    const updateData = {
      schoolName: schoolName.trim() || 'ESEPF',
      logoUrl: logoUrl,
      updatedAt: serverTimestamp()
    };
    
    // Mutation Firestore
    setDoc(settingsRef, updateData, { merge: true })
      .then(() => {
        toast({ 
          title: "Succès !", 
          description: "L'identité de l'établissement a été mise à jour dans la base de données." 
        });
      })
      .catch(async (error) => {
        console.error("Firestore Write Error:", error);
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
              <CardTitle className="text-2xl font-headline font-bold">Espace Sécurisé</CardTitle>
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
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-4xl font-headline font-bold text-primary">Gestion de l'Identité</h1>
              <p className="text-muted-foreground">Configurez le nom et le logo de votre établissement.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsUnlocked(false)} className="rounded-full">
                <Lock size={16} className="mr-2" /> Verrouiller
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm" className="rounded-full">
                  <ArrowLeft size={16} className="mr-2" /> Voir le site
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-2xl flex items-center gap-3 text-green-800">
            <ShieldCheck className="text-green-600" size={20} />
            <p className="text-sm font-medium">Connexion Firestore établie - Modifications autorisées</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne gauche : Nom de l'école */}
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white lg:col-span-1">
              <CardHeader className="bg-primary text-white p-6">
                <CardTitle className="text-xl">Nom Officiel</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolName" className="font-bold">Nom affiché sur le site</Label>
                  <Input 
                    id="schoolName" 
                    value={schoolName} 
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Ex: Institution ESEPF"
                    className="rounded-xl h-12"
                  />
                </div>
                <Button 
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl"
                >
                  {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" size={18} />}
                  Enregistrer le nom
                </Button>
              </CardContent>
            </Card>

            {/* Colonne droite : Nouveau circuit Logo IA */}
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white lg:col-span-2">
              <CardHeader className="bg-secondary text-white p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Wand2 size={24} />
                      Atelier Visuel IA
                    </CardTitle>
                    <CardDescription className="text-white/80">Créez votre logo professionnel en un clic</CardDescription>
                  </div>
                  <Sparkles size={32} className="opacity-20" />
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="p-6 bg-muted/30 rounded-[2rem] border-2 border-dashed border-muted flex flex-col items-center justify-center min-h-[250px] relative">
                    {logoUrl ? (
                      <div className="space-y-4 text-center w-full">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Aperçu en temps réel :</Label>
                        <div className="relative h-40 w-full flex justify-center items-center p-4 bg-white rounded-2xl shadow-inner border border-muted/20">
                          <img 
                            src={logoUrl} 
                            alt="Logo preview" 
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                          <ImageIcon size={32} className="text-muted-foreground/40" />
                        </div>
                        <p className="text-sm text-muted-foreground italic">Aucun logo configuré</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Button 
                        onClick={handleGenerateLogo}
                        disabled={isGenerating || !schoolName}
                        variant="outline"
                        className="w-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold h-16 rounded-2xl transition-all shadow-sm"
                      >
                        {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 text-secondary group-hover:text-white" size={20} />}
                        Générer un logo par IA
                      </Button>
                      <p className="text-[10px] text-muted-foreground text-center italic">Basé sur le nom de l'école saisi à gauche</p>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted" /></div>
                      <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-white px-2 text-muted-foreground font-bold">Lien Direct</span></div>
                    </div>

                    <Input 
                      value={logoUrl} 
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="Collez l'URL d'une image ici..."
                      className="rounded-xl h-10 text-xs bg-muted/20"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-muted">
                  <Button 
                    onClick={handleSaveSettings}
                    disabled={isSaving || !logoUrl}
                    className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-16 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-all"
                  >
                    {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" size={20} />}
                    Appliquer et Enregistrer le Logo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12">
            <AIPoweredSummary />
          </div>
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