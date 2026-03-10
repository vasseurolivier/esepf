
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function Apprenticeship() {
  return (
    <section className="bg-primary py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-2/3 text-white">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6">L'Alternance au cœur du succès</h2>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Parce que rien ne remplace l'expérience terrain, toutes nos formations sont disponibles en alternance. 
              Bénéficiez d'une scolarité gratuite et d'un salaire tout en apprenant aux côtés des meilleurs professionnels du secteur.
            </p>
          </div>
          <div className="lg:w-1/3 flex justify-center lg:justify-end">
            <Button variant="outline" className="rounded-[30px] border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary py-8 px-10 text-xl font-bold transition-all">
              EN SAVOIR PLUS
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
