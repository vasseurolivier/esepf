
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MapPin, School, GraduationCap, Building2, Target, BookOpen, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';

export default function CampusEvronPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);
  
  const heroImage = settings?.images?.campus_evron || "https://picsum.photos/seed/evron-hero-v2/1920/1080";
  const mapImage = settings?.images?.evron_map;
  
  const infraImages = [
    settings?.images?.evron_infra_1 || "https://picsum.photos/seed/evron-infra-1/800/600",
    settings?.images?.evron_infra_2 || "https://picsum.photos/seed/evron-infra-2/800/600",
    settings?.images?.evron_infra_3 || "https://picsum.photos/seed/evron-infra-3/800/600",
  ];

  return (
    <main className="min-h-screen">
      <Header />
      <section className="relative h-[70vh] flex items-center justify-center bg-black overflow-hidden">
        <Image 
          src={heroImage}
          alt="Campus Evron"
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 text-center text-white container px-4">
          <ScrollReveal>
            <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">{t.campus_pages.evron_hero}</h1>
            <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto border-t border-white/30 pt-4">
              {t.campus_pages.evron_sub}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest mb-4">
                <MapPin size={20} />
                {t.campus_pages.city_title}
              </div>
              <h2 className="text-4xl font-headline font-bold text-primary mb-6">{t.axes.scolarite}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t.axes.scolarite_desc}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-muted rounded-2xl border border-border">
                  <h4 className="font-bold text-primary mb-2 italic">Mayenne (53)</h4>
                  <p className="text-sm text-muted-foreground">Pays de la Loire, France.</p>
                </div>
                <div className="p-6 bg-muted rounded-2xl border border-border">
                  <h4 className="font-bold text-primary mb-2 italic">Football Academy</h4>
                  <p className="text-sm text-muted-foreground">{t.axes.academy_desc.substring(0, 100)}...</p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="relative aspect-square bg-black rounded-[3rem] overflow-hidden flex items-center justify-center border-2 border-dashed border-primary/10">
              {mapImage ? (
                <div className="relative w-full h-full p-8">
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-muted">
                    <Image 
                      src={mapImage}
                      alt="Localisation Evron"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 bg-white/5backdrop-blur-sm rounded-3xl m-8 shadow-inner w-full flex flex-col items-center justify-center">
                  <ImageIcon size={48} className="text-muted mb-4" />
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Image de la carte non définie</p>
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6"><Building2 size={32} /></div>
            <h2 className="text-4xl font-headline font-bold text-primary mb-6">{t.campus_pages.infra_title}</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Des installations modernes conçues pour l'épanouissement académique et sportif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {infraImages.map((img, i) => (
              <ScrollReveal key={i} delay={i * 100} className="relative group rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-video">
                <Image src={img} alt="Campus Infrastructure" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
              </ScrollReveal>
            ))}
          </div>

          <div className="bg-primary rounded-[3rem] p-12 text-white shadow-2xl overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-3xl font-headline font-bold mb-12 flex items-center gap-3">
                <School className="text-secondary" />
                {t.nav.formations} disponibles sur ce campus
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="mt-1 text-secondary"><BookOpen size={24} /></div>
                  <div>
                    <h4 className="font-bold text-lg">{t.programs.college.title}</h4>
                    <p className="text-sm text-white/60">{t.programs.college.desc}</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="mt-1 text-secondary"><GraduationCap size={24} /></div>
                  <div>
                    <h4 className="font-bold text-lg">{t.programs.lycee.title}</h4>
                    <p className="text-sm text-white/60">Général, STMG, Pro Vente</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="mt-1 text-secondary"><Target size={24} /></div>
                  <div>
                    <h4 className="font-bold text-lg">{t.programs.academy.title}</h4>
                    <p className="text-sm text-white/60">{t.programs.academy.desc}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Link href="/inscription">
                  <Button className="bg-secondary text-white font-bold py-8 px-12 rounded-full shadow-2xl hover:bg-secondary/90 transition-all uppercase tracking-widest text-base">
                    {t.common.register}
                  </Button>
                </Link>
                <p className="text-xs text-white/40 mt-4 text-center">{t.campus_pages.apply_now}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
