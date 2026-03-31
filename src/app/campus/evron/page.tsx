
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MapPin, School, GraduationCap, Building2, Target, BookOpen, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore, useMemoFirebase, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CampusEvronPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings, isLoading } = useDoc(settingsRef);
  
  const settings = clientSettings || serverSettings;
  
  const heroImage = settings?.images?.campus_evron;
  const mapImage = settings?.images?.evron_map;
  
  const infraImages = [
    settings?.images?.evron_infra_1,
    settings?.images?.evron_infra_2,
    settings?.images?.evron_infra_3,
    settings?.images?.evron_infra_4,
    settings?.images?.evron_infra_5,
    settings?.images?.evron_infra_6,
  ].filter(Boolean) as string[];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="relative h-[70vh] flex items-center justify-center bg-black overflow-hidden">
        {heroImage && (
          <Image 
            src={heroImage}
            alt="Campus Pays de la Loire (Le Mans)"
            fill
            className="object-cover opacity-60"
            priority
            sizes="100vw"
          />
        )}
        <div className="relative z-10 text-center text-white container px-4">
          <ScrollReveal>
            <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">{t.campus_pages.evron_hero}</h1>
            <div className="w-24 h-1.5 bg-[#D4AF37] mx-auto mb-6 rounded-full" />
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
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold uppercase tracking-widest mb-4">
                <MapPin size={20} />
                {t.campus_pages.city_title}
              </div>
              <h2 className="text-4xl font-headline font-bold text-primary mb-6">{t.axes.scolarite}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t.axes.scolarite_desc}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-muted rounded-2xl border border-border">
                  <h4 className="font-bold text-primary mb-2 italic">{t.campus_pages.evron_region}</h4>
                  <p className="text-sm text-muted-foreground">{t.campus_pages.evron_region_desc}</p>
                </div>
                <div className="p-6 bg-muted rounded-2xl border border-border">
                  <h4 className="font-bold text-primary mb-2 italic">{t.axes.academy_title}</h4>
                  <p className="text-sm text-muted-foreground">{t.axes.academy_desc.substring(0, 100)}...</p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="relative aspect-square bg-white rounded-[3rem] overflow-hidden flex items-center justify-center border border-[#D4AF37]/20 shadow-xl">
              {mapImage ? (
                <div className="relative w-full h-full p-6">
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-muted">
                    <Image 
                      src={mapImage}
                      alt="Localisation Campus Pays de la Loire (Le Mans)"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              ) : !isLoading && (
                <div className="text-center p-8 bg-muted/30 backdrop-blur-sm rounded-3xl m-8 shadow-inner w-full flex flex-col items-center justify-center">
                  <ImageIcon size={48} className="text-muted mb-4" />
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t.campus_pages.map_not_defined}</p>
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
              {t.campus_pages.modern_infra_desc}
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-24 px-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {infraImages.map((img, i) => (
                  <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <ScrollReveal delay={i * 100} className="relative group rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-video h-full">
                      <Image 
                        src={img} 
                        alt={`Infrastructure ${i+1}`} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                      />
                    </ScrollReveal>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-[-3rem] md:left-[-4rem] h-12 w-12 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white" />
              <CarouselNext className="right-[-3rem] md:right-[-4rem] h-12 w-12 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white" />
            </Carousel>
          </div>

          <div className="bg-primary rounded-[3rem] p-12 text-white shadow-2xl overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-3xl font-headline font-bold mb-12 flex items-center gap-3">
                <School className="text-[#D4AF37]" />
                {t.nav.formations} {t.campus_pages.available_on_campus}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="mt-1 text-[#D4AF37]"><BookOpen size={24} /></div>
                  <div>
                    <h4 className="font-bold text-lg">{t.programs.college.title}</h4>
                    <p className="text-sm text-white/60">{t.programs.college.desc}</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="mt-1 text-[#D4AF37]"><GraduationCap size={24} /></div>
                  <div>
                    <h4 className="font-bold text-lg">{t.programs.lycee.title}</h4>
                    <p className="text-sm text-white/60">{t.campus_pages.lycee_options}</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="mt-1 text-[#D4AF37]"><Target size={24} /></div>
                  <div>
                    <h4 className="font-bold text-lg">{t.programs.academy.title}</h4>
                    <p className="text-sm text-white/60">{t.programs.academy.desc}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Link href="/inscription">
                  <Button className="bg-[#D4AF37] text-white font-bold py-8 px-12 rounded-full shadow-2xl hover:bg-[#D4AF37]/90 transition-all uppercase tracking-widest text-base">
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
