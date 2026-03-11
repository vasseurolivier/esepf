
"use client";

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Trophy, GraduationCap, Route, HeartPulse, Globe, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDoc, useFirestore } from '@/firebase';
import { useTranslation } from '@/hooks/use-translation';

export function FootballAcademy() {
  const db = useFirestore();
  const { data: settings } = useDoc(db, 'settings/global');
  const { t } = useTranslation();
  
  const footballImgUrl = settings?.images?.football_academy || PlaceHolderImages.find(img => img.id === 'football-academy')?.imageUrl;

  const academyFeatures = [
    { icon: <Trophy className="text-secondary" />, title: t.academy_features.f1_title, desc: t.academy_features.f1_desc },
    { icon: <GraduationCap className="text-secondary" />, title: t.academy_features.f2_title, desc: t.academy_features.f2_desc },
    { icon: <Route className="text-secondary" />, title: t.academy_features.f3_title, desc: t.academy_features.f3_desc },
    { icon: <HeartPulse className="text-secondary" />, title: t.academy_features.f4_title, desc: t.academy_features.f4_desc },
    { icon: <Globe className="text-secondary" />, title: t.academy_features.f5_title, desc: t.academy_features.f5_desc },
    { icon: <Briefcase className="text-secondary" />, title: t.academy_features.f6_title, desc: t.academy_features.f6_desc },
  ];

  return (
    <section id="football" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-4">Elite Education</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-8 leading-tight">
              {t.sections.football_title.split(':').map((part, i) => (
                <React.Fragment key={i}>
                  {i === 0 ? part : <><br /><span className="text-secondary">{part}</span></>}
                </React.Fragment>
              ))}
            </h3>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              {t.sections.football_desc}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {academyFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/30 transition-colors group">
                  <div className="mt-1 transform group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1 uppercase text-[10px] tracking-widest">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-bold uppercase tracking-wider">
              {t.academy_features.cta}
            </Button>
          </div>

          <div className="lg:w-1/2 relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
            {footballImgUrl && (
              <Image
                src={footballImgUrl}
                alt="Football Academy"
                fill
                className="object-cover"
              />
            )}
            <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-sm p-6 rounded-2xl border-l-8 border-secondary">
              <p className="text-white font-bold italic">
                "Plus qu'une école, une rampe de lancement vers le professionnalisme."
              </p>
              <p className="text-sm text-white/70 mt-2">— Direction Technique, {settings?.schoolName || "ESEPF"}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
