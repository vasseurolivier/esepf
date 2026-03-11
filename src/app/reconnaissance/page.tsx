
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore } from '@/firebase';

export default function RecognitionPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { data: settings } = useDoc(db, 'settings/global');

  const schoolName = settings?.schoolName || "ESEPF";

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Section En-tête (Style Assemblée Nationale) */}
        <section className="flex flex-col lg:flex-row min-h-[500px]">
          {/* Gauche: Grande image institutionnelle */}
          <div className="lg:w-1/2 relative min-h-[400px]">
            <Image 
              src="https://picsum.photos/seed/institution-building/1200/800"
              alt="Institution Building"
              fill
              className="object-cover"
              data-ai-hint="classical building"
              priority
            />
          </div>

          {/* Droite: Texte de reconnaissance */}
          <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center bg-white">
            <ScrollReveal className="max-w-xl space-y-6">
              <h1 className="text-5xl font-headline font-bold text-black tracking-tight uppercase">
                {t.recognition_page.hero_title}
              </h1>
              <h2 className="text-2xl font-headline font-bold text-black leading-tight">
                {t.recognition_page.hero_subtitle}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.recognition_page.hero_text}
              </p>

              {/* Logos officiels factices */}
              <div className="flex flex-wrap items-center gap-12 pt-8">
                <div className="flex flex-col items-center max-w-[120px]">
                  <div className="relative w-16 h-16 mb-2 border border-muted p-1">
                     <Image src="https://picsum.photos/seed/mne-logo/100/100" alt="MNE" width={100} height={100} className="grayscale" />
                  </div>
                  <span className="text-[8px] font-bold text-center uppercase leading-tight">MINISTÈRE DE L'ÉDUCATION NATIONALE</span>
                </div>
                <div className="flex flex-col items-center max-w-[120px]">
                   <div className="relative w-16 h-16 mb-2 border border-muted p-1">
                      <Image src="https://picsum.photos/seed/nantes-logo/100/100" alt="Nantes" width={100} height={100} className="grayscale" />
                   </div>
                   <span className="text-[8px] font-bold text-center uppercase leading-tight">ACADÉMIE DE NANTES</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Section Diplôme national français */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-headline font-bold text-black relative inline-block">
                  {t.recognition_page.diploma_title}
                  <div className="w-12 h-1 bg-black mt-2" />
                </h2>
              </div>

              <div className="space-y-8 text-xl text-muted-foreground leading-relaxed">
                <p>
                  {t.recognition_page.diploma_text_1}
                </p>
                <p>
                  {t.recognition_page.diploma_text_2}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Section Footer Diplôme (Beige) */}
        <section className="py-20 bg-[#f5f1e8]">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal>
              <h2 className="text-5xl md:text-6xl font-headline font-bold text-black tracking-tight relative inline-block">
                {t.recognition_page.bottom_title}
                <div className="w-12 h-1 bg-black mx-auto mt-4" />
              </h2>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
