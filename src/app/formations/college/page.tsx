
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore } from '@/firebase';

export default function CollegePage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { data: settings } = useDoc(db, 'settings/global');

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-[#fdfaf5]">
        {/* Hero Section avec Grande Photo */}
        <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/college-hero-v3/1920/1080"
            alt="Collège ESEPF"
            fill
            className="object-cover opacity-50"
            data-ai-hint="modern school hallway"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {t.college_page.title}
              </h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal className="space-y-12">
              {/* Paragraphes d'introduction */}
              <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
                <p className="font-bold text-black">{t.college_page.p1}</p>
                <p>{t.college_page.p2}</p>
                <p>{t.college_page.p3}</p>
              </div>

              {/* Blocs pédagogiques */}
              <div className="space-y-8 text-xl text-muted-foreground leading-relaxed">
                <p>{t.college_page.p4}</p>
                <p>{t.college_page.p5}</p>
                <p>{t.college_page.p6}</p>
              </div>

              {/* Programme détaillé */}
              <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-muted mt-20">
                <h2 className="text-3xl font-headline font-bold text-primary mb-10">
                  {t.college_page.prog_title}
                </h2>
                
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-black border-l-4 border-secondary pl-4">
                      {t.college_page.year1_title}
                    </h3>
                    <p className="text-lg leading-relaxed">
                      {t.college_page.year1_desc}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-black border-l-4 border-secondary pl-4">
                      {t.college_page.year2_title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-black border-l-4 border-secondary pl-4">
                      {t.college_page.year3_title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Conclusion / Suite du parcours */}
              <div className="pt-12 text-xl text-muted-foreground leading-relaxed italic">
                <p>{t.college_page.conclusion}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
