
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { ChevronRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LyceePage() {
  const { t } = useTranslation();

  const formationCards = [
    {
      title: t.lycee_page.card_langues,
      image: "https://picsum.photos/seed/lang-culture/400/300",
      hint: "university campus building",
      href: "/formations/bac-general"
    },
    {
      title: t.lycee_page.card_vente,
      image: "https://picsum.photos/seed/sale-career/400/300",
      hint: "modern city skyscraper",
      href: "/formations/bac-pro-vente"
    },
    {
      title: t.lycee_page.card_management,
      image: "https://picsum.photos/seed/manage-career/400/300",
      hint: "business professional typing",
      href: "/formations/bac-techno-stmg"
    },
    {
      title: t.lycee_page.card_hotel,
      image: "https://picsum.photos/seed/hotel-career/400/300",
      hint: "luxury wine glasses table",
      banner: "2027 - 2028",
      href: "#"
    },
    {
      title: t.lycee_page.card_mode,
      image: "https://picsum.photos/seed/fashion-career/400/300",
      hint: "fashion design dresses",
      banner: "2027 - 2028",
      href: "#"
    }
  ];

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* Intro Section */}
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
              <ScrollReveal delay={200} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/students-canteen/1200/900" 
                  alt="Lycée Life" 
                  fill 
                  className="object-cover"
                  data-ai-hint="students dining cafeteria"
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Formations Grid Section */}
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
                  {/* Image Header */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={card.image} alt={card.title} fill className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" data-ai-hint={card.hint} />
                    {/* Future Banner */}
                    {card.banner && (
                      <div className="absolute top-4 -right-8 bg-red-600 text-white font-bold py-1 px-12 rotate-45 text-[10px] shadow-lg">
                        {card.banner}
                      </div>
                    )}
                    {/* Overlay Title */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-6 text-center">
                      <h3 className="text-white font-headline font-bold text-sm tracking-widest uppercase leading-tight drop-shadow-lg">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  {/* Actions Links */}
                  <div className="flex flex-col bg-white">
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
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Floating Contact Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <Button className="rounded-full bg-[#0c3a2f] hover:bg-[#082a22] text-white font-bold px-8 py-8 shadow-2xl transition-all hover:scale-105 flex items-center gap-3">
            <MessageSquare size={24} />
            <span className="uppercase tracking-widest text-sm">{t.common.contact_us}</span>
          </Button>
        </div>

      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
