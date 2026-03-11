
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';

export default function SportEtudesPage() {
  const { t } = useTranslation();

  const ChevronArrow = () => (
    <div className="w-12 h-12 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-8 h-8 fill-black">
        <path d="M20,10 L80,50 L20,90 Z" />
      </svg>
    </div>
  );

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white relative overflow-hidden">
        {/* Background Faded Image */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <Image 
            src="https://picsum.photos/seed/athlete-faded/1920/1080"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          
          {/* Section 1: Qu'est-ce que le sport-études ? */}
          <section className="mb-32">
            <ScrollReveal className="flex items-center gap-4 mb-16">
              <ChevronArrow />
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-black tracking-tight uppercase">
                {t.sport_etudes_page.title1}
              </h1>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
              {/* Labels Side */}
              <div className="lg:col-span-4 space-y-8">
                <ScrollReveal delay={100}>
                  <div className="bg-[#7fb3e0] p-6 md:p-8 rounded-xl shadow-[5px_5px_15px_rgba(0,0,0,0.2)] text-center transform hover:scale-105 transition-transform border border-white/20">
                    <span className="text-xl md:text-2xl font-headline font-bold text-black leading-tight block">
                      {t.sport_etudes_page.label1_1}
                    </span>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <div className="bg-[#7fb3e0] p-6 md:p-8 rounded-xl shadow-[5px_5px_15px_rgba(0,0,0,0.2)] text-center transform hover:scale-105 transition-transform border border-white/20">
                    <span className="text-xl md:text-2xl font-headline font-bold text-black leading-tight block">
                      {t.sport_etudes_page.label1_2}
                    </span>
                  </div>
                </ScrollReveal>
              </div>

              {/* Text Side */}
              <div className="lg:col-span-8">
                <ScrollReveal delay={300}>
                  <p className="text-lg md:text-xl text-black/80 leading-relaxed font-serif italic text-justify md:text-left">
                    {t.sport_etudes_page.text1}
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Section 2: Quels sont les sports disponibles ? */}
          <section>
            <ScrollReveal className="flex items-center gap-4 mb-16">
              <ChevronArrow />
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-black tracking-tight uppercase">
                {t.sport_etudes_page.title2}
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
              {/* Labels Side */}
              <div className="lg:col-span-4 space-y-8">
                <ScrollReveal delay={100}>
                  <div className="bg-[#f0f0f0] p-6 md:p-8 rounded-xl shadow-[5px_5px_15px_rgba(0,0,0,0.1)] text-center border border-black/5">
                    <span className="text-2xl md:text-3xl font-headline font-bold text-black underline underline-offset-8">
                      {t.sport_etudes_page.label2_1}
                    </span>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <div className="bg-[#f0f0f0] p-6 md:p-8 rounded-xl shadow-[5px_5px_15px_rgba(0,0,0,0.1)] text-center border border-black/5 opacity-80">
                    <span className="text-xl md:text-2xl font-headline font-bold text-black block mb-1">
                      {t.sport_etudes_page.label2_2}
                    </span>
                    <span className="text-sm font-bold italic text-black/60 block">
                      {t.sport_etudes_page.label2_2_sub}
                    </span>
                  </div>
                </ScrollReveal>
              </div>

              {/* Text Side */}
              <div className="lg:col-span-8">
                <ScrollReveal delay={300}>
                  <p className="text-lg md:text-xl text-black/80 leading-relaxed font-serif italic text-justify md:text-left">
                    {t.sport_etudes_page.text2}
                  </p>
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
