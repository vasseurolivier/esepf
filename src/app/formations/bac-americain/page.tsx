
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Star, ShieldCheck } from 'lucide-react';
import { useDoc, useFirestore, useMemoFirebase, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useTranslation } from '@/hooks/use-translation';

export default function BacAmericainPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings } = useDoc(settingsRef);
  
  const settings = clientSettings || serverSettings;

  const heroImage = settings?.images?.bac_americain_hero;

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[60vh] flex items-center justify-center bg-black overflow-hidden">
          {heroImage && (
            <img 
              src={heroImage}
              alt="Baccalauréat Américain"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          )}
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {t.formations.bac_americain_title}
              </h1>
              <p className="text-xl md:text-2xl text-white/80">{t.formations.bac_americain_sub}</p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal className="bg-primary text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden mb-16">
              <div className="relative z-10">
                <h2 className="text-4xl font-headline font-bold mb-8">{t.formations.high_school_diploma}</h2>
                <p className="text-xl text-white/70 mb-8 leading-relaxed">
                  {t.formations.high_school_desc}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <Star className="text-secondary" />
                    <span>{t.formations.dual_diploma_official}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <ShieldCheck className="text-secondary" />
                    <span>{t.formations.international_recognition}</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-10"><Star size={300} /></div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ScrollReveal>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4">{t.formations.why_choose_title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.formations.why_choose_desc}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4">{t.formations.modalities_title}</h3>
                <ul className="space-y-3">
                  {t.formations.modalities_list.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
