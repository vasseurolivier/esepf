
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Languages, CheckCircle2, Heart, Users, Compass, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore, useMemoFirebase, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';

export default function IntegrationPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings } = useDoc(settingsRef);
  
  const settings = clientSettings || serverSettings;

  const heroImage = settings?.images?.integration_hero;
  const introImage = settings?.images?.integration_intro;

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
      <main className="min-h-screen bg-white">
        
        {/* Hero Section */}
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

        {/* FLE Section - Detailed Content with model design */}
        <section className="py-0 overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left side: Image */}
            <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full bg-muted/20">
              {introImage ? (
                <Image 
                  src={introImage} 
                  alt="FLE Programme" 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Languages size={120} className="text-primary/10" />
                </div>
              )}
            </div>

            {/* Right side: Text on Light Grey background */}
            <div className="lg:w-1/2 bg-[#E5E7EB] flex flex-col justify-center p-8 md:p-16 lg:p-24">
              <ScrollReveal className="max-w-xl mx-auto lg:mx-0">
                <h2 className="text-4xl md:text-6xl font-headline font-bold text-black mb-2 uppercase text-center lg:text-left">
                  FLE
                </h2>
                <h3 className="text-2xl md:text-4xl font-headline font-bold text-black mb-12 uppercase text-center lg:text-left">
                  (Français Langue Étrangère)
                </h3>
                
                <p className="text-lg md:text-xl text-black/80 leading-relaxed font-body text-center lg:text-left">
                  {t.formations.integration_full_desc}
                </p>

                <div className="mt-12 flex justify-center lg:justify-start">
                  <Link href="/inscription">
                    <Button className="bg-primary text-white font-bold py-6 px-10 rounded-full shadow-lg hover:bg-primary/90 transition-all uppercase tracking-widest text-xs">
                      {t.common.apply}
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Key Values Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: <Heart size={40} />, title: t.formations.integration_care, desc: t.axes.scolarite_desc.substring(0, 150) + "..." },
                { icon: <Users size={40} />, title: t.formations.integration_immersion, desc: t.axes.languages_desc.substring(0, 150) + "..." },
                { icon: <Compass size={40} />, title: t.formations.integration_guidance, desc: t.formations.cert_int_desc }
              ].map((card, i) => (
                <ScrollReveal key={i} delay={i * 150} className="bg-muted/30 p-10 rounded-[3rem] shadow-sm border border-border/50 text-center group hover:bg-primary hover:text-white transition-all duration-500">
                  <div className="inline-flex p-5 rounded-3xl bg-white text-primary mb-6 shadow-inner group-hover:bg-white/10 group-hover:text-white transition-colors">{card.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">{card.title}</h3>
                  <p className="opacity-70 leading-relaxed text-sm">{card.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-headline font-bold uppercase tracking-tighter">{t.common.ready_join}</h2>
              <p className="text-xl text-white/70 leading-relaxed">
                {t.common.enrollment_open}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/inscription">
                  <Button className="w-full sm:w-auto h-16 px-12 rounded-full bg-secondary text-white font-bold uppercase tracking-widest hover:bg-secondary/90 shadow-2xl transition-all">
                    {t.common.apply}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full sm:w-auto h-16 px-12 rounded-full border-2 border-white text-white font-bold uppercase tracking-widest hover:bg-white/10">
                    {t.common.contact_us}
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
