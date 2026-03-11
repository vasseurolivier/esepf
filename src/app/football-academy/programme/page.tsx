"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Target, Shield, Users, Calendar, Trophy, Zap, Activity, Brain } from 'lucide-react';

export default function ProgrammeFootballPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);

  if (!t || !t.football_pages) return null;

  const franceImage = settings?.images?.prog_france_bg || "https://picsum.photos/seed/france-winner/1200/800";
  const coachImage = settings?.images?.prog_coach_training || "https://picsum.photos/seed/coach-training/1000/800";

  const methodologyAxes = [
    { icon: <Target className="text-secondary" />, title: t.football_pages.axes_tech.split(':')[0], desc: t.football_pages.axes_tech.split(':')[1] },
    { icon: <Users className="text-secondary" />, title: t.football_pages.axes_tact.split(':')[0], desc: t.football_pages.axes_tact.split(':')[1] },
    { icon: <Activity className="text-secondary" />, title: t.football_pages.axes_phys.split(':')[0], desc: t.football_pages.axes_phys.split(':')[1] },
    { icon: <Brain className="text-secondary" />, title: t.football_pages.axes_ment.split(':')[0], desc: t.football_pages.axes_ment.split(':')[1] }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="py-12 bg-white text-center">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <span className="text-lg font-medium tracking-[0.2em] text-black uppercase mb-2 block">- ESEPF -</span>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-black uppercase mb-12">
                {t.football_pages.prog_title}
              </h1>
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                {["fr", "method", "coachs", "prog"].map((id) => (
                  <button 
                    key={id} 
                    onClick={() => scrollToSection(`${id}-section`)}
                    className="bg-black text-white px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
                  >
                    {id === 'fr' ? 'Football FR' : id === 'method' ? 'Méthodologie' : id === 'coachs' ? 'Nos coachs' : 'Programme'}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal className="space-y-10 text-center text-black/80 leading-relaxed text-sm md:text-base">
              <p><strong>Notre école</strong> est un <strong>centre de formation</strong> de football qui offre à ses <strong>athlètes un programme complet et structuré</strong>, inspiré des meilleures <strong>méthodes de formation françaises</strong>.</p>
              <p>Nous préparons nos joueurs et athlètes à atteindre leurs objectifs, qu'ils soient de <strong>haut niveau ou personnels</strong>.</p>
              <p>Nous mettons également un accent particulier sur le <strong>développement mental et humain</strong>.</p>
            </ScrollReveal>
          </div>
        </section>

        <section id="fr-section" className="bg-[#1a237e] text-white overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
              <ScrollReveal>
                <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 leading-tight">{t.football_pages.france_title}</h2>
                <div className="w-16 h-0.5 bg-white mb-12" />
                <p className="text-sm md:text-base leading-loose mb-8 opacity-90">{t.football_pages.france_desc_full}</p>
                <p className="text-sm font-bold uppercase tracking-widest italic border-t border-white/20 pt-6">{t.football_pages.france_examples}</p>
              </ScrollReveal>
            </div>
            <div className="lg:w-1/2 relative min-h-[400px] bg-muted">
              <Image src={franceImage} alt="France Winners" fill className="object-cover" />
            </div>
          </div>
        </section>

        <section id="method-section" className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <ScrollReveal className="text-center mb-16">
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">{t.football_pages.method_subtitle}</span>
              <h2 className="text-4xl font-headline font-bold text-black uppercase">{t.football_pages.method_title}</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodologyAxes.map((axis, i) => (
                <ScrollReveal key={i} delay={i * 100} className="p-8 bg-muted/30 rounded-3xl border border-muted hover:bg-white hover:shadow-xl transition-all duration-500">
                  <div className="bg-white p-4 rounded-2xl inline-block shadow-sm mb-6">{axis.icon}</div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">{axis.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{axis.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="coachs-section" className="py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <ScrollReveal className="space-y-8">
                <h2 className="text-4xl font-headline font-bold text-black uppercase tracking-tight">{t.football_pages.coaches_title}</h2>
                <p className="text-xl text-muted-foreground leading-relaxed italic">"{t.football_pages.coaches_text}"</p>
              </ScrollReveal>
              <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-muted">
                <Image src={coachImage} alt="Coach Training" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section id="prog-section" className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 -translate-y-1/4 translate-x-1/4">
            <Trophy size={600} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tighter mb-6">{t.football_pages.weekly_title}</h2>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">{t.football_pages.weekly_intro}</p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
