
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore, useMemoFirebase, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Globe } from 'lucide-react';

export default function HistoryPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings } = useDoc(settingsRef);
  
  const settings = clientSettings || serverSettings;
  
  const schoolName = settings?.schoolName || "ESEPF";
  const mainImage = settings?.images?.history_main;

  const timelineLogos = [
    settings?.images?.history_timeline_0,
    settings?.images?.history_timeline_1,
    settings?.images?.history_timeline_2,
    settings?.images?.history_timeline_3,
  ];

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
                  <div className="pt-4 p-6 bg-white rounded-2xl shadow-sm border border-muted italic">
                    <span className="text-secondary font-bold block mb-2">{t.history_page.mission_label}</span> 
                    {t.history_page.intro_p3}
                  </div>
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
                  />
                )}
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-5xl md:text-7xl font-headline font-bold text-black uppercase tracking-tighter mb-20">
                {t.history_page.timeline_title}
              </h2>
            </ScrollReveal>

            <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-0">
              {/* Desktop Timeline Line */}
              <div className="hidden lg:block absolute top-[140px] left-0 w-full h-1 bg-black/10 z-0">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#1a3d2f] border-4 border-white shadow-md" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#1a3d2f] border-4 border-white shadow-md" />
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 w-full relative z-10">
                {t.history_page.events.map((event: any, idx: number) => (
                  <ScrollReveal key={idx} delay={idx * 150} className="flex flex-col items-center text-center">
                    {/* Year Box */}
                    <div className="flex flex-col items-center mb-8 h-[180px] justify-end">
                      {timelineLogos[idx] && (
                        <div className="mb-4 h-16 w-16 relative">
                          <Image 
                            src={timelineLogos[idx]} 
                            alt="Brand Logo" 
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div className="bg-[#f5f5f5] px-8 py-4 rounded-xl border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transform skew-x-[-10deg]">
                        <span className="text-3xl font-headline font-bold text-black italic block skew-x-[10deg]">
                          {event.year}
                        </span>
                      </div>
                    </div>

                    {/* Timeline Node (Mobile Only) */}
                    <div className="lg:hidden w-full h-px bg-black/10 my-4 relative">
                       <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#1a3d2f]" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4 px-2">
                      <h3 className="text-[10px] md:text-[11px] lg:text-[12px] font-bold uppercase tracking-widest text-black leading-tight min-h-[60px] flex items-center justify-center whitespace-pre-line">
                        {event.title}
                      </h3>
                      <div className="w-12 h-0.5 bg-secondary mx-auto" />
                      <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed text-justify whitespace-pre-line">
                        {event.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Decorative Green Block */}
              <div className="hidden xl:block absolute -right-20 top-0 w-32 h-[400px] bg-[#0c3a2f] -z-10" />
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
