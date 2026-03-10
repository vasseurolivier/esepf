
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MapPin, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const campuses = [
  {
    id: "evron",
    name: "Campus Evron",
    location: "Evron, Mayenne",
    image: "https://picsum.photos/seed/evron-campus/600/400",
    hint: "school building",
    href: "/campus/evron"
  },
  {
    id: "sainte-bazeilles",
    name: "Campus Sainte-Bazeilles",
    location: "Sainte-Bazeilles, Lot-et-Garonne",
    image: "https://picsum.photos/seed/bazeilles-campus/600/400",
    hint: "modern campus",
    href: "/campus/sainte-bazeilles"
  },
  {
    id: "sainte-tulle",
    name: "Campus Sainte-Tulle",
    location: "Sainte-Tulle, Alpes-de-Haute-Provence",
    image: "https://picsum.photos/seed/tulle-campus/600/400",
    hint: "school campus",
    href: "/campus/sainte-tulle"
  }
];

export function Campuses() {
  const panImg = PlaceHolderImages.find(img => img.id === 'campus-panoramic');

  return (
    <>
      {/* Panoramic Image Above Section */}
      <div className="w-full h-[400px] md:h-[550px] relative overflow-hidden">
        {panImg && (
          <Image
            src={panImg.imageUrl}
            alt={panImg.description}
            fill
            className="object-cover"
            data-ai-hint={panImg.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
      </div>

      <section id="campus" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-4">Nos 3 Campus</h2>
            <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full" />
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
              L'ESEPF déploie son excellence sur trois sites stratégiques, offrant des infrastructures de pointe adaptées à la réussite de chaque élève.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {campuses.map((campus, idx) => (
              <ScrollReveal key={idx} delay={idx * 150}>
                <Link href={campus.href} className="group relative block overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image
                      src={campus.image}
                      alt={campus.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      data-ai-hint={campus.hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                    <h3 className="text-2xl font-headline font-bold mb-2 group-hover:text-secondary transition-colors">{campus.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/80">
                        <MapPin size={18} className="text-secondary" />
                        <span className="text-sm font-medium">{campus.location}</span>
                      </div>
                      <div className="bg-secondary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
