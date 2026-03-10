
"use client";

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const programs = [
  {
    id: 'college',
    title: 'Le Collège',
    subtitle: 'De la 6ème à la 3ème',
    image: 'college-life',
    desc: 'Un accompagnement personnalisé pour consolider les fondamentaux et développer l\'autonomie des jeunes élèves.',
    features: ['Classes à effectifs réduits', 'Aide aux devoirs intégrée', 'Éveil aux langues et à la culture']
  },
  {
    id: 'lycee',
    title: 'Le Lycée',
    subtitle: 'Bac Général & STMG',
    image: 'bac-general',
    desc: 'Une préparation d\'excellence pour le baccalauréat et l\'enseignement supérieur, avec un large choix de spécialités.',
    features: ['12 spécialités au choix', 'Bac Technologique STMG', 'Parcours d\'orientation individualisé']
  },
  {
    id: 'football',
    title: 'Academy Football',
    subtitle: 'Élite Sport Études',
    image: 'football-academy',
    desc: 'Un programme unique en France alliant scolarité de haut niveau et entraînements intensifs avec des coachs diplômés UEFA.',
    features: ['Horaires aménagés', 'Staff technique pro', 'Détection et immersion en club']
  }
];

export function Programs() {
  return (
    <section id="formations" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-4">Nos Formations</h2>
          <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Trois piliers d'excellence pour construire l'avenir de nos élèves, du premier cycle secondaire à l'élite sportive.
          </p>
        </div>

        <Tabs defaultValue="college" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-4 bg-transparent mb-12">
            {programs.map((prog) => (
              <TabsTrigger 
                key={prog.id} 
                value={prog.id}
                className="py-4 text-lg font-bold border-2 border-muted data-[state=active]:border-secondary data-[state=active]:bg-white data-[state=active]:text-primary rounded-xl transition-all"
              >
                {prog.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {programs.map((prog) => {
            const imgData = PlaceHolderImages.find(img => img.id === prog.image);
            return (
              <TabsContent key={prog.id} value={prog.id} className="focus-visible:outline-none">
                <ScrollReveal>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 rounded-3xl shadow-xl">
                    <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-inner">
                      {imgData && (
                        <Image
                          src={imgData.imageUrl}
                          alt={prog.title}
                          fill
                          className="object-cover"
                          data-ai-hint={imgData.imageHint}
                        />
                      )}
                    </div>
                    <div>
                      <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">{prog.subtitle}</span>
                      <h3 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">{prog.title}</h3>
                      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        {prog.desc}
                      </p>
                      <ul className="space-y-4 mb-10">
                        {prog.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-primary font-medium">
                            <span className="w-2 h-2 bg-secondary rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg">
                        Détails de la formation
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
