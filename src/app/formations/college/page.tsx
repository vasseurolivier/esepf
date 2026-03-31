"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore, useMemoFirebase, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { GraduationCap, BookOpen, UserCheck, ShieldCheck, Star, Sparkles } from 'lucide-react';

export default function CollegePage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings } = useDoc(settingsRef);
  
  const settings = clientSettings || serverSettings;

  const heroImage = settings?.images?.college_hero;

  const successKeys = [
    { icon: <UserCheck className="text-secondary" />, title: t.college_page.autonomy_title, desc: t.college_page.autonomy_desc },
    { icon: <BookOpen className="text-secondary" />, title: t.college_page.excellence_title, desc: t.college_page.excellence_desc },
    { icon: <Sparkles className="text-secondary" />, title: t.college_page.fulfillment_title, desc: t.college_page.fulfillment_desc }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#fdfaf5]">
        <section className="relative h-[70vh] flex items-center justify-center bg-black overflow-hidden">
          {heroImage && (
            <Image 
              src={heroImage}
              alt="Collège ESEPF"
              fill
              className="object-cover opacity-50"
              priority
            />
          )}
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <span className="text-secondary font-bold uppercase tracking-[0.4em] text-sm mb-4 block">{t.college_page.age_label}</span>
              <h1 className="text-6xl md:text-9xl font-headline font-bold mb-6 uppercase tracking-tighter leading-none">
                {t.college_page.title}
              </h1>
              <div className="w-24 h-2 bg-secondary mx-auto rounded-full" />
            </ScrollReveal>
          </div>
        </section>

        <section className="py-32">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div className="space-y-8 text-2xl text-black leading-tight font-headline font-bold">
                  <p className="border-l-8 border-secondary pl-8">{t.college_page.p1}</p>
                </div>
                <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                  <p>{t.college_page.p2}</p>
                  <p>{t.college_page.p3}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {successKeys.map((key, i) => (
                  <div key={i} className="p-10 bg-white rounded-[3rem] shadow-xl border border-muted hover:translate-y-[-10px] transition-all duration-500">
                    <div className="mb-6">{key.icon}</div>
                    <h3 className="text-xl font-bold uppercase mb-4 tracking-tight">{key.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{key.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-primary text-white p-12 lg:p-20 rounded-[4rem] shadow-2xl mt-24 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 opacity-10 translate-y-1/4 translate-x-1/4">
                  <GraduationCap size={400} />
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-bold mb-16 uppercase tracking-tighter relative z-10">
                  {t.college_page.prog_title}
                </h2>
                
                <div className="space-y-16 relative z-10">
                  <div className="flex flex-col md:flex-row gap-8 md:gap-16 group">
                    <div className="text-5xl font-headline font-bold text-secondary opacity-40 group-hover:opacity-100 transition-opacity shrink-0">01</div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold border-b border-white/20 pb-4 uppercase tracking-tight">
                        {t.college_page.year1_title}
                      </h3>
                      <p className="text-lg leading-relaxed text-white/70">
                        {t.college_page.year1_desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 md:gap-16 group">
                    <div className="text-5xl font-headline font-bold text-secondary opacity-40 group-hover:opacity-100 transition-opacity shrink-0">02</div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold border-b border-white/20 pb-4 uppercase tracking-tight">
                        {t.college_page.year2_title}
                      </h3>
                      <p className="text-lg leading-relaxed text-white/70">
                        {t.college_page.year2_desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 md:gap-16 group">
                    <div className="text-5xl font-headline font-bold text-secondary opacity-40 group-hover:opacity-100 transition-opacity shrink-0">03</div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold border-b border-white/20 pb-4 uppercase tracking-tight">
                        {t.college_page.year3_title}
                      </h3>
                      <p className="text-lg leading-relaxed text-white/70">
                        {t.college_page.year3_desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-20 text-center">
                <div className="inline-flex p-4 rounded-full bg-secondary/10 text-secondary mb-6"><ShieldCheck size={32} /></div>
                <p className="text-2xl text-primary font-headline font-bold italic leading-relaxed max-w-3xl mx-auto">
                  {t.college_page.conclusion}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}