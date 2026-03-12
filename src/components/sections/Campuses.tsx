
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MapPin, ArrowRight } from 'lucide-react';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useTranslation } from '@/hooks/use-translation';

export function Campuses() {
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings, isLoading } = useDoc(settingsRef);
  
  const { t } = useTranslation();
  
  const campuses = [
    {
      id: "evron",
      name: "Campus Evron",
      location: t.campus_locations.evron,
      image: isLoading ? null : (settings?.images?.campus_evron || "https://picsum.photos/seed/evron-campus/600/400"),
      href: "/campus/evron"
    },
    {
      id: "sainte-bazeilles",
      name: "Campus Sainte-Bazeilles",
      location: t.campus_locations.bazeilles,
      image: isLoading ? null : (settings?.images?.campus_bazeilles || "https://picsum.photos/seed/bazeilles-campus/600/400"),
      href: "/campus/sainte-bazeilles"
    },
    {
      id: "sainte-tulle",
      name: "Campus Sainte-Tulle",
      location: t.campus_locations.tulle,
      image: isLoading ? null : (settings?.images?.campus_tulle || "https://picsum.photos/seed/tulle-campus/600/400"),
      href: "/campus/sainte-tulle"
    }
  ];

  return (
    <section id="campus" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-4">{t.sections.campuses}</h2>
          <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.sections.campuses_desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {campuses.map((campus, idx) => (
            <ScrollReveal key={idx} delay={idx * 150}>
              <Link href={campus.href} className="group relative block overflow-hidden rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-500 bg-black border border-white h-[400px] md:h-auto">
                <div className="relative h-full md:h-80 w-full overflow-hidden bg-black">
                  {campus.image && (
                    <Image
                      src={campus.image}
                      alt={campus.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                  <h3 className="text-2xl font-headline font-bold mb-2 group-hover:text-secondary transition-colors leading-tight">{campus.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/80">
                      <MapPin size={18} className="text-secondary shrink-0" />
                      <span className="text-sm font-medium leading-tight">{campus.location}</span>
                    </div>
                    <div className="bg-secondary text-white p-3 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-all shadow-lg transform md:translate-x-4 group-hover:translate-x-0">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
