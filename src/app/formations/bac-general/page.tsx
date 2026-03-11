
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { GraduationCap, BookOpen, Globe, Award, MessageSquare, Clock, MapPin, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FrenchSystemSchema } from '@/components/sections/FrenchSystemSchema';

export default function BacGeneralPage() {
  const { t } = useTranslation();

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[65vh] flex items-center justify-center bg-[#0a192f] overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/bac-gen-hero/1920/1080"
            alt="Bac Général"
            fill
            className="object-cover opacity-40"
            data-ai-hint="prestigious library university"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {t.lycee_page.bac_gen.title}
              </h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto uppercase tracking-widest font-light">
                {t.lycee_page.bac_gen.subtitle}
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
                  <p className="font-bold text-sm">{t.lycee_page.bac_gen.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.level}</p>
                  <p className="font-bold text-sm">{t.lycee_page.bac_gen.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.campus_label}</p>
                  <p className="font-bold text-sm">{t.lycee_page.bac_gen.campuses}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.diploma}</p>
                  <p className="font-bold text-sm">Baccalauréat Général</p>
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
                  <GraduationCap size={32} />
                </div>
                <h2 className="text-4xl font-headline font-bold text-black tracking-tight">
                  L'Excellence Académique
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t.lycee_page.bac_gen.desc}
                </p>
                <div className="p-4 bg-muted/50 rounded-xl border-l-4 border-secondary flex gap-3">
                  <Info className="text-secondary shrink-0" size={20} />
                  <p className="text-sm font-bold text-primary">{t.common.allophone_mention}</p>
                </div>
                <div className="space-y-4 pt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {t.lycee_page.bac_gen.program_details}
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200} className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-muted/20">
                <Image 
                  src="https://picsum.photos/seed/study-gen/800/600"
                  alt="Students studying"
                  fill
                  className="object-cover"
                />
              </ScrollReveal>
            </div>

            {/* French System Schema */}
            <ScrollReveal className="text-center mb-12">
              <h2 className="text-3xl font-headline font-bold text-primary mb-2">VOTRE PARCOURS DE RÉUSSITE</h2>
              <p className="text-muted-foreground">Découvrez les opportunités après votre Baccalauréat Général à l'ESEPF</p>
            </ScrollReveal>
            <FrenchSystemSchema bacType="Baccalauréat Général" />
          </div>
        </section>

        {/* Details Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Program */}
              <ScrollReveal className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-border/50 h-full">
                <div className="w-12 h-12 rounded-2xl bg-secondary text-white flex items-center justify-center mb-6">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4 uppercase tracking-tighter">
                  {t.lycee_page.bac_gen.prog_title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.lycee_page.bac_gen.prog_desc}
                </p>
              </ScrollReveal>

              {/* Outlets */}
              <ScrollReveal delay={100} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-border/50 h-full">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mb-6">
                  <Award size={24} />
                </div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4 uppercase tracking-tighter">
                  {t.lycee_page.bac_gen.outlets_title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.lycee_page.bac_gen.outlets_desc}
                </p>
              </ScrollReveal>

              {/* Jobs */}
              <ScrollReveal delay={200} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-border/50 h-full">
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center mb-6">
                  <Globe size={24} />
                </div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4 uppercase tracking-tighter">
                  {t.lycee_page.bac_gen.jobs_title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.lycee_page.bac_gen.jobs_desc}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal className="max-w-3xl mx-auto bg-muted rounded-[3rem] p-12 shadow-inner">
               <h2 className="text-3xl font-headline font-bold mb-6">Prêt à nous rejoindre ?</h2>
               <p className="text-muted-foreground mb-8">Les inscriptions pour la rentrée 2026-2027 sont ouvertes sur les campus d'Evron et Sainte-Bazeilles.</p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="rounded-full bg-primary py-8 px-10 font-bold uppercase tracking-widest">{t.common.apply}</Button>
                  <Link href="/projet-equipe"><Button variant="outline" className="rounded-full py-8 px-10 font-bold uppercase tracking-widest">Rencontrer l'équipe</Button></Link>
               </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Floating Contact */}
        <div className="fixed bottom-8 right-8 z-50">
          <Button className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-8 py-8 shadow-2xl transition-all hover:scale-105 flex items-center gap-3">
            <MessageSquare size={24} />
            <span className="uppercase tracking-widest text-sm">{t.common.contact_us}</span>
          </Button>
        </div>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
