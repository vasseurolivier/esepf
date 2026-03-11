
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { Award, ShieldCheck, CheckCircle2, Globe } from 'lucide-react';

export default function RecognitionPage() {
  const { t } = useTranslation();

  const accreditations = [
    { title: t.recognition_page.list_1, desc: "Accréditation complète pour tous les niveaux scolaires." },
    { title: t.recognition_page.list_2, desc: "Certification Centre de Formation pour la section football." },
    { title: t.recognition_page.list_3, desc: "Centre d'examen certifié pour les diplômes linguistiques." },
  ];

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[50vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/recognition-hero/1920/1080"
            alt="Recognition"
            fill
            className="object-cover opacity-30"
            data-ai-hint="awards trophy"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 uppercase tracking-tighter">{t.recognition_page.title}</h1>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex p-3 rounded-2xl bg-secondary/10 text-secondary mb-6"><Award size={32} /></div>
              <h2 className="text-4xl font-headline font-bold text-primary mb-6">{t.recognition_page.accred_title}</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t.recognition_page.accred_desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {accreditations.map((accred, i) => (
                <ScrollReveal key={i} delay={i * 100} className="p-8 bg-muted/30 rounded-[2.5rem] border border-border shadow-sm hover:shadow-xl transition-all">
                  <ShieldCheck size={40} className="text-secondary mb-6" />
                  <h3 className="text-xl font-bold text-primary mb-4 uppercase">{accred.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{accred.desc}</p>
                </ScrollReveal>
              ))}
            </div>

            <div className="bg-primary text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-headline font-bold mb-12 text-center">{t.recognition_page.partners_title}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {['Sorbonne', 'HEC Paris', 'FFF', 'Cambridge', 'Ligue 1', 'Harvard', 'Sciences Po', 'Elite Acad'].map((partner, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors">
                       <span className="font-bold text-white/40 uppercase text-xs tracking-widest">{partner}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 right-0 opacity-5 -translate-y-1/2 translate-x-1/2"><Globe size={500} /></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
