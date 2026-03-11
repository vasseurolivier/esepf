
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';

export default function ParcoursJoueurPage() {
  const { t } = useTranslation();

  const ChevronArrow = () => (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 40" className="w-24 h-10 fill-black mb-1">
        <path d="M0,0 L100,0 L50,40 Z" />
      </svg>
      <span className="text-[10px] font-bold uppercase tracking-widest text-black [writing-mode:vertical-lr] my-2">
        {t.journey_page.outlets_label}
      </span>
      <svg viewBox="0 0 100 40" className="w-24 h-10 fill-black">
        <path d="M0,0 L100,0 L50,40 Z" />
      </svg>
    </div>
  );

  const Box = ({ label, color = "bg-[#e08b8b]", className = "" }: { label: string, color?: string, className?: string }) => (
    <div className={`${color} p-4 md:p-6 rounded-xl shadow-[5px_5px_15px_rgba(0,0,0,0.2)] text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20 flex items-center justify-center min-h-[60px] md:min-h-[80px] w-full ${className}`}>
      <span className="text-sm md:text-lg font-headline font-bold text-black leading-tight uppercase tracking-wide">
        {label}
      </span>
    </div>
  );

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white pb-32">
        <div className="container mx-auto px-4 pt-20">
          
          <ScrollReveal className="mb-20">
            <h1 className="text-4xl md:text-7xl font-headline font-bold text-black tracking-tighter uppercase mb-2">
              {t.journey_page.title}
            </h1>
            <div className="w-24 h-1.5 bg-black rounded-full" />
          </ScrollReveal>

          {/* Section 1: The Equation */}
          <section className="mb-32">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              {/* Profile */}
              <ScrollReveal className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 rounded-full overflow-hidden border-2 border-muted shadow-lg">
                  <Image 
                    src="https://picsum.photos/seed/student-football/400/400" 
                    alt="Student Athlete" 
                    fill 
                    className="object-cover"
                    data-ai-hint="student with books and soccer ball"
                  />
                </div>
                <p className="font-headline font-bold text-black text-lg md:text-xl max-w-[150px]">
                  {t.journey_page.formation_title}
                </p>
              </ScrollReveal>

              <div className="text-5xl font-bold text-black hidden md:block">=</div>

              {/* Sport Box */}
              <ScrollReveal delay={100} className="w-full max-w-xs">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-16 h-16 opacity-80">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-black">
                      <path d="M50,10 L60,40 L90,40 L65,60 L75,90 L50,70 L25,90 L35,60 L10,40 L40,40 Z" />
                    </svg>
                  </div>
                  <Box label={t.journey_page.sport_label} color="bg-[#e08b8b]" />
                </div>
              </ScrollReveal>

              <div className="text-5xl font-bold text-black hidden md:block">+</div>

              {/* School Box */}
              <ScrollReveal delay={200} className="w-full max-w-xs">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-16 h-16 opacity-80">
                    <GraduationCap size={64} className="text-black" />
                  </div>
                  <Box label={t.journey_page.school_label} color="bg-[#7fb3e0]" />
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Section 2: Grid of Outlets */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
            
            {/* Left Chevron Decor */}
            <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center gap-32 pt-20">
              <ChevronArrow />
              <ChevronArrow />
            </div>

            {/* Main Columns */}
            <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              
              {/* Column 1: Athlete Pro */}
              <ScrollReveal className="space-y-8">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="5"/></svg>
                  </div>
                  <h3 className="text-xl font-headline font-bold text-black">{t.journey_page.athlete_title}</h3>
                </div>
                <Box label={t.journey_page.world} color="bg-[#e08b8b]" />
                <Box label={t.journey_page.china} color="bg-[#e08b8b]" />
              </ScrollReveal>

              {/* Column 2: Sport Jobs */}
              <ScrollReveal delay={100} className="space-y-8">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="5"/></svg>
                  </div>
                  <h3 className="text-xl font-headline font-bold text-black">{t.journey_page.sport_jobs_title}</h3>
                </div>
                <Box label={t.journey_page.video_analyst} color="bg-[#e08b8b]" />
                <Box label={t.journey_page.fifa_agent} color="bg-[#e08b8b]" />
                <Box label={t.journey_page.referee} color="bg-[#e08b8b]" />
                <Box label={t.journey_page.coach} color="bg-[#e08b8b]" />
              </ScrollReveal>

              {/* Column 3: Higher Ed */}
              <ScrollReveal delay={200} className="space-y-8">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="5"/></svg>
                  </div>
                  <h3 className="text-xl font-headline font-bold text-black">{t.journey_page.higher_ed_title}</h3>
                </div>
                <Box label={t.journey_page.bts} color="bg-[#7fb3e0]" />
                <Box label={t.journey_page.licence_master} color="bg-[#7fb3e0]" />
              </ScrollReveal>

            </div>
          </section>

        </div>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
