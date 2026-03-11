
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { History, Calendar, Award, MapPin } from 'lucide-react';

export default function HistoryPage() {
  const { t } = useTranslation();

  const milestones = [
    { year: "1984", desc: t.history_page.milestone_1, icon: <MapPin /> },
    { year: "1998", desc: t.history_page.milestone_2, icon: <History /> },
    { year: "2015", desc: t.history_page.milestone_3, icon: <Award /> },
    { year: "2023", desc: t.history_page.milestone_4, icon: <Calendar /> },
  ];

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/history-hero/1920/1080"
            alt="History"
            fill
            className="object-cover opacity-40"
            data-ai-hint="old school building"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">{t.history_page.title}</h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto border-t border-white/20 pt-4">
                {t.history_page.subtitle}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal className="text-center mb-20">
              <p className="text-2xl text-muted-foreground leading-relaxed italic">
                "{t.history_page.intro}"
              </p>
            </ScrollReveal>

            <div className="relative space-y-16">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-muted -translate-x-1/2" />
              
              {milestones.map((milestone, i) => (
                <ScrollReveal key={i} delay={i * 200} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 text-center md:text-right">
                    {i % 2 === 0 ? (
                      <div>
                        <span className="text-4xl font-headline font-bold text-secondary">{milestone.year}</span>
                        <p className="text-lg text-muted-foreground mt-2">{milestone.desc}</p>
                      </div>
                    ) : null}
                  </div>
                  
                  <div className="relative z-10 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-xl border-4 border-white">
                    {milestone.icon}
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    {i % 2 !== 0 ? (
                      <div>
                        <span className="text-4xl font-headline font-bold text-secondary">{milestone.year}</span>
                        <p className="text-lg text-muted-foreground mt-2">{milestone.desc}</p>
                      </div>
                    ) : null}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
