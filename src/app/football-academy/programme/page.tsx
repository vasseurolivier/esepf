
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Clock, Target, UserCheck, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export default function ProgrammeFootballPage() {
  const { t } = useTranslation();

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/football-prog-v2/1920/1080"
            alt="Football Program"
            fill
            className="object-cover opacity-40"
            data-ai-hint="soccer training focus"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">{t.football_pages.prog_title}</h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto border-t border-white/20 pt-4">
                {t.football_pages.prog_sub}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <ScrollReveal>
                <h2 className="text-4xl font-headline font-bold text-primary mb-8">{t.academy_features.f1_title}</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {t.football_pages.prog_sub}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { icon: <Clock />, title: "10-12h", text: "Training" },
                    { icon: <Target />, title: "Elite", text: "Focus" },
                    { icon: <Layers />, title: "Tactics", text: "Video" },
                    { icon: <UserCheck />, title: "Staff", text: "UEFA" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-center p-4 bg-muted rounded-2xl border border-border/50">
                      <div className="text-secondary bg-white p-3 rounded-xl shadow-sm">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-primary">{item.title}</h4>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              
              <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image src="https://picsum.photos/seed/training-field/800/1000" alt="Training" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-8">{t.academy_features.cta}</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button className="bg-secondary text-white font-bold py-8 px-12 rounded-full text-xl hover:bg-secondary/90 shadow-2xl transition-all">
                {t.common.apply}
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary py-8 px-12 rounded-full text-xl transition-all">
                {t.common.contact_coach}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
