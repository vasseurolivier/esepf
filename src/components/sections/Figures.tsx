
import React from 'react';
import { Users, GraduationCap, MapPin, Briefcase } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const stats = [
  { icon: <Users size={40} />, value: '95%', label: 'Taux d\'insertion' },
  { icon: <MapPin size={40} />, value: '3', label: 'Campus en France' },
  { icon: <GraduationCap size={40} />, value: '12', label: 'Formations' },
  { icon: <Briefcase size={40} />, value: '500+', label: 'Entreprises partenaires' },
];

export function Figures() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <ScrollReveal key={idx} delay={idx * 100}>
              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-shadow bg-background">
                <div className="text-secondary mb-4">{stat.icon}</div>
                <div className="text-3xl font-headline font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
