
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Languages, Globe, CheckCircle2, Heart, Users, Compass, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function IntegrationPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings, isLoading } = useDoc(settingsRef);

  const heroImage = isLoading ? null : settings?.images?.integration_hero;
  const introImage = isLoading ? null : settings?.images?.integration_intro;

  if (!t || !t.formations) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[60vh] flex items-center justify-center bg-black overflow-hidden">
          {heroImage ? (
            <Image 
              src={heroImage}
              alt="Integration"
              fill
              className="object-cover opacity-40"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-black" />
          )}
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {t.formations.integration_title}
              </h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto border-t border-white/30 pt-4 uppercase tracking-widest font-light">
                {t.formations.integration_sub}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <ScrollReveal>
                <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest mb-4">
                  <Languages size={20} />
                  {t.axes.fle_link} / {t.axes.efl_link}
                </div>
                <h2 className="text-4xl font-headline font-bold text-primary mb-6">{t.axes.languages_title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {t.axes.languages_desc}
                </p>
                <div className="space-y-4 mb-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3 text-primary font-medium p-3 bg-muted rounded-xl border-l-4 border-secondary">
                      <CheckCircle2 size={18} className="text-secondary" />
                      <span>{t.common.excellence} - {t.formations.integration_step} {i}</span>
                    </div>
                  ))}
                </div>
                <Button className="bg-primary text-white font-bold py-6 px-10 rounded-full shadow-lg hover:bg-primary/90">
                  {t.common.readMore}
                </Button>
              </ScrollReveal>
              
              <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white bg-black">
                {introImage && (
                  <Image 
                    src={introImage} 
                    alt="Classroom" 
                    fill 
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: <Heart size={40} />, title: t.formations.integration_care, desc: t.axes.scolarite_desc },
                { icon: <Users size={40} />, title: t.formations.integration_immersion, desc: t.axes.languages_desc },
                { icon: <Compass size={40} />, title: t.formations.integration_guidance, desc: t.sections.orientation_desc }
              ].map((card, i) => (
                <ScrollReveal key={i} delay={i * 150} className="bg-white p-10 rounded-[3rem] shadow-xl border border-border/50 text-center">
                  <div className="inline-flex p-5 rounded-3xl bg-primary/5 text-primary mb-6 shadow-inner">{card.icon}</div>
                  <h3 className="text-2xl font-bold text-primary mb-4 uppercase tracking-tighter">{card.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
