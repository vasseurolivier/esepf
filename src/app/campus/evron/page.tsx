
import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MapPin, School, GraduationCap, Building2 } from 'lucide-react';

export default function CampusEvronPage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        {/* Photo avec titre */}
        <section className="relative h-[70vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/evron-hero/1920/1080"
            alt="Campus Evron"
            fill
            className="object-cover opacity-60"
            data-ai-hint="historic school"
          />
          <div className="relative z-10 text-center text-white container px-4">
            <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">Campus Evron</h1>
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto border-t border-white/30 pt-4">Le cœur historique et administratif de l'ESEPF.</p>
          </div>
        </section>

        {/* Descriptif de la ville & Carte */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest mb-4">
                  <MapPin size={20} />
                  La Ville d'Evron
                </div>
                <h2 className="text-4xl font-headline font-bold text-primary mb-6">Un écrin de sérénité en Mayenne</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Située au cœur de la Mayenne, Evron est une ville dynamique et accueillante, célèbre pour sa majestueuse Basilique-Abbaye. Elle offre un cadre de vie paisible et sécurisé, idéal pour la concentration et l'épanouissement de nos élèves.
                </p>
                <div className="p-6 bg-muted rounded-2xl border border-border">
                  <h4 className="font-bold text-primary mb-2 italic">Le saviez-vous ?</h4>
                  <p className="text-sm text-muted-foreground">Evron est un pôle d'excellence agroalimentaire mondial, offrant une ouverture concrète sur le monde de l'entreprise.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200} className="relative aspect-square bg-muted rounded-3xl overflow-hidden flex items-center justify-center border-2 border-dashed border-primary/10">
                <div className="text-center p-8">
                  <div className="relative w-64 h-80 mx-auto mb-4 bg-white shadow-xl rounded-lg p-4 flex flex-col items-center">
                    <div className="w-full h-full border-2 border-primary/20 rounded flex items-center justify-center relative">
                      <span className="text-xs font-bold text-primary/30 uppercase tracking-[0.3em]">CARTE DE FRANCE</span>
                      <div className="absolute top-[35%] left-[30%] w-4 h-4 bg-secondary rounded-full animate-ping" />
                      <div className="absolute top-[35%] left-[30%] w-3 h-3 bg-secondary rounded-full" />
                      <div className="absolute top-[35%] left-[32%] text-[10px] font-bold text-secondary uppercase">EVRON</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Localisation : Nord-Ouest de la France</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Descriptif du site */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6"><Building2 size={32} /></div>
              <h2 className="text-4xl font-headline font-bold text-primary mb-6">Infrastructures d'Excellence</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Le Campus d'Evron s'étend sur un domaine verdoyant, alliant bâtiments historiques restaurés et installations modernes. C'est ici que bat le cœur de notre Football Academy avec des terrains homologués et une résidence de haut standing pour nos sportifs.
              </p>
            </div>

            {/* Photos du site */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {[
                { img: "https://picsum.photos/seed/evron-1/800/600", title: "Le bâtiment principal" },
                { img: "https://picsum.photos/seed/evron-2/800/600", title: "Terrain d'honneur" },
                { img: "https://picsum.photos/seed/evron-3/800/600", title: "Résidence élèves" },
                { img: "https://picsum.photos/seed/evron-4/800/600", title: "Amphithéâtre" },
                { img: "https://picsum.photos/seed/evron-5/800/600", title: "Laboratoires" },
                { img: "https://picsum.photos/seed/evron-6/800/600", title: "Espace restauration" },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 100} className="relative group h-64 rounded-3xl overflow-hidden shadow-lg">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" data-ai-hint="campus life" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <span className="text-white font-bold text-sm">{item.title}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Formations disponibles */}
            <div className="bg-primary rounded-[3rem] p-12 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-3xl font-headline font-bold mb-6 flex items-center gap-3">
                    <School className="text-secondary" />
                    Formations sur ce site
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                      <h4 className="font-bold text-secondary">Collège de la 6ème à la 3ème</h4>
                      <p className="text-sm text-white/70">Sections bilangues et parcours d'excellence.</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                      <h4 className="font-bold text-secondary">Lycée Général</h4>
                      <p className="text-sm text-white/70">Toutes les spécialités académiques majeures.</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                      <h4 className="font-bold text-secondary">Football Academy Elite</h4>
                      <p className="text-sm text-white/70">Programme d'entraînement professionnel quotidien.</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="w-48 h-48 rounded-full border-4 border-secondary/30 p-8 flex items-center justify-center bg-white/5 backdrop-blur-sm mb-6 shadow-2xl">
                    <GraduationCap size={64} className="text-secondary" />
                  </div>
                  <button className="bg-secondary text-white font-bold py-4 px-8 rounded-full shadow-xl hover:bg-secondary/90 transition-all uppercase tracking-widest text-sm">
                    S'inscrire à Evron
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
