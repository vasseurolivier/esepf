"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useDoc, useFirestore } from '@/firebase';

export function Hero() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-school');
  const db = useFirestore();
  const { data: settings } = useDoc(db ? `settings/global` : null);
  const schoolName = settings?.schoolName || "ESEPF";

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {heroImg && (
          <Image
            src={heroImg.imageUrl}
            alt={heroImg.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImg.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-headline font-bold mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {schoolName} : <br /> Cultiver l'Excellence
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Un cadre d'apprentissage stimulant du collège au lycée, incluant notre Académie de Football Elite pour forger les citoyens de demain.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Button variant="outline" className="min-w-[220px] rounded-[30px] border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary py-7 text-lg font-semibold transition-all">
            Découvrir l'Académie Football
          </Button>
          <Button className="min-w-[220px] rounded-[30px] bg-secondary hover:bg-secondary/90 text-white border-none py-7 text-lg font-bold shadow-lg">
            S'inscrire à l'ESEPF
          </Button>
        </div>
      </div>
    </section>
  );
}
