
"use client";

import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { GraduationCap, BookOpen, Languages, Trophy, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useFirestore, useDoc, useMemoFirebase, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useTranslation } from '@/hooks/use-translation';

export function ThreeAxes() {
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings, isLoading: settingsLoading } = useDoc(settingsRef);
  
  const settings = clientSettings || serverSettings;
  const { t } = useTranslation();
  
  const logoUrl = settings?.logoUrl;
  const schoolName = settings?.schoolName || (settingsLoading && !serverSettings ? "" : "ESEPE");

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="relative max-w-6xl mx-auto">
            
            {/* Desktop View */}
            <div className="hidden lg:block relative h-[1100px]">
              
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-[450px] h-[450px] rounded-full border border-secondary/10 p-12 bg-white flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.05)] relative">
                  <div className="w-full h-full rounded-full border-[12px] border-secondary/5 flex items-center justify-center overflow-hidden p-12 bg-white shadow-inner">
                    {settingsLoading && !serverSettings ? (
                      <div className="w-24 h-24 bg-muted animate-pulse rounded-full" />
                    ) : logoUrl ? (
                      <img src={logoUrl} alt={`${schoolName} Crest`} className="max-w-full max-h-full object-contain" />
                    ) : (
                      <div className="text-primary flex flex-col items-center">
                        < GraduationCap size={120} className="text-secondary mb-4" />
                        <span className="font-headline font-bold text-4xl tracking-tighter text-center">{schoolName}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute -inset-4 rounded-full border border-secondary/20" />
                  <div className="absolute -inset-12 rounded-full border border-secondary/10" />
                  <div className="absolute -inset-24 rounded-full border border-secondary/5" />
                </div>
              </div>

              {/* Scolarité Box */}
              <div className="absolute top-0 left-0 w-[350px]">
                <div className="flex flex-col items-start text-left">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <GraduationCap className="text-secondary" size={32} />
                    </div>
                    <h3 className="text-3xl font-headline font-bold text-primary tracking-widest uppercase border-b-2 border-muted pb-2 pr-12">{t.axes.scolarite}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 whitespace-pre-line">
                    {t.axes.scolarite_desc}
                  </p>
                  <div className="space-y-2">
                    <Link href="/formations/college" className="block text-primary font-bold border-b-2 border-primary/20 w-fit hover:border-secondary transition-colors italic">
                      {t.axes.college_link}
                    </Link>
                    <Link href="/formations/lycee" className="block text-primary font-bold border-b-2 border-primary/20 w-fit hover:border-secondary transition-colors italic">
                      {t.axes.lycee_link}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Football Academy Box */}
              <div className="absolute top-0 right-0 w-[350px] text-right">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-3xl font-headline font-bold text-primary tracking-widest uppercase border-b-2 border-muted pb-2 pl-12">{t.axes.academy_title}</h3>
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <Trophy className="text-secondary" size={32} />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 whitespace-pre-line">
                    {t.axes.academy_desc}
                  </p>
                  <div className="space-y-2">
                    <Link href="/football-academy/competition" className="block text-primary font-bold border-b-2 border-primary/20 w-fit hover:border-secondary transition-colors italic">
                      {t.axes.championships}
                    </Link>
                    <Link href="/football-academy/programme" className="block text-primary font-bold border-b-2 border-primary/20 w-fit hover:border-secondary transition-colors italic">
                      {t.axes.elite_prog}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Langues Box */}
              <div className="absolute top-[75%] left-1/2 -translate-x-1/2 w-full max-w-4xl text-center z-30">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center gap-12 mb-8 w-full">
                    <div className="bg-secondary/5 border border-secondary/10 p-6 rounded-full shadow-sm translate-y-4">
                      <Languages className="text-secondary" size={40} />
                    </div>
                    <div className="flex flex-col items-center">
                      <h3 className="text-3xl font-headline font-bold text-primary tracking-widest uppercase border-b-2 border-muted pb-2 px-12 leading-tight whitespace-pre-line">
                        {t.axes.languages_title}
                      </h3>
                    </div>
                    <div className="bg-secondary/5 border border-secondary/10 p-6 rounded-full shadow-sm translate-y-4">
                      <BookOpen className="text-secondary" size={40} />
                    </div>
                  </div>
                  
                  <div className="max-w-3xl space-y-6">
                    <p className="text-muted-foreground text-base leading-relaxed whitespace-pre-line">
                      {t.axes.languages_desc}
                    </p>
                    <div className="flex justify-center gap-8 pt-4">
                      <Link href="/formations/langues" className="text-primary font-bold border-b-2 border-primary/20 hover:border-secondary transition-colors italic">
                        {t.axes.fle_link}
                      </Link>
                      <Link href="/formations/langues" className="text-primary font-bold border-b-2 border-primary/20 hover:border-secondary transition-colors italic">
                        {t.axes.efl_link}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <svg className="absolute inset-0 w-full h-full -z-10 opacity-10" viewBox="0 0 1000 1100">
                <line x1="300" y1="200" x2="450" y2="400" stroke="currentColor" strokeWidth="1" />
                <line x1="700" y1="200" x2="550" y2="400" stroke="currentColor" strokeWidth="1" />
                <line x1="500" y1="750" x2="550" y2="400" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden space-y-12">
              <div className="flex flex-col items-center mb-12">
                <div className="w-40 h-40 rounded-full border-4 border-secondary/10 p-2 bg-white flex items-center justify-center shadow-2xl relative mb-8">
                   {settingsLoading && !serverSettings ? (
                    <div className="w-16 h-16 bg-muted animate-pulse rounded-full" />
                  ) : logoUrl ? (
                    <img src={logoUrl} alt={`${schoolName} Crest`} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <GraduationCap size={48} className="text-secondary" />
                  )}
                  <div className="absolute -bottom-4 bg-primary text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{schoolName}</div>
                </div>
                <h2 className="text-2xl font-headline font-bold text-primary text-center px-4">
                  {t.sections.three_axes_mobile_title}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {/* Mobile Scolarité */}
                <div className="bg-muted/30 p-8 rounded-[2rem] border border-border shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-secondary/10 p-3 rounded-2xl">
                      <GraduationCap className="text-secondary" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-primary uppercase tracking-wider">{t.axes.scolarite}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">{t.axes.scolarite_desc}</p>
                  <Link href="/formations/lycee" className="flex items-center justify-between font-bold text-primary uppercase text-[10px] tracking-widest bg-white p-4 rounded-xl border border-border">
                    {t.axes.lycee_link}
                    <ChevronRight size={14} className="text-secondary" />
                  </Link>
                </div>

                {/* Mobile Football Academy */}
                <div className="bg-primary p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="bg-white/10 p-3 rounded-2xl">
                      <Trophy className="text-secondary" size={24} />
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-wider">{t.axes.academy_title}</h3>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed mb-6 relative z-10 whitespace-pre-line">{t.axes.academy_desc}</p>
                  <Link href="/football-academy/programme" className="flex items-center justify-between font-bold uppercase text-[10px] tracking-widest bg-white/10 p-4 rounded-xl border border-white/10 relative z-10">
                    {t.axes.elite_prog}
                    <ChevronRight size={14} className="text-secondary" />
                  </Link>
                  <div className="absolute -right-10 -bottom-10 opacity-10"><Trophy size={150} /></div>
                </div>

                {/* Mobile Langues */}
                <div className="bg-muted/30 p-8 rounded-[2rem] border border-border shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-secondary/10 p-3 rounded-2xl">
                      <Languages className="text-secondary" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-primary uppercase tracking-wider">
                      {t.axes.languages_title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">{t.axes.languages_desc}</p>
                  <Link href="/formations/langues" className="flex items-center justify-between font-bold text-primary uppercase text-[10px] tracking-widest bg-white p-4 rounded-xl border border-border">
                    {t.sections.three_axes_mobile_languages_btn}
                    <ChevronRight size={14} className="text-secondary" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
