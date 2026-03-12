
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
import { GraduationCap, History, Globe, Star, MapPin } from 'lucide-react';

export default function HistoryPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);
  
  const schoolName = settings?.schoolName || "ESEPF";
  const logoUrl = settings?.logoUrl;
  const mainImage = settings?.images?.history_main || "https://picsum.photos/seed/students-map/800/1000";

  const milestones = [
    { year: "2010", title: "Origines en Asie", desc: "Succès des premières académies Sport-Études en Chine et au Vietnam.", icon: <Globe size={24} /> },
    { year: "2018", title: "Fondation ESEPF", desc: "Inauguration du siège historique en France et du premier campus.", icon: <History size={24} /> },
    { year: "2022", title: "Label Élite", desc: "Reconnaissance officielle de l'Académie de Football par les instances internationales.", icon: <Star size={24} /> },
    { year: "2025", title: "Expansion Nationale", desc: "Ouverture des campus de Sainte-Bazeilles et Sainte-Tulle.", icon: <MapPin size={24} /> },
  ];

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* Header Hero */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal className="space-y-8">
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
                   <div>
                     <h1 className="text-5xl font-headline font-bold text-black tracking-tighter uppercase">{t.history_page.title}</h1>
                     <p className="text-secondary font-bold tracking-widest text-xs uppercase">{schoolName}</p>
                   </div>
                </div>

                <h2 className="text-4xl font-headline font-bold text-black leading-tight">
                  {t.history_page.subtitle}
                </h2>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>{t.history_page.intro_p1}</p>
                  <p>{t.history_page.intro_p2}</p>
                  <p className="pt-4 p-6 bg-white rounded-2xl shadow-sm border border-muted italic">
                    <span className="text-secondary font-bold block mb-2">Notre mission :</span> {t.history_page.intro_p3}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl bg-muted">
                <Image 
                  src={mainImage}
                  alt="Students"
                  fill
                  className="object-cover"
                  data-ai-hint="students group history"
                  priority
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary uppercase tracking-tighter">Nos Grandes Étapes</h2>
              <div className="w-24 h-1.5 bg-secondary mx-auto mt-4 rounded-full" />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((m, i) => (
                <ScrollReveal key={i} delay={i * 150} className="relative group">
                  <div className="p-10 bg-muted/30 rounded-[2.5rem] border border-muted hover:bg-primary hover:text-white transition-all duration-500 h-full">
                    <div className="bg-white text-primary p-4 rounded-2xl inline-block shadow-lg mb-6 group-hover:scale-110 transition-transform">
                      {m.icon}
                    </div>
                    <div className="text-3xl font-headline font-bold mb-2 text-secondary">{m.year}</div>
                    <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">{m.title}</h3>
                    <p className="text-sm opacity-70 leading-relaxed">{m.desc}</p>
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 text-muted opacity-20">
                      <History size={40} />
                    </div>
                  )}
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Quote / Vision */}
        <section className="py-24 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-5 -translate-y-1/4 translate-x-1/4">
            <Globe size={600} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-headline font-bold mb-12 italic">
                "Nous bâtissons un pont entre les cultures et les continents à travers l'excellence éducative."
              </h2>
              <div className="flex flex-col items-center">
                <div className="w-16 h-1 bg-secondary rounded-full mb-6" />
                <p className="text-lg uppercase tracking-[0.3em] font-medium opacity-60">Direction Générale ESEPF</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
