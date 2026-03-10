
"use client";

import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { GraduationCap, BookOpen, Languages } from 'lucide-react';
import Link from 'next/link';
import { useFirestore, useDoc } from '@/firebase';

export function ThreeAxes() {
  const db = useFirestore();
  const { data: settings } = useDoc(db ? `settings/global` : null);
  const logoUrl = settings?.logoUrl;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="relative max-w-6xl mx-auto">
            
            {/* Desktop Layout (Circular) */}
            <div className="hidden lg:block relative h-[900px]">
              
              {/* Central Circle - Crest */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-80 h-80 rounded-full border-4 border-secondary/20 p-4 bg-white flex items-center justify-center shadow-2xl relative">
                  <div className="w-full h-full rounded-full border-2 border-secondary/40 flex items-center justify-center overflow-hidden p-6 bg-primary/5">
                    {logoUrl ? (
                      <img src={logoUrl} alt="ESEPF Crest" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <div className="text-primary flex flex-col items-center">
                        <GraduationCap size={80} className="text-secondary mb-2" />
                        <span className="font-headline font-bold text-2xl">ESEPF</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Orbits Decorations */}
                  <div className="absolute -inset-8 rounded-full border border-dashed border-secondary/30 animate-[spin_60s_linear_infinite]" />
                  <div className="absolute -inset-16 rounded-full border border-secondary/10" />
                </div>
              </div>

              {/* Axis 1: Scolarité (Top Left) */}
              <div className="absolute top-0 left-0 w-1/3">
                <div className="flex flex-col items-start text-left">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <GraduationCap className="text-secondary" size={32} />
                    </div>
                    <h3 className="text-3xl font-headline font-bold text-primary tracking-widest uppercase border-b-2 border-muted pb-2 pr-12">SCOLARITÉ</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Notre sport-études offre un cadre scolaire exigeant qui permet aux élèves de concilier projet sportif ambitieux et réussite académique.<br /><br />
                    Au collège, l'accent est mis sur l'acquisition des fondamentaux, le suivi personnalisé et l'organisation de travail pour apprendre à gérer à la fois les cours et les entraînements.<br /><br />
                    Au lycée, la scolarité s'oriente vers la préparation du baccalauréat, avec des exigences renforcées, un accompagnement méthodologique et une aide à l'orientation supérieure.<br /><br />
                    L'objectif est de former des élèves autonomes, curieux et capables de s'épanouir autant sur le terrain qu'en classe.
                  </p>
                  <div className="space-y-2">
                    <Link href="#college" className="block text-primary font-bold border-b border-primary w-fit hover:text-secondary hover:border-secondary transition-colors">
                      Collège (11 ans - 15 ans)
                    </Link>
                    <Link href="#lycee" className="block text-primary font-bold border-b border-primary w-fit hover:text-secondary hover:border-secondary transition-colors">
                      Lycée (15 ans - 18 ans)
                    </Link>
                  </div>
                </div>
              </div>

              {/* Axis 2: Football Academy (Top Right) */}
              <div className="absolute top-0 right-0 w-1/3 text-right">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-3xl font-headline font-bold text-primary tracking-widest uppercase border-b-2 border-muted pb-2 pl-12">FOOTBALL ACADEMY</h3>
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-secondary fill-current">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c1.02 0 1.99.19 2.89.54L13 7.82V9h-2V7.82L9.11 4.54C10.01 4.19 10.98 4 12 4zM6.63 5.75l2.25 3.12-1.42 1.42-3.12-2.25C4.94 7.03 5.72 6.32 6.63 5.75zm-1.88 5.4c.1-.4.23-.78.4-1.15l3.52.54-.54 3.52c-.37-.17-.75-.3-1.15-.4L6.63 12h-.28c.15-.29.28-.57.4-.85zM8.5 17.37c-.91-.57-1.69-1.28-2.29-2.29l3.12-2.25 1.42 1.42-2.25 3.12zM12 20c-1.02 0-1.99-.19-2.89-.54L11 16.18V15h2v1.18l1.89 3.28c-.9.35-1.87.54-2.89.54zm5.37-2.63l-2.25-3.12 1.42-1.42 3.12 2.25c-.6.91-1.38 1.72-2.29 2.29zm1.88-5.4l-3.52-.54.54-3.52c.37.17.75.3 1.15.4l.35 1.61h.28c-.15.29-.28.57-.4.85l-.4 1.2zM17.37 5.75c.91.57 1.69 1.28 2.29 2.29l-3.12 2.25-1.42-1.42 2.25-3.12z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    L'Academy de football propose un programme de formation élite français visant à développer des joueurs complets, capables d'évoluer au plus haut niveau tout en respectant l'exigence du football hexagonal.<br /><br />
                    Les séances sont structurées et assurées par des entraîneurs diplômés et expérimentés. Grâce à son statut et à ses partenariats, l'Academy permet à ses joueurs d'accéder aux compétitions officielles françaises.<br /><br />
                    L'objectif est de donner à chaque joueur les meilleurs outils pour progresser, se faire repérer et s'inscrire durablement dans un projet de haut niveau.
                  </p>
                  <div className="space-y-2">
                    <Link href="#football" className="block text-primary font-bold border-b border-primary w-fit hover:text-secondary hover:border-secondary transition-colors">
                      Championnats officiel Français
                    </Link>
                    <Link href="#football" className="block text-primary font-bold border-b border-primary w-fit hover:text-secondary hover:border-secondary transition-colors">
                      Elite Football programme
                    </Link>
                  </div>
                </div>
              </div>

              {/* Axis 3: Langues Étrangères (Bottom) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 text-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <Languages className="text-secondary" size={32} />
                    </div>
                    <h3 className="text-3xl font-headline font-bold text-primary tracking-widest uppercase border-b-2 border-muted pb-2 px-12">LANGUES ÉTRANGÈRES</h3>
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <BookOpen className="text-secondary" size={32} />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Notre établissement propose une formation renforcée en français langue étrangère (FLE) et en anglais langue étrangère (EFL) afin d'accompagner au mieux les élèves non francophones ou souhaitant perfectionner leur niveau.<br /><br />
                    Les cours sont organisés en petits groupes pour favoriser la participation orale, la compréhension et la progression individuelle. Les enseignants adaptent leurs supports aux besoins de chaque élève, en travaillant aussi bien la grammaire que le vocabulaire et les situations concrètes de communication.
                  </p>
                </div>
              </div>

              {/* Connecting Lines (Decorative) */}
              <svg className="absolute inset-0 w-full h-full -z-10 opacity-20" viewBox="0 0 1000 1000">
                <line x1="250" y1="350" x2="400" y2="450" stroke="black" strokeWidth="1" />
                <line x1="750" y1="350" x2="600" y2="450" stroke="black" strokeWidth="1" />
                <line x1="500" y1="850" x2="500" y2="650" stroke="black" strokeWidth="1" />
              </svg>
            </div>

            {/* Mobile Layout (Stacked) */}
            <div className="lg:hidden space-y-16">
              <div className="flex justify-center mb-8">
                <div className="w-48 h-48 rounded-full border-2 border-secondary/20 p-2 bg-white flex items-center justify-center shadow-xl">
                   {logoUrl ? (
                    <img src={logoUrl} alt="ESEPF Crest" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <GraduationCap size={48} className="text-secondary" />
                  )}
                </div>
              </div>

              <div className="space-y-12">
                {/* Scolarité */}
                <div className="text-center">
                  <h3 className="text-2xl font-headline font-bold text-primary mb-4 border-b-2 border-secondary/20 inline-block pb-1">SCOLARITÉ</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Notre sport-études offre un cadre scolaire exigeant qui permet aux élèves de concilier projet sportif ambitieux et réussite académique.
                  </p>
                  <div className="flex flex-col gap-2 items-center">
                    <Link href="#college" className="text-primary font-bold border-b border-primary">Collège (11-15 ans)</Link>
                    <Link href="#lycee" className="text-primary font-bold border-b border-primary">Lycée (15-18 ans)</Link>
                  </div>
                </div>

                {/* Football */}
                <div className="text-center">
                  <h3 className="text-2xl font-headline font-bold text-primary mb-4 border-b-2 border-secondary/20 inline-block pb-1">FOOTBALL ACADEMY</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    L'Academy de football propose un programme de formation élite français visant à développer des joueurs complets.
                  </p>
                  <div className="flex flex-col gap-2 items-center">
                    <Link href="#football" className="text-primary font-bold border-b border-primary">Championnats officiels</Link>
                    <Link href="#football" className="text-primary font-bold border-b border-primary">Elite Programme</Link>
                  </div>
                </div>

                {/* Langues */}
                <div className="text-center">
                  <h3 className="text-2xl font-headline font-bold text-primary mb-4 border-b-2 border-secondary/20 inline-block pb-1">LANGUES ÉTRANGÈRES</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Formation renforcée en FLE et EFL pour accompagner nos élèves vers l'international.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
