
import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Briefcase, TrendingUp, Users, Award } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function MetiersSportPage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-8">Les Métiers du Sport</h1>
              <p className="text-xl text-muted-foreground mb-16 leading-relaxed">
                Le football est un tremplin vers de nombreuses carrières. À l'ESEPF, nous préparons nos élèves à devenir les futurs cadres du monde sportif.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: <TrendingUp />, title: "Management du Sport", desc: "Devenez agent, directeur sportif ou manager de club." },
                  { icon: <Users />, title: "Éducation & Coaching", desc: "Transmettez votre passion comme entraîneur ou éducateur." },
                  { icon: <Briefcase />, title: "Business & Marketing", desc: "Travaillez dans le sponsoring, l'événementiel ou la com' sportive." },
                  { icon: <Award />, title: "Droit & Data", desc: "Expertise juridique ou analyse de données de performance." }
                ].map((job, i) => (
                  <ScrollReveal key={i} delay={i * 100}>
                    <div className="p-8 rounded-3xl bg-muted/50 border border-border group hover:bg-secondary hover:text-white transition-all">
                      <div className="text-secondary group-hover:text-white mb-4">{job.icon}</div>
                      <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                      <p className="text-muted-foreground group-hover:text-white/80">{job.desc}</p>
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
