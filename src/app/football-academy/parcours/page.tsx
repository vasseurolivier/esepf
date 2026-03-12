
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import Image from 'next/image';
import { GraduationCap, Trophy, Globe, Target, Briefcase, ArrowRight, Star, ChevronDown } from 'lucide-react';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function ParcoursJoueurPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);

  const conceptImage = settings?.images?.journey_player_concept || "https://picsum.photos/seed/player-path/600/600";

  const ChevronArrow = () => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-1 bg-black/10 rounded-full mb-2" />
      <div className="flex flex-col items-center gap-1">
        <ChevronDown className="text-secondary animate-bounce" size={24} />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 [writing-mode:vertical-lr] my-4">
          {t.journey_page.outlets_label}
        </span>
        <ChevronDown className="text-secondary" size={24} />
      </div>
      <div className="w-16 h-1 bg-black/10 rounded-full mt-2" />
    </div>
  );

  const Box = ({ label, color = "bg-[#e08b8b]", icon, className = "" }: { label: string, color?: string, icon?: React.ReactNode, className?: string }) => (
    <div className={`${color} p-6 rounded-[2rem] shadow-[10px_10px_30px_rgba(0,0,0,0.1)] text-center transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl border border-white/20 flex flex-col items-center justify-center min-h-[120px] w-full group ${className}`}>
      {icon && <div className="mb-3 text-black/80 group-hover:scale-110 transition-transform">{icon}</div>}
      <span className="text-base md:text-lg font-headline font-bold text-black leading-tight uppercase tracking-wide">
        {label}
      </span>
    </div>
  );

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white pb-32">
        
        <section className="bg-primary text-white py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal className="text-center max-w-4xl mx-auto">
              <span className="text-secondary font-bold uppercase tracking-[0.4em] text-sm mb-4 block">- {t.journey_page.roadmap_label} -</span>
              <h1 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter uppercase mb-6 leading-none">
                {t.journey_page.title}
              </h1>
              <p className="text-xl text-white/60 font-medium italic">{t.journey_page.roadmap_sub}</p>
            </ScrollReveal>
          </div>
          <div className="absolute -bottom-20 -right-20 opacity-5 rotate-12">
            <Trophy size={500} />
          </div>
        </section>

        <div className="container mx-auto px-4 pt-20">
          
          <section className="mb-40">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl font-headline font-bold text-primary uppercase tracking-widest mb-4">{t.journey_page.fundamental_concept}</h2>
              <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
            </ScrollReveal>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl mx-auto">
              <ScrollReveal className="flex flex-col items-center text-center w-full lg:w-1/4">
                <div className="relative w-48 h-48 mb-6 rounded-3xl overflow-hidden border-4 border-muted shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 bg-black">
                  <Image 
                    src={conceptImage} 
                    alt="Student Athlete" 
                    fill 
                    className="object-cover"
                    data-ai-hint="football player student"
                  />
                </div>
                <div className="bg-primary text-white px-6 py-3 rounded-full shadow-lg">
                  <p className="font-headline font-bold text-sm uppercase tracking-widest">
                    {t.journey_page.formation_title}
                  </p>
                </div>
              </ScrollReveal>

              <div className="text-6xl font-bold text-primary/20 hidden lg:block">=</div>

              <div className="flex flex-col md:flex-row items-center gap-8 w-full lg:w-2/3">
                <ScrollReveal delay={100} className="w-full">
                  <Box 
                    label={t.journey_page.sport_label} 
                    color="bg-[#e08b8b]" 
                    icon={<Trophy size={40} />}
                  />
                </ScrollReveal>

                <div className="text-4xl font-bold text-primary/20">+</div>

                <ScrollReveal delay={200} className="w-full">
                  <Box 
                    label={t.journey_page.school_label} 
                    color="bg-[#7fb3e0]" 
                    icon={<GraduationCap size={48} />}
                  />
                </ScrollReveal>
              </div>
            </div>
          </section>

          <section className="relative">
            <ScrollReveal className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-black uppercase tracking-tighter">
                {t.journey_page.horizon_title}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">{t.journey_page.horizon_sub}</p>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
              
              <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-around h-full py-20 opacity-50">
                <ChevronArrow />
                <ChevronArrow />
              </div>

              <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                
                <ScrollReveal className="space-y-8 flex flex-col items-center">
                  <div className="bg-primary/5 p-8 rounded-[3rem] w-full text-center border border-muted mb-4 group hover:bg-primary transition-colors duration-500">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                      <Star className="text-secondary" size={32} />
                    </div>
                    <h3 className="text-2xl font-headline font-bold text-primary group-hover:text-white uppercase tracking-tight">{t.journey_page.athlete_title}</h3>
                  </div>
                  <Box label={t.journey_page.world} color="bg-[#e08b8b]" icon={<Globe size={24} />} />
                  <Box label={t.journey_page.china} color="bg-[#e08b8b]" icon={<Target size={24} />} />
                </ScrollReveal>

                <ScrollReveal delay={100} className="space-y-8 flex flex-col items-center">
                  <div className="bg-primary/5 p-8 rounded-[3rem] w-full text-center border border-muted mb-4 group hover:bg-secondary transition-colors duration-500">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-6 group-hover:-rotate-12 transition-transform">
                      <Briefcase className="text-primary" size={32} />
                    </div>
                    <h3 className="text-2xl font-headline font-bold text-primary group-hover:text-white uppercase tracking-tight">{t.journey_page.sport_jobs_title}</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4 w-full">
                    <Box label={t.journey_page.video_analyst} color="bg-[#e08b8b]" />
                    <Box label={t.journey_page.fifa_agent} color="bg-[#e08b8b]" />
                    <Box label={t.journey_page.referee} color="bg-[#e08b8b]" />
                    <Box label={t.journey_page.coach} color="bg-[#e08b8b]" />
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={200} className="space-y-8 flex flex-col items-center">
                  <div className="bg-primary/5 p-8 rounded-[3rem] w-full text-center border border-muted mb-4 group hover:bg-primary transition-colors duration-500">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <GraduationCap className="text-secondary" size={32} />
                    </div>
                    <h3 className="text-2xl font-headline font-bold text-primary group-hover:text-white uppercase tracking-tight">{t.journey_page.higher_ed_title}</h3>
                  </div>
                  <Box label={t.journey_page.bts} color="bg-[#7fb3e0]" />
                  <Box label={t.journey_page.licence_master} color="bg-[#7fb3e0]" />
                </ScrollReveal>

              </div>
            </div>
          </section>

          <section className="mt-40 text-center">
            <ScrollReveal className="bg-muted/30 p-12 rounded-[4rem] border-2 border-dashed border-primary/10 max-w-4xl mx-auto">
              <h3 className="text-2xl font-headline font-bold text-primary mb-6">{t.journey_page.ready_build_future}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                {t.journey_page.interview_desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-white font-bold py-5 px-10 rounded-full shadow-xl hover:bg-primary/90 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                  {t.journey_page.ask_interview} <ArrowRight size={16} />
                </button>
              </div>
            </ScrollReveal>
          </section>

        </div>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
