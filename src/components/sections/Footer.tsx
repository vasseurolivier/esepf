
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useTranslation } from '@/hooks/use-translation';

export function Footer() {
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: settings } = useDoc(settingsRef);
  
  const { t } = useTranslation();
  
  const schoolName = settings?.schoolName || "ESEPF";
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-headline font-bold mb-6 tracking-tighter flex items-center gap-2">
              <GraduationCap className="text-secondary" />
              {schoolName}
            </h3>
            <p className="text-white/70 leading-relaxed mb-6 text-sm">
              {t.footer.desc}
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors"><Facebook size={18} /></Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors"><Twitter size={18} /></Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors"><Linkedin size={18} /></Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors"><Instagram size={18} /></Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-headline font-bold mb-6 uppercase tracking-widest text-secondary">{t.footer.campus}</h4>
            <ul className="space-y-4">
              <li className="text-white/70 hover:text-secondary transition-colors text-sm"><Link href="/campus/evron">Campus Evron</Link></li>
              <li className="text-white/70 hover:text-secondary transition-colors text-sm"><Link href="/campus/sainte-bazeilles">Campus Sainte-Bazeilles</Link></li>
              <li className="text-white/70 hover:text-secondary transition-colors text-sm"><Link href="/campus/sainte-tulle">Campus Sainte-Tulle</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-headline font-bold mb-6 uppercase tracking-widest text-secondary">{t.footer.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-white/70 text-sm">
                <MapPin size={18} className="text-secondary" />
                <span>{t.footer.hq_label}</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70 text-sm">
                <Phone size={18} className="text-secondary" />
                <span>01 88 44 22 00</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70 text-sm">
                <Mail size={18} className="text-secondary" />
                <Link href="/contact" className="hover:text-secondary transition-colors">contact@esepf-academy.fr</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-headline font-bold mb-6 uppercase tracking-widest text-secondary">{t.footer.newsletter}</h4>
            <p className="text-white/70 mb-4 text-sm">{t.footer.newsletter_desc}</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder={t.footer.placeholder}
                className="bg-white/10 border-none rounded-l-md px-4 py-3 w-full focus:ring-1 focus:ring-secondary text-white text-sm"
              />
              <button className="bg-secondary px-4 py-3 rounded-r-md font-bold hover:bg-secondary/90 transition-colors uppercase text-xs">OK</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[10px] text-white/30 uppercase tracking-[0.3em]">
              <p>© {currentYear || '2025'} {schoolName} - {t.common.excellence}. {t.footer.rights}</p>
            </div>
            <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-white/50">
              <Link href="/mentions-legales" className="hover:text-secondary transition-colors">{t.legal.mentions}</Link>
              <Link href="/politique-de-confidentialite" className="hover:text-secondary transition-colors">{t.legal.privacy}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
