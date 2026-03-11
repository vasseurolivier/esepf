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
import { GraduationCap } from 'lucide-react';

export default function HistoryPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);
  
  const schoolName = settings?.schoolName || "ESEPF";
  const logoUrl = settings?.logoUrl;
  const mainImage = settings?.images?.history_main || "https://picsum.photos/seed/students-map/800/1000";

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <ScrollReveal className="space-y-8">
                <div className="flex items-center gap-6 mb-12">
                   <div className="w-24 h-24 relative">
                     {logoUrl ? (
                        <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                     ) : (
                        <div className="w-full h-full border-2 border-primary rounded-full flex items-center justify-center">
                          <GraduationCap className="text-primary w-12 h-12" />
                        </div>
                     )}
                   </div>
                   <h2 className="text-5xl font-headline font-bold text-black tracking-tighter">{schoolName}</h2>
                </div>

                <h3 className="text-4xl font-headline font-bold text-black leading-tight">
                  {t.history_page.subtitle}
                </h3>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>{t.history_page.intro_p1}</p>
                  <p>{t.history_page.intro_p2}</p>
                  <p className="pt-4">
                    <span className="text-secondary font-bold">Notre mission ?</span> {t.history_page.intro_p3}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl lg:translate-y-12 bg-muted">
                <Image 
                  src={mainImage}
                  alt="Students"
                  fill
                  className="object-cover"
                  data-ai-hint="students group"
                  priority
                />
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
