
"use client";

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Trophy, Users, GraduationCap, Route, HeartPulse, Globe, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const academyFeatures = [
  { icon: <Trophy className="text-secondary" />, title: "Compétition Officielle", desc: "Immersion dans les championnats nationaux français." },
  { icon: <GraduationCap className="text-secondary" />, title: "Sport-Études", desc: "Équilibre parfait entre réussite scolaire et performance." },
  { icon: <Route className="text-secondary" />, title: "Parcours Joueur", desc: "Suivi personnalisé de la détection au monde pro." },
  { icon: <HeartPulse className="text-secondary" />, title: "Accompagnement", desc: "Soutien physique et mental de haut niveau." },
  { icon: <Globe className="text-secondary" />, title: "Réseau de Clubs", desc: "Partenariats exclusifs avec des clubs européens." },
  { icon: <Briefcase className="text-secondary" />, title: "Métiers du Sport", desc: "Orientation vers les carrières du management sportif." },
];

export function FootballAcademy() {
  const footballImg = PlaceHolderImages.find(img => img.id === 'football-academy');

  return (
    <section id="football" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-4">Elite Française</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-8 leading-tight">
              Football Academy : <br /><span className="text-secondary">Allier Sport de Haut Niveau & Études</span>
            </h3>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              L'ESEPF propose un cursus unique pour les jeunes talents du football. Notre académie permet de poursuivre une scolarité d'excellence tout en bénéficiant d'un encadrement sportif digne des plus grands clubs professionnels.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {academyFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/30 transition-colors group">
                  <div className="mt-1 transform group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1 uppercase text-xs tracking-wider">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-bold">
              Demander le dossier d'admission
            </Button>
          </div>

          <div className="lg:w-1/2 relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
            {footballImg && (
              <Image
                src={footballImg.imageUrl}
                alt={footballImg.description}
                fill
                className="object-cover"
                data-ai-hint={footballImg.imageHint}
              />
            )}
            <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-sm p-6 rounded-2xl border-l-8 border-secondary">
              <p className="text-white font-bold italic">
                "Plus qu'une école, une rampe de lancement vers le professionnalisme."
              </p>
              <p className="text-sm text-white/70 mt-2">— Direction Technique, ESEPF Academy</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
