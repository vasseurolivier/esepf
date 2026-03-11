
"use client";

import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore } from '@/firebase';
import { GraduationCap, Book } from 'lucide-react';

export function StudentJourney() {
  const { t } = useTranslation();
  const db = useFirestore();
  const { data: settings } = useDoc(db, 'settings/global');

  const schoolLogo = settings?.logoUrl;

  const stages = [
    {
      id: 1,
      academic: {
        title: t.journey.college,
        age: t.journey.years_11_15,
        desc: t.journey.formation_4y
      },
      football: {
        title: t.journey.football_academy,
        age: t.journey.years_11_15,
        desc: t.journey.formation_4y
      },
      hasLogo: true
    },
    {
      id: 2,
      academic: {
        title: t.journey.lycee,
        age: t.journey.years_15_18,
        desc: t.journey.formation_3y
      },
      football: {
        title: t.journey.football_academy,
        age: t.journey.years_15_18,
        desc: t.journey.formation_3y
      },
      hasLogo: true
    },
    {
      id: 3,
      academic: {
        title: t.journey.university,
        age: t.journey.years_18_plus,
        desc: t.journey.university_desc
      },
      middle: {
        title: t.journey.metiers,
        age: t.journey.years_18_plus
      },
      football: {
        title: t.journey.pro_footballer,
        age: t.journey.years_18_plus,
        desc: ""
      }
    },
    {
      id: 4,
      academic: {
        title: t.journey.metiers,
        age: t.journey.years_20_plus,
        desc: ""
      }
    }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4">
        <ScrollReveal className="flex items-center gap-6 mb-8">
          <div className="p-3 border-2 border-primary rounded-xl">
            <GraduationCap className="text-primary w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tighter uppercase">
            {t.sections.journey_title}
          </h2>
        </ScrollReveal>

        <div className="relative max-w-7xl mx-auto py-16">
          {/* Ligne horizontale dorée */}
          <div className="absolute top-1/2 left-0 w-full h-2 bg-[#c5a059] -translate-y-1/2 z-0 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {stages.map((stage, idx) => (
              <div key={idx} className="relative group">
                
                {/* Point d'étape noir */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full border-4 border-white shadow-lg transition-transform group-hover:scale-125 z-20" />

                {/* Blason en arrière-plan (si présent) */}
                {stage.hasLogo && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-10 pointer-events-none -z-10 group-hover:opacity-20 transition-opacity">
                    {schoolLogo ? (
                      <img src={schoolLogo} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <GraduationCap className="w-full h-full" />
                    )}
                  </div>
                )}

                {/* Académique (Haut) */}
                <div className="mb-8 text-center h-40 flex flex-col justify-end transition-all group-hover:-translate-y-2">
                  <h3 className="text-lg font-headline font-bold text-black border-b border-black w-fit mx-auto pb-1 mb-1 uppercase tracking-wide">
                    {stage.academic.title}
                  </h3>
                  <p className="text-xs text-gray-500 italic mb-0.5">{stage.academic.age}</p>
                  <p className="text-[10px] text-gray-400 leading-tight">{stage.academic.desc}</p>
                </div>

                {/* Football / Métiers (Bas) */}
                <div className="mt-8 text-center h-40 transition-all group-hover:translate-y-2">
                  {stage.middle && (
                     <div className="mb-4">
                        <h4 className="text-lg font-headline font-bold text-black uppercase tracking-wide">{stage.middle.title}</h4>
                        <p className="text-xs text-gray-500">{stage.middle.age}</p>
                     </div>
                  )}
                  {stage.football && (
                    <>
                      <h3 className="text-lg font-headline font-bold text-[#e31e24] border-b border-[#e31e24] w-fit mx-auto pb-1 mb-1 uppercase tracking-wide">
                        {stage.football.title}
                      </h3>
                      <p className="text-xs text-gray-500 italic mb-0.5">{stage.football.age}</p>
                      <p className="text-[10px] text-gray-400 leading-tight">{stage.football.desc}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Décoration livre en bas à droite */}
        <div className="absolute bottom-10 right-10 opacity-5 -rotate-12 pointer-events-none">
          <Book size={150} />
        </div>
      </div>
    </section>
  );
}
