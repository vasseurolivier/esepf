
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { ShieldCheck, Info, MapPin, Globe, FileText } from 'lucide-react';

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
                <div className="p-8 bg-muted/30 rounded-3xl border border-muted text-lg leading-relaxed">
                  <p className="font-bold text-primary mb-2">{t.legal.editor_full}</p>
                  <p>{t.legal.editor_legal}</p>
                  <p>{t.legal.editor_director}</p>
                  <p>Email : contact@esepf.fr</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100} className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <Globe size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">{t.legal.hosting}</h2>
                </div>
                <div className="p-8 bg-muted/30 rounded-3xl border border-muted text-lg leading-relaxed">
                  <p className="font-bold text-primary mb-2">{t.legal.hosting_provider}</p>
                  <p>{t.legal.hosting_entity}</p>
                  <p>{t.legal.hosting_address}</p>
                  <p className="mt-4 text-sm text-muted-foreground italic">
                    {t.legal.hosting_china_note}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <FileText size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">{t.legal.property}</h2>
                </div>
                <div className="p-8 bg-muted/30 rounded-3xl border border-muted text-lg leading-relaxed space-y-4">
                  <p>{t.legal.property_desc}</p>
                  <p>{t.legal.property_logos}</p>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
