
import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Flag, Trophy, Shield, Users } from 'lucide-react';

export default function CompetitionPage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/competition-fff/1920/1080"
            alt="Compétition FFF"
            fill
            className="object-cover opacity-30"
            data-ai-hint="soccer match"
          />
          <div className="relative z-10 text-center text-white container px-4">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 uppercase tracking-tighter">Compétition Officielle</h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">Vivez l'adrénaline des championnats français au sein d'une structure d'élite.</p>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-headline font-bold text-primary mb-4">L'Elite de l'Hexagone</h2>
              <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Flag />, title: "Championnat FFF", desc: "Nos équipes participent aux compétitions officielles de la Fédération Française de Football." },
                { icon: <Shield />, title: "Identité Club", desc: "Représentez les couleurs de l'ESEPF face aux meilleurs clubs régionaux et nationaux." },
                { icon: <Users />, title: "Scoutisme", desc: "Une visibilité accrue auprès des recruteurs lors de chaque match officiel." }
              ].map((card, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="bg-white p-10 rounded-3xl shadow-lg text-center h-full hover:-translate-y-2 transition-transform">
                    <div className="inline-flex p-4 rounded-2xl bg-secondary/10 text-secondary mb-6">{card.icon}</div>
                    <h3 className="text-2xl font-bold text-primary mb-4">{card.title}</h3>
                    <p className="text-muted-foreground">{card.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
