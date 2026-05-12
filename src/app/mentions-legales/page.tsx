
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { ShieldCheck, Info, MapPin, Globe, FileText } from 'lucide-react';

export default function MentionsLegalesPage() {
  const { t, language } = useTranslation();

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
                  <p className="font-bold text-primary mb-2">ESEPE - École Sport-Études Performance & Excellence</p>
                  <p>Association loi 1901 / Organisme de formation</p>
                  <p>Directeur de la publication : Direction Générale ESEPE</p>
                  <p>Email : contact@esepe.fr</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100} className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <Globe size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">{t.legal.hosting}</h2>
                </div>
                <div className="p-8 bg-muted/30 rounded-3xl border border-muted text-lg leading-relaxed">
                  <p className="font-bold text-primary mb-2">Google Cloud Platform (Firebase App Hosting)</p>
                  <p>Google Ireland Limited</p>
                  <p>Gordon House, Barrow Street, Dublin 4, Ireland</p>
                  <p className="mt-4 text-sm text-muted-foreground italic">
                    {language === 'zh' ? "我们的服务器部署在全球边缘节点，以确保极速访问。" : "Nos serveurs sont déployés sur des infrastructures mondiales pour garantir une accessibilité optimale."}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <FileText size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">{t.legal.property}</h2>
                </div>
                <div className="p-8 bg-muted/30 rounded-3xl border border-muted text-lg leading-relaxed space-y-4">
                  <p>
                    {language === 'zh' 
                      ? "本网站及其所有内容（文字、图片、视频、标志）均为 ESEPE 的专有财产。未经事先书面许可，严禁任何形式的复制、修改 or 传播。"
                      : "L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques."}
                  </p>
                  <p>
                    {language === 'zh'
                      ? "本站所引用的合作俱乐部标志（法国足球俱乐部、欧足联等）其版权归各自所有者所有。"
                      : "Les logos des clubs partenaires et fédérations cités restent la propriété exclusive de leurs détenteurs respectifs."}
                  </p>
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
