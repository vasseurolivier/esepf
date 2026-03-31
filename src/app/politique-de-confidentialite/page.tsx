"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { Lock, Eye, Database, Share2, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-primary text-white py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <ScrollReveal>
              <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {t.legal.privacy}
              </h1>
              <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
            </ScrollReveal>
          </div>
          <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
            <Lock size={400} />
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-12">
              
              <ScrollReveal className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <Database size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">{t.legal.collect_title}</h2>
                </div>
                <div className="prose prose-lg text-muted-foreground max-w-none">
                  <p>{t.legal.collect_desc}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100} className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <Eye size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">{t.legal.purpose_title}</h2>
                </div>
                <div className="prose prose-lg text-muted-foreground max-w-none">
                  <p>{t.legal.purpose_desc}</p>
                  <ul className="list-disc pl-6 space-y-2">
                    {t.legal.purpose_list.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <Share2 size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">{t.legal.share_title}</h2>
                </div>
                <div className="prose prose-lg text-muted-foreground max-w-none">
                  <p>{t.legal.share_desc}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300} className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <Mail size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">{t.legal.rights_title}</h2>
                </div>
                <div className="p-8 bg-muted/30 rounded-3xl border border-muted">
                  <p className="mb-4">{t.legal.rights_desc}</p>
                  <p className="font-bold text-primary">{t.legal.rights_contact}</p>
                  <p className="mt-2 text-secondary font-bold">privacy@esepf.fr</p>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}