
import React from 'react';
import { Users, GraduationCap, School, BookOpen } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const stats = [
  { icon: <GraduationCap size={40} />, value: '100%', label: 'Réussite au Bac' },
  { icon: <Users size={40} />, value: '850', label: 'Élèves épanouis' },
  { icon: <School size={40} />, value: '30+', label: 'Clubs & Activités' },
  { icon: <BookOpen size={40} />, value: '100%', label: 'Suivi Personnalisé' },
];

export function Figures() {
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
