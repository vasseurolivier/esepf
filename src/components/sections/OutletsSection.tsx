
"use client";

import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';

interface OutletsSectionProps {
  btsDesc: string;
  univDesc: string;
  btsList: string[];
  btsJobs: string[];
  univList: string[];
  univJobs: string[];
}

export function OutletsSection({ btsDesc, univDesc, btsList, btsJobs, univList, univJobs }: OutletsSectionProps) {
  const { t } = useTranslation();

  const CurvedArrow = () => (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="text-black transform rotate-90">
      <path d="M20 20C20 20 20 80 80 80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M60 60L80 80L60 100" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const Card = ({ title, items, bgColor }: { title: string, items: string[], bgColor: string }) => (
    <div className={`p-8 rounded-[2rem] shadow-xl border border-black/5 ${bgColor} h-full min-h-[350px] relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
      <h4 className="text-xl font-headline font-bold text-black uppercase tracking-widest mb-6 border-b border-black/10 pb-4">
        {title}
      </h4>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-black/80">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="space-y-24">
      {/* Section 1: LES BTS */}
      <section>
        <ScrollReveal className="flex items-center gap-4 mb-12">
          <CurvedArrow />
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-black tracking-tighter uppercase">
            {t.outlets_labels.higher_ed_title}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Text Side */}
          <ScrollReveal className="lg:col-span-5 space-y-6">
            <h3 className="text-3xl font-headline font-bold text-black uppercase">{t.outlets_labels.bts_title}</h3>
            <div className="text-lg text-muted-foreground leading-relaxed">
              <p>{btsDesc}</p>
            </div>
          </ScrollReveal>

          {/* Cards Side */}
          <ScrollReveal delay={200} className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title={t.outlets_labels.bts_title} items={btsList} bgColor="bg-[#f5f1e8]" />
            <Card title={t.outlets_labels.jobs_title} items={btsJobs} bgColor="bg-[#d1d5db]" />
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2: UNIVERSITES */}
      <section>
        <ScrollReveal className="flex items-center gap-4 mb-12">
          <CurvedArrow />
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-black tracking-tighter uppercase">
            {t.outlets_labels.univ_title}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Text Side */}
          <ScrollReveal className="lg:col-span-5 space-y-6">
            <h3 className="text-3xl font-headline font-bold text-black uppercase">{t.outlets_labels.univ_title}</h3>
            <div className="text-lg text-muted-foreground leading-relaxed">
              <p>{univDesc}</p>
            </div>
          </ScrollReveal>

          {/* Cards Side */}
          <ScrollReveal delay={200} className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title={t.outlets_labels.licence_master} items={univList} bgColor="bg-[#f5f1e8]" />
            <Card title={t.outlets_labels.jobs_title} items={univJobs} bgColor="bg-[#d1d5db]" />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
