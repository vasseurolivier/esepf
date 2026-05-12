
"use client";

import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { Lock, Eye, Database, Share2, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { t, language } = useTranslation();

  return (
    <FirebaseClientProvider>
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
                  <h2 className="text-2xl font-bold uppercase tracking-wide">Collecte des données</h2>
                </div>
                <div className="prose prose-lg text-muted-foreground max-w-none">
                  <p>
                    {language === 'zh'
                      ? "我们通过在线申请表收集有关学生及其法定监护人的信息。收集的信息包括但不限于：姓名、出生日期、国籍、目前就读年级以及联系方式（电话、邮箱）。"
                      : "Dans le cadre de votre demande d'inscription ou de contact, l'ESEPE collecte des données à caractère personnel vous concernant. Ces données sont traitées uniquement pour la gestion de votre dossier pédagogique et sportif."}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100} className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <Eye size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">Utilisation et Finalités</h2>
                </div>
                <div className="prose prose-lg text-muted-foreground max-w-none">
                  <p>Vos données sont utilisées pour :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>L'étude de la candidature à l'entrée de l'établissement.</li>
                    <li>L'organisation des entretiens de motivation.</li>
                    <li>La communication relative à la scolarité et à l'Academy de football.</li>
                    <li>La mise en conformité avec les obligations légales éducatives (France & Chine).</li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <Share2 size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">Partage des données</h2>
                </div>
                <div className="prose prose-lg text-muted-foreground max-w-none">
                  <p>
                    {language === 'zh'
                      ? "除为了遵守法律义务或履行我们对您的教育服务合同外，我们不会将您的个人数据共享、出售或出租给第三方。在遵守 RGPD 的前提下，数据可能在 ESEPE 的法国校区与行政部门之间流转。"
                      : "L'ESEPE s'engage à ne jamais vendre ni louer vos données à des tiers. Elles ne sont transmises qu'aux services internes administratifs et pédagogiques de l'ESEPE."}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300} className="space-y-6">
                <div className="flex items-center gap-3 text-secondary">
                  <Mail size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wide">Vos Droits (RGPD)</h2>
                </div>
                <div className="p-8 bg-muted/30 rounded-3xl border border-muted">
                  <p className="mb-4">
                    Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
                  </p>
                  <p className="font-bold text-primary">
                    Pour exercer vos droits, contactez notre délégué à la protection des données :
                  </p>
                  <p className="mt-2 text-secondary font-bold">privacy@esepe.fr</p>
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
