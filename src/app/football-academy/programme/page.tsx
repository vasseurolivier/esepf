
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Trophy, Clock, Target, CheckCircle2, UserCheck, Play, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProgrammeFootballPage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        {/* Header Section */}
        <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/football-prog-v2/1920/1080"
            alt="Programme de Football"
            fill
            className="object-cover opacity-40"
            data-ai-hint="soccer training focus"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">Programme Football</h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto border-t border-white/20 pt-4">
                L'expertise de la formation française au service de votre talent.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Training Axes */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <ScrollReveal>
                <h2 className="text-4xl font-headline font-bold text-primary mb-8">L'Exigence du Haut Niveau</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Notre programme est conçu pour transformer le potentiel en performance. Sous la direction de coachs diplômés UEFA, nos élèves bénéficient d'une immersion totale dans le football moderne.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { icon: <Clock />, title: "10-12h", text: "D'entraînement hebdomadaire intégré." },
                    { icon: <Target />, title: "Spécifique", text: "Travail individualisé par poste." },
                    { icon: <Layers />, title: "Tactique", text: "Analyse vidéo et intelligence de jeu." },
                    { icon: <UserCheck />, title: "Staff Pro", text: "Coachs issus de centres de formation." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-center p-4 bg-muted rounded-2xl border border-border/50">
                      <div className="text-secondary bg-white p-3 rounded-xl shadow-sm">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-primary">{item.title}</h4>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              
              <div className="relative">
                <div className="absolute -inset-4 bg-secondary/10 rounded-[3rem] -rotate-3" />
                <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
                  <Image 
                    src="https://picsum.photos/seed/training-field/800/1000"
                    alt="Entraînement tactique"
                    fill
                    className="object-cover"
                    data-ai-hint="soccer training drill"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-full">
                      <p className="text-white text-sm italic">"Chaque séance est une opportunité de se rapprocher du rêve professionnel."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Schedule */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-headline font-bold text-primary mb-4">Une Semaine Type</h2>
              <p className="text-muted-foreground">L'équilibre parfait entre performance athlétique et rigueur académique.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((day, i) => (
                <ScrollReveal key={i} delay={i * 100} className="bg-white p-6 rounded-3xl shadow-lg border border-border/50">
                  <h4 className="font-headline font-bold text-secondary mb-4 uppercase tracking-widest text-sm">{day}</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-primary/5 rounded-xl border-l-4 border-primary">
                      <p className="text-xs font-bold text-primary">08:00 - 15:30</p>
                      <p className="text-sm">Cours académiques</p>
                    </div>
                    <div className="p-3 bg-secondary/5 rounded-xl border-l-4 border-secondary">
                      <p className="text-xs font-bold text-secondary">16:00 - 18:00</p>
                      <p className="text-sm">Entraînement Terrain</p>
                    </div>
                    <div className="p-3 bg-muted rounded-xl">
                      <p className="text-xs font-bold text-muted-foreground">Soirée</p>
                      <p className="text-sm">Études & Récupération</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-8">Prêt à élever votre jeu ?</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button className="bg-secondary text-white font-bold py-8 px-12 rounded-full text-xl hover:bg-secondary/90 shadow-2xl transition-all">
                Demander le programme détaillé
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary py-8 px-12 rounded-full text-xl transition-all">
                Contacter un coach
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
