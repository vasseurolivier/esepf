
import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Award, Target, BookOpen, Scale } from 'lucide-react';

export default function LyceePage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/lycee-curriculum/1920/1080"
            alt="Lycée ESEPF"
            fill
            className="object-cover opacity-40"
            data-ai-hint="high school library"
          />
          <div className="relative z-10 text-center text-white container px-4">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 uppercase tracking-tighter">Le Lycée</h1>
            <p className="text-xl md:text-2xl text-white/80">Bac Général & STMG : L'Excellence pour le Supérieur.</p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <ScrollReveal>
                <div className="p-8 bg-white rounded-[2.5rem] shadow-xl border border-border h-full">
                  <h3 className="text-3xl font-headline font-bold text-primary mb-6 flex items-center gap-3">
                    <Target className="text-secondary" />
                    Filière Générale
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Un large choix de spécialités pour construire un parcours sur-mesure. Nous préparons nos élèves aux concours des grandes écoles et aux universités les plus prestigieuses.
                  </p>
                  <ul className="grid grid-cols-2 gap-3">
                    {["Mathématiques", "Physique-Chimie", "SVT", "SES", "HGGSP", "HLP"].map((spec, i) => (
                      <li key={i} className="bg-muted px-4 py-2 rounded-lg text-sm font-bold text-primary">{spec}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="p-8 bg-primary rounded-[2.5rem] shadow-xl text-white h-full">
                  <h3 className="text-3xl font-headline font-bold mb-6 flex items-center gap-3">
                    <Award className="text-secondary" />
                    Bac STMG
                  </h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Sciences et Technologies du Management et de la Gestion. Une filière dynamique orientée vers le monde de l'entreprise, parfaitement adaptée aux futurs managers sportifs.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20">Gestion et Finance</div>
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20">Marketing et Communication</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
