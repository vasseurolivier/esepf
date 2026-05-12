
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore, useMemoFirebase, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MetiersSportPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings } = useDoc(settingsRef);
  
  const settings = clientSettings || serverSettings;

  const metiers = [
    { id: 'metiers_bpjeps', label: t.metiers_page.jobs.bpjeps },
    { id: 'metiers_coach', label: t.metiers_page.jobs.coach },
    { id: 'metiers_agent', label: t.metiers_page.jobs.agent },
    { id: 'metiers_arbitre', label: t.metiers_page.jobs.referee },
    { id: 'metiers_analyste', label: t.metiers_page.jobs.analyst },
  ];

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#a5a6d1] via-[#ffffff] to-[#e08b8b] py-20">
        <div className="container mx-auto px-4">
          
          {/* Header Section */}
          <ScrollReveal className="text-center max-w-5xl mx-auto mb-20">
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-black mb-2 tracking-tighter uppercase leading-none">
              {t.metiers_page.title}
            </h1>
            <p className="text-2xl md:text-4xl font-headline font-bold text-black mb-12 italic opacity-80">
              {t.metiers_page.optional}
            </p>
            
            <div className="text-lg md:text-xl text-black/70 leading-relaxed font-body space-y-6 max-w-4xl mx-auto">
              <p>{t.metiers_page.desc}</p>
            </div>
          </ScrollReveal>

          {/* Subtitle Section */}
          <ScrollReveal delay={200} className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-black uppercase tracking-widest inline-block border-b-2 border-black pb-2">
              {t.metiers_page.subtitle}
            </h2>
          </ScrollReveal>

          {/* Jobs Grid */}
          <div className="max-w-7xl mx-auto mb-24">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
              {metiers.map((job, idx) => {
                const jobImg = settings?.images?.[job.id];
                return (
                  <ScrollReveal key={job.id} delay={idx * 100} className="flex flex-col items-center">
                    <div className="relative w-full aspect-[2/3] rounded-full overflow-hidden border-2 border-black shadow-2xl mb-6 group transition-transform duration-500 hover:scale-105 bg-black">
                      {jobImg && (
                        <img 
                          src={jobImg} 
                          alt={job.label}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-headline font-bold text-black uppercase tracking-tight text-center">
                      {job.label}
                    </h3>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <ScrollReveal delay={600} className="flex justify-center">
            <Link href="/contact">
              <Button className="bg-[#262626] text-white hover:bg-black font-bold py-8 px-16 rounded-none text-lg transition-all shadow-xl uppercase tracking-widest border border-white/10">
                {t.metiers_page.cta}
              </Button>
            </Link>
          </ScrollReveal>

        </div>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
