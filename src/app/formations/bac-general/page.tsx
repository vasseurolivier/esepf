
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { GraduationCap, Clock, MapPin, Award, Info, BookOpen, CheckCircle2, Languages, User, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FrenchSystemSchema } from '@/components/sections/FrenchSystemSchema';
import { OutletsSection } from '@/components/sections/OutletsSection';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function BacGeneralPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);

  const heroImage = settings?.images?.bac_gen_hero || "https://picsum.photos/seed/bac-gen-hero/1920/1080";
  const introImage = settings?.images?.bac_gen_intro || "https://picsum.photos/seed/study-gen/800/600";

  const content = t.lycee_page.bac_gen;

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[65vh] flex items-center justify-center bg-[#0a192f] overflow-hidden">
          <Image 
            src={heroImage}
            alt="Bac Général"
            fill
            className="object-cover opacity-40"
            data-ai-hint="prestigious library university"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {content.title}
              </h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto uppercase tracking-widest font-light">
                {content.subtitle}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Quick Info Bar */}
        <section className="bg-primary py-6 text-white border-y border-white/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex items-center gap-3">
                <Clock className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.duration}</p>
                  <p className="font-bold text-sm">{content.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.level}</p>
                  <p className="font-bold text-sm">{content.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.campus_label}</p>
                  <p className="font-bold text-sm">{content.campuses}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.diploma}</p>
                  <p className="font-bold text-sm">Baccalauréat Général</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal className="mb-20 text-center">
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-black italic mb-8">
                {content.title_detail}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                {content.desc}
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
              <ScrollReveal className="space-y-8">
                <div className="p-8 bg-muted/30 rounded-[2.5rem] border border-muted">
                  <h3 className="text-2xl font-headline font-bold text-primary mb-6 flex items-center gap-3">
                    <BookOpen className="text-secondary" /> Fonctionnement
                  </h3>
                  <p className="text-muted-foreground leading-relaxed italic">
                    {content.system_desc}
                  </p>
                </div>
                <div className="p-6 bg-primary text-white rounded-2xl shadow-xl">
                  <div className="flex gap-4">
                    <Info className="text-secondary shrink-0" size={24} />
                    <p className="text-sm font-medium leading-relaxed">
                      {t.common.allophone_mention}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200} className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl bg-muted group">
                <Image 
                  src={introImage}
                  alt="Languages and Cultures"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white font-bold italic text-lg leading-tight">
                    "Maîtriser les langues, c'est s'ouvrir les portes du monde."
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Specialties Section */}
            <ScrollReveal className="mb-24">
              <h3 className="text-3xl font-headline font-bold text-primary mb-12 text-center uppercase tracking-widest underline underline-offset-8 decoration-secondary">
                {content.specialties_title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {content.specialties.map((spec: any, i: number) => (
                  <div key={i} className="p-8 bg-white border border-muted rounded-3xl shadow-sm hover:shadow-md transition-shadow group">
                    <h4 className="text-lg font-bold text-black mb-3 group-hover:text-secondary transition-colors">
                      • {spec.name}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {spec.desc}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-12 text-center text-muted-foreground font-medium italic p-8 bg-muted/20 rounded-2xl border border-dashed border-muted">
                {content.conclusion}
              </p>
            </ScrollReveal>

            {/* Profile & Qualities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
              <ScrollReveal className="bg-primary p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <h3 className="text-2xl font-headline font-bold mb-8 flex items-center gap-3 uppercase tracking-tighter">
                    <User className="text-secondary" /> {content.profile_title}
                  </h3>
                  <p className="mb-6 opacity-80">{content.profile_desc}</p>
                  <ul className="space-y-4">
                    {content.profile_list.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-secondary shrink-0 mt-1" />
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute top-0 right-0 opacity-5 p-8">
                  <GraduationCap size={150} />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="bg-white p-10 rounded-[3rem] border-2 border-primary relative overflow-hidden shadow-xl">
                <div className="relative z-10">
                  <h3 className="text-2xl font-headline font-bold text-primary mb-8 flex items-center gap-3 uppercase tracking-tighter">
                    <Star className="text-secondary" /> {content.qualities_title}
                  </h3>
                  <ul className="space-y-4">
                    {content.qualities_list.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full shrink-0 mt-2" />
                        <span className="text-sm text-muted-foreground font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute bottom-0 right-0 opacity-5 p-8 text-primary">
                  <Languages size={150} />
                </div>
              </ScrollReveal>
            </div>

            {/* French System Schema */}
            <ScrollReveal className="text-center mb-12">
              <h2 className="text-3xl font-headline font-bold text-primary mb-2 uppercase tracking-widest">Votre parcours de réussite</h2>
              <p className="text-muted-foreground">Découvrez les opportunités après votre Baccalauréat Général à l'ESEPF</p>
            </ScrollReveal>
            <FrenchSystemSchema bacType="Baccalauréat Général" />
          </div>
        </section>

        {/* Detailed Outlets Section */}
        <section className="py-24 bg-muted/10 border-y border-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <OutletsSection 
              btsDesc={content.bts_desc}
              univDesc={content.univ_desc}
              btsList={content.bts_list}
              btsJobs={content.bts_jobs}
              univList={content.univ_list}
              univJobs={content.univ_jobs}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal className="max-w-3xl mx-auto bg-muted rounded-[3rem] p-12 shadow-inner">
               <h2 className="text-3xl font-headline font-bold mb-6">Prêt à nous rejoindre ?</h2>
               <p className="text-muted-foreground mb-8">Les inscriptions pour la rentrée 2026-2027 sont ouvertes sur les campus d'Evron et Sainte-Bazeilles.</p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/inscription">
                    <Button className="rounded-full bg-primary py-8 px-10 font-bold uppercase tracking-widest">{t.common.apply}</Button>
                  </Link>
                  <Link href="/projet-equipe"><Button variant="outline" className="rounded-full py-8 px-10 font-bold uppercase tracking-widest">Rencontrer l'équipe</Button></Link>
               </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
