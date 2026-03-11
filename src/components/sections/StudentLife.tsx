
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';

export function StudentLife() {
  const { t } = useTranslation();

  return (
    <section id="vie-scolaire" className="bg-secondary py-20 md:py-24 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="container mx-auto px-6">
        <ScrollReveal className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-2/3 text-white">
            <h2 className="text-3xl md:text-6xl font-headline font-bold mb-6 text-center lg:text-left leading-tight">
              {t.sections.student_life_title}
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10 text-center lg:text-left">
              {t.sections.student_life_desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-white/10 p-6 md:p-8 rounded-3xl border border-white/20 backdrop-blur-sm shadow-xl">
                <h4 className="font-bold text-xl mb-2 text-white border-b border-white/10 pb-2">
                  {t.sections.student_life_activities}
                </h4>
                <p className="text-white/70 text-sm">
                  {t.sections.student_life_activities_list}
                </p>
              </div>
              <div className="bg-white/10 p-6 md:p-8 rounded-3xl border border-white/20 backdrop-blur-sm shadow-xl">
                <h4 className="font-bold text-xl mb-2 text-white border-b border-white/10 pb-2">
                  {t.sections.student_life_sports}
                </h4>
                <p className="text-white/70 text-sm">
                  {t.sections.student_life_sports_list}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 flex justify-center lg:justify-end w-full">
            <Link href="/inscription" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto rounded-full border-2 border-white text-white bg-transparent hover:bg-white hover:text-secondary py-8 px-12 text-lg font-bold transition-all shadow-2xl uppercase tracking-widest">
                {t.sections.student_life_btn}
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
