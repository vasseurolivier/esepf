
"use client";

import React, { useState } from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, GraduationCap, User, Users, MapPin, School, CheckCircle2, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';

export default function RegistrationPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const db = useFirestore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    studentFirstName: '',
    studentLastName: '',
    studentBirthDate: '',
    studentNationality: '',
    currentGrade: '',
    parentFirstName: '',
    parentLastName: '',
    parentEmail: '',
    parentPhone: '',
    campusChoice: '',
    programChoice: '',
    footballAcademy: false
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;

    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'registrations'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      
      setIsSuccess(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error saving registration:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer le dossier pour le moment. Veuillez réessayer."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <FirebaseClientProvider>
        <Header />
        <main className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
          <ScrollReveal>
            <Card className="max-w-2xl w-full rounded-[3rem] shadow-2xl border-none text-center overflow-hidden">
              <div className="bg-primary p-12 text-white">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={60} className="text-secondary" />
                </div>
                <h1 className="text-4xl font-headline font-bold mb-4">{t.registration.success_title}</h1>
                <p className="text-xl text-white/70 leading-relaxed">
                  {t.registration.success_desc}
                </p>
              </div>
              <CardContent className="p-12">
                <Link href="/">
                  <Button className="h-16 px-12 rounded-full bg-primary text-white font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center gap-3 mx-auto">
                    <Home size={20} />
                    {t.registration.btn_back_home}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </ScrollReveal>
        </main>
        <Footer />
      </FirebaseClientProvider>
    );
  }

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-muted/20">
        
        {/* Hero Banner */}
        <section className="bg-primary text-white py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
            < GraduationCap size={600} />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal>
              <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {t.registration.title}
              </h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-white/70 font-medium">{t.registration.subtitle}</p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              <ScrollReveal className="mb-12">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-border flex items-center gap-6">
                  <div className="bg-secondary/10 p-4 rounded-2xl text-secondary">
                    <School size={32} />
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.registration.intro}
                  </p>
                </div>
              </ScrollReveal>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Student Info */}
                <ScrollReveal>
                  <Card className="rounded-[2rem] border-none shadow-xl overflow-hidden">
                    <CardHeader className="bg-muted/50 border-b border-muted p-8">
                      <div className="flex items-center gap-3 text-primary">
                        <User size={24} className="text-secondary" />
                        <CardTitle className="text-2xl uppercase tracking-wider">{t.registration.section_student}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary">{t.registration.first_name}</Label>
                        <Input required value={formData.studentFirstName} onChange={e => handleChange('studentFirstName', e.target.value)} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary">{t.registration.last_name}</Label>
                        <Input required value={formData.studentLastName} onChange={e => handleChange('studentLastName', e.target.value)} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary">{t.registration.birth_date}</Label>
                        <Input required type="date" value={formData.studentBirthDate} onChange={e => handleChange('studentBirthDate', e.target.value)} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary">{t.registration.nationality}</Label>
                        <Input required value={formData.studentNationality} onChange={e => handleChange('studentNationality', e.target.value)} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="font-bold text-xs uppercase text-primary">{t.registration.grade}</Label>
                        <Input required placeholder="Ex: 4ème, Seconde..." value={formData.currentGrade} onChange={e => handleChange('currentGrade', e.target.value)} className="rounded-xl h-12" />
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                {/* Parent Info */}
                <ScrollReveal delay={100}>
                  <Card className="rounded-[2rem] border-none shadow-xl overflow-hidden">
                    <CardHeader className="bg-muted/50 border-b border-muted p-8">
                      <div className="flex items-center gap-3 text-primary">
                        <Users size={24} className="text-secondary" />
                        <CardTitle className="text-2xl uppercase tracking-wider">{t.registration.section_parent}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary">{t.registration.first_name}</Label>
                        <Input required value={formData.parentFirstName} onChange={e => handleChange('parentFirstName', e.target.value)} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary">{t.registration.last_name}</Label>
                        <Input required value={formData.parentLastName} onChange={e => handleChange('parentLastName', e.target.value)} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary">{t.registration.email}</Label>
                        <Input required type="email" value={formData.parentEmail} onChange={e => handleChange('parentEmail', e.target.value)} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary">{t.registration.phone}</Label>
                        <Input required type="tel" value={formData.parentPhone} onChange={e => handleChange('parentPhone', e.target.value)} className="rounded-xl h-12" />
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                {/* Project Info */}
                <ScrollReveal delay={200}>
                  <Card className="rounded-[2rem] border-none shadow-xl overflow-hidden">
                    <CardHeader className="bg-muted/50 border-b border-muted p-8">
                      <div className="flex items-center gap-3 text-primary">
                        <MapPin size={24} className="text-secondary" />
                        <CardTitle className="text-2xl uppercase tracking-wider">{t.registration.section_choices}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="font-bold text-xs uppercase text-primary">{t.registration.campus_choice}</Label>
                          <Select required onValueChange={val => handleChange('campusChoice', val)}>
                            <SelectTrigger className="rounded-xl h-12">
                              <SelectValue placeholder="Choisir un campus" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="evron">Campus Pays de la Loire (Le Mans)</SelectItem>
                              <SelectItem value="bazeille">Campus Aquitaine (Bordeaux)</SelectItem>
                              <SelectItem value="tulle">Campus Provence (Aix en Provence)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold text-xs uppercase text-primary">{t.registration.program_choice}</Label>
                          <Select required onValueChange={val => handleChange('programChoice', val)}>
                            <SelectTrigger className="rounded-xl h-12">
                              <SelectValue placeholder="Choisir une formation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="college">Collège</SelectItem>
                              <SelectItem value="bac_gen">Bac Général</SelectItem>
                              <SelectItem value="bac_stmg">Bac Techno STMG</SelectItem>
                              <SelectItem value="integration">Classe d'Intégration (FLE)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                        <Checkbox 
                          id="football" 
                          checked={formData.footballAcademy} 
                          onCheckedChange={val => handleChange('footballAcademy', val)}
                          className="w-6 h-6 rounded-md border-primary"
                        />
                        <Label htmlFor="football" className="text-lg font-bold text-primary cursor-pointer">
                          {t.registration.football_interest}
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                {/* Submit Button */}
                <div className="sticky bottom-8 z-50">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-20 rounded-2xl text-xl font-bold bg-primary text-white hover:bg-primary/90 shadow-2xl transition-all border-4 border-white flex items-center justify-center gap-4"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={32} />
                    ) : (
                      <>
                        <CheckCircle2 size={32} />
                        {t.registration.submit}
                      </>
                    )}
                  </Button>
                </div>

              </form>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
