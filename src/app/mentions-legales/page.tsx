"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { ShieldCheck, Info, MapPin, Globe, FileText, Lock, AlertTriangle } from 'lucide-react';

export default function MentionsLegalesPage() {
  const { t } = useTranslation();

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-primary text-white py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <ScrollReveal>
              <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 uppercase tracking-tighter">
                {t.legal.mentions}
              </h1>
              <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
            </ScrollReveal>
          </div>
          <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
            <ShieldCheck size={400} />
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-16">
              
              <ScrollReveal className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <Info size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">{t.legal.editor}</h2>
                </div>
                <div className="p-8 bg-muted/30 rounded-3xl border border-muted text-lg leading-relaxed whitespace-pre-line">
                  {t.legal.editor_content}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100} className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <Globe size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">{t.legal.hosting}</h2>
                </div>
                <div className="p-8 bg-muted/30 rounded-3xl border border-muted text-lg leading-relaxed space-y-4">
                  <p className="whitespace-pre-line">{t.legal.hosting_content}</p>
                  <p className="mt-4 text-sm text-muted-foreground italic">
                    {t.legal.hosting_note}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <FileText size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">{t.legal.property}</h2>
                </div>
                <div className="p-8 bg-muted/30 rounded-3xl border border-muted text-lg leading-relaxed space-y-4 whitespace-pre-line">
                  {t.legal.property_content}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300} className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <Lock size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">{t.legal.data}</h2>
                </div>
                <div className="p-8 bg-muted/30 rounded-3xl border border-muted text-lg leading-relaxed space-y-6">
                  <p className="font-bold text-primary">{t.legal.privacy_collect}</p>
                  <div className="space-y-2">
                    <p className="font-bold underline uppercase text-sm tracking-widest">{t.legal.privacy_use.split('\n')[0]}</p>
                    <ul className="list-disc pl-6 space-y-1 text-base">
                      {t.legal.privacy_use.split('\n').slice(1).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <p>{t.legal.privacy_share}</p>
                  <div className="p-4 bg-white rounded-xl border border-secondary/20">
                    <p className="font-bold text-secondary mb-2">{t.legal.privacy_rights.split('\n')[0]}</p>
                    <p className="text-sm">{t.legal.privacy_rights.split('\n')[1]}</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400} className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <AlertTriangle size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">{t.legal.liability}</h2>
                </div>
                <div className="p-8 bg-muted/30 rounded-3xl border border-muted text-lg leading-relaxed italic">
                  {t.legal.liability_content}
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>
        <Footer />
      </main>
    </FirebaseClientProvider>
  );
}