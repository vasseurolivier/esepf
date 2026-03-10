
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Languages, BookOpen, Globe, CheckCircle2, Heart, Users, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function IntegrationPage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        {/* Header */}
        <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/integration-v2/1920/1080"
            alt="Classe d'Intégration"
            fill
            className="object-cover opacity-40"
            data-ai-hint="international students group"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">Classe d'Intégration</h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto border-t border-white/20 pt-4 uppercase tracking-widest font-light">
                Pour les élèves allophones & internationaux
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <ScrollReveal>
                <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest mb-4">
                  <Languages size={20} />
                  Français Langue Étrangère (FLE)
                </div>
                <h2 className="text-4xl font-headline font-bold text-primary mb-6">Une passerelle vers la réussite française</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Accueillir un élève venant de l'étranger, c'est avant tout lui donner les clés de sa nouvelle culture. Notre classe d'intégration est conçue comme un cocon pédagogique où l'apprentissage du français se fait en immersion totale, mais avec une bienveillance absolue.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "Cours de FLE intensifs (15h à 20h par semaine)",
                    "Intégration progressive dans les matières académiques",
                    "Découverte de la culture et des codes de la société française",
                    "Suivi personnalisé par un tuteur bilingue"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-primary font-medium p-3 bg-muted rounded-xl border-l-4 border-secondary">
                      <CheckCircle2 size={18} className="text-secondary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Button className="bg-primary text-white font-bold py-6 px-10 rounded-full shadow-lg hover:bg-primary/90">
                  Télécharger le guide d'accueil international
                </Button>
              </ScrollReveal>
              
              <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image 
                  src="https://picsum.photos/seed/fle-classroom-v2/800/1000"
                  alt="FLE Classroom"
                  fill
                  className="object-cover"
                  data-ai-hint="teacher with international students"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex flex-col justify-end p-12 text-white">
                  <h3 className="text-2xl font-headline font-bold mb-2">100%</h3>
                  <p className="text-sm text-white/70">De nos élèves allophones rejoignent un cursus général après un an d'immersion.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars of Integration */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-headline font-bold text-primary mb-4">Un Accompagnement à 360°</h2>
              <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: <Heart size={40} />, title: "Bienveillance", desc: "Un environnement sécurisant où chaque élève est écouté et valorisé dans sa culture d'origine." },
                { icon: <Users size={40} />, title: "Immersion", desc: "Participation active à la vie de l'école (clubs, sport, repas) pour une pratique orale constante." },
                { icon: <Compass size={40} />, title: "Orientation", desc: "Aide au choix de la filière française (Générale ou STMG) selon les aptitudes et les projets." }
              ].map((card, i) => (
                <ScrollReveal key={i} delay={i * 150} className="bg-white p-10 rounded-[3rem] shadow-xl border border-border/50 text-center hover:-translate-y-2 transition-transform">
                  <div className="inline-flex p-5 rounded-3xl bg-primary/5 text-primary mb-6 shadow-inner">{card.icon}</div>
                  <h3 className="text-2xl font-bold text-primary mb-4 uppercase tracking-tighter">{card.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-24 bg-primary text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <Globe size={1000} className="absolute -top-1/2 -left-1/4" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto italic text-3xl md:text-4xl font-serif mb-10 leading-snug">
                "Grâce à la classe d'intégration, j'ai pu apprendre le français en seulement 6 mois tout en continuant mes entraînements de football. C'est plus qu'une école, c'est ma nouvelle famille en France."
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-4 border-secondary overflow-hidden mb-4">
                  <Image src="https://picsum.photos/seed/student-1/200/200" alt="Student" width={80} height={80} />
                </div>
                <h4 className="font-bold text-xl">Lucas M.</h4>
                <p className="text-secondary uppercase tracking-[0.2em] text-xs font-bold">Élève de 1ère - Campus Evron</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
