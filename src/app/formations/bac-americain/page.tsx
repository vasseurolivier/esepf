
import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Star, Award, GraduationCap, ShieldCheck } from 'lucide-react';

export default function BacAmericainPage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[60vh] flex items-center justify-center bg-[#0a192f] overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/american-bac/1920/1080"
            alt="Baccalauréat Américain"
            fill
            className="object-cover opacity-30"
            data-ai-hint="american university"
          />
          <div className="relative z-10 text-center text-white container px-4">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 uppercase tracking-tighter">Baccalauréat Américain</h1>
            <p className="text-xl md:text-2xl text-white/80">Le Dual Diploma : Obtenez deux baccalauréats simultanément.</p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal className="bg-primary text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden mb-16">
              <div className="relative z-10">
                <h2 className="text-4xl font-headline font-bold mb-8">Le High School Diploma</h2>
                <p className="text-xl text-white/70 mb-8 leading-relaxed">
                  Grâce à notre partenariat exclusif, nos élèves peuvent suivre un cursus digital américain en parallèle de leur scolarité française. Ils obtiennent ainsi le baccalauréat français et le High School Diploma américain.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <Star className="text-secondary" />
                    <span>Double diplôme officiel</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <ShieldCheck className="text-secondary" />
                    <span>Reconnaissance internationale</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-10"><Star size={300} /></div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ScrollReveal>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4">Pourquoi choisir ce cursus ?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  C'est un atout majeur pour intégrer des universités aux États-Unis ou des cursus internationaux en Europe. Les élèves développent une autonomie et une maîtrise de l'anglais de niveau académique supérieur.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <h3 className="text-2xl font-headline font-bold text-primary mb-4">Modalités</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-muted-foreground"><span className="w-1.5 h-1.5 bg-secondary rounded-full" /> Cours en visioconférence avec des professeurs US</li>
                  <li className="flex items-center gap-2 text-muted-foreground"><span className="w-1.5 h-1.5 bg-secondary rounded-full" /> Suivi par un tuteur dédié à l'ESEPF</li>
                  <li className="flex items-center gap-2 text-muted-foreground"><span className="w-1.5 h-1.5 bg-secondary rounded-full" /> 6 matières américaines étalées sur 3 ou 4 ans</li>
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
