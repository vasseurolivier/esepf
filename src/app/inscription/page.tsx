
"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Loader2, GraduationCap, User, Users, MapPin, School, CheckCircle2, Home, Calendar, ArrowRight, Hash, Languages, Globe, Phone, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function RegistrationPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const db = useFirestore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(format(new Date(), 'dd/MM/yyyy'));
  }, []);

  const [formData, setFormData] = useState({
    studentFirstName: '',
    studentLastName: '',
    studentGender: 'boy',
    studentBirthDate: '',
    studentNationality: '',
    languagesSpoken: [] as string[],
    studentAddress: '',
    studentPlaceOfBirth: '',
    enrollmentDateGoal: 'sep_2026',
    parent1: {
      name: '',
      nationality: '',
      phone: '',
      wechat: '',
      email: ''
    },
    parent2: {
      name: '',
      nationality: '',
      phone: '',
      wechat: '',
      email: ''
    },
    selectedPrograms: [] as string[],
    campusChoice: '',
    codeRef: ''
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleParentChange = (parent: 'parent1' | 'parent2', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const toggleLanguage = (lang: string) => {
    const current = formData.languagesSpoken;
    if (current.includes(lang)) {
      handleChange('languagesSpoken', current.filter(l => l !== lang));
    } else {
      handleChange('languagesSpoken', [...current, lang]);
    }
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
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-muted/30 flex items-center justify-center p-4">
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
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/20 pb-20">
        
        <section className="bg-primary text-white py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
            < GraduationCap size={400} />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal>
              <h1 className="text-5xl md:text-6xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {t.registration.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-white/50 font-bold uppercase tracking-widest text-sm mb-4">
                 <span>Date Registration / 注册日期</span>
                 <span className="text-secondary">{currentDate}</span>
              </div>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl text-white/70 font-medium">{t.registration.subtitle}</p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              
              <form onSubmit={handleSubmit} className="space-y-12">
                
                {/* 1. PERSONAL INFORMATION / 个人信息 */}
                <ScrollReveal>
                  <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
                    <CardHeader className="bg-muted/30 border-b border-muted p-8">
                      <div className="flex items-center gap-3 text-primary">
                        <User size={24} className="text-secondary" />
                        <CardTitle className="text-2xl font-headline font-bold uppercase tracking-wider">{t.registration.section_student}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.first_name}</Label>
                          <Input required value={formData.studentFirstName} onChange={e => handleChange('studentFirstName', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                        </div>
                        <div className="space-y-4">
                          <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.gender}</Label>
                          <RadioGroup defaultValue="boy" onValueChange={val => handleChange('studentGender', val)} className="flex items-center gap-8">
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="boy" id="boy" />
                                <Label htmlFor="boy" className="cursor-pointer">{t.registration.boy}</Label>
                             </div>
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="girl" id="girl" />
                                <Label htmlFor="girl" className="cursor-pointer">{t.registration.girl}</Label>
                             </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.last_name}</Label>
                          <Input required value={formData.studentLastName} onChange={e => handleChange('studentLastName', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.nationality}</Label>
                          <Input required value={formData.studentNationality} onChange={e => handleChange('studentNationality', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-muted/50">
                        <Label className="font-bold text-xs uppercase text-primary tracking-widest flex items-center gap-2">
                          <Languages size={14} /> {t.registration.languages_spoken}
                        </Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                           {['chinese', 'english', 'french', 'japanese', 'other_lang'].map((lang) => (
                             <div key={lang} className="flex items-center space-x-2 bg-muted/20 p-3 rounded-xl border border-muted hover:bg-muted/40 transition-colors">
                                <Checkbox id={lang} checked={formData.languagesSpoken.includes(lang)} onCheckedChange={() => toggleLanguage(lang)} />
                                <label htmlFor={lang} className="text-xs font-bold cursor-pointer uppercase">{t.registration[lang as keyof typeof t.registration]}</label>
                             </div>
                           ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.birth_date}</Label>
                          <Input required type="date" value={formData.studentBirthDate} onChange={e => handleChange('studentBirthDate', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.place_of_birth}</Label>
                          <Input required value={formData.studentPlaceOfBirth} onChange={e => handleChange('studentPlaceOfBirth', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.address}</Label>
                          <Input required value={formData.studentAddress} onChange={e => handleChange('studentAddress', e.target.value)} className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" />
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-muted/50">
                        <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.enrollment_date}</Label>
                        <RadioGroup defaultValue="sep_2026" onValueChange={val => handleChange('enrollmentDateGoal', val)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           {[
                             { id: 'sep_2026', label: t.registration.sep_2026 },
                             { id: 'feb_2027', label: t.registration.feb_2027 },
                             { id: 'sep_2027', label: t.registration.sep_2027 },
                           ].map((date) => (
                             <div key={date.id} className="flex items-center space-x-2 bg-muted/20 p-4 rounded-xl border border-muted">
                                <RadioGroupItem value={date.id} id={date.id} />
                                <Label htmlFor={date.id} className="text-xs font-bold cursor-pointer uppercase">{date.label}</Label>
                             </div>
                           ))}
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                {/* 2. PARENT/GUARDIAN INFORMATION / 家长/监护人信息 */}
                <ScrollReveal delay={100}>
                  <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
                    <CardHeader className="bg-muted/30 border-b border-muted p-8">
                      <div className="flex items-center gap-3 text-primary">
                        <Users size={24} className="text-secondary" />
                        <CardTitle className="text-2xl font-headline font-bold uppercase tracking-wider">{t.registration.section_parent}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Parent 1 */}
                        <div className="p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-muted/50">
                          <h3 className="text-primary font-bold text-xs uppercase tracking-[0.2em] border-b border-secondary/20 pb-2 flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-[10px]">1</div>
                             {t.registration.section_parent1}
                          </h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t.registration.name}</Label>
                              <Input required value={formData.parent1.name} onChange={e => handleParentChange('parent1', 'name', e.target.value)} className="rounded-lg" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t.registration.nationality}</Label>
                              <Input required value={formData.parent1.nationality} onChange={e => handleParentChange('parent1', 'nationality', e.target.value)} className="rounded-lg" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t.registration.phone}</Label>
                              <div className="relative">
                                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                                 <Input required type="tel" value={formData.parent1.phone} onChange={e => handleParentChange('parent1', 'phone', e.target.value)} className="rounded-lg pl-10" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t.registration.wechat}</Label>
                              <div className="relative">
                                 <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                                 <Input required value={formData.parent1.wechat} onChange={e => handleParentChange('parent1', 'wechat', e.target.value)} className="rounded-lg pl-10" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t.registration.email}</Label>
                              <div className="relative">
                                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                                 <Input required type="email" value={formData.parent1.email} onChange={e => handleParentChange('parent1', 'email', e.target.value)} className="rounded-lg pl-10" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Parent 2 */}
                        <div className="p-8 space-y-6 bg-muted/5">
                          <h3 className="text-primary font-bold text-xs uppercase tracking-[0.2em] border-b border-secondary/20 pb-2 flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-muted text-primary flex items-center justify-center text-[10px]">2</div>
                             {t.registration.section_parent2}
                          </h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t.registration.name}</Label>
                              <Input value={formData.parent2.name} onChange={e => handleParentChange('parent2', 'name', e.target.value)} className="rounded-lg" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t.registration.nationality}</Label>
                              <Input value={formData.parent2.nationality} onChange={e => handleParentChange('parent2', 'nationality', e.target.value)} className="rounded-lg" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t.registration.phone}</Label>
                              <div className="relative">
                                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                                 <Input type="tel" value={formData.parent2.phone} onChange={e => handleParentChange('parent2', 'phone', e.target.value)} className="rounded-lg pl-10" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t.registration.wechat}</Label>
                              <div className="relative">
                                 <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                                 <Input value={formData.parent2.wechat} onChange={e => handleParentChange('parent2', 'wechat', e.target.value)} className="rounded-lg pl-10" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t.registration.email}</Label>
                              <div className="relative">
                                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                                 <Input type="email" value={formData.parent2.email} onChange={e => handleParentChange('parent2', 'email', e.target.value)} className="rounded-lg pl-10" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                {/* 3. PROGRAM SELECTED / 所选计划 */}
                <ScrollReveal delay={200}>
                  <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
                    <CardHeader className="bg-muted/30 border-b border-muted p-8">
                      <div className="flex items-center gap-3 text-primary">
                        <MapPin size={24} className="text-secondary" />
                        <CardTitle className="text-2xl font-headline font-bold uppercase tracking-wider">{t.registration.section_choices}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.campus_choice}</Label>
                          <Select required onValueChange={val => handleChange('campusChoice', val)}>
                            <SelectTrigger className="rounded-xl h-12 border-muted">
                              <SelectValue placeholder={t.common.select_placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="evron">{t.registration.campuses.evron}</SelectItem>
                              <SelectItem value="bazeille">{t.registration.campuses.bazeille}</SelectItem>
                              <SelectItem value="tulle">{t.registration.campuses.tulle}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold text-xs uppercase text-primary tracking-widest flex items-center gap-2">
                            <Hash size={14} /> {t.registration.code_ref}
                          </Label>
                          <Input 
                            placeholder="ABC-123" 
                            value={formData.codeRef} 
                            onChange={e => handleChange('codeRef', e.target.value)} 
                            className="rounded-xl h-12 border-muted focus:border-secondary transition-colors" 
                          />
                        </div>
                      </div>

                      <div className="space-y-6 pt-4 border-t border-muted/50">
                        <Label className="font-bold text-xs uppercase text-primary tracking-widest">{t.registration.program_of_study}</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                           {[
                             { id: 'middle_school', label: t.registration.middle_school, icon: <School size={20} /> },
                             { id: 'high_school', label: t.registration.high_school, icon: <GraduationCap size={20} /> },
                             { id: 'football_program', label: t.registration.football_program, icon: <div className="text-lg">⚽</div> },
                           ].map((prog) => (
                             <div 
                               key={prog.id} 
                               onClick={() => {
                                 const current = formData.selectedPrograms;
                                 if (current.includes(prog.id)) {
                                   handleChange('selectedPrograms', current.filter(p => p !== prog.id));
                                 } else {
                                   handleChange('selectedPrograms', [...current, prog.id]);
                                 }
                               }}
                               className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all cursor-pointer text-center gap-4 ${
                                 formData.selectedPrograms.includes(prog.id) 
                                 ? 'border-secondary bg-secondary/5 shadow-inner' 
                                 : 'border-muted hover:border-primary/20 hover:bg-muted/20'
                               }`}
                             >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                                  formData.selectedPrograms.includes(prog.id) ? 'bg-secondary text-white' : 'bg-muted text-primary'
                                }`}>
                                   {prog.icon}
                                </div>
                                <span className="font-bold text-xs uppercase tracking-widest leading-tight">{prog.label}</span>
                                <Checkbox checked={formData.selectedPrograms.includes(prog.id)} className="mt-2" />
                             </div>
                           ))}
                        </div>
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
    </div>
  );
}
