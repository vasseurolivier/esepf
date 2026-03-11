
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { Briefcase, Clock, MapPin, Award, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FrenchSystemSchema } from '@/components/sections/FrenchSystemSchema';
import { OutletsSection } from '@/components/sections/OutletsSection';

export default function BacStmgPage() {
  const { t } = useTranslation();

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[65vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/stmg-hero-pro/1920/1080"
            alt="Bac Techno STMG"
            fill
            className="object-cover opacity-40"
            data-ai-hint="business digital management team"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {t.lycee_page.bac_stmg.title}
              </h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto uppercase tracking-widest font-light">
                {t.lycee_page.bac_stmg.subtitle}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Quick Info Bar */}
        <section className="bg-primary py-6 text-white border-y border-white/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex items-center gap-3">
                <Clock className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.duration}</p>
                  <p className="font-bold text-sm">{t.lycee_page.bac_stmg.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.level}</p>
                  <p className="font-bold text-sm">{t.lycee_page.bac_stmg.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.campus_label}</p>
                  <p className="font-bold text-sm">{t.lycee_page.bac_stmg.campuses}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.diploma}</p>
                  <p className="font-bold text-sm">Baccalauréat Technologique</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <ScrollReveal className="space-y-6">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                  <Briefcase size={32} />
                </div>
                <h2 className="text-4xl font-headline font-bold text-black tracking-tight">
                  Demain, le Management
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t.lycee_page.bac_stmg.desc}
                </p>
                <div className="p-4 bg-muted/50 rounded-xl border-l-4 border-secondary flex gap-3">
                  <Info className="text-secondary shrink-0" size={20} />
                  <p className="text-sm font-bold text-primary">{t.common.allophone_mention}</p>
                </div>
                <p className="text-muted-foreground leading-relaxed pt-4">
                  {t.lycee_page.bac_stmg.program_details}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={200} className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-muted">
                <Image 
                  src="https://picsum.photos/seed/stmg-team/800/600"
                  alt="Management team working"
                  fill
                  className="object-cover"
                />
              </ScrollReveal>
            </div>

            {/* French System Schema */}
            <ScrollReveal className="text-center mb-12">
              <h2 className="text-3xl font-headline font-bold text-primary mb-2 uppercase tracking-widest">Votre avenir de manager</h2>
              <p className="text-muted-foreground">Une filière technologique pour des carrières ambitieuses</p>
            </ScrollReveal>
            <FrenchSystemSchema bacType="Baccalauréat Technologique STMG" />
          </div>
        </section>

        {/* Detailed Outlets Section */}
        <section className="py-24 bg-muted/10 border-y border-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <OutletsSection 
              btsDesc={t.lycee_page.bac_stmg.bts_desc}
              univDesc={t.lycee_page.bac_stmg.univ_desc}
              btsList={t.lycee_page.bac_stmg.bts_list}
              btsJobs={t.lycee_page.bac_stmg.bts_jobs}
              univList={t.lycee_page.bac_stmg.univ_list}
              univJobs={t.lycee_page.bac_stmg.univ_jobs}
            />
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
