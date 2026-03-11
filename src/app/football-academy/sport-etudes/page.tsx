"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function SportEtudesPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);

  const bgImage = settings?.images?.sport_etudes_bg || "https://picsum.photos/seed/athlete-faded/1920/1080";

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
          <Image src={bgImage} alt="Background" fill className="object-cover" />
        </div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <section className="mb-32">
            <ScrollReveal className="flex items-center gap-4 mb-16">
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-black tracking-tight uppercase">
                {t.sport_etudes_page.title1}
              </h1>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-4 space-y-8">
                <ScrollReveal delay={100}>
                  <div className="bg-[#7fb3e0] p-6 md:p-8 rounded-xl shadow-lg text-center border border-white/20">
                    <span className="text-xl md:text-2xl font-headline font-bold text-black leading-tight block">{t.sport_etudes_page.label1_1}</span>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <div className="bg-[#7fb3e0] p-6 md:p-8 rounded-xl shadow-lg text-center border border-white/20">
                    <span className="text-xl md:text-2xl font-headline font-bold text-black leading-tight block">{t.sport_etudes_page.label1_2}</span>
                  </div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-8">
                <ScrollReveal delay={300}>
                  <p className="text-lg md:text-xl text-black/80 leading-relaxed font-serif italic">{t.sport_etudes_page.text1}</p>
                </ScrollReveal>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
