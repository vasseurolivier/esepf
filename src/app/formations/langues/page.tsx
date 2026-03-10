
import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Languages, Globe, Zap, MessageSquare } from 'lucide-react';

export default function LanguesPage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/languages-excellence/1920/1080"
            alt="Langues Étrangères"
            fill
            className="object-cover opacity-40"
            data-ai-hint="world map concept"
          />
          <div className="relative z-10 text-center text-white container px-4">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 uppercase tracking-tighter">Langues Étrangères</h1>
            <p className="text-xl md:text-2xl text-white/80">L'ouverture internationale au cœur de notre pédagogie.</p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-headline font-bold text-primary mb-6">Un Passeport pour le Monde</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Maîtriser plusieurs langues est une nécessité dans un monde globalisé. À l'ESEPF, nous proposons des parcours linguistiques renforcés dès le collège.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ScrollReveal className="bg-muted/30 p-10 rounded-3xl border border-border">
                <Globe className="text-secondary mb-6" size={48} />
                <h3 className="text-2xl font-bold text-primary mb-4">English First Language (EFL)</h3>
                <p className="text-muted-foreground">Un programme intensif pour les élèves souhaitant atteindre un niveau bilingue, avec des cours de littérature et d'histoire en anglais.</p>
              </ScrollReveal>
              <ScrollReveal delay={200} className="bg-muted/30 p-10 rounded-3xl border border-border">
                <MessageSquare className="text-secondary mb-6" size={48} />
                <h3 className="text-2xl font-bold text-primary mb-4">Certifications Internationales</h3>
                <p className="text-muted-foreground">Préparation aux examens du Cambridge (PET, FCE, CAE) et du DELF pour valider officiellement les compétences acquises.</p>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
