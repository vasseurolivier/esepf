
import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MapPin, School, GraduationCap, Building2 } from 'lucide-react';

export default function CampusBazeillesPage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[70vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/bazeilles-hero/1920/1080"
            alt="Campus Sainte-Bazeilles"
            fill
            className="object-cover opacity-60"
            data-ai-hint="modern campus architecture"
          />
          <div className="relative z-10 text-center text-white container px-4">
            <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">Campus Sainte-Bazeilles</h1>
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto border-t border-white/30 pt-4">L'innovation pédagogique au cœur du Sud-Ouest.</p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest mb-4">
                  <MapPin size={20} />
                  La Ville de Sainte-Bazeilles
                </div>
                <h2 className="text-4xl font-headline font-bold text-primary mb-6">Un carrefour stratégique en Lot-et-Garonne</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Située aux portes de Marmande, Sainte-Bazeilles bénéficie d'une situation géographique privilégiée. Ville de tradition et de modernité, elle offre un cadre de vie dynamique entre Bordeaux et Toulouse, favorisant les échanges et l'ouverture d'esprit de nos étudiants.
                </p>
                <div className="p-6 bg-muted rounded-2xl border border-border">
                  <h4 className="font-bold text-primary mb-2 italic">Culture & Terroir</h4>
                  <p className="text-sm text-muted-foreground">Sainte-Bazeilles est réputée pour sa convivialité et ses infrastructures sportives de premier plan, parfaitement intégrées à la vie locale.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200} className="relative aspect-square bg-muted rounded-3xl overflow-hidden flex items-center justify-center border-2 border-dashed border-primary/10">
                <div className="text-center p-8">
                  <div className="relative w-64 h-80 mx-auto mb-4 bg-white shadow-xl rounded-lg p-4 flex flex-col items-center">
                    <div className="w-full h-full border-2 border-primary/20 rounded flex items-center justify-center relative">
                      <span className="text-xs font-bold text-primary/30 uppercase tracking-[0.3em]">CARTE DE FRANCE</span>
                      <div className="absolute top-[75%] left-[35%] w-4 h-4 bg-secondary rounded-full animate-ping" />
                      <div className="absolute top-[75%] left-[35%] w-3 h-3 bg-secondary rounded-full" />
                      <div className="absolute top-[75%] left-[37%] text-[10px] font-bold text-secondary uppercase">Sainte-Bazeilles</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Localisation : Sud-Ouest de la France</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6"><Building2 size={32} /></div>
              <h2 className="text-4xl font-headline font-bold text-primary mb-6">Un Campus Ouvert sur le Futur</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Le Campus de Sainte-Bazeilles se distingue par son architecture moderne et ses espaces de co-working dédiés aux projets d'élèves. Les infrastructures sportives sont à la pointe de l'innovation technologique, avec des outils d'analyse vidéo intégrés.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {[
                { img: "https://picsum.photos/seed/sb-1/800/600", title: "Atelier numérique" },
                { img: "https://picsum.photos/seed/sb-2/800/600", title: "Complexe sportif" },
                { img: "https://picsum.photos/seed/sb-3/800/600", title: "Foyer des élèves" },
                { img: "https://picsum.photos/seed/sb-4/800/600", title: "Salles multimédia" },
                { img: "https://picsum.photos/seed/sb-5/800/600", title: "Espace détente" },
                { img: "https://picsum.photos/seed/sb-6/800/600", title: "Centre de documentation" },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 100} className="relative group h-64 rounded-3xl overflow-hidden shadow-lg">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" data-ai-hint="modern architecture" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <span className="text-white font-bold text-sm">{item.title}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="bg-primary rounded-[3rem] p-12 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-3xl font-headline font-bold mb-6 flex items-center gap-3">
                    <School className="text-secondary" />
                    Formations sur ce site
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                      <h4 className="font-bold text-secondary">Bac STMG</h4>
                      <p className="text-sm text-white/70">Spécialisation Management et Gestion du Sport.</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                      <h4 className="font-bold text-secondary">Brevet Professionnel Sport</h4>
                      <p className="text-sm text-white/70">Formation technique aux métiers de l'animation.</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="w-48 h-48 rounded-full border-4 border-secondary/30 p-8 flex items-center justify-center bg-white/5 backdrop-blur-sm mb-6 shadow-2xl">
                    <GraduationCap size={64} className="text-secondary" />
                  </div>
                  <button className="bg-secondary text-white font-bold py-4 px-8 rounded-full shadow-xl hover:bg-secondary/90 transition-all uppercase tracking-widest text-sm">
                    Rejoindre Bazeilles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
