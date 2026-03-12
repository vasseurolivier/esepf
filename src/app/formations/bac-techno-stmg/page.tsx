
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { Briefcase, Clock, MapPin, Award, Info, BookOpen, Hotel, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FrenchSystemSchema } from '@/components/sections/FrenchSystemSchema';
import { OutletsSection } from '@/components/sections/OutletsSection';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';

export default function BacStmgPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);

  const heroImage = settings?.images?.bac_stmg_hero || "https://picsum.photos/seed/stmg-hero-pro/1920/1080";
  const introImage = settings?.images?.bac_stmg_intro || "https://picsum.photos/seed/stmg-team/800/600";

  const content = t.lycee_page.bac_stmg;

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[65vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src={heroImage}
            alt="Bac Techno STMG"
            fill
            className="object-cover opacity-40"
            data-ai-hint="business digital management team"
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
                <Briefcase className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.diploma}</p>
                  <p className="font-bold text-sm">Baccalauréat Technologique</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-black italic mb-8">
                {content.hero_title}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                {content.desc}
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <ScrollReveal className="space-y-6">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                  <Briefcase size={32} />
                </div>
                <h3 className="text-3xl font-headline font-bold text-black tracking-tight">
                  Demain, le Management
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {content.outro}
                </p>
                <div className="p-4 bg-muted/50 rounded-xl border-l-4 border-secondary flex gap-3">
                  <Info className="text-secondary shrink-0" size={20} />
                  <p className="text-sm font-bold text-primary">{t.common.allophone_mention}</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-muted">
                <Image 
                  src={introImage}
                  alt="Management team working"
                  fill
                  className="object-cover"
                />
              </ScrollReveal>
            </div>

            {/* Luxe Module Section */}
            <ScrollReveal className="mb-24">
              <div className="bg-[#f5f5f5] p-10 lg:p-16 rounded-[3rem] border border-muted shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-primary">
                  <Hotel size={300} />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto">
                  <h3 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-8 text-center">
                    {content.luxe_module_title}
                  </h3>
                  <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <p className="font-bold text-black">{content.luxe_module_p1}</p>
                    <p>{content.luxe_module_p2}</p>
                    <div className="p-8 bg-white rounded-2xl shadow-sm border border-muted italic border-l-8 border-secondary">
                      {content.luxe_module_p3}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                      <Star className="text-secondary" size={20} />
                      <span className="text-xs font-bold uppercase tracking-wider">Service d'excellence</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                      <CheckCircle2 className="text-secondary" size={20} />
                      <span className="text-xs font-bold uppercase tracking-wider">Codes du Luxe</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                      <BookOpen className="text-secondary" size={20} />
                      <span className="text-xs font-bold uppercase tracking-wider">Gestion Prestige</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* French System Schema */}
            <ScrollReveal className="text-center mb-12">
              <h2 className="text-3xl font-headline font-bold text-primary mb-2 uppercase tracking-widest">Votre avenir de manager</h2>
              <p className="text-muted-foreground">Une filière technologique pour des carrières ambitieuses</p>
            </ScrollReveal>
            <FrenchSystemSchema bacType="Baccalauréat Technologique STMG" />
          </div>
        </section>

        {/* Detailed Outlets Section */}
        <section className="py-24 bg-muted/10 border-y border-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <OutletsSection 
              btsDesc="Les BTS permettent une insertion professionnelle rapide ou une poursuite d'études."
              univDesc="Les universités et écoles de commerce offrent des parcours spécialisés de haut niveau."
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
               <h2 className="text-3xl font-headline font-bold mb-6">Prêt à devenir un leader ?</h2>
               <p className="text-muted-foreground mb-8">Les inscriptions pour la filière STMG & Luxe (Rentrée 2026) sont ouvertes. Développez votre potentiel management dès aujourd'hui.</p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/inscription">
                    <Button className="rounded-full bg-primary py-8 px-10 font-bold uppercase tracking-widest">{t.common.apply}</Button>
                  </Link>
                  <Link href="/contact"><Button variant="outline" className="rounded-full py-8 px-10 font-bold uppercase tracking-widest">Contactez un conseiller</Button></Link>
               </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
