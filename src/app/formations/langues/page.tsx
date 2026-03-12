
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Languages, Globe, MessageSquare } from 'lucide-react';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useTranslation } from '@/hooks/use-translation';

export default function LanguesPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);

  const heroImage = settings?.images?.langues_hero || "https://picsum.photos/seed/languages-excellence/1920/1080";

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[60vh] flex items-center justify-center bg-black overflow-hidden">
          <Image 
            src={heroImage}
            alt="Langues Étrangères"
            fill
            className="object-cover opacity-40"
            priority
            data-ai-hint="world map concept"
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {t.formations.languages_excellence_title}
              </h1>
              <p className="text-xl md:text-2xl text-white/80">{t.formations.languages_excellence_sub}</p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-headline font-bold text-primary mb-6">{t.formations.passport_world_title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.formations.passport_world_desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ScrollReveal className="bg-muted/30 p-10 rounded-3xl border border-border">
                <Globe className="text-secondary mb-6" size={48} />
                <h3 className="text-2xl font-bold text-primary mb-4">{t.formations.efl_title}</h3>
                <p className="text-muted-foreground">{t.formations.efl_desc}</p>
              </ScrollReveal>
              <ScrollReveal delay={200} className="bg-muted/30 p-10 rounded-3xl border border-border">
                <MessageSquare className="text-secondary mb-6" size={48} />
                <h3 className="text-2xl font-bold text-primary mb-4">{t.formations.cert_int_title}</h3>
                <p className="text-muted-foreground">{t.formations.cert_int_desc}</p>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
