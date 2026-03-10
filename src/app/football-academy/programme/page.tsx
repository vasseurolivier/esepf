
import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Trophy, Clock, Target, CheckCircle2 } from 'lucide-react';

export default function ProgrammeFootballPage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/football-prog/1920/1080"
            alt="Programme de Football"
            fill
            className="object-cover opacity-40"
            data-ai-hint="soccer training"
          />
          <div className="relative z-10 text-center text-white container px-4">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4">Programme de Football</h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">Une immersion totale dans le football de haut niveau, orchestrée par des experts.</p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <h2 className="text-4xl font-headline font-bold text-primary mb-6">L'Exigence du Haut Niveau</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Notre programme est conçu pour transformer le potentiel en performance. Avec 10 à 12 heures d'entraînement hebdomadaire, nos élèves bénéficient d'un cadre professionnel.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: <Clock className="text-secondary" />, title: "Horaires Aménagés", text: "Entraînements intégrés à l'emploi du temps scolaire." },
                    { icon: <Target className="text-secondary" />, title: "Spécifique Poste", text: "Séances dédiées selon le rôle sur le terrain." },
                    { icon: <Trophy className="text-secondary" />, title: "Staff UEFA", text: "Encadrement par des coachs diplômés des plus hautes instances." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="mt-1">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-primary">{item.title}</h4>
                        <p className="text-muted-foreground">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/prog-img/800/600"
                  alt="Entraînement tactique"
                  fill
                  className="object-cover"
                  data-ai-hint="soccer tactics"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
