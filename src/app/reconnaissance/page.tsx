
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
import { GraduationCap, Award, CheckCircle2, ShieldCheck, Globe } from 'lucide-react';

export default function RecognitionPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings, isLoading } = useDoc(settingsRef);

  const heroImage = isLoading ? null : settings?.images?.recognition_hero;

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        
        <section className="flex flex-col lg:flex-row min-h-[600px] border-b border-muted">
          <div className="lg:w-1/2 relative min-h-[450px] bg-black">
            {heroImage && (
              <Image 
                src={heroImage}
                alt="Institution Building"
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-primary/10" />
          </div>

          <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center bg-white">
            <ScrollReveal className="max-w-xl space-y-8">
              <div className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-[0.3em] text-xs">
                <ShieldCheck size={16} /> {t.recognition_page.accreditations}
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-bold text-black tracking-tighter uppercase leading-none">
                {t.recognition_page.hero_title}
              </h1>
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary leading-tight">
                {t.recognition_page.hero_subtitle}
              </h2>
              <p className="text-xl m-muted-foreground leading-relaxed">
                {t.recognition_page.hero_text}
              </p>

              <div className="flex flex-wrap items-center gap-12 pt-8">
                <div className="flex flex-col items-center max-w-[140px] group">
                  <div className="relative w-20 h-20 mb-4 border border-muted p-2 rounded-xl group-hover:border-primary transition-colors bg-white">
                     <Image src="https://picsum.photos/seed/mne-logo/100/100" alt="MNE" width={100} height={100} className="grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <span className="text-[9px] font-bold text-center uppercase leading-tight opacity-60">{t.recognition_page.mne_label}</span>
                </div>
                <div className="flex flex-col items-center max-w-[140px] group">
                   <div className="relative w-20 h-20 mb-4 border border-muted p-2 rounded-xl group-hover:border-secondary transition-colors bg-white">
                      <Image src="https://picsum.photos/seed/nantes-logo/100/100" alt="Nantes" width={100} height={100} className="grayscale group-hover:grayscale-0 transition-all" />
                   </div>
                   <span className="text-[9px] font-bold text-center uppercase leading-tight opacity-60">{t.recognition_page.nantes_label}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-32 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {t.recognition_page.guarantees.map((g: any, i: number) => (
                <ScrollReveal key={i} delay={i * 100} className="bg-white p-10 rounded-[3rem] shadow-xl border border-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 text-muted/10 group-hover:text-secondary/10 transition-colors">
                    <CheckCircle2 size={80} />
                  </div>
                  <h3 className="text-xl font-headline font-bold text-primary mb-4 uppercase tracking-tight relative z-10">{g.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{g.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <ScrollReveal className="lg:col-span-7 space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-headline font-bold text-black tracking-tighter uppercase leading-tight">
                    {t.recognition_page.diploma_title}
                  </h2>
                  <div className="w-24 h-1.5 bg-secondary rounded-full" />
                </div>

                <div className="space-y-8 text-xl text-muted-foreground leading-relaxed">
                  <p className="font-medium text-black">
                    {t.recognition_page.diploma_text_1}
                  </p>
                  <p>
                    {t.recognition_page.diploma_text_2}
                  </p>
                  <div className="p-8 bg-muted/30 rounded-[2.5rem] border border-muted">
                    <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                      <Globe size={20} className="text-secondary" /> {t.recognition_page.international_opening}
                    </h4>
                    <p className="text-sm leading-relaxed">
                      {t.recognition_page.international_desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="lg:col-span-5 sticky top-32">
                <div className="bg-primary text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden border-8 border-white">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Award size={150} />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-8 uppercase tracking-widest text-secondary">{t.recognition_page.exam_objectives}</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="text-secondary shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">{t.recognition_page.dnb_label}</p>
                        <p className="text-xs text-white/60">{t.recognition_page.dnb_desc}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="text-secondary shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">{t.recognition_page.bac_label}</p>
                        <p className="text-xs text-white/60">{t.recognition_page.bac_desc}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="text-secondary shrink-0 mt-1" />
                      <div>
                        <p className="font-bold">{t.recognition_page.cert_label}</p>
                        <p className="text-xs text-white/60">{t.recognition_page.cert_desc}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#f5f1e8]">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal>
              <h2 className="text-5xl md:text-6xl font-headline font-bold text-black tracking-tight relative inline-block mb-12 uppercase leading-none">
                {t.recognition_page.bottom_title}
                <div className="w-12 h-1.5 bg-black mx-auto mt-4 rounded-full" />
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 max-w-5xl mx-auto">
               <ScrollReveal delay={100} className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-muted flex flex-col items-center group hover:scale-[1.02] transition-all duration-500">
                  <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                    <GraduationCap className="text-primary w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-headline font-bold text-black uppercase tracking-widest">{t.recognition_page.brevet_title}</h3>
                  <div className="w-8 h-1 bg-secondary mt-6 mb-6" />
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.3em]">{t.recognition_page.level_brevet}</p>
               </ScrollReveal>

               <ScrollReveal delay={200} className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-muted flex flex-col items-center group hover:scale-[1.02] transition-all duration-500">
                  <div className="w-24 h-24 bg-secondary/5 rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-secondary/10 transition-colors">
                    <Award className="text-secondary w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-headline font-bold text-black uppercase tracking-widest">{t.recognition_page.bac_title}</h3>
                  <div className="w-8 h-1 bg-primary mt-6 mb-6" />
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.3em]">{t.recognition_page.level_terminale}</p>
               </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
