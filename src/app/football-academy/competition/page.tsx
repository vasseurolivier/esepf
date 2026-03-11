
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Flag, Trophy, Shield, Users, Calendar, Rocket, Target } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function CompetitionPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);

  const heroImage = settings?.images?.competition_hero || "https://picsum.photos/seed/competition-fff-elite/1920/1080";
  const actionImage = settings?.images?.competition_action || "https://picsum.photos/seed/soccer-action/800/800";

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="relative h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src={heroImage}
            alt="Compétition FFF"
            fill
            className="object-cover opacity-30"
            data-ai-hint="soccer match competitive"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {t.competition_page.title}
              </h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto uppercase tracking-widest font-light">
                {t.competition_page.hero_sub}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <ScrollReveal className="space-y-8">
                <div className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest">
                  <Shield size={20} />
                  Fédéral & Officiel
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary leading-tight">
                  Un accès privilégié à l'élite régionale et nationale
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t.competition_page.p1}
                </p>
                <div className="p-6 bg-muted rounded-[2rem] border-l-8 border-secondary">
                  <p className="italic font-medium text-primary">
                    "Affronter les meilleures équipes françaises pour forger le caractère et l'excellence technique."
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200} className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-muted/20 bg-muted">
                <Image src={actionImage} alt="Action Football" fill className="object-cover" />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Flag />, title: t.competition_page.card_clubs, desc: t.competition_page.card_clubs_desc },
                { icon: <Calendar />, title: t.competition_page.card_weekend, desc: t.competition_page.card_weekend_desc },
                { icon: <Rocket />, title: t.competition_page.card_detection, desc: t.competition_page.card_detection_desc }
              ].map((card, i) => (
                <ScrollReveal key={i} delay={i * 150} className="bg-white p-10 rounded-[2.5rem] shadow-xl text-center group hover:bg-primary transition-all duration-500">
                  <div className="inline-flex p-5 rounded-3xl bg-secondary/10 text-secondary mb-6 group-hover:bg-white transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-white">{card.title}</h3>
                  <p className="text-muted-foreground group-hover:text-white/70 leading-relaxed">{card.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-primary rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 -translate-y-1/4 translate-x-1/4">
                  <Target size={400} />
                </div>
                <div className="lg:col-span-7 space-y-6 relative z-10">
                  <h2 className="text-3xl md:text-4xl font-headline font-bold uppercase tracking-tighter">
                    Un suivi de performance sur-mesure
                  </h2>
                  <p className="text-lg text-white/80 leading-relaxed">
                    {t.competition_page.p3}
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">Analyse Vidéo</div>
                    <div className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">Suivi Scolaire</div>
                    <div className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">Préparation Physique</div>
                  </div>
                </div>
                <div className="lg:col-span-5 flex justify-center lg:justify-end relative z-10">
                  <Link href="/inscription">
                    <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold py-10 px-12 rounded-full text-xl shadow-xl transition-all hover:scale-105 uppercase tracking-widest">
                      {t.common.apply}
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white border-t border-muted">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <ScrollReveal className="space-y-8">
              <h2 className="text-3xl font-headline font-bold text-primary uppercase">La réalité du football hexagonal</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t.competition_page.p2}
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
