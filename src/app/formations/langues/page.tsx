
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Languages, Globe, MessageSquare, Award, Users, Cpu, Library, BookOpen, CheckCircle2 } from 'lucide-react';
import { useDoc, useFirestore, useMemoFirebase, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LanguesPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings } = useDoc(settingsRef);
  
  const settings = clientSettings || serverSettings;

  const heroImage = settings?.images?.langues_hero;

  const pedagogyAxe = [
    { icon: <Users className="text-secondary" />, label: t.formations.pedagogy_item1 },
    { icon: <Globe className="text-secondary" />, label: t.formations.pedagogy_item2 },
    { icon: <Cpu className="text-secondary" />, label: t.formations.pedagogy_item3 },
    { icon: <CheckCircle2 className="text-secondary" />, label: t.formations.pedagogy_item4 },
  ];

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center bg-black overflow-hidden">
          {heroImage && (
            <img 
              src={heroImage}
              alt="Langues Étrangères"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          )}
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {t.formations.languages_excellence_title}
              </h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto uppercase tracking-widest font-light">
                {t.formations.languages_excellence_sub}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-24">
              <ScrollReveal>
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-8">{t.formations.passport_world_title}</h2>
                <p className="text-xl text-muted-foreground leading-relaxed italic">
                  {t.formations.passport_world_desc}
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* FLE Section */}
              <ScrollReveal className="bg-[#f5f1e8] p-12 rounded-[3rem] border border-[#d1c7b7] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-primary group-hover:scale-110 transition-transform">
                  <Languages size={200} />
                </div>
                <div className="relative z-10">
                  <div className="bg-primary text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                    <Globe size={32} />
                  </div>
                  <h3 className="text-3xl font-headline font-bold text-black mb-6 uppercase">{t.formations.fle_title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {t.formations.fle_desc}
                  </p>
                  <div className="flex gap-4">
                    <div className="px-4 py-2 bg-white/50 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/10">Immersion Totale</div>
                    <div className="px-4 py-2 bg-white/50 rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/10">Allophones</div>
                  </div>
                </div>
              </ScrollReveal>

              {/* EFL Section */}
              <ScrollReveal delay={200} className="bg-primary p-12 rounded-[3rem] shadow-xl relative overflow-hidden group text-white">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-white group-hover:rotate-12 transition-transform">
                  <BookOpen size={200} />
                </div>
                <div className="relative z-10">
                  <div className="bg-secondary text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                    <MessageSquare size={32} />
                  </div>
                  <h3 className="text-3xl font-headline font-bold mb-6 uppercase">{t.formations.efl_title}</h3>
                  <p className="text-lg text-white/70 leading-relaxed mb-8">
                    {t.formations.efl_desc}
                  </p>
                  <div className="flex gap-4">
                    <div className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">Bilinguisme</div>
                    <div className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">Littérature US</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-32 bg-muted/30 border-y border-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <ScrollReveal className="space-y-8">
                <div>
                  <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-2 block">{t.formations.pedagogy_subtitle}</span>
                  <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tighter uppercase leading-tight">
                    {t.formations.pedagogy_title}
                  </h2>
                </div>
                <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
                  <p className="font-medium text-black">{t.formations.pedagogy_p1}</p>
                  <p>{t.formations.pedagogy_p2}</p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {pedagogyAxe.map((item, i) => (
                  <ScrollReveal key={i} delay={i * 100} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-muted flex flex-col items-center text-center group hover:shadow-xl transition-all">
                    <div className="mb-6 p-4 bg-muted/50 rounded-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                    <p className="text-sm font-bold uppercase tracking-widest text-primary leading-tight">
                      {item.label}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Resources & Certifications */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Ressources */}
              <ScrollReveal className="lg:col-span-5 space-y-12">
                <div className="p-12 bg-primary rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 opacity-10">
                    <Cpu size={300} />
                  </div>
                  <h3 className="text-3xl font-headline font-bold mb-8 uppercase tracking-tighter flex items-center gap-4">
                    <Library className="text-secondary" /> {t.formations.resources_title}
                  </h3>
                  <p className="text-lg text-white/70 leading-relaxed">
                    {t.formations.resources_desc}
                  </p>
                </div>
              </ScrollReveal>

              {/* Certifications */}
              <ScrollReveal delay={200} className="lg:col-span-7 space-y-12">
                <div className="border-l-8 border-secondary pl-12">
                  <h2 className="text-4xl md:text-5xl font-headline font-bold text-black uppercase tracking-tighter mb-6">
                    {t.formations.cert_int_title}
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {t.formations.cert_int_desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-muted/20 rounded-3xl border border-muted hover:bg-white hover:shadow-lg transition-all flex items-center gap-6">
                    <div className="bg-white p-4 rounded-2xl shadow-sm"><Award className="text-secondary" size={32} /></div>
                    <div>
                      <h4 className="font-bold text-primary">CAMBRIDGE</h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">PET, FCE, CAE</p>
                    </div>
                  </div>
                  <div className="p-8 bg-muted/20 rounded-3xl border border-muted hover:bg-white hover:shadow-lg transition-all flex items-center gap-6">
                    <div className="bg-white p-4 rounded-2xl shadow-sm"><Award className="text-primary" size={32} /></div>
                    <div>
                      <h4 className="font-bold text-primary">DELF / DALF</h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">Niveaux A1 à C2</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#f5f5f5]">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal className="max-w-3xl mx-auto bg-white rounded-[4rem] p-12 lg:p-20 shadow-2xl border border-muted">
               <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8 uppercase tracking-tighter">
                 {t.common.ready_join}
               </h2>
               <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/inscription">
                    <Button className="h-16 px-12 rounded-full bg-primary text-white font-bold uppercase tracking-widest hover:bg-primary/90 shadow-xl transition-all">
                      {t.common.apply}
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="h-16 px-12 rounded-full border-2 border-primary text-primary font-bold uppercase tracking-widest hover:bg-primary/5 transition-all">
                      {t.common.contact_us}
                    </Button>
                  </Link>
               </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
