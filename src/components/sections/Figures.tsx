
"use client";

import React from 'react';
import { GraduationCap, MapPin, Trophy, Languages } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';

export function Figures() {
  const { t } = useTranslation();

  const stats = [
    { 
      icon: <Languages size={40} />, 
      value: t.figures.lang_val, 
      label: t.figures.lang_lab 
    },
    { 
      icon: <MapPin size={40} />, 
      value: t.figures.camp_val, 
      label: t.figures.camp_lab 
    },
    { 
      icon: <Trophy size={40} />, 
      value: t.figures.foot_val, 
      label: t.figures.foot_lab 
    },
    { 
      icon: <GraduationCap size={40} />, 
      value: t.figures.prog_val, 
      label: t.figures.prog_lab 
    },
  ];

  return (
    <section className="py-20 bg-primary/5 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <ScrollReveal key={idx} delay={idx * 100}>
              <div className="flex flex-col items-center text-center group">
                <div className="text-secondary mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-headline font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-bold tracking-tight uppercase text-[10px] md:text-xs max-w-[150px] leading-tight">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
