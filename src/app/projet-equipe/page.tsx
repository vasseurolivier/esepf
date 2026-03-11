
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { Target, Users, ShieldCheck, Briefcase } from 'lucide-react';

export default function TeamPage() {
  const { t } = useTranslation();

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[50vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/team-hero/1920/1080"
            alt="Team"
            fill
            className="object-cover opacity-40"
            data-ai-hint="team business professional"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 uppercase tracking-tighter">{t.team_page.title}</h1>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <ScrollReveal>
                <div className="inline-flex p-3 rounded-2xl bg-secondary/10 text-secondary mb-6"><Target size={32} /></div>
                <h2 className="text-4xl font-headline font-bold text-primary mb-6">{t.team_page.mission_title}</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t.team_page.mission_desc}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={200} className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <Image src="https://picsum.photos/seed/mission/800/600" alt="Mission" fill className="object-cover" />
              </ScrollReveal>
            </div>

            <ScrollReveal className="text-center mb-16">
              <h2 className="text-4xl font-headline font-bold text-primary mb-4">{t.team_page.team_title}</h2>
              <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full" />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
              {[1, 2, 3].map((i) => (
                <ScrollReveal key={i} delay={i * 100} className="text-center group">
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-muted group-hover:border-secondary transition-colors">
                    <Image src={`https://picsum.photos/seed/member-${i}/400/400`} alt="Member" fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-primary uppercase">Directeur {i}</h3>
                  <p className="text-secondary font-medium text-sm">Responsable Académique</p>
                </ScrollReveal>
              ))}
            </div>

            <div className="bg-muted p-12 rounded-[3rem] shadow-inner">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <ScrollReveal>
                    <h3 className="text-3xl font-headline font-bold text-primary mb-6 flex items-center gap-3">
                       <Briefcase className="text-secondary" />
                       {t.team_page.staff_title}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {t.team_page.staff_desc}
                    </p>
                  </ScrollReveal>
                  <div className="grid grid-cols-2 gap-4">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                           <ShieldCheck size={24} className="mx-auto text-secondary mb-2" />
                           <span className="text-xs font-bold uppercase text-primary">Label {i}</span>
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
