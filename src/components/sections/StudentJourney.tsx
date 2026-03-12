
"use client";

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { GraduationCap, Book, ChevronDown } from 'lucide-react';

export function StudentJourney() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings, isLoading } = useDoc(settingsRef);

  const schoolLogo = settings?.logoUrl;
  const panImgUrl = isLoading ? null : settings?.images?.campus_panoramic;

  const stages = [
    {
      id: 1,
      academic: {
        title: t.journey.college,
        age: t.journey.years_11_15,
        desc: t.journey.years_11_15_desc
      },
      football: {
        title: t.journey.football_academy,
        age: t.journey.years_11_15,
        desc: t.journey.years_11_15_desc
      },
      hasLogo: true
    },
    {
      id: 2,
      academic: {
        title: t.journey.lycee,
        age: t.journey.years_15_18,
        desc: t.journey.years_15_18_desc
      },
      football: {
        title: t.journey.football_academy,
        age: t.journey.years_15_18,
        desc: t.journey.years_15_18_desc
      },
      hasLogo: true
    },
    {
      id: 3,
      academic: {
        title: t.journey.university,
        age: t.journey.years_18_plus,
        desc: t.journey.years_18_plus_desc
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
    <>
      <div className="w-full h-[250px] md:h-[450px] relative overflow-hidden bg-black">
        {panImgUrl && (
          <Image
            src={panImgUrl}
            alt="Campus Panoramic View"
            fill
            className="object-cover animate-in fade-in duration-700"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
      </div>

      <section className="py-20 md:py-24 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6">
          <ScrollReveal className="flex items-center gap-4 md:gap-6 mb-12">
            <div className="p-2 md:p-3 border-2 border-primary rounded-xl">
              < GraduationCap className="text-primary w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h2 className="text-3xl md:text-6xl font-headline font-bold text-primary tracking-tighter uppercase leading-none">
              {t.sections.journey_title}
            </h2>
          </ScrollReveal>

          <div className="relative max-w-7xl mx-auto md:py-12">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-2 bg-[#c5a059] -translate-y-1/2 z-0 rounded-full" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
              {stages.map((stage, idx) => (
                <div key={idx} className="relative group flex flex-col md:block">
                  <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full border-4 border-white shadow-lg transition-transform group-hover:scale-125 z-20" />

                  {stage.hasLogo && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-5 md:opacity-10 pointer-events-none -z-10 group-hover:opacity-20 transition-opacity">
                      {schoolLogo ? (
                        <img src={schoolLogo} alt="Logo" className="w-full h-full object-contain" />
                      ) : (
                        <GraduationCap className="w-full h-full" />
                      )}
                    </div>
                  )}

                  {idx < stages.length - 1 && (
                    <div className="md:hidden absolute left-6 top-10 bottom-0 w-0.5 bg-muted z-0 border-dashed border-primary/20 border-l-2" />
                  )}

                  <div className="flex items-start gap-6 md:block">
                    <div className="md:hidden w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0 z-10 shadow-lg border-4 border-white">
                      {stage.id}
                    </div>

                    <div className="flex-1 pb-12 md:pb-0">
                      <div className="mb-4 md:mb-8 text-left md:text-center md:h-40 flex flex-col justify-end transition-all group-hover:-translate-y-2">
                        <h3 className="text-lg font-headline font-bold text-black border-b-2 border-black/10 md:border-black w-fit md:mx-auto pb-1 mb-1 uppercase tracking-wide">
                          {stage.academic.title}
                        </h3>
                        <p className="text-xs text-secondary font-bold italic mb-0.5">{stage.academic.age}</p>
                        <p className="text-[10px] text-gray-400 leading-tight uppercase font-medium">{stage.academic.desc}</p>
                      </div>

                      <div className="md:mt-8 text-left md:text-center md:h-40 transition-all group-hover:translate-y-2">
                        {stage.middle && (
                           <div className="mb-4">
                              <h4 className="text-lg font-headline font-bold text-black uppercase tracking-wide">{stage.middle.title}</h4>
                              <p className="text-xs text-gray-500">{stage.middle.age}</p>
                           </div>
                        )}
                        {stage.football && (
                          <div className="p-4 bg-muted/30 rounded-2xl md:bg-transparent md:p-0">
                            <h3 className="text-sm md:text-lg font-headline font-bold text-[#e31e24] border-b border-[#e31e24]/20 md:border-[#e31e24] w-fit md:mx-auto pb-1 mb-1 uppercase tracking-wide">
                              {stage.football.title}
                            </h3>
                            <p className="text-[10px] text-gray-500 italic mb-0.5">{stage.football.age}</p>
                            <p className="text-[9px] text-gray-400 leading-tight uppercase">{stage.football.desc}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden flex justify-center mt-8 text-primary animate-bounce">
            <ChevronDown size={24} />
          </div>

          <div className="absolute bottom-10 right-10 opacity-5 -rotate-12 pointer-events-none hidden md:block">
            <Book size={150} />
          </div>
        </div>
      </section>
    </>
  );
}
