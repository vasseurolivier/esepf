
"use client";

import React from 'react';
import { Users, GraduationCap, School, MapPin } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';

export function Figures() {
  const { t } = useTranslation();

  const stats = [
    { icon: <GraduationCap size={40} />, value: '100%', label: t.figures.bac },
    { icon: <Users size={40} />, value: '850', label: t.figures.students },
    { icon: <MapPin size={40} />, value: '3', label: t.figures.campuses },
    { icon: <School size={40} />, value: '30+', label: t.figures.activities },
  ];

  return (
    <section className="py-20 bg-white relative">
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
                <div className="text-muted-foreground font-semibold tracking-wide uppercase text-xs">
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
