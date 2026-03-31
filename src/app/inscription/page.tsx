
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Loader2, GraduationCap, User, Users, MapPin, School, CheckCircle2, Home, Calendar, ArrowRight, Hash } from 'lucide-react';
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
    codeRef: '',
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

  const steps = [
    { id: '01', title: t.registration_steps.step1, date: t.registration_steps.step1_date, color: 'border-blue-600' },
    { id: '02', title: t.registration_steps.step2, date: t.registration_steps.step2_date, color: 'border-blue-500' },
    { id: '03', title: t.registration_steps.step3, date: t.registration_steps.step3_date, color: 'border-cyan-500' },
    { id: '04', title: t.registration_steps.step4, date: t.registration_steps.step4_date, color: 'border-cyan-400' },
    { id: '05', title: t.registration_steps.step5, date: t.registration_steps.step5_date, color: 'border-green-500' },
    { id: '06', title: t.registration_steps.step6, date: t.registration_steps.step6_date, color: 'border-green-600' },
    { id: '07', title: t.registration_steps.step7, date: t.registration_steps.step7_date, color: 'border-blue-800' },
    { id: '08', title: t.registration_steps.step8, date: t.registration_steps.step8_date, color: 'border-blue-400' },
  ];

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

        {/* Joining Steps Section - Timeline Version */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-24">
              <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary uppercase tracking-tighter mb-4">
                {t.registration_steps.title}
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
            </ScrollReveal>

            <div className="relative max-w-7xl mx-auto">
              {/* Desktop Connecting Line */}
              <div className="hidden lg:block absolute top-[45px] left-0 w-full h-0.5 bg-muted z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 relative z-10">
                {steps.map((step, idx) => (
                  <ScrollReveal key={step.id} delay={idx * 100} className="relative">
                    <div className="flex flex-col items-center lg:items-start group">
                      {/* Step Circle */}
                      <div className={`w-24 h-24 rounded-full border-4 ${step.color} bg-white flex items-center justify-center mb-8 shadow-xl transition-all duration-500 group-hover:scale-110 relative z-20`}>
                        <span className="text-3xl font-headline font-bold text-primary italic">{step.id}</span>
                      </div>

                      {/* Content */}
                      <div className="text-center lg:text-left space-y-3 px-4 lg:px-0">
                        <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] leading-tight min-h-[40px]">
                          {step.title}
                        </h3>
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-secondary font-bold text-[10px] uppercase tracking-widest bg-muted/30 py-2 px-4 rounded-full w-fit mx-auto lg:mx-0">
                          <Calendar size={12} />
                          {step.date}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <div className="mt-24 text-center">
              <ScrollReveal>
                <div className="inline-flex items-center gap-4 text-primary font-headline font-bold text-2xl md:text-4xl italic opacity-20">
                  <span>Admissions</span>
                  <div className="w-12 md:w-24 h-px bg-primary" />
                  <span>Excellence</span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              <ScrollReveal className="mb-12">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-border flex items-center gap-6">
                  <div className="bg-primary text-white p-4 rounded-2xl shadow-lg">
                    <School size={32} />
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {t.registration.intro}
                  </p>
                </div>
              </ScrollReveal>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Student Info */}
                <ScrollReveal>
                  <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
                    <CardHeader className="bg-muted/30 border-b border-muted p-8">
                      <div className="flex items-center gap-3 text-primary">
                        <User size={24} className="text-secondary" />
                        <CardTitle className="text-2xl font-headline font-bold uppercase tracking-wider">{t.registration.section_student}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.first_name}</Label>
                        <Input required placeholder={t.common.placeholder_name} value={formData.studentFirstName} onChange={e => handleChange('studentFirstName', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.last_name}</Label>
                        <Input required value={formData.studentLastName} onChange={e => handleChange('studentLastName', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.birth_date}</Label>
                        <Input required type="date" value={formData.studentBirthDate} onChange={e => handleChange('studentBirthDate', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.nationality}</Label>
                        <Input required value={formData.studentNationality} onChange={e => handleChange('studentNationality', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.grade}</Label>
                        <Input required placeholder={t.registration.placeholder_grade} value={formData.currentGrade} onChange={e => handleChange('currentGrade', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                {/* Parent Info */}
                <ScrollReveal delay={100}>
                  <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
                    <CardHeader className="bg-muted/30 border-b border-muted p-8">
                      <div className="flex items-center gap-3 text-primary">
                        <Users size={24} className="text-secondary" />
                        <CardTitle className="text-2xl font-headline font-bold uppercase tracking-wider">{t.registration.section_parent}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.first_name}</Label>
                        <Input required value={formData.parentFirstName} onChange={e => handleChange('parentFirstName', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.last_name}</Label>
                        <Input required value={formData.parentLastName} onChange={e => handleChange('parentLastName', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.email}</Label>
                        <Input required type="email" placeholder={t.common.placeholder_email} value={formData.parentEmail} onChange={e => handleChange('parentEmail', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.phone}</Label>
                        <Input required type="tel" value={formData.parentPhone} onChange={e => handleChange('parentPhone', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                {/* Project Info */}
                <ScrollReveal delay={200}>
                  <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
                    <CardHeader className="bg-muted/30 border-b border-muted p-8">
                      <div className="flex items-center gap-3 text-primary">
                        <MapPin size={24} className="text-secondary" />
                        <CardTitle className="text-2xl font-headline font-bold uppercase tracking-wider">{t.registration.section_choices}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.campus_choice}</Label>
                          <Select required onValueChange={val => handleChange('campusChoice', val)}>
                            <SelectTrigger className="rounded-xl h-12 border-muted">
                              <SelectValue placeholder={t.registration.campus_placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="evron">{t.registration.campus_evron_full}</SelectItem>
                              <SelectItem value="bazeille">{t.registration.campus_bazeille_full}</SelectItem>
                              <SelectItem value="tulle">{t.registration.campus_tulle_full}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.program_choice}</Label>
                          <Select required onValueChange={val => handleChange('programChoice', val)}>
                            <SelectTrigger className="rounded-xl h-12 border-muted">
                              <SelectValue placeholder={t.registration.program_placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="college">{t.registration.program_college}</SelectItem>
                              <SelectItem value="bac_gen">{t.registration.program_bac_gen}</SelectItem>
                              <SelectItem value="bac_stmg">{t.registration.program_bac_stmg}</SelectItem>
                              <SelectItem value="integration">{t.registration.program_integration}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase text-primary tracking-widest flex items-center gap-2">
                          <Hash size={14} /> {t.registration.code_ref}
                        </Label>
                        <Input 
                          placeholder={t.common.placeholder_code} 
                          value={formData.codeRef} 
                          onChange={e => handleChange('codeRef', e.target.value)} 
                          className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" 
                        />
                      </div>

                      <div className="flex items-center space-x-3 p-6 bg-primary/5 rounded-2xl border border-primary/10 transition-all hover:bg-primary/10">
                        <Checkbox 
                          id="football" 
                          checked={formData.footballAcademy} 
                          onCheckedChange={val => handleChange('footballAcademy', val)}
                          className="w-6 h-6 rounded-md border-primary data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                        />
                        <Label htmlFor="football" className="text-lg font-bold text-primary cursor-pointer tracking-tight">
                          {t.registration.football_interest}
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                {/* Submit Button */}
                <div className="sticky bottom-8 z-50 pt-12">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-20 rounded-[2rem] text-xl font-bold bg-primary text-white hover:bg-primary/90 shadow-2xl transition-all border-4 border-white flex items-center justify-center gap-4 group"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={32} />
                    ) : (
                      <>
                        <CheckCircle2 size={32} className="text-secondary" />
                        {t.registration.submit}
                        <ArrowRight size={24} className="ml-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
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
