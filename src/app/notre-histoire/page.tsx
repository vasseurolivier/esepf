
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore } from '@/firebase';
import { GraduationCap, MapPin, History, Award, Calendar } from 'lucide-react';

export default function HistoryPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { data: settings } = useDoc(db, 'settings/global');
  
  const schoolName = settings?.schoolName || "ESEPF";
  const logoUrl = settings?.logoUrl;

  const milestones = [
    { year: "1984", desc: t.history_page.milestone_1, icon: <MapPin /> },
    { year: "1998", desc: t.history_page.milestone_2, icon: <History /> },
    { year: "2015", desc: t.history_page.milestone_3, icon: <Award /> },
    { year: "2023", desc: t.history_page.milestone_4, icon: <Calendar /> },
  ];

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Main Content Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <ScrollReveal className="space-y-8">
                {/* Logo and School Name */}
                <div className="flex items-center gap-6 mb-12">
                   <div className="w-24 h-24 relative">
                     {logoUrl ? (
                        <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                     ) : (
                        <div className="w-full h-full border-2 border-primary rounded-full flex items-center justify-center">
                          <GraduationCap className="text-primary w-12 h-12" />
                        </div>
                     )}
                   </div>
                   <h2 className="text-5xl font-headline font-bold text-black tracking-tighter">{schoolName}</h2>
                </div>

                <h3 className="text-4xl font-headline font-bold text-black leading-tight">
                  {t.history_page.subtitle}
                </h3>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>{t.history_page.intro_p1}</p>
                  <p>{t.history_page.intro_p2}</p>
                  <p className="pt-4">
                    <span className="text-secondary font-bold">Notre mission ?</span> {t.history_page.intro_p3}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl lg:translate-y-12">
                <Image 
                  src="https://picsum.photos/seed/students-map/800/1000"
                  alt="Students looking at map"
                  fill
                  className="object-cover"
                  data-ai-hint="students group"
                  priority
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-muted/10">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="relative space-y-16 mt-12">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-muted -translate-x-1/2" />
              
              {milestones.map((milestone, i) => (
                <ScrollReveal key={i} delay={i * 200} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 text-center md:text-right">
                    {i % 2 === 0 ? (
                      <div>
                        <span className="text-4xl font-headline font-bold text-secondary">{milestone.year}</span>
                        <p className="text-lg text-muted-foreground mt-2">{milestone.desc}</p>
                      </div>
                    ) : null}
                  </div>
                  
                  <div className="relative z-10 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-xl border-4 border-white">
                    {milestone.icon}
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    {i % 2 !== 0 ? (
                      <div>
                        <span className="text-4xl font-headline font-bold text-secondary">{milestone.year}</span>
                        <p className="text-lg text-muted-foreground mt-2">{milestone.desc}</p>
                      </div>
                    ) : null}
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
