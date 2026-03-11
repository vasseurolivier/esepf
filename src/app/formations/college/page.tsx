
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
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal className="space-y-12">
              {/* Titre principal */}
              <div className="border-b-4 border-primary w-fit pb-2 mb-16">
                <h1 className="text-5xl md:text-7xl font-headline font-bold text-black tracking-tight">
                  {t.college_page.title}
                </h1>
              </div>

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
