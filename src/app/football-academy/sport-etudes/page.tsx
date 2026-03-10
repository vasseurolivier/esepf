
import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { BookOpen, Trophy, Scale, CheckCircle2 } from 'lucide-react';

export default function SportEtudesPage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[50vh] flex items-center justify-center bg-secondary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/sport-study/1920/1080"
            alt="Sport Études"
            fill
            className="object-cover opacity-40"
            data-ai-hint="students studying"
          />
          <div className="relative z-10 text-center text-white container px-4">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4">Le Sport-Études</h1>
            <p className="text-xl md:text-2xl font-medium">L'équilibre parfait pour une réussite totale.</p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-3xl font-headline font-bold text-primary mb-6">Pas de compromis sur l'école</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  À l'ESEPF, nous croyons qu'un bon joueur est avant tout un élève structuré. Notre système sport-études permet d'allier passion et diplôme.
                </p>
              </div>
              <div className="bg-primary p-8 rounded-3xl text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Scale className="text-secondary" /> Notre Équilibre</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} /> Tutorat personnalisé</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} /> Soutien scolaire intensif</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} /> 100% de réussite au bac</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
