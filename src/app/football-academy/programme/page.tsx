
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Trophy, Target, UserCheck, ShieldCheck, Zap, Globe, Users, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export default function ProgrammeFootballPage() {
  const { t } = useTranslation();

  // Safety check for missing translation keys
  if (!t || !t.football_pages) {
    return null;
  }

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* Hero Section */}
        <section className="relative h-[75vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/football-hero-pro/1920/1080"
            alt="Football Program"
            fill
            className="object-cover opacity-40"
            data-ai-hint="soccer stadium evening"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <Trophy size={14} />
                Elite Education Program
              </div>
              <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {t.football_pages.prog_title}
              </h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto border-t border-white/20 pt-4 uppercase tracking-widest font-light">
                {t.football_pages.prog_sub}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Section 1: France - Terre d'Excellence */}
        <section className="py-24 border-b border-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <ScrollReveal className="relative">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10" />
                <div className="flex items-center gap-4 text-secondary font-bold uppercase tracking-widest mb-6">
                  <ShieldCheck size={24} />
                  Référence Mondiale
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-8 tracking-tight">
                  {t.football_pages.france_title}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {t.football_pages.france_desc}
                </p>
                <div className="flex gap-8">
                  <div className="text-center">
                    <p className="text-4xl font-headline font-bold text-primary">2</p>
                    <p className="text-[10px] font-bold uppercase text-secondary">World Cups</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-headline font-bold text-primary">N°1</p>
                    <p className="text-[10px] font-bold uppercase text-secondary">Export de talents</p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200} className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-muted/20">
                <Image src="https://picsum.photos/seed/france-excellence/800/600" alt="Equipe de France" fill className="object-cover" />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Section 2: La Méthodologie */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <ScrollReveal>
                <div className="inline-flex p-4 bg-primary/10 text-primary rounded-3xl mb-6">
                  <Zap size={32} />
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-6">{t.football_pages.method_title}</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t.football_pages.method_desc}
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Target />, title: "Intelligence Tactique", desc: "Lecture de jeu et prise de décision rapide sous pression." },
                { icon: <UserCheck />, title: "Excellence Technique", desc: "Maîtrise du geste pur et précision dans l'exécution." },
                { icon: <Globe />, title: "Cognition & Adaptabilité", desc: "Joueurs capables d'évoluer dans n'importe quel système de jeu." }
              ].map((card, i) => (
                <ScrollReveal key={i} delay={i * 150} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-border group hover:bg-primary transition-all duration-500">
                  <div className="text-secondary bg-secondary/10 p-4 rounded-2xl w-fit mb-6 group-hover:bg-white group-hover:text-primary transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-white">{card.title}</h3>
                  <p className="text-muted-foreground group-hover:text-white/70 leading-relaxed">{card.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Nos Coachs */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <ScrollReveal className="order-2 lg:order-1">
                <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
                  <Image src="https://picsum.photos/seed/uefa-coach/800/1000" alt="UEFA Coach" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                    <p className="text-sm font-bold uppercase tracking-widest text-secondary mb-2">Direction Technique</p>
                    <h4 className="text-3xl font-headline font-bold">Encadrement Professionnel</h4>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200} className="order-1 lg:order-2 space-y-8">
                <div className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest">
                  <Users size={20} />
                  Staff Certifié
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary">{t.football_pages.coaches_title}</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t.football_pages.coaches_desc}
                </p>
                <ul className="space-y-4">
                  {[
                    "Entraîneurs principaux diplômés UEFA A/B",
                    "Spécialiste de la préparation physique",
                    "Entraîneur spécifique Gardiens de But",
                    "Analyste vidéo pour le débriefing tactique"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-primary font-medium p-4 bg-muted rounded-2xl border-l-4 border-secondary">
                      <ShieldCheck className="text-secondary shrink-0" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Section 4: Le Programme */}
        <section className="py-24 bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-5 -translate-y-1/4 translate-x-1/4">
            <Trophy size={600} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal className="max-w-4xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-headline font-bold mb-6 tracking-tighter uppercase">{t.football_pages.weekly_title}</h2>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-8 rounded-full" />
              <p className="text-xl text-white/70">{t.football_pages.weekly_desc}</p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { time: "MATIN", title: "Scolarité", icon: <Clock />, desc: "Cours académiques (6ème à Terminale) avec effectifs réduits." },
                { time: "APRÈS-MIDI", title: "Terrain", icon: <Zap />, desc: "Séances techniques et tactiques quotidiennes (2h par jour)." },
                { time: "SOIRÉE", title: "Récupération", icon: <ShieldCheck />, desc: "Études dirigées, soins kiné et analyse vidéo personnalisée." },
                { time: "WEEK-END", title: "Compétition", icon: <Trophy />, desc: "Matchs officiels en Championnat FFF et tournois élites." }
              ].map((step, i) => (
                <ScrollReveal key={i} delay={i * 100} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
                  <span className="text-[10px] font-bold text-secondary tracking-widest uppercase mb-4 block">{step.time}</span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-secondary">{step.icon}</div>
                    <h4 className="text-2xl font-bold">{step.title}</h4>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal className="mt-24 text-center">
              <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold py-8 px-12 rounded-full text-xl shadow-2xl transition-all hover:scale-105 group">
                {t.common.apply}
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
