
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

  if (!t || !t.football_pages) {
    return null;
  }

  const filters = [
    { label: "Football FR", id: "fr", target: "france-section" },
    { label: "Méthodologie", id: "method", target: "methodology-section" },
    { label: "Nos coachs", id: "coachs", target: "coaches-section" },
    { label: "Programme", id: "prog", target: "weekly-section" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const methodologyAxes = [
    { icon: <Target className="text-secondary" />, title: t.football_pages.axes_tech.split(':')[0], desc: t.football_pages.axes_tech.split(':')[1] },
    { icon: <Users className="text-secondary" />, title: t.football_pages.axes_tact.split(':')[0], desc: t.football_pages.axes_tact.split(':')[1] },
    { icon: <Activity className="text-secondary" />, title: t.football_pages.axes_phys.split(':')[0], desc: t.football_pages.axes_phys.split(':')[1] },
    { icon: <Brain className="text-secondary" />, title: t.football_pages.axes_ment.split(':')[0], desc: t.football_pages.axes_ment.split(':')[1] }
  ];

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* Header Title Section */}
        <section className="py-12 bg-white text-center">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <span className="text-lg font-medium tracking-[0.2em] text-black uppercase mb-2 block">- ESEPF -</span>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-black uppercase mb-12">
                {t.football_pages.prog_title}
              </h1>

              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                {filters.map((f) => (
                  <button 
                    key={f.id} 
                    onClick={() => scrollToSection(f.target)}
                    className="bg-black text-white px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Intro Text Section */}
        <section className="pb-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal className="space-y-10 text-center text-black/80 leading-relaxed text-sm md:text-base">
              <p>
                <strong>Notre école</strong> est un <strong>centre de formation</strong> de football qui offre à ses <strong>athlètes un programme complet et structuré</strong>, inspiré des meilleures <strong>méthodes de formation françaises</strong>.
              </p>
              <p>
                Nous préparons nos joueurs et athlètes à atteindre leurs objectifs, qu'ils soient de <strong>haut niveau ou personnels</strong>. À travers des <strong>entrainements rigoureux, des compétitions et un suivi personnalisé</strong>, chaque élève progresse sur <strong>les plans techniques, tactiques et physiques</strong>.
              </p>
              <p>
                Nous mettons également un accent particulier sur le <strong>développement mental et humain des athlètes</strong>, en les formant à <strong>gérer les défis psychologiques du sport de haut niveau</strong>. <strong>L'esprit d'équipe, la discipline, la résilience et la gestion des émotions sont au cœur de notre approche</strong>. Chaque athlète bénéficie d'un <strong>encadrement</strong> qui lui permet de <strong>s'épanouir</strong> et de donner le meilleur de lui-même.
              </p>
              <p>
                <strong>Notre école</strong> donne à ses athlètes la chance <strong>d'atteindre leurs objectifs</strong>, de <strong>s'épanouir</strong> et, pour les meilleurs d'entre eux, <strong>d'aspirer à devenir sportifs professionnels</strong> ou <strong>d'obtenir des bourses d'études grâce à leurs performances sportives</strong>.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* France Section (Blue Block) */}
        <section id="france-section" className="bg-[#1a237e] text-white overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Content */}
            <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
              <ScrollReveal>
                <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 leading-tight">
                  {t.football_pages.france_title}
                </h2>
                <div className="w-16 h-0.5 bg-white mb-12" />
                <p className="text-sm md:text-base leading-loose mb-8 opacity-90">
                  {t.football_pages.france_desc_full}
                </p>
                <p className="text-sm font-bold uppercase tracking-widest italic border-t border-white/20 pt-6">
                  {t.football_pages.france_examples}
                </p>
              </ScrollReveal>
            </div>
            
            {/* Right Image */}
            <div className="lg:w-1/2 relative min-h-[400px]">
              <Image 
                src="https://picsum.photos/seed/france-winner/1200/800" 
                alt="France Winners" 
                fill 
                className="object-cover" 
                data-ai-hint="france team victory"
              />
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="methodology-section" className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <ScrollReveal className="text-center mb-16">
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">{t.football_pages.method_subtitle}</span>
              <h2 className="text-4xl font-headline font-bold text-black uppercase">{t.football_pages.method_title}</h2>
              <div className="w-24 h-1 bg-black mx-auto mt-4 rounded-full" />
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

        {/* Coaches Section */}
        <section id="coaches-section" className="py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <ScrollReveal className="space-y-8">
                <h2 className="text-4xl font-headline font-bold text-black uppercase tracking-tight">
                  {t.football_pages.coaches_title}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed italic">
                  "{t.football_pages.coaches_text}"
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-6 py-3 bg-primary text-white font-bold rounded-xl text-xs tracking-widest uppercase">Label Elite FFF</div>
                  <div className="px-6 py-3 bg-secondary text-white font-bold rounded-xl text-xs tracking-widest uppercase">UEFA Pro Staff</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200} className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image 
                  src="https://picsum.photos/seed/coach-training/1000/800" 
                  alt="Coach Training" 
                  fill 
                  className="object-cover" 
                  data-ai-hint="soccer coach instructing"
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* World Recognized Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-black uppercase tracking-tight">
                {t.football_pages.reconnaissance_title}
              </h2>
            </ScrollReveal>

            <ScrollReveal className="space-y-10 text-black/80 leading-relaxed text-sm md:text-base">
              <p>
                <strong>La France</strong> et ses environs ne manquent certainement pas de <strong>talents</strong>, et cela n'est en rien dû au hasard, mais bien à la manière dont <strong>les jeunes joueurs sont détectés et formés dans le pays</strong>. Cette méthode, dont l'efficacité est reconnue dans le monde entier, est au cœur du <strong>succès du football français</strong>.
              </p>
              <p>
                La mission des <strong>Centres de formation</strong> de football Français est de développer nos jeunes joueurs de football en les plaçant dans un environnement <strong>compétitif, avec un encadrement de haute qualité et un programme d'enseignement français conçu pour les aider à atteindre leur plein potentiel</strong>.
              </p>
              <p>
                Grâce à un <strong>programme et une méthodologie structurés</strong>, et à travers des <strong>séances variées, des tests, des activités, des matchs, des défis et des interactions individuelles, nos joueurs évolueront sur le plan émotionnel, construiront leur caractère et développeront leurs compétences techniques, tactiques et physiques</strong> (données ajustées en fonction de l'âge spécifique de chaque joueur).
              </p>
              <p>
                Ils progresseront également dans leurs <strong>compétences humaines</strong> grâce à nos <strong>défis psycho-sociaux</strong>, en apprenant <strong>l'esprit d'équipe, la dévotion, la résilience et, surtout, en nourrissant un amour durable pour le jeu</strong>.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Weekly Program Section */}
        <section id="weekly-section" className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 -translate-y-1/4 translate-x-1/4">
            <Trophy size={600} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <ScrollReveal>
                <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tighter mb-6">{t.football_pages.weekly_title}</h2>
                <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
                  {t.football_pages.weekly_intro}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={200} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="p-8 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6"><Users size={24} /></div>
                  <h4 className="font-bold text-lg mb-2">COLLECTIF</h4>
                  <p className="text-sm text-white/60">Entraînements quotidiens en équipe.</p>
                </div>
                <div className="p-8 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6"><Zap size={24} /></div>
                  <h4 className="font-bold text-lg mb-2">INDIVIDUEL</h4>
                  <p className="text-sm text-white/60">Travail spécifique par poste (gardien, buteur...).</p>
                </div>
                <div className="p-8 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6"><Calendar size={24} /></div>
                  <h4 className="font-bold text-lg mb-2">COMPÉTITION</h4>
                  <p className="text-sm text-white/60">Matchs officiels FFF tous les week-ends.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400} className="pt-12">
                <p className="text-white/70 italic text-sm md:text-base border-t border-white/10 pt-8">
                  {t.football_pages.weekly_details}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
