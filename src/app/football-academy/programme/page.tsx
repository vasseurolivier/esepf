
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore, useMemoFirebase, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Target, Shield, Users, Calendar, Trophy, Zap, Activity, Brain, Star, CheckCircle2, Dumbbell, MapPin } from 'lucide-react';

export default function ProgrammeFootballPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings } = useDoc(settingsRef);
  
  const settings = clientSettings || serverSettings;

  if (!t || !t.football_pages) return null;

  const heroImage = settings?.images?.prog_hero;
  const franceImage = settings?.images?.prog_france_bg;
  const coachImage = settings?.images?.prog_coach_training;
  const methodImg = settings?.images?.prog_method_img;

  const methodologyAxes = [
    { icon: <Target className="text-secondary" />, title: t.football_pages.axes_tech.split(':')[0], desc: t.football_pages.axes_tech.split(':')[1] },
    { icon: <Users className="text-secondary" />, title: t.football_pages.axes_tact.split(':')[0], desc: t.football_pages.axes_tact.split(':')[1] },
    { icon: <Activity className="text-secondary" />, title: t.football_pages.axes_phys.split(':')[0], desc: t.football_pages.axes_phys.split(':')[1] },
    { icon: <Brain className="text-secondary" />, title: t.football_pages.axes_ment.split(':')[0], desc: t.football_pages.axes_ment.split(':')[1] }
  ];

  const proTrainingItems = [
    { icon: <MapPin size={48} />, title: t.football_pages.pro_training.item1_title, desc: t.football_pages.pro_training.item1_desc },
    { icon: <Users size={48} />, title: t.football_pages.pro_training.item2_title, desc: t.football_pages.pro_training.item2_desc },
    { icon: <Zap size={48} />, title: t.football_pages.pro_training.item3_title, desc: t.football_pages.pro_training.item3_desc },
    { icon: <Dumbbell size={48} />, title: t.football_pages.pro_training.item4_title, desc: t.football_pages.pro_training.item4_desc },
    { icon: <Target size={48} />, title: t.football_pages.pro_training.item5_title, desc: t.football_pages.pro_training.item5_desc },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center bg-black overflow-hidden">
          {heroImage && (
            <Image 
              src={heroImage}
              alt="Football Program"
              fill
              className="object-cover opacity-60"
              priority
              sizes="100vw"
            />
          )}
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <span className="text-lg font-bold tracking-[0.4em] text-secondary uppercase mb-4 block">- {t.football_pages.elite_label} -</span>
              <h1 className="text-5xl md:text-8xl font-headline font-bold uppercase mb-12 tracking-tighter leading-none">
                {t.football_pages.prog_title}
              </h1>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => scrollToSection('fr-section')} className="bg-black/50 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-colors shadow-xl">Football FR</button>
                <button onClick={() => scrollToSection('method-section')} className="bg-black/50 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-colors shadow-xl">{t.football_pages.method_title}</button>
                <button onClick={() => scrollToSection('coachs-section')} className="bg-black/50 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-colors shadow-xl">{t.football_pages.coaches_title}</button>
                <button onClick={() => scrollToSection('prog-section')} className="bg-black/50 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-colors shadow-xl">{t.football_pages.weekly_title}</button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal className="space-y-12 text-center">
              <div className="text-2xl md:text-3xl font-headline font-bold text-primary leading-tight">
                {t.football_pages.prog_intro_1}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-muted-foreground text-left leading-relaxed">
                <p>{t.football_pages.prog_intro_2}</p>
                <p>{t.football_pages.prog_intro_3}</p>
              </div>
              <div className="p-10 bg-muted/30 rounded-[3rem] border border-muted italic text-xl text-primary font-medium">
                "{t.football_pages.prog_intro_4}"
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* NEW: Entraîne-toi comme un professionnel Section */}
        <section className="py-24 bg-[#0a192f] text-white overflow-hidden">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tight mb-8">
                {t.football_pages.pro_training.title}
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto mb-8 rounded-full" />
              <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
                {t.football_pages.pro_training.subtitle}
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
              {proTrainingItems.map((item, i) => (
                <ScrollReveal key={i} delay={i * 100} className="flex flex-col items-center text-center group cursor-pointer">
                  <div className="mb-8 transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 text-white group-hover:text-secondary">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-4 min-h-[3.5rem] flex items-center justify-center leading-tight px-4 uppercase tracking-wider group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed px-2 font-medium">
                    {item.desc}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* French Methodology Section */}
        <section id="method-section" className="py-32 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
              
              {/* Image Side */}
              <div className="lg:w-[60%] relative h-[400px] md:h-[650px] w-full rounded-[2rem] overflow-hidden shadow-2xl z-0 mb-8 lg:mb-0 bg-black">
                {methodImg && (
                  <Image 
                    src={methodImg} 
                    alt="French Football Methodology" 
                    fill 
                    className="object-cover opacity-90"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                )}
              </div>

              {/* Text Side - Blue Box */}
              <div className="lg:w-[55%] lg:-ml-32 z-10">
                <div className="bg-[#000080] p-8 md:p-16 text-white shadow-2xl relative rounded-3xl">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block">
                    <Trophy size={80} className="text-white" />
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-headline font-bold mb-10 leading-tight uppercase tracking-widest text-center lg:text-left text-white">
                    {t.football_pages.french_method_title}
                  </h2>
                  
                  <div className="space-y-6 text-sm md:text-base leading-relaxed font-light text-white">
                    <p className="font-bold text-white opacity-100">{t.football_pages.french_method_p1}</p>
                    <p className="text-white opacity-90">{t.football_pages.french_method_p2}</p>
                    <p className="text-white opacity-90">{t.football_pages.french_method_p3}</p>
                    <p className="font-bold text-white opacity-100">{t.football_pages.french_method_p4}</p>
                  </div>

                  <div className="absolute -bottom-16 -left-16 opacity-10 hidden lg:block">
                    <Users size={200} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="fr-section" className="bg-[#1a237e] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-20 opacity-5">
            <Trophy size={500} />
          </div>
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center relative z-10">
              <ScrollReveal className="space-y-8">
                <div className="inline-flex items-center gap-3 text-secondary font-bold uppercase tracking-widest text-sm">
                  <Star fill="currentColor" size={20} /> {t.football_pages.terre_talents}
                </div>
                <h2 className="text-5xl md:text-6xl font-headline font-bold mb-8 leading-tight tracking-tighter">{t.football_pages.france_title}</h2>
                <div className="w-20 h-1.5 bg-secondary rounded-full" />
                <p className="text-lg leading-relaxed opacity-90">{t.football_pages.france_desc_full}</p>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-sm font-bold uppercase tracking-widest italic mb-2 text-secondary">{t.common.inspirations}</p>
                  <p className="text-base text-white/80">{t.football_pages.france_examples}</p>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:w-1/2 relative min-h-[450px] bg-black">
              {franceImage && (
                <Image src={franceImage} alt="France Winners" fill className="object-cover" />
              )}
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <ScrollReveal className="text-center mb-24">
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">{t.football_pages.method_subtitle}</span>
              <h2 className="text-5xl md:text-7xl font-headline font-bold text-black uppercase tracking-tighter">{t.football_pages.method_title}</h2>
              <div className="w-24 h-1.5 bg-black mx-auto mt-4 rounded-full" />
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodologyAxes.map((axis, i) => (
                <ScrollReveal key={i} delay={i * 100} className="p-10 bg-muted/20 rounded-[2.5rem] border border-muted hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                  <div className="bg-white p-5 rounded-2xl inline-block shadow-md mb-8 group-hover:scale-110 transition-transform">{axis.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{axis.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{axis.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="coachs-section" className="py-32 bg-muted/20 border-y border-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-6xl mx-auto">
              <ScrollReveal className="space-y-10">
                <div className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs">
                  <Shield size={16} /> {t.football_pages.expertise_cert}
                </div>
                <h2 className="text-5xl md:text-6xl font-headline font-bold text-black uppercase tracking-tighter leading-tight">{t.football_pages.coaches_title}</h2>
                <p className="text-2xl text-muted-foreground leading-relaxed italic border-l-8 border-secondary pl-8">"{t.football_pages.coaches_text}"</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-xs text-primary"><CheckCircle2 className="text-secondary" /> Diplômes UEFA Pro / A / B / C</div>
                  <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-xs text-primary"><CheckCircle2 className="text-secondary" /> {t.competition_page.performance_video} {t.football_pages.axes_ment.split(':')[0]}</div>
                  <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-xs text-primary"><CheckCircle2 className="text-secondary" /> {t.competition_page.performance_phys} {t.football_pages.axes_phys.split(':')[0]}</div>
                </div>
              </ScrollReveal>
              <div className="relative aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white bg-black">
                {coachImage && (
                  <Image src={coachImage} alt="Coach Training" fill className="object-cover" />
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="prog-section" className="py-32 bg-primary text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 -translate-y-1/4 translate-x-1/4">
            <Calendar size={600} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal className="max-w-4xl mx-auto text-center space-y-12">
              <span className="text-secondary font-bold uppercase tracking-[0.4em] text-xs">{t.football_pages.rythme_champions}</span>
              <h2 className="text-5xl md:text-8xl font-headline font-bold uppercase tracking-tighter leading-none">{t.football_pages.weekly_title}</h2>
              <p className="text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto font-light">{t.football_pages.weekly_intro}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-12">
                <div className="p-10 bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10">
                  <h4 className="text-xl font-bold text-secondary uppercase mb-4">{t.football_pages.mon_ven}</h4>
                  <p className="text-white/70">{t.football_pages.mon_ven_desc}</p>
                </div>
                <div className="p-10 bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10">
                  <h4 className="text-xl font-bold text-secondary uppercase mb-4">{t.football_pages.weekend}</h4>
                  <p className="text-white/70">{t.football_pages.weekend_desc}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
