
import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const articles = [
  {
    id: 1,
    title: 'Portes Ouvertes 2024',
    date: '15 Mars 2024',
    image: 'news-1',
    excerpt: 'Venez découvrir nos ateliers et échanger avec nos étudiants lors de notre journée portes ouvertes.'
  },
  {
    id: 2,
    title: 'Nouveau Partenariat Industriel',
    date: '02 Février 2024',
    image: 'news-2',
    excerpt: 'PackVision signe un accord majeur avec les leaders mondiaux du packaging écologique.'
  }
];

export function News() {
  return (
    <section id="news" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-4">Actualités</h2>
            <div className="w-20 h-1.5 bg-secondary rounded-full" />
          </div>
          <button className="text-secondary font-bold hover:underline">Toute l'actualité →</button>
        </div>

        {/* FIREBASE-DATA: actualites */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {articles.map((article, idx) => {
            const imgData = PlaceHolderImages.find(img => img.id === article.image);
            return (
              <ScrollReveal key={article.id} delay={idx * 200}>
                <article className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="relative h-64 w-full lg:w-1/2 rounded-2xl overflow-hidden shrink-0">
                    {imgData && (
                      <Image
                        src={imgData.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        data-ai-hint={imgData.imageHint}
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary font-bold text-sm mb-2">{article.date}</span>
                    <h3 className="text-2xl font-headline font-bold text-primary mb-4 hover:text-secondary cursor-pointer transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {article.excerpt}
                    </p>
                    <button className="text-primary font-bold text-sm underline underline-offset-4 decoration-secondary">Lire l'article</button>
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
