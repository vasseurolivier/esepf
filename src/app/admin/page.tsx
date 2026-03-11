"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp, collection, query, orderBy, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, Lock, Image as ImageIcon, ArrowLeft, Camera, Globe, Users, Settings, FileText, Check, MapPin, School, CheckCircle2, User, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
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
  
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings, isLoading: settingsLoading } = useDoc(settingsRef);
  
  const registrationsQuery = useMemoFirebase(() => query(collection(db, 'registrations'), orderBy('createdAt', 'desc')), [db]);
  const { data: registrations, isLoading: regLoading } = useCollection(registrationsQuery);

  const { toast } = useToast();
  
  const [passwordInput, setPasswordInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [images, setImages] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [selectedReg, setSelectedReg] = useState<any>(null);

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
      setTimeout(() => {
        toast({ title: "Accès autorisé", description: "Modification du serveur activée." });
      }, 100);
    } else {
      toast({ variant: "destructive", title: "Accès refusé", description: "Mot de passe incorrect." });
    }
  };

  const updateImageField = (id: string, value: string) => {
    setImages(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    const settingsRef = doc(db, 'settings', 'global');
    const updateData = {
      schoolName: schoolName.trim() || 'Institution ESEPF',
      logoUrl: logoUrl.trim(),
      images: images,
      updatedAt: serverTimestamp()
    };

    setDoc(settingsRef, updateData, { merge: true })
      .then(() => {
        toast({ title: "ENREGISTRÉ !", description: "Les modifications sont en ligne." });
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

  const updateRegStatus = (id: string, newStatus: string) => {
    const regRef = doc(db, 'registrations', id);
    updateDoc(regRef, { status: newStatus })
      .then(() => {
        toast({ title: "Statut mis à jour" });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: regRef.path,
          operation: 'update',
          requestResourceData: { status: newStatus },
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  if (settingsLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" /></div>;
  }

  if (!isUnlocked) {
    return (
      <main className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md rounded-3xl shadow-2xl border-none">
          <CardHeader className="text-center">
            <Lock size={48} className="mx-auto text-primary mb-4" />
            <CardTitle>Administration ESEPF</CardTitle>
            <CardDescription>Entrez le code pour accéder à la gestion du site</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUnlock} className="space-y-4">
              <Input 
                type="password" 
                placeholder="Mot de passe" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="text-center h-12 rounded-xl"
              />
              <Button type="submit" className="w-full h-12 rounded-xl bg-primary">DÉVERROUILLER</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/20 pb-20">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">Tableau de Bord Admin</h1>
            <Link href="/"><Button variant="outline" className="rounded-full"><ArrowLeft size={16} className="mr-2" /> Retour au site</Button></Link>
          </div>

          <Tabs defaultValue="config" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-16 bg-white p-1 rounded-2xl shadow-sm mb-8">
              <TabsTrigger value="config" className="rounded-xl text-lg font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                <Settings className="mr-2" size={20} /> Configuration Site
              </TabsTrigger>
              <TabsTrigger value="registrations" className="rounded-xl text-lg font-bold data-[state=active]:bg-secondary data-[state=active]:text-white">
                <Users className="mr-2" size={20} /> Candidatures ({registrations?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="config" className="space-y-8">
              <Card className="rounded-[2rem] overflow-hidden shadow-xl border-none">
                <CardHeader className="bg-primary text-white p-6">
                  <CardTitle className="flex items-center gap-2"><Globe size={20} /> Identité Visuelle</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <Label className="font-bold">Nom de l'Etablissement</Label>
                        <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="mt-1 rounded-xl" />
                      </div>
                      <div>
                        <Label className="font-bold">URL du Logo Principal</Label>
                        <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://..." className="mt-1 rounded-xl" />
                      </div>
                    </div>
                    <div className="bg-muted/50 rounded-2xl flex items-center justify-center p-4 border-2 border-dashed border-muted min-h-32">
                      {logoUrl ? <img src={logoUrl} alt="Logo" className="max-h-24 object-contain" /> : <ImageIcon size={48} className="text-muted" />}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] overflow-hidden shadow-xl border-none">
                <CardHeader className="bg-secondary text-white p-6">
                  <CardTitle className="flex items-center gap-2"><Camera size={20} /> Galerie des Photos</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {IMAGE_FIELDS.map((field) => (
                      <div key={field.id} className="space-y-2 p-4 bg-white rounded-2xl border border-border shadow-sm">
                        <Label className="font-bold text-xs uppercase text-primary">{field.label}</Label>
                        <div className="aspect-video bg-muted/30 rounded-xl overflow-hidden mb-2 flex items-center justify-center">
                          {images[field.id] ? (
                            <img src={images[field.id]} alt={field.label} className="object-cover w-full h-full" />
                          ) : (
                            <ImageIcon className="text-muted" />
                          )}
                        </div>
                        <Input 
                          value={images[field.id] || ''} 
                          onChange={(e) => updateImageField(field.id, e.target.value)}
                          placeholder="URL de l'image"
                          className="text-xs rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="sticky bottom-8 z-50">
                <Button onClick={handleSaveSettings} disabled={isSaving} className="w-full h-20 rounded-2xl text-xl font-bold bg-primary shadow-2xl border-4 border-white">
                  {isSaving ? <Loader2 className="animate-spin mr-3" /> : <Save className="mr-3" />} PUBLICATION DES PARAMÈTRES
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="registrations">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 space-y-4">
                  {regLoading ? (
                    <div className="p-12 text-center bg-white rounded-3xl"><Loader2 className="animate-spin mx-auto text-primary" /></div>
                  ) : registrations?.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-3xl text-muted-foreground italic">Aucune candidature pour le moment.</div>
                  ) : (
                    registrations?.map((reg: any) => (
                      <Card 
                        key={reg.id} 
                        onClick={() => setSelectedReg(reg)}
                        className={`cursor-pointer transition-all rounded-2xl border-none shadow-sm hover:shadow-md ${selectedReg?.id === reg.id ? 'ring-2 ring-secondary' : ''}`}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-primary font-bold">
                              {reg.studentFirstName?.[0]}{reg.studentLastName?.[0]}
                            </div>
                            <div>
                              <h4 className="font-bold">{reg.studentFirstName} {reg.studentLastName}</h4>
                              <p className="text-xs text-muted-foreground">{reg.programChoice} - {reg.campusChoice}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full mb-1 inline-block ${
                              reg.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                            }`}>
                              {reg.status === 'pending' ? 'Attente' : 'Contacté'}
                            </div>
                            <p className="text-[10px] text-muted-foreground">
                              {reg.createdAt ? format(reg.createdAt.toDate(), 'dd/MM HH:mm') : ''}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                <div className="lg:col-span-7">
                  {selectedReg ? (
                    <Card className="rounded-[2.5rem] overflow-hidden shadow-xl border-none bg-white sticky top-24">
                      <div className="bg-secondary p-8 text-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-3xl font-headline font-bold">{selectedReg.studentFirstName} {selectedReg.studentLastName}</h2>
                            <p className="text-white/70">Pré-inscription Rentrée 2026</p>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={() => updateRegStatus(selectedReg.id, 'contacted')} size="sm" className="bg-white text-secondary hover:bg-white/90 rounded-full font-bold">
                              <Check size={16} className="mr-1" /> MARQUER CONTACTÉ
                            </Button>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-8 space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-muted/30 rounded-2xl border border-muted">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">Campus</Label>
                            <p className="font-bold text-primary flex items-center gap-2 uppercase tracking-wide">
                              <MapPin size={14} className="text-secondary" /> {selectedReg.campusChoice}
                            </p>
                          </div>
                          <div className="p-4 bg-muted/30 rounded-2xl border border-muted">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">Formation</Label>
                            <p className="font-bold text-primary flex items-center gap-2 uppercase tracking-wide">
                              <FileText size={14} className="text-secondary" /> {selectedReg.programChoice}
                            </p>
                          </div>
                        </div>

                        {selectedReg.footballAcademy && (
                          <div className="p-4 bg-primary text-white rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <School size={20} className="text-secondary" />
                              <span className="font-bold uppercase text-xs tracking-widest">Inscrit Football Academy</span>
                            </div>
                            <CheckCircle2 size={20} />
                          </div>
                        )}

                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xs font-bold uppercase text-secondary mb-4 flex items-center gap-2">
                              <User size={14} /> Profil Élève
                            </h4>
                            <div className="grid grid-cols-2 gap-y-4 text-sm">
                              <div><span className="text-muted-foreground">Né(e) le :</span> <span className="font-medium ml-2">{selectedReg.studentBirthDate}</span></div>
                              <div><span className="text-muted-foreground">Nationalité :</span> <span className="font-medium ml-2">{selectedReg.studentNationality}</span></div>
                              <div><span className="text-muted-foreground">Classe Actuelle :</span> <span className="font-medium ml-2">{selectedReg.currentGrade}</span></div>
                            </div>
                          </div>

                          <div className="pt-6 border-t border-muted">
                            <h4 className="text-xs font-bold uppercase text-secondary mb-4 flex items-center gap-2">
                              <Users size={14} /> Responsable Légal
                            </h4>
                            <div className="grid grid-cols-1 gap-y-4 text-sm">
                              <div className="flex items-center gap-3"><User size={16} className="text-muted-foreground" /> <span className="font-medium">{selectedReg.parentFirstName} {selectedReg.parentLastName}</span></div>
                              <div className="flex items-center gap-3"><Mail size={16} className="text-muted-foreground" /> <span className="font-medium">{selectedReg.parentEmail}</span></div>
                              <div className="flex items-center gap-3"><Phone size={16} className="text-muted-foreground" /> <span className="font-medium">{selectedReg.parentPhone}</span></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="h-[400px] border-2 border-dashed border-muted rounded-[2.5rem] flex flex-col items-center justify-center text-muted-foreground gap-4 bg-white/50">
                      <FileText size={48} className="opacity-20" />
                      <p>Sélectionnez un dossier pour voir les détails</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </div>
      <Footer />
    </main>
  );
}