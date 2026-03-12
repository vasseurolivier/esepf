
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
import { GraduationCap, BookOpen, UserCheck, ShieldCheck, Star, Sparkles } from 'lucide-react';

export default function CollegePage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);

  const heroImage = settings?.images?.college_hero || "https://picsum.photos/seed/college-hero-v3/1920/1080";

  const successKeys = [
    { icon: <UserCheck className="text-secondary" />, title: "Autonomie", desc: "Apprendre à s'organiser dès le plus jeune âge pour réussir son double projet." },
    { icon: <BookOpen className="text-secondary" />, title: "Excellence", desc: "Un programme académique exigeant validé par l'Éducation Nationale." },
    { icon: <Sparkles className="text-secondary" />, title: "Épanouissement", desc: "Concilier passion sportive et amitiés durables dans un cadre sécurisant." }
  ];

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-[#fdfaf5]">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center bg-primary overflow-hidden">
          <Image 
            src={heroImage}
            alt="Collège ESEPF"
            fill
            className="object-cover opacity-50"
            data-ai-hint="modern school hallway students"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <span className="text-secondary font-bold uppercase tracking-[0.4em] text-sm mb-4 block">11 - 15 ANS</span>
              <h1 className="text-6xl md:text-9xl font-headline font-bold mb-6 uppercase tracking-tighter leading-none">
                {t.college_page.title}
              </h1>
              <div className="w-24 h-2 bg-secondary mx-auto rounded-full" />
            </ScrollReveal>
          </div>
        </section>

        {/* Intro Concept */}
        <section className="py-32">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div className="space-y-8 text-2xl text-black leading-tight font-headline font-bold">
                  <p className="border-l-8 border-secondary pl-8">{t.college_page.p1}</p>
                </div>
                <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                  <p>{t.college_page.p2}</p>
                  <p>{t.college_page.p3}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {successKeys.map((key, i) => (
                  <div key={i} className="p-10 bg-white rounded-[3rem] shadow-xl border border-muted hover:translate-y-[-10px] transition-all duration-500">
                    <div className="mb-6">{key.icon}</div>
                    <h3 className="text-xl font-bold uppercase mb-4 tracking-tight">{key.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{key.desc}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-8 text-xl text-muted-foreground leading-relaxed border-t border-muted pt-16">
                <p>{t.college_page.p4}</p>
                <p>{t.college_page.p5}</p>
                <p>{t.college_page.p6}</p>
              </div>

              {/* Interactive Program Timeline */}
              <div className="bg-primary text-white p-12 lg:p-20 rounded-[4rem] shadow-2xl mt-24 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 opacity-10 translate-y-1/4 translate-x-1/4">
                  <GraduationCap size={400} />
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-bold mb-16 uppercase tracking-tighter relative z-10">
                  {t.college_page.prog_title}
                </h2>
                
                <div className="space-y-16 relative z-10">
                  <div className="flex flex-col md:flex-row gap-8 md:gap-16 group">
                    <div className="text-5xl font-headline font-bold text-secondary opacity-40 group-hover:opacity-100 transition-opacity shrink-0">01</div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold border-b border-white/20 pb-4 uppercase tracking-tight">
                        {t.college_page.year1_title}
                      </h3>
                      <p className="text-lg leading-relaxed text-white/70">
                        {t.college_page.year1_desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 md:gap-16 group">
                    <div className="text-5xl font-headline font-bold text-secondary opacity-40 group-hover:opacity-100 transition-opacity shrink-0">02</div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold border-b border-white/20 pb-4 uppercase tracking-tight">
                        {t.college_page.year2_title}
                      </h3>
                      <p className="text-lg leading-relaxed text-white/70">
                        Une année charnière pour approfondir les compétences académiques et sportives tout en s'intégrant pleinement à la vie de l'Institution.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 md:gap-16 group">
                    <div className="text-5xl font-headline font-bold text-secondary opacity-40 group-hover:opacity-100 transition-opacity shrink-0">03</div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold border-b border-white/20 pb-4 uppercase tracking-tight">
                        {t.college_page.year3_title}
                      </h3>
                      <p className="text-lg leading-relaxed text-white/70">
                        Préparation intensive aux épreuves du Brevet des Collèges (DNB) et orientation personnalisée vers les filières d'excellence de notre Lycée.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-20 text-center">
                <div className="inline-flex p-4 rounded-full bg-secondary/10 text-secondary mb-6"><ShieldCheck size={32} /></div>
                <p className="text-2xl text-primary font-headline font-bold italic leading-relaxed max-w-3xl mx-auto">
                  {t.college_page.conclusion}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
