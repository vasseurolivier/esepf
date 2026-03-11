
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import Image from 'next/image';

const CLUBS = [
  { name: 'Olympique Lyonnais', hint: 'lyon football logo' },
  { name: 'AS Monaco', hint: 'monaco football logo' },
  { name: 'Olympique de Marseille', hint: 'marseille football logo' },
  { name: 'RC Lens', hint: 'lens football logo' },
  { name: 'Paris Saint-Germain', hint: 'psg football logo' },
  { name: 'OGC Nice', hint: 'nice football logo' },
  { name: 'FC Barcelona', hint: 'barcelona football logo' },
  { name: 'VfL Wolfsburg', hint: 'wolfsburg football logo' },
  { name: 'AS Saint-Etienne', hint: 'saint etienne football logo' },
  { name: 'Amiens SC', hint: 'amiens football logo' },
  { name: 'Le Mans FC', hint: 'le mans football logo' },
  { name: 'Paris FC', hint: 'paris fc football logo' },
  { name: 'Borussia Dortmund', hint: 'dortmund football logo' },
  { name: 'Arsenal', hint: 'arsenal football logo' },
  { name: 'Bayern Munich', hint: 'bayern football logo' },
  { name: 'Inter Milan', hint: 'inter milan football logo' },
  { name: 'FC Zurich', hint: 'zurich football logo' },
  { name: 'Real Madrid', hint: 'real madrid football logo' },
];

export default function ReseauClubsPage() {
  const { t } = useTranslation();

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* Header Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal className="space-y-12">
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-black tracking-tight leading-tight">
                {t.reseau_page.title}
              </h1>
              
              <div className="space-y-8 text-xl text-black/80 leading-relaxed font-body">
                <p>
                  {t.reseau_page.p1}
                </p>
              </div>

              <h2 className="text-2xl md:text-3xl font-headline font-bold text-black italic">
                {t.reseau_page.subtitle}
              </h2>
            </ScrollReveal>
          </div>
        </section>

        {/* Logos Grid Section */}
        <section className="pb-32">
          <div className="container mx-auto px-4">
            <ScrollReveal delay={200} className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center">
                {CLUBS.map((club, idx) => (
                  <div key={idx} className="relative w-24 h-24 md:w-32 md:h-32 transition-transform duration-300 hover:scale-110">
                    <Image 
                      src={`https://picsum.photos/seed/club-logo-${idx}/200/200`} 
                      alt={club.name}
                      fill
                      className="object-contain grayscale hover:grayscale-0 transition-all duration-500"
                      data-ai-hint={club.hint}
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
