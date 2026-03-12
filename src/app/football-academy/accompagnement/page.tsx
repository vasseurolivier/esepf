
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Image from 'next/image';

export default function AccompagnementPage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);

  const heroImage = settings?.images?.support_hero || "https://picsum.photos/seed/kine-sports/1200/800";
  
  const team = [
    { id: 'support_kine', label: t.support_page.kine, default: "https://picsum.photos/seed/kine-1/500/500" },
    { id: 'support_mental', label: t.support_page.mental, default: "https://picsum.photos/seed/mental-1/500/500" },
    { id: 'support_medecin', label: t.support_page.medecin, default: "https://picsum.photos/seed/doc-1/500/500" },
    { id: 'support_physique', label: t.support_page.physique, default: "https://picsum.photos/seed/trainer-1/500/500" },
  ];

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        
        <section className="relative min-h-[600px] flex items-center overflow-hidden mb-24">
          <div className="absolute right-0 top-0 w-full lg:w-3/4 h-full z-0 bg-black">
            <Image 
              src={heroImage} 
              alt="Accompagnement" 
              fill 
              className="object-cover"
              priority
              data-ai-hint="sports medicine care"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="lg:w-1/2 bg-[#6b8e61] p-12 lg:p-20 text-white shadow-2xl">
              <ScrollReveal>
                <h1 className="text-3xl md:text-4xl font-headline font-bold mb-12 leading-tight">
                  {t.support_page.title}
                </h1>
                <p className="text-lg md:text-xl leading-relaxed opacity-90 font-medium">
                  {t.support_page.desc}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="pb-32">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-black uppercase tracking-tighter">
                {t.support_page.team_title}
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {team.map((member, idx) => (
                <ScrollReveal key={member.id} delay={idx * 150} className="flex flex-col items-center group">
                  <div className="relative w-full aspect-square border border-black mb-4 overflow-hidden bg-black">
                    <Image 
                      src={settings?.images?.[member.id] || member.default}
                      alt={member.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-black uppercase tracking-wide text-center">
                    {member.label}
                  </h3>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
