
"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useFirestore, useDoc } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, Lock, Image as ImageIcon, ArrowLeft, Camera, GraduationCap, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ADMIN_PASSWORD = 'Yesacademy888$';

const IMAGE_FIELDS = [
  { id: 'hero_home', label: 'Image de fond - Accueil', location: 'Haut de la page d\'accueil' },
  { id: 'campus_panoramic', label: 'Bandeau Panoramique', location: 'Au-dessus de la section "Nos Campus"' },
  { id: 'campus_evron', label: 'Campus Evron', location: 'Carte des campus - Vignette 1' },
  { id: 'campus_bazeilles', label: 'Campus Sainte-Bazeilles', location: 'Carte des campus - Vignette 2' },
  { id: 'campus_tulle', label: 'Campus Sainte-Tulle', location: 'Carte des campus - Vignette 3' },
  { id: 'football_academy', label: 'Football Academy', location: 'Section "Football Academy" (Photo principale)' },
  { id: 'news_graduation', label: 'Actualité : Résultats Bac', location: 'Section Blog/News - Article 1' },
  { id: 'news_science', label: 'Actualité : Labo Sciences', location: 'Section Blog/News - Article 2' },
];

export default function AdminPage() {
  const db = useFirestore();
  const { data: settings, loading: settingsLoading, error: settingsError } = useDoc(db, 'settings/global');
  const { toast } = useToast();
  
  const [passwordInput, setPasswordInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [images, setImages] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setSchoolName(settings.schoolName || '');
      setLogoUrl(settings.logoUrl || '');
      setImages(settings.images || {});
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

  const updateImageField = (id: string, value: string) => {
    setImages(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveSettings = async () => {
    if (!db) {
      toast({ variant: "destructive", title: "Erreur", description: "Base de données non initialisée." });
      return;
    }

    setIsSaving(true);
    const settingsRef = doc(db, 'settings', 'global');
    
    const updateData = {
      schoolName: schoolName.trim() || 'Institution ESEPF',
      logoUrl: logoUrl.trim(),
      images: images,
      updatedAt: serverTimestamp()
    };
    
    try {
      // Utilisation d'un bloc try/catch plus explicite pour le débogage
      await setDoc(settingsRef, updateData, { merge: true });
      toast({ 
        title: "Sauvegarde réussie !", 
        description: "Toutes les photos et le logo ont été mis à jour." 
      });
    } catch (error: any) {
      console.error("Firestore Save Error:", error);
      const permissionError = new FirestorePermissionError({
        path: settingsRef.path,
        operation: 'write',
        requestResourceData: updateData,
      });
      errorEmitter.emit('permission-error', permissionError);
      toast({ 
        variant: "destructive", 
        title: "Erreur d'enregistrement", 
        description: error.message || "Vérifiez vos règles Firestore." 
      });
    } finally {
      setIsSaving(false);
    }
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
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <Lock size={32} />
              </div>
              <CardTitle className="text-2xl font-headline font-bold">Espace Privé</CardTitle>
              <CardDescription>Administration de l'Institution</CardDescription>
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
                  Accéder aux réglages
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
    <main className="min-h-screen bg-muted/20">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-headline font-bold text-primary mb-2">Centre de Branding</h1>
              <p className="text-muted-foreground italic">Gérez l'identité visuelle et toutes les photos de votre site.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full bg-white shadow-sm" onClick={() => setIsUnlocked(false)}>
                <Lock size={16} className="mr-2" /> Verrouiller
              </Button>
              <Link href="/">
                <Button className="rounded-full bg-primary text-white shadow-lg">
                  <ArrowLeft size={16} className="mr-2" /> Voir le site
                </Button>
              </Link>
            </div>
          </div>

          {settingsError && (
            <Alert variant="destructive" className="rounded-2xl">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur de connexion</AlertTitle>
              <AlertDescription>
                Impossible de lire les données Firestore. Vérifiez que Cloud Firestore est activé et que vos règles sont publiées.
              </AlertDescription>
            </Alert>
          )}

          {/* Section 1: Identité Principale */}
          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="bg-primary text-white p-8">
              <CardTitle className="text-2xl flex items-center gap-3 italic">
                <GraduationCap className="text-secondary" />
                Identité de l'Etablissement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-bold text-primary">Nom de l'Institution</Label>
                    <Input 
                      value={schoolName} 
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="Ex: Institution ESEPF"
                      className="rounded-xl h-12 border-2 border-muted focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-primary">Lien du Logo Principal</Label>
                    <Input 
                      value={logoUrl} 
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="URL de l'image (ex: https://i.postimg.cc/...)"
                      className="rounded-xl h-12 border-2 border-muted focus:border-secondary"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-3xl border-2 border-dashed border-muted">
                  <Label className="mb-4 text-primary/40 uppercase tracking-widest font-bold text-xs">Aperçu du Logo</Label>
                  <div className="h-40 w-40 flex items-center justify-center">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <ImageIcon size={64} className="text-muted" />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Gestion des Médias du Site */}
          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="bg-secondary text-white p-8">
              <CardTitle className="text-2xl flex items-center gap-3 italic">
                <Camera className="text-white" />
                Gestionnaire de Médias du Site
              </CardTitle>
              <CardDescription className="text-white/80">Collez les liens des photos pour chaque emplacement spécifique.</CardDescription>
            </CardHeader>
            <CardContent className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {IMAGE_FIELDS.map((field) => (
                  <div key={field.id} className="group flex flex-col bg-muted/20 rounded-[2rem] p-6 border-2 border-transparent hover:border-secondary/20 transition-all">
                    <div className="mb-4">
                      <h4 className="font-bold text-primary text-lg">{field.label}</h4>
                      <p className="text-xs font-medium text-secondary uppercase tracking-tighter">{field.location}</p>
                    </div>
                    <div className="relative aspect-video bg-white rounded-2xl overflow-hidden mb-4 border border-muted shadow-inner flex items-center justify-center">
                      {images[field.id] ? (
                        <img src={images[field.id]} alt={field.label} className="object-cover w-full h-full" />
                      ) : (
                        <ImageIcon className="text-muted/50" size={32} />
                      )}
                    </div>
                    <Input 
                      value={images[field.id] || ''} 
                      onChange={(e) => updateImageField(field.id, e.target.value)}
                      placeholder="Coller l'URL de la photo"
                      className="rounded-xl h-10 text-xs bg-white border-muted focus:border-secondary"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="sticky bottom-8 z-40 px-4">
            <Button 
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-20 rounded-[2rem] shadow-2xl transform active:scale-95 transition-all text-xl"
            >
              {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" size={28} />}
              {isSaving ? 'Enregistrement en cours...' : 'SAUVEGARDER TOUTES LES MODIFICATIONS'}
            </Button>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
