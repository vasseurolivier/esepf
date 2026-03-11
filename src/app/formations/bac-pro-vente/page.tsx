
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { ShoppingBag, MessageSquare, Clock, MapPin, Award, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FrenchSystemSchema } from '@/components/sections/FrenchSystemSchema';
import { OutletsSection } from '@/components/sections/OutletsSection';

export default function BacProVentePage() {
  const { t } = useTranslation();

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[65vh] flex items-center justify-center bg-[#0c3a2f] overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/bac-vente-pro/1920/1080"
            alt="Bac Pro Vente"
            fill
            className="object-cover opacity-50"
            data-ai-hint="modern retail luxury store"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {t.lycee_page.bac_vente.title}
              </h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto uppercase tracking-widest font-light">
                {t.lycee_page.bac_vente.subtitle}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Quick Info Bar */}
        <section className="bg-[#0c3a2f] py-6 text-white border-y border-white/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex items-center gap-3">
                <Clock className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.duration}</p>
                  <p className="font-bold text-sm">{t.lycee_page.bac_vente.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.level}</p>
                  <p className="font-bold text-sm">{t.lycee_page.bac_vente.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.campus_label}</p>
                  <p className="font-bold text-sm">{t.lycee_page.bac_vente.campuses}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.diploma}</p>
                  <p className="font-bold text-sm">Baccalauréat Professionnel</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <ScrollReveal className="space-y-6">
                <div className="inline-flex p-3 rounded-2xl bg-secondary/10 text-secondary mb-4">
                  <ShoppingBag size={32} />
                </div>
                <h2 className="text-4xl font-headline font-bold text-black tracking-tight">
                  Expert de la Relation Client
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t.lycee_page.bac_vente.desc}
                </p>
                <div className="p-4 bg-muted/50 rounded-xl border-l-4 border-secondary flex gap-3">
                  <Info className="text-secondary shrink-0" size={20} />
                  <p className="text-sm font-bold text-primary">{t.common.allophone_mention}</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {t.lycee_page.bac_vente.program_details}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={200} className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/sales-pro/800/800"
                  alt="Sales professional"
                  fill
                  className="object-cover"
                />
              </ScrollReveal>
            </div>

            {/* French System Schema */}
            <ScrollReveal className="text-center mb-12">
              <h2 className="text-3xl font-headline font-bold text-[#0c3a2f] mb-2 uppercase tracking-widest">Votre parcours professionnel</h2>
              <p className="text-muted-foreground">Construisez votre carrière commerciale étape par étape avec l'ESEPF</p>
            </ScrollReveal>
            <FrenchSystemSchema bacType="Baccalauréat Professionnel Vente" />
          </div>
        </section>

        {/* Detailed Outlets Section */}
        <section className="py-24 bg-muted/10 border-y border-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <OutletsSection 
              btsDesc={t.lycee_page.bac_vente.bts_desc}
              univDesc={t.lycee_page.bac_vente.univ_desc}
              btsList={t.lycee_page.bac_vente.bts_list}
              btsJobs={t.lycee_page.bac_vente.bts_jobs}
              univList={t.lycee_page.bac_vente.univ_list}
              univJobs={t.lycee_page.bac_vente.univ_jobs}
            />
          </div>
        </section>

        {/* Floating Contact */}
        <div className="fixed bottom-8 right-8 z-50">
          <Button className="rounded-full bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-8 shadow-2xl transition-all hover:scale-105 flex items-center gap-3">
            <MessageSquare size={24} />
            <span className="uppercase tracking-widest text-sm">{t.common.contact_us}</span>
          </Button>
        </div>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
