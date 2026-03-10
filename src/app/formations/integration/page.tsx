
import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Languages, BookOpen, Globe, CheckCircle2 } from 'lucide-react';

export default function IntegrationPage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/integration-allophone/1920/1080"
            alt="Classe d'Intégration"
            fill
            className="object-cover opacity-40"
            data-ai-hint="international students"
          />
          <div className="relative z-10 text-center text-white container px-4">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 uppercase tracking-tighter">Classe d'Intégration</h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">Accompagner les élèves allophones vers la maîtrise du français et la réussite académique.</p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest mb-4">
                  <Languages size={20} />
                  Français Langue Étrangère (FLE)
                </div>
                <h2 className="text-4xl font-headline font-bold text-primary mb-6">Une passerelle vers le système français</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Destinée aux élèves arrivant de l'étranger, notre classe d'intégration permet une immersion progressive et bienveillante. Nous mettons l'accent sur l'acquisition rapide des compétences linguistiques nécessaires pour suivre un cursus scolaire classique.
                </p>
                <div className="space-y-4">
                  {[
                    "Immersion linguistique intensive",
                    "Pédagogie différenciée et personnalisée",
                    "Soutien culturel et méthodologique",
                    "Passage progressif vers les classes ordinaires"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-primary font-medium">
                      <CheckCircle2 size={18} className="text-secondary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/fle-classroom/800/1000"
                  alt="FLE Classroom"
                  fill
                  className="object-cover"
                  data-ai-hint="students learning"
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
