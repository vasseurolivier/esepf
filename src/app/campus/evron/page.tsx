
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MapPin, School, GraduationCap, Building2, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore } from '@/firebase';

export default function CampusEvronPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { data: settings } = useDoc(db, 'settings/global');
  
  const heroImage = settings?.images?.campus_evron || "https://picsum.photos/seed/evron-hero-v2/1920/1080";

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src={heroImage}
            alt="Campus Evron"
            fill
            className="object-cover opacity-60"
            data-ai-hint="historic school building"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">{t.campus_pages.evron_hero}</h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto border-t border-white/30 pt-4">
                {t.campus_pages.evron_sub}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* City & Map Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest mb-4">
                  <MapPin size={20} />
                  {t.campus_pages.city_title}
                </div>
                <h2 className="text-4xl font-headline font-bold text-primary mb-6">{t.axes.scolarite}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {t.axes.scolarite_desc}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-muted rounded-2xl border border-border">
                    <h4 className="font-bold text-primary mb-2 italic">Mayenne (53)</h4>
                    <p className="text-sm text-muted-foreground">Pays de la Loire, France.</p>
                  </div>
                  <div className="p-6 bg-muted rounded-2xl border border-border">
                    <h4 className="font-bold text-primary mb-2 italic">Football Academy</h4>
                    <p className="text-sm text-muted-foreground">{t.axes.academy_desc.substring(0, 100)}...</p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200} className="relative aspect-square bg-muted/30 rounded-[3rem] overflow-hidden flex items-center justify-center border-2 border-dashed border-primary/10">
                <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-3xl m-8 shadow-inner w-full">
                  <div className="relative w-64 h-80 mx-auto mb-4 bg-white shadow-2xl rounded-lg p-4 flex flex-col items-center border border-muted">
                    <div className="w-full h-full border-2 border-primary/10 rounded flex items-center justify-center relative bg-muted/5">
                      <span className="text-[8px] font-bold text-primary/20 uppercase tracking-[0.4em] absolute top-4">Map</span>
                      <svg viewBox="0 0 100 100" className="w-full h-full opacity-10 fill-primary">
                        <path d="M20,10 L80,10 L90,50 L70,90 L30,90 L10,50 Z" />
                      </svg>
                      <div className="absolute top-[35%] left-[30%] w-6 h-6 bg-secondary/20 rounded-full animate-ping" />
                      <div className="absolute top-[35%] left-[30%] w-4 h-4 bg-secondary rounded-full shadow-lg" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Infrastructures Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6"><Building2 size={32} /></div>
              <h2 className="text-4xl font-headline font-bold text-primary mb-6">{t.campus_pages.infra_title}</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Des installations modernes conçues pour l'épanouissement académique et sportif.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {[1, 2, 3].map((i) => (
                <ScrollReveal key={i} delay={i * 100} className="relative group rounded-[2rem] overflow-hidden shadow-xl bg-white">
                  <div className="relative h-64 w-full">
                    <Image src={`https://picsum.photos/seed/evron-infra-${i}/800/600`} alt="Campus" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Formations Available Section */}
            <div className="bg-primary rounded-[3rem] p-12 text-white shadow-2xl overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-3xl font-headline font-bold mb-12 flex items-center gap-3">
                  <School className="text-secondary" />
                  {t.nav.formations} disponibles sur ce campus
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="mt-1 text-secondary"><BookOpen size={24} /></div>
                    <div>
                      <h4 className="font-bold text-lg">{t.programs.college.title}</h4>
                      <p className="text-sm text-white/60">{t.programs.college.desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="mt-1 text-secondary"><GraduationCap size={24} /></div>
                    <div>
                      <h4 className="font-bold text-lg">{t.programs.lycee.title}</h4>
                      <p className="text-sm text-white/60">Général, STMG, Pro Vente</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="mt-1 text-secondary"><Target size={24} /></div>
                    <div>
                      <h4 className="font-bold text-lg">{t.programs.academy.title}</h4>
                      <p className="text-sm text-white/60">{t.programs.academy.desc}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <Button className="bg-secondary text-white font-bold py-8 px-12 rounded-full shadow-2xl hover:bg-secondary/90 transition-all uppercase tracking-widest text-base">
                    {t.common.register}
                  </Button>
                  <p className="text-xs text-white/40 mt-4 text-center">{t.campus_pages.apply_now}</p>
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
