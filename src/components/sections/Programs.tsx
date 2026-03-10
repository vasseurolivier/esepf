
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const programs = [
  {
    id: 1,
    title: 'Bachelor Packaging',
    image: 'program-bachelor',
    desc: 'Maîtrisez la conception technique et le design industriel pour les emballages de demain.'
  },
  {
    id: 2,
    title: 'Mastère Ingénierie',
    image: 'program-master',
    desc: 'Expertise approfondie en matériaux, durabilité et optimisation des flux de production.'
  },
  {
    id: 3,
    title: 'BTS Finition Industrielle',
    image: 'program-pro',
    desc: 'Formation technique spécialisée dans les procédés d\'impression et de finition haut de gamme.'
  }
];

export function Programs() {
  return (
    <section id="programs" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-4">Nos Programmes</h2>
          <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full" />
        </div>

        {/* FIREBASE-DATA: formations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((prog, idx) => {
            const imgData = PlaceHolderImages.find(img => img.id === prog.image);
            return (
              <ScrollReveal key={prog.id} delay={idx * 150}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 w-full">
                    {imgData && (
                      <Image
                        src={imgData.imageUrl}
                        alt={prog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={imgData.imageHint}
                      />
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-headline font-bold text-primary mb-4">{prog.title}</h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {prog.desc}
                    </p>
                    <Link
                      href={`/program/${prog.id}`}
                      className="inline-flex items-center font-bold text-secondary hover:underline"
                    >
                      En savoir plus <span className="ml-2">→</span>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
