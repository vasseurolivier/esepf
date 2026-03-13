
"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useDoc, useFirestore, useMemoFirebase, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';

export function Hero() {
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings, isLoading } = useDoc(settingsRef);
  
  const settings = clientSettings || serverSettings;
  const { t } = useTranslation();
  
  const heroImgUrl = settings?.images?.hero_home;

  return (
    <section className="relative h-[80vh] md:h-[85vh] min-h-[500px] md:min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        {heroImgUrl && (
          <Image
            src={heroImgUrl}
            alt="Hero Background"
            fill
            className="object-cover animate-in fade-in duration-700"
            priority
            sizes="100vw"
            quality={90}
          />
        )}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-headline font-bold mb-12 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 uppercase leading-tight drop-shadow-[0_8px_24px_rgba(0,0,0,1)]">
          <span className="text-secondary sm:text-white">{t.hero.subtitle}</span>
        </h1>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 w-full max-w-md mx-auto sm:max-w-none">
          <Link href="/football-academy/programme" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto min-w-[220px] rounded-[30px] border-2 border-white text-white bg-black/30 backdrop-blur-md hover:bg-white hover:text-primary py-7 text-lg font-semibold transition-all shadow-2xl">
              {t.hero.btnDiscover}
            </Button>
          </Link>
          <Link href="/inscription" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto min-w-[220px] rounded-[30px] bg-secondary hover:bg-secondary/90 text-white border-none py-7 text-lg font-bold shadow-2xl transition-transform hover:scale-105">
              {t.hero.btnRegister}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
