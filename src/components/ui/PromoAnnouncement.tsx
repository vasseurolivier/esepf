
"use client";

import React, { useState, useEffect } from 'react';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useTranslation } from '@/hooks/use-translation';
import { X, Calendar, MapPin, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function PromoAnnouncement() {
  const { t } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);
  
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  
  const qrUrl = settings?.images?.shanghai_scouting_qr;

  useEffect(() => {
    // Initial load: show popup if not dismissed in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenPromoPopup');
    const timer = setTimeout(() => {
      if (!hasSeenPopup) {
        setIsPopupVisible(true);
      } else {
        setIsBannerVisible(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsPopupVisible(false);
    setIsBannerVisible(true);
    sessionStorage.setItem('hasSeenPromoPopup', 'true');
  };

  const openPopup = () => {
    setIsPopupVisible(true);
  };

  return (
    <>
      {/* PERSISTENT SCROLLING BANNER */}
      {isBannerVisible && (
        <div 
          onClick={openPopup}
          className="bg-secondary text-white py-2 overflow-hidden cursor-pointer hover:bg-secondary/90 transition-colors border-b border-white/10 relative z-[60]"
        >
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest px-4">
              {t.promo_popup.ticker} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
              {t.promo_popup.ticker} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
              {t.promo_popup.ticker} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
              {t.promo_popup.ticker} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
            </span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest px-4">
              {t.promo_popup.ticker} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
              {t.promo_popup.ticker} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
              {t.promo_popup.ticker} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
              {t.promo_popup.ticker} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
            </span>
          </div>
          
          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              display: inline-flex;
              animation: marquee 30s linear infinite;
            }
          `}</style>
        </div>
      )}

      {/* MODAL POPUP */}
      {isPopupVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            
            {/* Header Decor - Enlarged for impact */}
            <div className="h-48 bg-primary relative overflow-hidden flex flex-col items-center justify-center p-8">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrophyIcon size={160} className="text-white" />
              </div>
              <div className="relative z-10 text-center space-y-2">
                <span className="text-secondary font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs block">
                  {t.promo_popup.desc}
                </span>
                <h2 className="text-white text-3xl md:text-5xl font-headline font-bold uppercase tracking-tighter leading-none">
                  {t.promo_popup.title}
                </h2>
              </div>
            </div>

            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 bg-black/20 rounded-full z-20"
            >
              <X size={20} />
            </button>

            <div className="p-8 text-center space-y-6">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-primary font-bold text-xl">
                  <Calendar size={22} className="text-secondary" />
                  <span>{t.promo_popup.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium uppercase tracking-widest">
                  <MapPin size={16} />
                  <span>Shanghai, China</span>
                </div>
              </div>

              <p className="text-primary font-medium leading-relaxed italic text-lg">
                {t.promo_popup.desc}
              </p>

              <div className="flex flex-col items-center space-y-4 py-6 bg-muted/30 rounded-3xl border border-muted">
                {qrUrl ? (
                  <div className="relative w-56 h-56 bg-white p-2 rounded-xl shadow-inner overflow-hidden border border-border">
                    <Image src={qrUrl} alt="Registration QR Code" fill className="object-contain p-2" />
                  </div>
                ) : (
                  <div className="w-56 h-56 bg-white p-4 rounded-xl shadow-inner flex flex-col items-center justify-center text-muted-foreground gap-2">
                    <QrCode size={64} className="opacity-20" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">QR Code Pending</span>
                  </div>
                )}
                <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <QrCode size={14} className="text-secondary" /> {t.promo_popup.cta}
                </span>
              </div>

              <Button 
                onClick={closePopup}
                className="w-full h-16 rounded-xl bg-primary text-white font-bold uppercase tracking-widest hover:bg-primary/90 text-sm"
              >
                {t.promo_popup.close}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TrophyIcon({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
