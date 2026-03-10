
"use client";

import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const partners = [
  'SORBONNE', 'HEC PARIS', 'SCIENCES PO', 'POLYTECHNIQUE', 'ESSEC', 'CENTRALE', 'DAUPHINE'
];

// Doubling for infinite effect
const infinitePartners = [...partners, ...partners];

export function Partners() {
  return (
    <section className="py-20 bg-background border-t border-b border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h3 className="text-sm font-bold text-muted-foreground tracking-widest uppercase mb-4">Nos élèves poursuivent leurs études à</h3>
      </div>

      <div className="relative">
        <div className="partner-carousel-track">
          {infinitePartners.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center w-[250px] shrink-0"
            >
              <div className="h-16 w-32 bg-primary/5 rounded-lg border border-primary/10 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-default">
                <span className="font-headline font-bold text-primary/40 text-sm tracking-tighter">{partner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
