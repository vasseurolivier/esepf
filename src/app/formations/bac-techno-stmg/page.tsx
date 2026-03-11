
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { Briefcase, BarChart3, Database, Network, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BacStmgPage() {
  const { t } = useTranslation();

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/bac-stmg/1920/1080"
            alt="Bac Techno STMG"
            fill
            className="object-cover opacity-40"
            data-ai-hint="business office digital"
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

        {/* Intro Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
              </ScrollReveal>
              <ScrollReveal delay={200} className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-muted">
                <Image 
                  src="https://picsum.photos/seed/management-1/800/600"
                  alt="Management team"
                  fill
                  className="object-cover"
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-24 bg-white border-y border-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Program */}
              <ScrollReveal className="bg-muted/20 p-10 rounded-[2.5rem] border border-muted transition-all hover:bg-white hover:shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-secondary text-white flex items-center justify-center mb-6">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4 uppercase tracking-tighter">
                  {t.lycee_page.bac_stmg.prog_title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.lycee_page.bac_stmg.prog_desc}
                </p>
              </ScrollReveal>

              {/* Outlets */}
              <ScrollReveal delay={100} className="bg-muted/20 p-10 rounded-[2.5rem] border border-muted transition-all hover:bg-white hover:shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mb-6">
                  <Network size={24} />
                </div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4 uppercase tracking-tighter">
                  {t.lycee_page.bac_stmg.outlets_title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.lycee_page.bac_stmg.outlets_desc}
                </p>
              </ScrollReveal>

              {/* Jobs */}
              <ScrollReveal delay={200} className="bg-muted/20 p-10 rounded-[2.5rem] border border-muted transition-all hover:bg-white hover:shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-6">
                  <Database size={24} />
                </div>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4 uppercase tracking-tighter">
                  {t.lycee_page.bac_stmg.jobs_title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.lycee_page.bac_stmg.jobs_desc}
                </p>
              </ScrollReveal>
            </div>
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
