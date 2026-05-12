
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
import { Save, Loader2, Lock, Image as ImageIcon, ArrowLeft, Camera, Globe, Users, Settings, FileText, Check, MapPin, School, CheckCircle2, User, Mail, Phone, Layers, GraduationCap, Trophy, MessageSquare, Share2, Calendar, Hash, Languages } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const ADMIN_PASSWORD = 'Yesacademy888$';

const CLUBS_COUNT = 6;

const IMAGE_CATEGORIES = [
  {
    id: 'general',
    label: 'Général',
    icon: <Globe size={16} />,
    fields: [
      { id: 'hero_home', label: 'Bannière Accueil', location: 'Haut de page accueil' },
      { id: 'campus_panoramic', label: 'Bandeau Panoramique', location: 'Transition section campus' },
    ]
  },
  {
    id: 'campus',
    label: 'Campus',
    icon: <MapPin size={16} />,
    fields: [
      { id: 'campus_bazeille', label: 'Hero Aquitaine (BORDEAUX)', location: 'Haut de page Aquitaine' },
      { id: 'bazeille_map', label: 'Carte Aquitaine (BORDEAUX)', location: 'Section localisation' },
      { id: 'bazeille_infra_1', label: 'Aquitaine Infra 1', location: 'Galerie infrastructures' },
      { id: 'bazeille_infra_2', label: 'Aquitaine Infra 2', location: 'Galerie infrastructures' },
      { id: 'bazeille_infra_3', label: 'Aquitaine Infra 3', location: 'Galerie infrastructures' },
      { id: 'bazeille_infra_4', label: 'Aquitaine Infra 4', location: 'Galerie infrastructures' },
      { id: 'bazeille_infra_5', label: 'Aquitaine Infra 5', location: 'Galerie infrastructures' },
      { id: 'bazeille_infra_6', label: 'Aquitaine Infra 6', location: 'Galerie infrastructures' },
      
      { id: 'campus_tulle', label: 'Hero Provence (AIX-EN-PROVENCE)', location: 'Haut de page Provence' },
      { id: 'tulle_map', label: 'Carte Provence (AIX-EN-PROVENCE)', location: 'Section localisation' },
      { id: 'tulle_infra_1', label: 'Provence Infra 1', location: 'Galerie infrastructures' },
      { id: 'tulle_infra_2', label: 'Provence Infra 2', location: 'Galerie infrastructures' },
      { id: 'tulle_infra_3', label: 'Provence Infra 3', location: 'Galerie infrastructures' },
      { id: 'tulle_infra_4', label: 'Provence Infra 4', location: 'Galerie infrastructures' },
      { id: 'tulle_infra_5', label: 'Provence Infra 5', location: 'Galerie infrastructures' },
      { id: 'tulle_infra_6', label: 'Provence Infra 6', location: 'Galerie infrastructures' },
    ]
  },
  {
    id: 'formations',
    label: 'Formations',
    icon: <GraduationCap size={16} />,
    fields: [
      { id: 'programs_college', label: 'Photo Collège (Accueil)', location: 'Onglet Collège - Section Formations' },
      { id: 'programs_lycee', label: 'Photo Lycée (Accueil)', location: 'Onglet Lycée - Section Formations' },
      { id: 'programs_academy', label: 'Photo Academy (Accueil)', location: 'Onglet Academy - Section Formations' },
      { id: 'college_hero', label: 'Hero Collège', location: 'Haut de page Collège' },
      { id: 'lycee_intro', label: 'Photo Intro Lycée', location: 'Section présentation Lycée' },
      { id: 'lycee_card_1', label: 'Carte Langues', location: 'Vignette Bac Général' },
      { id: 'lycee_card_3', label: 'Carte Management', location: 'Vignette Bac STMG' },
      { id: 'lycee_card_4', label: 'Carte Hôtellerie', location: 'Vignette (Futur)' },
      { id: 'lycee_card_5', label: 'Carte Mode', location: 'Vignette (Futur)' },
      { id: 'bac_gen_hero', label: 'Hero Bac Général', location: 'Bannière page Bac Général' },
      { id: 'bac_gen_intro', label: 'Illustration Bac Général', location: 'Photo intro Bac Général' },
      { id: 'bac_stmg_hero', label: 'Hero Bac STMG', location: 'Bannière page Bac STMG' },
      { id: 'bac_stmg_intro', label: 'Illustration Bac STMG', location: 'Photo intro Bac STMG' },
      { id: 'integration_hero', label: 'Hero Intégration', location: 'Bannière Classe Intégration' },
      { id: 'integration_intro', label: 'Illustration Intégration', location: 'Photo intro Intégration' },
      { id: 'langues_hero', label: 'Hero Langues', location: 'Bannière Langues Étrangères' },
      { id: 'bac_americain_hero', label: 'Hero Bac Américain', location: 'Bannière Dual Diploma' },
    ]
  },
  {
    id: 'football',
    label: 'Football',
    icon: <Trophy size={16} />,
    fields: [
      { id: 'football_academy', label: 'Photo Academy (Home)', location: 'Section Academy page accueil' },
      { id: 'prog_hero', label: 'Hero Programme', location: 'Haut de page Programme Football' },
      { id: 'prog_method_img', label: 'Photo Méthodologie', location: 'Section Méthodologie Française' },
      { id: 'competition_hero', label: 'Hero Compétition', location: 'Haut de page Compétition' },
      { id: 'competition_action', label: 'Photo Action', location: 'Section Championnat' },
      { id: 'prog_france_bg', label: 'Fond France', location: 'Section Terre de Football' },
      { id: 'prog_coach_training', label: 'Photo Coachs', location: 'Section Nos Coachs' },
      { id: 'sport_etudes_bg', label: 'Fond Sport-Études', location: 'Arrière-plan page Sport-Études' },
      { id: 'sport_etudes_football', label: 'Photo Football SE', location: 'Page Sport-Études' },
      { id: 'sport_etudes_basketball', label: 'Photo Basket SE', location: 'Page Sport-Études' },
      { id: 'journey_player_concept', label: 'Concept Joueur', location: 'Section Concept Fondamental (Parcours)' },
      { id: 'metiers_bpjeps', label: 'Photo BPJEPS', location: 'Page Métiers du Sport' },
      { id: 'metiers_coach', label: 'Photo Coach', location: 'Page Métiers du Sport' },
      { id: 'metiers_agent', label: 'Photo Agent FIFA', location: 'Page Métiers du Sport' },
      { id: 'metiers_arbitre', label: 'Photo Arbitre', location: 'Page Métiers du Sport' },
      { id: 'metiers_analyste', label: 'Photo Analyste Vidéo', location: 'Page Métiers du Sport' },
      { id: 'support_hero', label: 'Hero Accompagnement', location: 'Grande photo page Accompagnement' },
      { id: 'support_kine', label: 'Photo Kine', location: 'Trombinoscope Santé' },
      { id: 'support_mental', label: 'Photo Mental', location: 'Trombinoscope Santé' },
      { id: 'support_medecin', label: 'Photo Médecin', location: 'Trombinoscope Santé' },
      { id: 'support_physique', label: 'Photo Physio', location: 'Trombinoscope Santé' },
      
      { id: 'tracking_main_img', label: 'Suivi - Photo Droite', location: 'Section Suivi Individualisé' },
      { id: 'tracking_img_1', label: 'Suivi - Cercle 1', location: 'Section Suivi Individualisé' },
      { id: 'tracking_img_2', label: 'Suivi - Cercle 2', location: 'Section Suivi Individualisé' },
      { id: 'tracking_img_3', label: 'Suivi - Cercle 3', location: 'Section Suivi Individualisé' },
      { id: 'tracking_img_4', label: 'Suivi - Cercle 4', location: 'Section Suivi Individualisé' },
      
      { id: 'training_gk', label: 'Spé. - Gardien', location: 'Section Spécialisation Poste' },
      { id: 'training_def', label: 'Spé. - Défenseur', location: 'Section Spécialisation Poste' },
      { id: 'training_mid', label: 'Spé. - Milieu', location: 'Section Spécialisation Poste' },
      { id: 'training_fwd', label: 'Spé. - Attaquant', location: 'Section Spécialisation Poste' },

      { id: 'pillar_tech', label: 'Pilier - Technique', location: 'Section Piliers Performance' },
      { id: 'pillar_tact', label: 'Pilier - Tactique', location: 'Section Piliers Performance' },
      { id: 'pillar_phys', label: 'Pilier - Physique', location: 'Section Piliers Performance' },
      { id: 'pillar_ment', label: 'Pilier - Mental', location: 'Section Piliers Performance' },
      { id: 'pillar_social', label: 'Pilier - Social', location: 'Section Piliers Performance' },
    ]
  },
  {
    id: 'institution',
    label: 'Institution',
    icon: <Layers size={16} />,
    fields: [
      { id: 'history_main', label: 'Photo Histoire', location: 'Page Notre Histoire' },
      { id: 'history_timeline_0', label: 'Logo Frise 2000', location: 'Timeline Histoire' },
      { id: 'history_timeline_1', label: 'Logo Frise 2018', location: 'Timeline Histoire' },
      { id: 'history_timeline_2', label: 'Logo Frise 2021', location: 'Timeline Histoire' },
      { id: 'history_timeline_3', label: 'Logo Frise 2024', location: 'Timeline Histoire' },
      { id: 'team_project_hero', label: 'Photo Projet', location: 'Haut de page Projet' },
      { id: 'recognition_hero', label: 'Photo Reconnaissance', location: 'Haut de page Reconnaissance' },
      { id: 'recog_logo_mne', label: 'Logo Ministère', location: 'Reconnaissance - Accréditations' },
      { id: 'recog_logo_nantes', label: 'Logo Académie Nantes', location: 'Reconnaissance - Accréditations' },
      { id: 'recog_logo_aix', label: 'Logo Académie Aix', location: 'Reconnaissance - Accréditations' },
      { id: 'recog_logo_bordeaux', label: 'Logo Académie Bordeaux', location: 'Reconnaissance - Accréditations' },
      { id: 'team_member_1', label: 'Direction 1', location: 'Trombinoscope Équipe' },
      { id: 'team_member_2', label: 'Direction 2', location: 'Trombinoscope Équipe' },
      { id: 'team_member_3', label: 'Direction 3', location: 'Trombinoscope Équipe' },
    ]
  }
];

export default function AdminPage() {
  const db = useFirestore();
  
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings, isLoading: settingsLoading } = useDoc(settingsRef);
  
  const registrationsQuery = useMemoFirebase(() => query(collection(db, 'registrations'), orderBy('createdAt', 'desc')), [db]);
  const { data: registrations, isLoading: regLoading } = useCollection(registrationsQuery);

  const messagesQuery = useMemoFirebase(() => query(collection(db, 'messages'), orderBy('createdAt', 'desc')), [db]);
  const { data: messages, isLoading: msgLoading } = useCollection(messagesQuery);

  const { toast } = useToast();
  
  const [passwordInput, setPasswordInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [images, setImages] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [selectedReg, setSelectedReg] = useState<any>(null);
  const [selectedMsg, setSelectedMsg] = useState<any>(null);

  useEffect(() => {
    if (settings) {
      setSchoolName(settings.schoolName || 'ESEPE');
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
      schoolName: schoolName.trim() || 'ESEPE',
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

  const updateMsgStatus = (id: string, newStatus: string) => {
    const msgRef = doc(db, 'messages', id);
    updateDoc(msgRef, { status: newStatus })
      .then(() => {
        toast({ title: "Message marqué comme lu" });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: msgRef.path,
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
            <CardTitle>Administration ESEPE</CardTitle>
            <CardDescription>Entrez le code pour accéder à la gestion du site</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUnlock} className="space-y-4">
              <input 
                type="password" 
                placeholder="Mot de passe" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full text-center h-12 rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
              <Button type="submit" className="w-full h-12 rounded-xl bg-primary">DÉVERROUILLER</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  const getCampusLabel = (choice: string) => {
    switch (choice) {
      case 'evron': return 'Campus Pays de la Loire (Le Mans)';
      case 'bazeille': return 'Campus Aquitaine (Bordeaux)';
      case 'tulle': return 'Campus Provence (Aix en Provence)';
      default: return choice;
    }
  };

  const getEnrollmentDateLabel = (choice: string) => {
    switch (choice) {
      case 'sep_2026': return 'Septembre 2026';
      case 'feb_2027': return 'Février 2027';
      case 'sep_2027': return 'Septembre 2027';
      default: return choice;
    }
  };

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
            <TabsList className="grid w-full grid-cols-3 h-16 bg-white p-1 rounded-2xl shadow-sm mb-8">
              <TabsTrigger value="config" className="rounded-xl text-lg font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                <Settings className="mr-2" size={20} /> Configuration
              </TabsTrigger>
              <TabsTrigger value="registrations" className="rounded-xl text-lg font-bold data-[state=active]:bg-secondary data-[state=active]:text-white">
                <Users className="mr-2" size={20} /> Candidatures ({registrations?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="messages" className="rounded-xl text-lg font-bold data-[state=active]:bg-[#1a3d2f] data-[state=active]:text-white">
                <MessageSquare className="mr-2" size={20} /> Messages ({messages?.filter(m => m.status === 'new').length || 0})
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
                    <div className="bg-white rounded-2xl flex items-center justify-center p-4 border-2 border-dashed border-muted min-h-32 shadow-inner">
                      {logoUrl ? <img src={logoUrl} alt="Logo" className="max-h-24 object-contain" /> : <ImageIcon size={48} className="text-muted" />}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] overflow-hidden shadow-xl border-none">
                <CardHeader className="bg-secondary text-white p-6">
                  <CardTitle className="flex items-center gap-2"><Camera size={20} /> Galerie des Photos</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs defaultValue="general" className="w-full">
                    <TabsList className="w-full h-12 bg-muted/20 border-b border-muted rounded-none justify-start px-4 overflow-x-auto">
                      {IMAGE_CATEGORIES.map(cat => (
                        <TabsTrigger key={cat.id} value={cat.id} className="text-xs uppercase font-bold flex items-center gap-2 px-6 shrink-0">
                          {cat.icon} {cat.label}
                        </TabsTrigger>
                      ))}
                      <TabsTrigger value="network" className="text-xs uppercase font-bold flex items-center gap-2 px-6 shrink-0">
                        <Share2 size={16} /> Réseau Clubs
                      </TabsTrigger>
                    </TabsList>
                    
                    {IMAGE_CATEGORIES.map(cat => (
                      <TabsContent key={cat.id} value={cat.id} className="p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {cat.fields.map((field) => (
                            <div key={field.id} className="space-y-2 p-4 bg-white rounded-2xl border border-border shadow-sm">
                              <div className="flex flex-col mb-2">
                                <Label className="font-bold text-[10px] uppercase text-primary flex items-center gap-2">
                                  {field.id.includes('flyer') ? <ImageIcon size={12} /> : null} {field.label}
                                </Label>
                                <span className="text-[9px] text-muted-foreground italic">{field.location}</span>
                              </div>
                              <div className="aspect-video bg-white rounded-xl overflow-hidden mb-2 flex items-center justify-center border border-muted/50 shadow-inner">
                                {images[field.id] ? (
                                  <img src={images[field.id]} alt={field.label} className="object-cover w-full h-full" />
                                ) : (
                                  <div className="w-full h-full bg-black" />
                                )}
                              </div>
                              <Input 
                                value={images[field.id] || ''} 
                                onChange={(e) => updateImageField(field.id, e.target.value)}
                                placeholder="Coller l'URL de l'image ici..."
                                className="text-[10px] h-8 rounded-lg bg-muted/10 border-muted focus:border-secondary"
                              />
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}

                    <TabsContent value="network" className="p-8">
                      <div className="mb-6">
                        <h3 className="font-bold text-primary uppercase text-sm mb-2">Logos des Clubs Partenaires (6 Max)</h3>
                        <p className="text-xs text-muted-foreground">Ces logos apparaissent sur la page "Réseau de Clubs".</p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-12 items-center justify-items-center">
                        {Array.from({ length: CLUBS_COUNT }).map((_, i) => {
                          const fieldId = `club_logo_${i}`;
                          return (
                            <div key={fieldId} className="space-y-2 p-4 bg-white rounded-xl border border-border w-full">
                              <Label className="text-[9px] font-bold uppercase text-primary">Logo Club {i + 1}</Label>
                              <div className="aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center p-4 border border-muted shadow-inner">
                                {images[fieldId] ? (
                                  <img src={images[fieldId]} alt={`Club ${i+1}`} className="object-contain w-full h-full" />
                                ) : (
                                  <div className="w-full h-full bg-muted/5" />
                                )}
                              </div>
                              <Input 
                                value={images[fieldId] || ''} 
                                onChange={(e) => updateImageField(fieldId, e.target.value)}
                                placeholder="URL Logo..."
                                className="text-[9px] h-8 rounded-md"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </TabsContent>
                  </Tabs>
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
                <div className="lg:col-span-4 space-y-4">
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
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-primary font-bold uppercase">
                              {reg.studentFirstName?.[0]}{reg.studentLastName?.[0]}
                            </div>
                            <div className="max-w-[150px]">
                              <h4 className="font-bold truncate">{reg.studentFirstName} {reg.studentLastName}</h4>
                              <p className="text-[10px] text-muted-foreground truncate">{reg.selectedPrograms?.join(', ') || 'N/A'}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full mb-1 inline-block ${
                              reg.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                            }`}>
                              {reg.status === 'pending' ? 'Attente' : 'Contacté'}
                            </div>
                            <p className="text-[9px] text-muted-foreground">
                              {reg.createdAt ? format(reg.createdAt.toDate(), 'dd/MM HH:mm') : ''}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                <div className="lg:col-span-8">
                  {selectedReg ? (
                    <Card className="rounded-[2.5rem] overflow-hidden shadow-xl border-none bg-white sticky top-24 max-h-[85vh] overflow-y-auto">
                      <div className="bg-secondary p-8 text-white sticky top-0 z-10">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-3xl font-headline font-bold uppercase">{selectedReg.studentFirstName} {selectedReg.studentLastName}</h2>
                            <p className="text-white/70">Dossier de candidature n°{selectedReg.id.substring(0, 8)}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={() => updateRegStatus(selectedReg.id, 'contacted')} size="sm" className="bg-white text-secondary hover:bg-white/90 rounded-full font-bold">
                              <Check size={16} className="mr-1" /> MARQUER CONTACTÉ
                            </Button>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-8 space-y-10">
                        {/* Section 1: Scolarité & Campus */}
                        <div className="space-y-4">
                           <h3 className="text-xs font-bold uppercase text-secondary tracking-widest flex items-center gap-2 border-b pb-2">
                             <MapPin size={14} /> Projet Pédagogique
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-4 bg-muted/20 rounded-2xl">
                                 <Label className="text-[9px] uppercase font-bold text-muted-foreground">Campus de destination</Label>
                                 <p className="font-bold text-primary">{getCampusLabel(selectedReg.campusChoice)}</p>
                              </div>
                              <div className="p-4 bg-muted/20 rounded-2xl">
                                 <Label className="text-[9px] uppercase font-bold text-muted-foreground">Programmes sélectionnés</Label>
                                 <p className="font-bold text-primary uppercase">{selectedReg.selectedPrograms?.join(', ')}</p>
                              </div>
                              <div className="p-4 bg-muted/20 rounded-2xl">
                                 <Label className="text-[9px] uppercase font-bold text-muted-foreground">Date d'entrée souhaitée</Label>
                                 <p className="font-bold text-primary">{getEnrollmentDateLabel(selectedReg.enrollmentDateGoal)}</p>
                              </div>
                              <div className="p-4 bg-muted/20 rounded-2xl">
                                 <Label className="text-[9px] uppercase font-bold text-muted-foreground">Code de parrainage</Label>
                                 <p className="font-bold text-secondary">{selectedReg.codeRef || '-'}</p>
                              </div>
                           </div>
                        </div>

                        {/* Section 2: Élève */}
                        <div className="space-y-4">
                           <h3 className="text-xs font-bold uppercase text-secondary tracking-widest flex items-center gap-2 border-b pb-2">
                             <User size={14} /> Informations de l'Élève
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              <div>
                                 <Label className="text-[9px] uppercase text-muted-foreground">Nationalité</Label>
                                 <p className="font-medium">{selectedReg.studentNationality}</p>
                              </div>
                              <div>
                                 <Label className="text-[9px] uppercase text-muted-foreground">Sexe</Label>
                                 <p className="font-medium uppercase">{selectedReg.studentGender === 'boy' ? 'Garçon' : 'Fille'}</p>
                              </div>
                              <div>
                                 <Label className="text-[9px] uppercase text-muted-foreground">Né(e) le</Label>
                                 <p className="font-medium">{selectedReg.studentBirthDate}</p>
                              </div>
                              <div>
                                 <Label className="text-[9px] uppercase text-muted-foreground">Lieu de naissance</Label>
                                 <p className="font-medium">{selectedReg.studentPlaceOfBirth}</p>
                              </div>
                              <div className="md:col-span-2">
                                 <Label className="text-[9px] uppercase text-muted-foreground">Adresse</Label>
                                 <p className="font-medium">{selectedReg.studentAddress}</p>
                              </div>
                           </div>
                           <div className="mt-4 pt-4 border-t border-muted/30">
                              <Label className="text-[9px] uppercase text-muted-foreground block mb-2">Langues parlées</Label>
                              <div className="flex flex-wrap gap-2">
                                 {selectedReg.languagesSpoken?.map((lang: string) => (
                                    <span key={lang} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">
                                       {lang}
                                    </span>
                                 ))}
                              </div>
                           </div>
                        </div>

                        {/* Section 3: Parents */}
                        <div className="space-y-6">
                           <h3 className="text-xs font-bold uppercase text-secondary tracking-widest flex items-center gap-2 border-b pb-2">
                             <Users size={14} /> Responsables Légaux
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {/* Parent 1 */}
                              <div className="space-y-4 p-6 border border-muted rounded-[2rem] bg-muted/5">
                                 <h4 className="text-[10px] font-bold uppercase text-primary border-b pb-1">Parent / Tuteur 1</h4>
                                 <div className="space-y-3 text-sm">
                                    <p className="font-bold">{selectedReg.parent1?.name}</p>
                                    <p className="text-xs text-muted-foreground uppercase">{selectedReg.parent1?.nationality}</p>
                                    <div className="flex flex-col gap-1 pt-2">
                                       <a href={`tel:${selectedReg.parent1?.phone}`} className="flex items-center gap-2 text-primary hover:underline"><Phone size={12} /> {selectedReg.parent1?.phone}</a>
                                       <p className="flex items-center gap-2 text-primary"><MessageSquare size={12} /> {selectedReg.parent1?.wechat}</p>
                                       <a href={`mailto:${selectedReg.parent1?.email}`} className="flex items-center gap-2 text-primary hover:underline"><Mail size={12} /> {selectedReg.parent1?.email}</a>
                                    </div>
                                 </div>
                              </div>
                              {/* Parent 2 */}
                              <div className="space-y-4 p-6 border border-muted rounded-[2rem] bg-muted/5">
                                 <h4 className="text-[10px] font-bold uppercase text-primary border-b pb-1">Parent / Tuteur 2</h4>
                                 {selectedReg.parent2?.name ? (
                                    <div className="space-y-3 text-sm">
                                       <p className="font-bold">{selectedReg.parent2?.name}</p>
                                       <p className="text-xs text-muted-foreground uppercase">{selectedReg.parent2?.nationality}</p>
                                       <div className="flex flex-col gap-1 pt-2">
                                          <a href={`tel:${selectedReg.parent2?.phone}`} className="flex items-center gap-2 text-primary hover:underline"><Phone size={12} /> {selectedReg.parent2?.phone}</a>
                                          <p className="flex items-center gap-2 text-primary"><MessageSquare size={12} /> {selectedReg.parent2?.wechat}</p>
                                          <a href={`mailto:${selectedReg.parent2?.email}`} className="flex items-center gap-2 text-primary hover:underline"><Mail size={12} /> {selectedReg.parent2?.email}</a>
                                       </div>
                                    </div>
                                 ) : (
                                    <p className="text-xs text-muted-foreground italic">Non renseigné</p>
                                 )}
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

            <TabsContent value="messages">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 space-y-4">
                  {msgLoading ? (
                    <div className="p-12 text-center bg-white rounded-3xl"><Loader2 className="animate-spin mx-auto text-primary" /></div>
                  ) : messages?.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-3xl text-muted-foreground italic">Aucun message pour le moment.</div>
                  ) : (
                    messages?.map((msg: any) => (
                      <Card 
                        key={msg.id} 
                        onClick={() => setSelectedMsg(msg)}
                        className={`cursor-pointer transition-all rounded-2xl border-none shadow-sm hover:shadow-md ${selectedMsg?.id === msg.id ? 'ring-2 ring-[#1a3d2f]' : ''}`}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${msg.status === 'new' ? 'bg-[#1a3d2f]' : 'bg-muted text-muted-foreground'}`}>
                              <MessageSquare size={20} />
                            </div>
                            <div>
                              <h4 className="font-bold truncate max-w-[150px]">{msg.name}</h4>
                              <p className="text-xs text-muted-foreground truncate max-w-[150px]">{msg.subject}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full mb-1 inline-block ${
                              msg.status === 'new' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {msg.status === 'new' ? 'Nouveau' : 'Lu'}
                            </div>
                            <p className="text-[10px] text-muted-foreground">
                              {msg.createdAt ? format(msg.createdAt.toDate(), 'dd/MM HH:mm') : ''}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                <div className="lg:col-span-7">
                  {selectedMsg ? (
                    <Card className="rounded-[2.5rem] overflow-hidden shadow-xl border-none bg-white sticky top-24">
                      <div className="bg-[#1a3d2f] p-8 text-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-2xl font-headline font-bold">{selectedMsg.subject}</h2>
                            <p className="text-white/70">De : {selectedMsg.name}</p>
                          </div>
                          <div className="flex gap-2">
                            {selectedMsg.status === 'new' && (
                              <Button onClick={() => updateMsgStatus(selectedMsg.id, 'read')} size="sm" className="bg-white text-[#1a3d2f] hover:bg-white/90 rounded-full font-bold">
                                <Check size={16} className="mr-1" /> MARQUER LU
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-8 space-y-8">
                        <div className="space-y-6">
                          <div className="p-6 bg-muted/30 rounded-2xl border border-muted italic text-lg text-primary">
                            "{selectedMsg.message}"
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-muted">
                            <div className="space-y-4">
                              <h4 className="text-xs font-bold uppercase text-[#1a3d2f] flex items-center gap-2">
                                <User size={14} /> Expéditeur
                              </h4>
                              <p className="font-medium">{selectedMsg.name}</p>
                              <p className="text-sm text-muted-foreground flex items-center gap-2"><Mail size={14} /> {selectedMsg.email}</p>
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-xs font-bold uppercase text-[#1a3d2f] flex items-center gap-2">
                                <Calendar size={14} /> Infos Envoi
                              </h4>
                              <p className="text-sm">Envoyé le : <span className="font-medium">{selectedMsg.createdAt ? format(selectedMsg.createdAt.toDate(), 'dd MMMM yyyy à HH:mm') : '-'}</span></p>
                              {selectedMsg.codeRef && <p className="text-sm flex items-center gap-2"><Hash size={14} /> Code Réf : <span className="font-bold">{selectedMsg.codeRef}</span></p>}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="h-[400px] border-2 border-dashed border-muted rounded-[2.5rem] flex flex-col items-center justify-center text-muted-foreground gap-4 bg-white/50">
                      <MessageSquare size={48} className="opacity-20" />
                      <p>Sélectionnez un message pour lire le contenu</p>
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
