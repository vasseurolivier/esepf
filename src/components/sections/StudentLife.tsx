
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';

export function StudentLife() {
  const { t } = useTranslation();

  return (
    <section id="vie-scolaire" className="bg-secondary py-24 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="container mx-auto px-4">
        <ScrollReveal className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-2/3 text-white">
            <h2 className="text-3xl md:text-6xl font-headline font-bold mb-6">{t.sections.student_life_title}</h2>
            <p className="text-xl text-white/90 leading-relaxed mb-10">
              {t.sections.student_life_desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
                <h4 className="font-bold text-xl mb-2">Activités</h4>
                <p className="text-white/70">Théâtre, Chorale, Club Échecs, Programmation.</p>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
                <h4 className="font-bold text-xl mb-2">Sports</h4>
                <p className="text-white/70">Rugby, Gymnastique, Escalade, Natation.</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 flex justify-center lg:justify-end">
            <Button variant="outline" className="rounded-full border-2 border-white text-white bg-transparent hover:bg-white hover:text-secondary py-8 px-12 text-lg font-bold transition-all shadow-xl uppercase tracking-widest">
              {t.sections.student_life_btn}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
