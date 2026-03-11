
"use client";

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useTranslation } from '@/hooks/use-translation';

export function News() {
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);
  
  const { t } = useTranslation();

  const articles = [
    {
      id: 1,
      title: 'Résultats Bac 2024 : Une année record',
      date: '10 Juillet 2024',
      imageUrl: settings?.images?.news_graduation || PlaceHolderImages.find(img => img.id === 'news-graduation')?.imageUrl,
      excerpt: 'Félicitations à nos bacheliers qui obtiennent pour la 5ème année consécutive 100% de réussite.'
    },
    {
      id: 2,
      title: 'Nouveau Laboratoire de Sciences',
      date: '12 Septembre 2024',
      imageUrl: settings?.images?.news_science || PlaceHolderImages.find(img => img.id === 'news-science')?.imageUrl,
      excerpt: 'L\'établissement investit dans des équipements de pointe pour les spécialités SVT et Physique-Chimie.'
    }
  ];

  return (
    <section id="news" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-4">{t.sections.news_title}</h2>
            <div className="w-20 h-1.5 bg-secondary rounded-full" />
          </div>
          <button className="text-secondary font-bold hover:underline flex items-center text-sm uppercase tracking-widest">
            {t.common.viewAll} <span className="ml-2">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {articles.map((article, idx) => {
            return (
              <ScrollReveal key={article.id} delay={idx * 200}>
                <article className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="relative h-72 w-full overflow-hidden">
                    {article.imageUrl && (
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>
                  <div className="p-8">
                    <span className="text-secondary font-bold text-sm mb-3 block">{article.date}</span>
                    <h3 className="text-2xl font-headline font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 line-relaxed">
                      {article.excerpt}
                    </p>
                    <button className="text-primary font-bold text-xs flex items-center group-hover:translate-x-2 transition-transform uppercase tracking-widest">
                      {t.common.readMore} <span className="ml-2 text-secondary">→</span>
                    </button>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
