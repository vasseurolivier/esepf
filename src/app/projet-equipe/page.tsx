
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { ShieldCheck, GraduationCap, Heart, Users, Target, Zap } from 'lucide-react';

export default function TeamPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);

  const projectHero = settings?.images?.team_project_hero || "https://picsum.photos/seed/esepf-team-hero/1920/1080";
  const teamMember1 = settings?.images?.team_member_1 || "https://picsum.photos/seed/member-1/500/500";
  const teamMember2 = settings?.images?.team_member_2 || "https://picsum.photos/seed/member-2/500/500";
  const teamMember3 = settings?.images?.team_member_3 || "https://picsum.photos/seed/member-3/500/500";

  const members = [
    { name: "Direction", role: "Responsable Académique", img: teamMember1 },
    { name: "Staff Technique", role: "Expert Football UEFA", img: teamMember2 },
    { name: "Administration", role: "Coordinatrice Campus", img: teamMember3 }
  ];

  const values = [
    { icon: <Heart className="text-secondary" />, title: "Discipline", desc: "La clé de l'excellence sur le terrain comme en classe." },
    { icon: <Users className="text-secondary" />, title: "Solidarité", desc: "Un esprit d'équipe qui dépasse les frontières." },
    { icon: <Target className="text-secondary" />, title: "Ambition", desc: "Viser les sommets académiques et sportifs mondiaux." },
    { icon: <Zap className="text-secondary" />, title: "Innovation", desc: "Des méthodes pédagogiques modernes et adaptées." }
  ];

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* Section Concept Hero */}
        <section className="flex flex-col lg:flex-row min-h-[700px]">
          <div className="lg:w-[45%] bg-[#1a3d2f] p-12 lg:p-24 flex flex-col justify-center items-start relative overflow-hidden">
            <Image 
              src={projectHero}
              alt="Project Hero"
              fill
              className="object-cover opacity-20"
            />
            <ScrollReveal className="relative z-10 w-full">
              <span className="text-secondary font-bold uppercase tracking-[0.4em] text-xs mb-4 block">- VISION 2026 -</span>
              <h1 className="text-6xl md:text-8xl font-headline font-bold text-white mb-12 tracking-tighter uppercase leading-none">
                {t.team_page.title}
              </h1>
              
              <div className="w-full flex justify-center lg:justify-start">
                <div className="relative w-64 h-64">
                  <svg viewBox="0 0 200 200" className="w-full h-full fill-white opacity-40 animate-pulse">
                    <path d="M100 20C70 20 40 40 40 80C40 130 100 180 100 180C100 180 160 130 160 80C160 40 130 20 100 20ZM100 140C80 140 60 120 60 100C60 80 80 60 100 60C120 60 140 80 140 100C140 120 120 140 100 140Z" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap size={80} className="text-white mb-4" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:w-[55%] p-12 lg:p-24 flex flex-col justify-center bg-muted/10">
            <ScrollReveal className="max-w-2xl space-y-10">
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-black leading-tight tracking-tighter">
                {t.team_page.subtitle}
              </h2>
              
              <div className="space-y-8 text-xl text-muted-foreground leading-relaxed">
                <p className="font-medium text-black">{t.team_page.p1}</p>
                <p>{t.team_page.p2}</p>
                <p>{t.team_page.p3}</p>
              </div>

              <div className="pt-8 grid grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-3xl shadow-sm border border-muted">
                  <span className="text-3xl font-bold text-primary block mb-1">100%</span>
                  <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Réussite Examens</span>
                </div>
                <div className="p-6 bg-white rounded-3xl shadow-sm border border-muted">
                  <span className="text-3xl font-bold text-secondary block mb-1">UEFA</span>
                  <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Certification Staff</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <ScrollReveal key={i} delay={i * 100} className="p-10 rounded-[3rem] bg-muted/20 border border-muted group hover:bg-primary transition-all duration-500">
                  <div className="bg-white p-4 rounded-2xl inline-block shadow-md mb-6 group-hover:scale-110 transition-transform">
                    {v.icon}
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-4 uppercase group-hover:text-white">{v.title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white/70 leading-relaxed">{v.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-32 bg-muted/30 border-t border-muted">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-24">
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">Excellence Humaine</span>
              <h2 className="text-5xl md:text-7xl font-headline font-bold text-black tracking-tighter uppercase inline-block relative">
                {t.team_page.team_title}
                <div className="w-12 h-1.5 bg-secondary mx-auto mt-4 rounded-full" />
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
              {members.map((member, i) => (
                <ScrollReveal key={i} delay={i * 150} className="text-center group">
                  <div className="relative w-64 h-64 mx-auto mb-8 rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl group-hover:translate-y-[-10px] transition-all duration-500 bg-muted">
                    <Image src={member.img} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-black uppercase tracking-tight">{member.name}</h3>
                  <p className="text-secondary font-bold text-sm mt-2 uppercase tracking-widest">{member.role}</p>
                </ScrollReveal>
              ))}
            </div>
            
            {/* Accreditation Badges */}
            <div className="mt-40 max-w-5xl mx-auto bg-primary rounded-[4rem] p-12 lg:p-20 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 opacity-10 -translate-y-1/4 translate-x-1/4">
                 <GraduationCap size={400} />
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                  <ScrollReveal className="space-y-6">
                    <h3 className="text-4xl font-headline font-bold leading-tight">
                       {t.team_page.staff_title}
                    </h3>
                    <p className="text-lg text-white/70 leading-relaxed">
                      {t.team_page.staff_desc}
                    </p>
                    <div className="flex gap-4">
                      <div className="bg-secondary p-4 rounded-2xl font-bold uppercase tracking-widest text-xs">Agrégés</div>
                      <div className="bg-white/10 p-4 rounded-2xl font-bold uppercase tracking-widest text-xs border border-white/20">UEFA Pro</div>
                    </div>
                  </ScrollReveal>
                  <div className="grid grid-cols-2 gap-6">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center group hover:bg-white/10 transition-colors">
                           <ShieldCheck size={40} className="text-secondary mb-4 group-hover:scale-110 transition-transform" />
                           <span className="text-[10px] font-bold uppercase text-white tracking-[0.2em] text-center">Label Officiel État</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
