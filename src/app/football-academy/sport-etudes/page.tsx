
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
import { GraduationCap, Trophy, Clock, CheckCircle2, Star, Zap, Activity } from 'lucide-react';

export default function SportEtudesPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings } = useDoc(settingsRef);
  
  const settings = clientSettings || serverSettings;

  const bgImage = settings?.images?.sport_etudes_bg;
  const footballImg = settings?.images?.sport_etudes_football;
  const basketballImg = settings?.images?.sport_etudes_basketball;

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          {bgImage && <Image src={bgImage} alt="Background" fill className="object-cover" />}
        </div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          
          <section className="mb-32">
            <ScrollReveal className="text-center max-w-4xl mx-auto mb-20">
              <span className="text-secondary font-bold uppercase tracking-[0.3em] text-sm mb-4 block">- {t.sport_etudes_page.concept_label} -</span>
              <h1 className="text-4xl md:text-7xl font-headline font-bold text-black tracking-tight uppercase leading-none mb-8">
                {t.sport_etudes_page.title1}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t.sport_etudes_page.text1}
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <ScrollReveal delay={100}>
                <div className="bg-[#e08b8b] p-10 rounded-[2.5rem] shadow-xl border border-white/20 h-full flex flex-col items-center text-center group hover:scale-105 transition-transform duration-500">
                  <div className="bg-white/20 p-4 rounded-full mb-6">
                    <Trophy size={48} className="text-black" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-black uppercase mb-4">{t.sport_etudes_page.label1_1}</h3>
                  <p className="text-black/70 text-sm font-medium">{t.sport_etudes_page.daily_train_desc}</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="bg-[#7fb3e0] p-10 rounded-[2.5rem] shadow-xl border border-white/20 h-full flex flex-col items-center text-center group hover:scale-105 transition-transform duration-500">
                  <div className="bg-white/20 p-4 rounded-full mb-6">
                    <GraduationCap size={48} className="text-black" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-black uppercase mb-4">{t.sport_etudes_page.label1_2}</h3>
                  <p className="text-black/70 text-sm font-medium">{t.sport_etudes_page.optimized_schedule_desc}</p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <section className="mb-32 py-24 bg-muted/30 rounded-[4rem] px-8 lg:px-20 border border-muted shadow-inner">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-8">
                <ScrollReveal>
                  <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary uppercase leading-tight mb-6">
                    {t.sport_etudes_page.day_title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t.sport_etudes_page.day_desc}
                  </p>
                </ScrollReveal>
                
                <ScrollReveal delay={200} className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-muted">
                    <CheckCircle2 className="text-secondary" />
                    <span className="font-bold text-sm uppercase tracking-wide">{t.sport_etudes_page.discipline_label}</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-muted">
                    <Zap className="text-secondary" />
                    <span className="font-bold text-sm uppercase tracking-wide">{t.sport_etudes_page.perf_cog_label}</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-muted">
                    <Activity className="text-secondary" />
                    <span className="font-bold text-sm uppercase tracking-wide">{t.sport_etudes_page.life_balance_label}</span>
                  </div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-7">
                <ScrollReveal delay={300} className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden border border-muted">
                  <div className="absolute top-0 right-0 p-8 opacity-5 text-primary">
                    <Clock size={200} />
                  </div>
                  <div className="space-y-6 relative z-10">
                    {t.sport_etudes_page.schedule.map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-6 border-b border-muted last:border-0 pb-4 group">
                        <div className="min-w-[120px] font-bold text-secondary uppercase tracking-widest text-xs group-hover:scale-110 transition-transform">
                          {item.time}
                        </div>
                        <div className="text-primary font-headline font-bold text-lg">
                          {item.activity}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          <section className="mb-32">
            <ScrollReveal className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-black uppercase tracking-tighter">
                {t.sport_etudes_page.title2}
              </h2>
              <div className="w-24 h-1.5 bg-black mx-auto mt-4 rounded-full" />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
              <ScrollReveal className="group">
                <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl mb-8 bg-black">
                  {footballImg && (
                    <>
                      <Image src={footballImg} alt="Football" fill className="object-cover group-hover:scale-110 transition-transform duration-700" priority />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </>
                  )}
                  <div className="absolute bottom-8 left-8 flex items-center gap-3">
                    <div className="p-3 bg-secondary text-white rounded-full"><Star fill="currentColor" size={20} /></div>
                    <h3 className="text-3xl font-headline font-bold text-white uppercase tracking-widest">{t.sport_etudes_page.label2_1}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-center px-4">
                  {t.sport_etudes_page.text2.split('Prochainement')[0]}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={200} className="group opacity-80 hover:opacity-100 transition-opacity">
                <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl mb-8 bg-black">
                  {basketballImg && (
                    <>
                      <Image src={basketballImg} alt="Basketball" fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </>
                  )}
                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-3xl font-headline font-bold text-white uppercase tracking-widest mb-1">{t.sport_etudes_page.label2_2}</h3>
                    <span className="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">{t.sport_etudes_page.label2_2_sub}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-center px-4">
                  {t.sport_etudes_page.text2.includes('basketball') ? t.sport_etudes_page.text2.split('basketball,')[1] : ""}
                </p>
              </ScrollReveal>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
