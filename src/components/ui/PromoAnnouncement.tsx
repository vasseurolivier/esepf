
"use client";

import React, { useState, useEffect } from 'react';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useTranslation } from '@/hooks/use-translation';
import { X } from 'lucide-react';
import Image from 'next/image';

export function PromoAnnouncement() {
  const { t, language } = useTranslation();
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);
  
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  
  const flyerUrl = language === 'zh' 
    ? settings?.images?.flyer_shanghai_zh 
    : settings?.images?.flyer_shanghai_intl;

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

      {/* FLYER POPUP */}
      {isPopupVisible && flyerUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-transparent rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-white hover:text-secondary transition-colors p-3 bg-black/40 rounded-full z-[110] border border-white/20"
            >
              <X size={24} />
            </button>

            <div className="relative w-full h-[80vh] md:h-[85vh]">
              <Image 
                src={flyerUrl} 
                alt="Flyer Shanghai" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
