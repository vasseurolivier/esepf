"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { ShieldCheck, GraduationCap } from 'lucide-react';

export default function TeamPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Section Le Projet (Split Layout based on reference image) */}
        <section className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side: Green with Title and Crest */}
          <div className="lg:w-[45%] bg-[#1a3d2f] p-12 lg:p-24 flex flex-col justify-center items-start relative overflow-hidden">
            <ScrollReveal className="relative z-10 w-full">
              <h1 className="text-6xl md:text-8xl font-headline font-bold text-white mb-12 tracking-tighter uppercase">
                {t.team_page.title}
              </h1>
              
              <div className="w-full flex justify-center lg:justify-start">
                <div className="relative w-64 h-64 opacity-60">
                  <svg viewBox="0 0 200 200" className="w-full h-full fill-white">
                    <path d="M100 20C70 20 40 40 40 80C40 130 100 180 100 180C100 180 160 130 160 80C160 40 130 20 100 20ZM100 140C80 140 60 120 60 100C60 80 80 60 100 60C120 60 140 80 140 100C140 120 120 140 100 140Z" />
                    <circle cx="100" cy="100" r="25" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap size={60} className="text-[#1a3d2f] mb-4" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            {/* Subtle gradient overlay to mimic image fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 pointer-events-none" />
          </div>

          {/* Right Side: Text Content */}
          <div className="lg:w-[55%] p-12 lg:p-24 flex flex-col justify-center">
            <ScrollReveal className="max-w-2xl space-y-8">
              <h2 className="text-3xl font-headline font-bold text-black leading-tight">
                {t.team_page.subtitle}
              </h2>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>{t.team_page.p1}</p>
                <p>{t.team_page.p2}</p>
                <p>{t.team_page.p3}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Section L'EQUIPE (Centered Title with underline) */}
        <section className="py-24 bg-white border-t border-muted">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-headline font-bold text-black tracking-tighter uppercase inline-block relative">
                {t.team_page.team_title}
                <div className="w-12 h-1 bg-black mx-auto mt-4 rounded-full" />
              </h2>
            </ScrollReveal>

            {/* Team Members Grid (Keeping existing structure but cleaner) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <ScrollReveal key={i} delay={i * 100} className="text-center group">
                  <div className="relative w-56 h-56 mx-auto mb-8 rounded-full overflow-hidden border-4 border-muted group-hover:border-secondary transition-all duration-500 shadow-xl">
                    <Image src={`https://picsum.photos/seed/member-${i}/500/500`} alt="Member" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-black uppercase tracking-tight">Directeur {i}</h3>
                  <p className="text-secondary font-bold text-sm mt-2 uppercase tracking-widest">Responsable Académique</p>
                </ScrollReveal>
              ))}
            </div>
            
            {/* Staff Labels */}
            <div className="mt-32 max-w-4xl mx-auto bg-muted/20 p-12 rounded-[3rem]">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <ScrollReveal>
                    <h3 className="text-3xl font-headline font-bold text-black mb-6">
                       {t.team_page.staff_title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {t.team_page.staff_desc}
                    </p>
                  </ScrollReveal>
                  <div className="grid grid-cols-2 gap-6">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-border flex flex-col items-center justify-center">
                           <ShieldCheck size={32} className="text-secondary mb-3" />
                           <span className="text-[10px] font-bold uppercase text-black tracking-widest text-center">Label Officiel {i}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
