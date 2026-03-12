
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
import { Globe } from 'lucide-react';

export default function HistoryPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings, isLoading } = useDoc(settingsRef);
  
  const schoolName = settings?.schoolName || "ESEPF";
  const mainImage = isLoading ? null : (settings?.images?.history_main || "https://picsum.photos/seed/students-map/800/1000");

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal className="space-y-8">
                <div className="mb-12">
                   <h1 className="text-5xl font-headline font-bold text-black tracking-tighter uppercase">{t.history_page.title}</h1>
                   <p className="text-secondary font-bold tracking-widest text-xs uppercase">{schoolName}</p>
                </div>

                <h2 className="text-4xl font-headline font-bold text-black leading-tight">
                  {t.history_page.subtitle}
                </h2>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>{t.history_page.intro_p1}</p>
                  <p>{t.history_page.intro_p2}</p>
                  <p className="pt-4 p-6 bg-white rounded-2xl shadow-sm border border-muted italic">
                    <span className="text-secondary font-bold block mb-2">{t.history_page.mission_label}</span> {t.history_page.intro_p3}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-black shadow-2xl">
                {mainImage && (
                  <Image 
                    src={mainImage}
                    alt="Students"
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint="students group history"
                  />
                )}
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-32 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-5 -translate-y-1/4 translate-x-1/4">
            <Globe size={600} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-headline font-bold mb-12 italic">
                "{t.history_page.quote}"
              </h2>
              <div className="flex flex-col items-center">
                <div className="w-16 h-1 bg-secondary rounded-full mb-6" />
                <p className="text-lg uppercase tracking-[0.3em] font-medium opacity-60">{t.history_page.direction_label}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
