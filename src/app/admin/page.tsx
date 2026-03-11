
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
import { Save, Loader2, Lock, Image as ImageIcon, ArrowLeft, Camera, Globe } from 'lucide-react';
import Link from 'next/link';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const ADMIN_PASSWORD = 'Yesacademy888$';

const IMAGE_FIELDS = [
  { id: 'hero_home', label: 'Image Accueil', location: 'Fond du haut de page' },
  { id: 'campus_panoramic', label: 'Bandeau Campus', location: 'Au-dessus de la section Nos Campus' },
  { id: 'campus_evron', label: 'Photo Evron', location: 'Vignette Campus Evron' },
  { id: 'campus_bazeilles', label: 'Photo Bazeilles', location: 'Vignette Campus Sainte-Bazeilles' },
  { id: 'campus_tulle', label: 'Photo Tulle', location: 'Vignette Campus Sainte-Tulle' },
  { id: 'football_academy', label: 'Photo Football', location: 'Section Académie' },
  { id: 'news_graduation', label: 'Actu 1', location: 'Section Blog - Article 1' },
  { id: 'news_science', label: 'Actu 2', location: 'Section Blog - Article 2' },
];

export default function AdminPage() {
  const db = useFirestore();
  const { data: settings, loading: settingsLoading } = useDoc(db, 'settings/global');
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
      toast({ title: "Accès autorisé", description: "Modifications prêtes à être envoyées au serveur." });
    } else {
      toast({ variant: "destructive", title: "Accès refusé", description: "Mot de passe incorrect." });
    }
  };

  const updateImageField = (id: string, value: string) => {
    setImages(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveSettings = () => {
    if (!db) return;

    setIsSaving(true);
    const settingsRef = doc(db, 'settings', 'global');
    
    const updateData = {
      schoolName: schoolName.trim() || 'Institution ESEPF',
      logoUrl: logoUrl.trim(),
      images: images,
      updatedAt: serverTimestamp()
    };
    
    // Mutation sans await selon les guidelines
    setDoc(settingsRef, updateData, { merge: true })
      .then(() => {
        toast({ 
          title: "ENREGISTRÉ SUR LE SERVEUR", 
          description: "Le logo et toutes les photos sont maintenant visibles par TOUT LE MONDE." 
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
          title: "Échec de l'enregistrement", 
          description: "Vérifiez vos règles Firestore dans la console." 
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
      <main className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md rounded-3xl shadow-2xl">
          <CardHeader className="text-center">
            <Lock size={48} className="mx-auto text-primary mb-4" />
            <CardTitle>Espace Administration</CardTitle>
            <CardDescription>Entrez votre mot de passe pour modifier le site</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUnlock} className="space-y-4">
              <Input 
                type="password" 
                placeholder="Mot de passe" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="text-center"
              />
              <Button type="submit" className="w-full">Valider</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/20">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">Configuration du Site</h1>
            <Link href="/">
              <Button variant="outline" className="rounded-full">
                <ArrowLeft size={16} className="mr-2" /> Retour au site
              </Button>
            </Link>
          </div>

          <Card className="rounded-[2rem] overflow-hidden shadow-lg border-none">
            <CardHeader className="bg-primary text-white p-6">
              <CardTitle className="flex items-center gap-2"><Globe size={20} /> Identité de l'École</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <Label className="font-bold">Nom de l'Institution</Label>
                    <Input 
                      value={schoolName} 
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="font-bold">URL du Logo</Label>
                    <Input 
                      value={logoUrl} 
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://..."
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="bg-muted/50 rounded-2xl flex items-center justify-center p-4 border-2 border-dashed border-muted">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="max-h-32 object-contain" />
                  ) : (
                    <ImageIcon size={48} className="text-muted" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] overflow-hidden shadow-lg border-none">
            <CardHeader className="bg-secondary text-white p-6">
              <CardTitle className="flex items-center gap-2"><Camera size={20} /> Galerie des Photos</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {IMAGE_FIELDS.map((field) => (
                  <div key={field.id} className="space-y-2 p-4 bg-muted/30 rounded-2xl">
                    <Label className="font-bold text-xs uppercase">{field.label}</Label>
                    <div className="aspect-video bg-white rounded-xl overflow-hidden mb-2">
                      {images[field.id] ? (
                        <img src={images[field.id]} alt={field.label} className="object-cover w-full h-full" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted"><ImageIcon /></div>
                      )}
                    </div>
                    <Input 
                      value={images[field.id] || ''} 
                      onChange={(e) => updateImageField(field.id, e.target.value)}
                      placeholder="URL de l'image"
                      className="text-xs"
                    />
                    <p className="text-[10px] text-muted-foreground italic">{field.location}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="w-full h-16 rounded-2xl text-xl font-bold bg-primary hover:bg-primary/90 shadow-xl"
          >
            {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
            {isSaving ? 'Envoi au serveur...' : 'SAUVEGARDER POUR TOUT LE MONDE'}
          </Button>

        </div>
      </div>
      <Footer />
    </main>
  );
}
