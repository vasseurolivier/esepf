
import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { GraduationCap, BookOpen, Users, Compass } from 'lucide-react';

export default function CollegePage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/college-curriculum/1920/1080"
            alt="Collège ESEPF"
            fill
            className="object-cover opacity-40"
            data-ai-hint="middle school students"
          />
          <div className="relative z-10 text-center text-white container px-4">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 uppercase tracking-tighter">Le Collège</h1>
            <p className="text-xl md:text-2xl text-white/80">De la 6ème à la 3ème : Consolider et Épanouir.</p>
          </div>
        </section>

        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <GraduationCap size={40} />, title: "Socle Commun", desc: "Une maîtrise rigoureuse des fondamentaux : mathématiques, français et culture générale." },
                { icon: <Users size={40} />, title: "Accompagnement", desc: "Des classes à effectifs maîtrisés pour un suivi individualisé de chaque élève." },
                { icon: <Compass size={40} />, title: "Orientation", desc: "Une aide à la découverte des métiers et des filières dès la classe de 4ème." }
              ].map((card, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="bg-white p-10 rounded-3xl shadow-lg border border-border text-center h-full">
                    <div className="inline-flex p-4 rounded-2xl bg-primary/5 text-primary mb-6">{card.icon}</div>
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
