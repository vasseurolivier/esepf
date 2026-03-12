
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import Image from 'next/image';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

const CLUBS_COUNT = 18;

export default function ReseauClubsPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings, isLoading } = useDoc(settingsRef);

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
                {Array.from({ length: CLUBS_COUNT }).map((_, idx) => {
                  const customLogo = isLoading ? null : settings?.images?.[`club_logo_${idx}`];
                  
                  return (
                    <div key={idx} className="relative w-24 h-24 md:w-32 md:h-32 transition-transform duration-300 hover:scale-110 bg-black rounded-xl p-2 overflow-hidden">
                      {customLogo && (
                        <Image 
                          src={customLogo} 
                          alt={`Club Partner ${idx + 1}`}
                          fill
                          className="object-contain grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
