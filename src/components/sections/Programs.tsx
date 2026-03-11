
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from '@/hooks/use-translation';

export function Programs() {
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const programs = [
    {
      id: 'college',
      title: t.programs.college.title,
      subtitle: t.programs.college.subtitle,
      image: 'college-life',
      desc: t.programs.college.desc,
      features: [t.programs.college.f1, t.programs.college.f2, t.programs.college.f3]
    },
    {
      id: 'lycee',
      title: t.programs.lycee.title,
      subtitle: t.programs.lycee.subtitle,
      image: 'bac-general',
      desc: t.programs.lycee.desc,
      features: [t.programs.lycee.f1, t.programs.lycee.f2, t.programs.lycee.f3]
    },
    {
      id: 'football',
      title: t.programs.academy.title,
      subtitle: t.programs.academy.subtitle,
      image: 'football-academy',
      desc: t.programs.academy.desc,
      features: [t.programs.academy.f1, t.programs.academy.f2, t.programs.academy.f3]
    }
  ];

  if (!isMounted) {
    return <section id="formations" className="py-24 bg-background min-h-[600px]"></section>;
  }

  return (
    <section id="formations" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-4">{t.sections.formations}</h2>
          <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            {t.sections.formations_desc}
          </p>
        </div>

        <Tabs defaultValue="college" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-4 bg-transparent mb-12">
            {programs.map((prog) => (
              <TabsTrigger 
                key={prog.id} 
                value={prog.id}
                className="py-4 text-lg font-bold border-2 border-muted data-[state=active]:border-secondary data-[state=active]:bg-white data-[state=active]:text-primary rounded-xl transition-all"
              >
                {prog.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {programs.map((prog) => {
            const imgData = PlaceHolderImages.find(img => img.id === prog.image);
            return (
              <TabsContent key={prog.id} value={prog.id} className="focus-visible:outline-none">
                <ScrollReveal>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 rounded-3xl shadow-xl">
                    <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-inner">
                      {imgData && (
                        <Image
                          src={imgData.imageUrl}
                          alt={prog.title}
                          fill
                          className="object-cover"
                          data-ai-hint={imgData.imageHint}
                        />
                      )}
                    </div>
                    <div>
                      <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">{prog.subtitle}</span>
                      <h3 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">{prog.title}</h3>
                      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        {prog.desc}
                      </p>
                      <ul className="space-y-4 mb-10">
                        {prog.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-primary font-medium">
                            <span className="w-2 h-2 bg-secondary rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg uppercase tracking-wider text-xs">
                        {t.programs.details_btn}
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
