
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from '@/hooks/use-translation';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useDoc, useFirestore, useMemoFirebase, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Programs() {
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useTranslation();
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings } = useDoc(settingsRef);

  const settings = clientSettings || serverSettings;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const programs = useMemo(() => {
    if (!t.programs) return [];
    
    return [
      {
        id: 'college',
        title: t.programs.college?.title || "Collège",
        subtitle: t.programs.college?.subtitle || "",
        imageKey: 'programs_college',
        fallbackId: 'college-life',
        desc: t.programs.college?.desc || "",
        href: '/formations/college',
        features: [t.programs.college?.f1, t.programs.college?.f2, t.programs.college?.f3].filter(Boolean)
      },
      {
        id: 'lycee',
        title: t.programs.lycee?.title || "Lycée",
        subtitle: t.programs.lycee?.subtitle || "",
        imageKey: 'programs_lycee',
        fallbackId: 'bac-general',
        desc: t.programs.lycee?.desc || "",
        href: '/formations/lycee',
        features: [t.programs.lycee?.f1, t.programs.lycee?.f2, t.programs.lycee?.f3].filter(Boolean),
        subLinks: [
          { label: t.programs.lycee?.f1, href: '/formations/bac-general' },
          { label: t.programs.lycee?.f2, href: '/formations/bac-techno-stmg' },
        ]
      },
      {
        id: 'football',
        title: t.programs.academy?.title || "Academy",
        subtitle: t.programs.academy?.subtitle || "",
        imageKey: 'programs_academy',
        fallbackId: 'football-academy',
        desc: t.programs.academy?.desc || "",
        href: '/football-academy/programme',
        features: [t.programs.academy?.f1, t.programs.academy?.f2, t.programs.academy?.f3].filter(Boolean)
      }
    ];
  }, [t.programs]);

  if (!isMounted || programs.length === 0) {
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
            const fallbackUrl = PlaceHolderImages.find(img => img.id === prog.fallbackId)?.imageUrl;
            const customImage = settings?.images?.[prog.imageKey] || fallbackUrl;
            
            return (
              <TabsContent key={prog.id} value={prog.id} className="focus-visible:outline-none">
                <ScrollReveal>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 rounded-3xl shadow-xl">
                    <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-black shadow-inner">
                      {customImage && (
                        <img
                          src={customImage}
                          alt={prog.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">{prog.subtitle}</span>
                      <h3 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">{prog.title}</h3>
                      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        {prog.desc}
                      </p>
                      
                      {prog.subLinks ? (
                        <div className="grid grid-cols-1 gap-3 mb-10">
                          {prog.subLinks.map((link, i) => (
                            <Link 
                              key={i} 
                              href={link.href}
                              className="group/link flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-muted hover:border-secondary hover:bg-secondary/5 transition-all"
                            >
                              <span className="font-bold text-primary text-sm uppercase tracking-wider">{link.label}</span>
                              <ChevronRight size={18} className="text-secondary group-hover:translate-x-1 transition-transform" />
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-4 mb-10">
                          {prog.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-primary font-medium">
                              <span className="w-2 h-2 bg-secondary rounded-full mr-3" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}

                      <Link href={prog.href}>
                        <button className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg uppercase tracking-wider text-xs flex items-center justify-center gap-3 group">
                          {t.programs?.details_btn}
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </Link>
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
