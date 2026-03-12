
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { ShoppingBag, Clock, MapPin, Award, Info, CheckCircle2, Star, User, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FrenchSystemSchema } from '@/components/sections/FrenchSystemSchema';
import { OutletsSection } from '@/components/sections/OutletsSection';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';

export default function BacProVentePage() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);

  const heroImage = settings?.images?.bac_vente_hero || "https://picsum.photos/seed/bac-vente-pro/1920/1080";
  const introImage = settings?.images?.bac_vente_intro || "https://picsum.photos/seed/sales-luxury/800/600";

  const content = t.lycee_page.bac_vente;

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[65vh] flex items-center justify-center bg-[#0c3a2f] overflow-hidden">
          <Image 
            src={heroImage}
            alt="Bac Pro Vente"
            fill
            className="object-cover opacity-50"
            data-ai-hint="luxury retail store entrance"
            priority
          />
          <div className="relative z-10 text-center text-white container px-4">
            <ScrollReveal>
              <h1 className="text-5xl md:text-8xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {content.title}
              </h1>
              <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto uppercase tracking-widest font-light">
                {content.subtitle}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Quick Info Bar */}
        <section className="bg-[#0c3a2f] py-6 text-white border-y border-white/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex items-center gap-3">
                <Clock className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.duration}</p>
                  <p className="font-bold text-sm">{content.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.level}</p>
                  <p className="font-bold text-sm">{content.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.campus_label}</p>
                  <p className="font-bold text-sm">{content.campuses}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-secondary" />
                <div>
                  <p className="text-[10px] uppercase opacity-60">{t.common.diploma}</p>
                  <p className="font-bold text-sm">Baccalauréat Professionnel</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal className="mb-20 text-center">
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-black italic mb-8">
                {content.title_detail}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                {content.desc}
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <ScrollReveal className="space-y-8">
                <div className="p-8 bg-muted/30 rounded-[2.5rem] border border-muted">
                  <h3 className="text-2xl font-headline font-bold text-primary mb-6 flex items-center gap-3">
                    <ShoppingBag className="text-secondary" /> L'Univers du Luxe
                  </h3>
                  <p className="text-muted-foreground leading-relaxed italic">
                    {content.desc_extended}
                  </p>
                </div>
                <div className="p-6 bg-primary text-white rounded-2xl shadow-xl">
                  <div className="flex gap-4">
                    <Info className="text-secondary shrink-0" size={24} />
                    <p className="text-sm font-medium leading-relaxed">
                      {t.common.allophone_mention}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200} className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-muted group">
                <Image 
                  src={introImage}
                  alt="Sales and Commerce luxury"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c3a2f]/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="font-bold italic text-lg leading-tight">
                    "Maîtriser les codes de l'excellence pour servir les plus grandes maisons."
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Objectives Section */}
            <ScrollReveal className="mb-24">
              <h3 className="text-3xl font-headline font-bold text-[#0c3a2f] mb-12 text-center uppercase tracking-widest underline underline-offset-8 decoration-secondary">
                {content.objectives_title}
              </h3>
              <div className="p-10 bg-white border-2 border-[#0c3a2f] rounded-[3rem] shadow-xl relative overflow-hidden">
                <p className="text-lg text-primary font-bold mb-8">{content.objectives_desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {content.objectives_list.map((obj: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-6 bg-muted/30 rounded-2xl border border-muted group hover:border-secondary transition-colors">
                      <div className="bg-[#0c3a2f] text-white p-2 rounded-lg shrink-0 group-hover:bg-secondary transition-colors">
                        <BookOpen size={20} />
                      </div>
                      <p className="text-sm text-muted-foreground font-medium">{obj}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-sm text-muted-foreground italic border-t border-muted pt-6">
                  {content.objectives_footer}
                </p>
              </div>
            </ScrollReveal>

            {/* Profile & Qualities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
              <ScrollReveal className="bg-[#0c3a2f] p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <h3 className="text-2xl font-headline font-bold mb-8 flex items-center gap-3 uppercase tracking-tighter">
                    <User className="text-secondary" /> {content.profile_title}
                  </h3>
                  <p className="mb-6 opacity-80">{content.profile_desc}</p>
                  <ul className="space-y-4">
                    {content.profile_list.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-secondary shrink-0 mt-1" />
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute top-0 right-0 opacity-5 p-8">
                  <ShoppingBag size={150} />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="bg-white p-10 rounded-[3rem] border-2 border-[#0c3a2f] relative overflow-hidden shadow-xl">
                <div className="relative z-10">
                  <h3 className="text-2xl font-headline font-bold text-[#0c3a2f] mb-8 flex items-center gap-3 uppercase tracking-tighter">
                    <Star className="text-secondary" /> {content.qualities_title}
                  </h3>
                  <ul className="space-y-4">
                    {content.qualities_list.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full shrink-0 mt-2" />
                        <span className="text-sm text-muted-foreground font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute bottom-0 right-0 opacity-5 p-8 text-[#0c3a2f]">
                  <Award size={150} />
                </div>
              </ScrollReveal>
            </div>

            {/* SECTION 1: Un accès direct à l'emploi */}
            <ScrollReveal className="mb-24">
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-black tracking-tighter uppercase mb-12">
                {content.direct_employment_title}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
                <div className="lg:col-span-8">
                  <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
                    {content.direct_employment_text}
                  </p>
                </div>
                <div className="lg:col-span-4">
                  <div className="p-8 rounded-[2.5rem] shadow-xl border border-black/5 bg-[#d1c7b7] h-full relative overflow-hidden group hover:scale-[1.02] transition-transform">
                    <h4 className="text-xl font-headline font-bold text-black uppercase tracking-widest mb-6 border-b border-black/10 pb-4">
                      {t.outlets_labels.jobs_title}
                    </h4>
                    <ul className="space-y-3">
                      {content.direct_employment_jobs.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-black/80 font-bold uppercase">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl bg-muted group mb-24">
                <Image 
                  src="https://picsum.photos/seed/sales-luxury-2/1200/500"
                  alt="Sales Luxury Store"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  data-ai-hint="luxury clothing store interior"
                />
              </div>
            </ScrollReveal>

            {/* SECTION 2: Un accès aux études supérieures */}
            <ScrollReveal className="mb-12">
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-black tracking-tighter uppercase">
                {content.higher_ed_title}
              </h2>
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-4xl">
                {content.higher_ed_intro}
              </p>
            </ScrollReveal>

            <FrenchSystemSchema bacType="Baccalauréat Professionnel Vente" />
          </div>
        </section>

        {/* Detailed Outlets Section */}
        <section className="py-24 bg-muted/10 border-y border-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <OutletsSection 
              btsDesc={content.bts_desc}
              univDesc={content.univ_desc}
              btsList={content.bts_list}
              btsJobs={content.bts_jobs}
              univList={content.univ_list}
              univJobs={content.univ_jobs}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal className="max-w-3xl mx-auto bg-muted rounded-[3rem] p-12 shadow-inner">
               <h2 className="text-3xl font-headline font-bold mb-6">Rejoignez l'élite du commerce</h2>
               <p className="text-muted-foreground mb-8">Les inscriptions pour la filière Vente Luxe (Rentrée 2026) sont ouvertes. Places limitées pour garantir un encadrement d'exception.</p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/inscription">
                    <Button className="rounded-full bg-primary py-8 px-10 font-bold uppercase tracking-widest">{t.common.apply}</Button>
                  </Link>
                  <Link href="/contact"><Button variant="outline" className="rounded-full py-8 px-10 font-bold uppercase tracking-widest">Parler à un conseiller</Button></Link>
               </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
