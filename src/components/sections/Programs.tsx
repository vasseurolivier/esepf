
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
    desc: 'Un accompagnement personnalisé pour consolider les fondamentaux et développer l\'autonomie.',
    features: ['Classes à effectifs réduits', 'Aide aux devoirs', 'Activités sportives et culturelles']
  },
  {
    id: 'bac-gen',
    title: 'Bac Général',
    subtitle: 'Lycée Classique',
    image: 'bac-general',
    desc: 'Un parcours riche en spécialités pour préparer les élèves aux concours et aux grandes écoles.',
    features: ['12 spécialités au choix', 'Option Section Européenne', 'Préparation aux concours']
  },
  {
    id: 'bac-stmg',
    title: 'Bac STMG',
    subtitle: 'Management et Gestion',
    image: 'bac-stmg',
    desc: 'Une formation technologique axée sur le monde de l\'entreprise et les enjeux numériques.',
    features: ['Immersion professionnelle', 'Management & Marketing', 'Gestion & Finance']
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
            Découvrez nos parcours adaptés aux ambitions de chaque élève, encadrés par une équipe pédagogique dévouée.
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
                        En savoir plus sur le programme
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
