
import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight, MapPin, Search, Star, Rocket } from 'lucide-react';

export default function ParcoursJoueurPage() {
  const steps = [
    { icon: <Search />, title: "Détection", desc: "Tests techniques et entretiens pour évaluer le potentiel." },
    { icon: <Star />, title: "Immersion", desc: "Intégration progressive au sein de nos équipes élites." },
    { icon: <Rocket />, title: "Éclosion", desc: "Suivi personnalisé vers les centres de formation pro." }
  ];

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="bg-primary text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6">Le Parcours du Joueur</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">De la détection à l'entrée dans le monde professionnel, nous vous accompagnons à chaque étape.</p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {steps.map((step, i) => (
                  <ScrollReveal key={i} delay={i * 200}>
                    <div className="relative bg-white p-10 rounded-3xl shadow-lg border border-border">
                      <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center mb-6 absolute -top-8 left-1/2 -translate-x-1/2 shadow-xl">
                        {step.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-primary mt-4 mb-4 text-center">{step.title}</h3>
                      <p className="text-muted-foreground text-center">{step.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
