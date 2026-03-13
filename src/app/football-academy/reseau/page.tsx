
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import Image from 'next/image';
import { useDoc, useFirestore, useMemoFirebase, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

const CLUBS_COUNT = 6;

export default function ReseauClubsPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings } = useDoc(settingsRef);
  
  const settings = clientSettings || serverSettings;

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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-12 items-center justify-items-center">
                {Array.from({ length: CLUBS_COUNT }).map((_, idx) => {
                  const customLogo = settings?.images?.[`club_logo_${idx}`];
                  
                  return (
                    <div key={idx} className="relative w-32 h-32 md:w-48 md:h-48 transition-transform duration-300 hover:scale-110 bg-white rounded-xl p-4 overflow-hidden border border-muted shadow-sm">
                      {customLogo ? (
                        <Image 
                          src={customLogo} 
                          alt={`Club Partner ${idx + 1}`}
                          fill
                          className="object-contain transition-all duration-500 p-4"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted/10" />
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
