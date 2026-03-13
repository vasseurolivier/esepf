
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useDoc, useFirestore, useMemoFirebase, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function LyceePage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings } = useDoc(settingsRef);
  
  const settings = clientSettings || serverSettings;

  const introImage = settings?.images?.lycee_intro;

  const formationCards = [
    {
      title: t.lycee_page.card_langues,
      image: settings?.images?.lycee_card_1,
      href: "/formations/bac-general"
    },
    {
      title: t.lycee_page.card_vente,
      image: settings?.images?.lycee_card_2,
      href: "/formations/bac-pro-vente"
    },
    {
      title: t.lycee_page.card_management,
      image: settings?.images?.lycee_card_3,
      href: "/formations/bac-techno-stmg"
    },
    {
      title: t.lycee_page.card_hotel,
      image: settings?.images?.lycee_card_4,
      banner: "2027 - 2028",
      href: "#"
    },
    {
      title: t.lycee_page.card_mode,
      image: settings?.images?.lycee_card_5,
      banner: "2027 - 2028",
      href: "#"
    }
  ];

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-headline font-bold text-black tracking-tight">
                  {t.lycee_page.title}
                </h1>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>{t.lycee_page.intro_p1}</p>
                  <p>{t.lycee_page.intro_p2}</p>
                  <p>{t.lycee_page.intro_p3}</p>
                  <p>{t.lycee_page.intro_p4}</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-black">
                {introImage && (
                  <Image 
                    src={introImage} 
                    alt="Lycée Life" 
                    fill 
                    className="object-cover"
                  />
                )}
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Academic Path Schema Section */}
        <section className="py-16 bg-muted/20 border-y border-muted">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Integration Year */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-full pb-4 border-b-4 border-primary">
                    <h3 className="text-lg md:text-xl font-headline font-bold text-black underline underline-offset-8 decoration-2">
                      {t.lycee_page.schema.integration}
                    </h3>
                  </div>
                  <p className="text-sm italic text-muted-foreground font-medium">
                    {t.lycee_page.schema.allophones}
                  </p>
                </div>

                {/* Year 1 */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-full pb-4 border-b-4 border-secondary">
                    <h3 className="text-lg md:text-xl font-headline font-bold text-black underline underline-offset-8 decoration-2">
                      {t.lycee_page.schema.year1}
                    </h3>
                  </div>
                  <p className="text-sm font-bold text-primary uppercase tracking-widest">
                    {t.lycee_page.schema.year1_label}
                  </p>
                </div>

                {/* Year 2 */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-full pb-4 border-b-4 border-primary">
                    <h3 className="text-lg md:text-xl font-headline font-bold text-black underline underline-offset-8 decoration-2">
                      {t.lycee_page.schema.year2}
                    </h3>
                  </div>
                  <p className="text-sm font-bold text-primary uppercase tracking-widest">
                    {t.lycee_page.schema.year2_label}
                  </p>
                </div>

                {/* Year 3 */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-full pb-4 border-b-4 border-secondary">
                    <h3 className="text-lg md:text-xl font-headline font-bold text-black underline underline-offset-8 decoration-2">
                      {t.lycee_page.schema.year3}
                    </h3>
                  </div>
                  <p className="text-sm font-bold text-primary uppercase tracking-widest">
                    {t.lycee_page.schema.year3_label}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-[#0c3a2f] py-20 text-white overflow-hidden">
          <div className="container mx-auto px-4">
            <ScrollReveal className="flex items-center gap-4 mb-16">
              <h2 className="text-5xl font-headline font-bold uppercase tracking-tighter">
                {t.lycee_page.formations_title}
              </h2>
              <div className="flex-1 h-px bg-white/20 mt-4" />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-0 border-t border-l border-white/20">
              {formationCards.map((card, idx) => (
                <ScrollReveal key={idx} delay={idx * 100} className="relative group border-r border-b border-white/20 bg-[#0c3a2f] flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden bg-black">
                    {card.image && (
                      <Image src={card.image} alt={card.title} fill className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                    )}
                    {card.banner && (
                      <div className="absolute top-4 -right-8 bg-red-600 text-white font-bold py-1 px-12 rotate-45 text-[10px] shadow-lg">
                        {card.banner}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-6 text-center">
                      <h3 className="text-white font-headline font-bold text-sm tracking-widest uppercase leading-tight drop-shadow-lg">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col bg-white">
                    {card.href !== "#" ? (
                      <>
                        <Link href={card.href} className="flex items-center justify-between p-4 border-b border-muted hover:bg-muted transition-colors text-black text-[10px] font-bold uppercase tracking-widest text-left">
                          {t.lycee_page.btn_formation}
                          <ChevronRight size={14} className="text-secondary" />
                        </Link>
                        <Link href={card.href} className="flex items-center justify-between p-4 border-b border-muted hover:bg-muted transition-colors text-black text-[10px] font-bold uppercase tracking-widest text-left">
                          {t.lycee_page.btn_outlets}
                          <ChevronRight size={14} className="text-secondary" />
                        </Link>
                        <Link href={card.href} className="flex items-center justify-between p-4 hover:bg-muted transition-colors text-black text-[10px] font-bold uppercase tracking-widest text-left">
                          {t.lycee_page.btn_jobs}
                          <ChevronRight size={14} className="text-secondary" />
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between p-4 border-b border-muted text-black/30 text-[10px] font-bold uppercase tracking-widest text-left cursor-not-allowed">
                          {t.lycee_page.btn_formation}
                          <ChevronRight size={14} className="text-black/10" />
                        </div>
                        <div className="flex items-center justify-between p-4 border-b border-muted text-black/30 text-[10px] font-bold uppercase tracking-widest text-left cursor-not-allowed">
                          {t.lycee_page.btn_outlets}
                          <ChevronRight size={14} className="text-black/10" />
                        </div>
                        <div className="flex items-center justify-between p-4 text-black/30 text-[10px] font-bold uppercase tracking-widest text-left cursor-not-allowed">
                          {t.lycee_page.btn_jobs}
                          <ChevronRight size={14} className="text-black/10" />
                        </div>
                      </>
                    )}
                  </div>
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
