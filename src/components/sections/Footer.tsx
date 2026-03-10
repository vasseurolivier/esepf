"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';
import { useDoc, useFirestore } from '@/firebase';

export function Footer() {
  const db = useFirestore();
  const { data: settings } = useDoc(db ? `settings/global` : null);
  const schoolName = settings?.schoolName || "ESEPF";
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About */}
          <div>
            <h3 className="text-2xl font-headline font-bold mb-6 tracking-tighter flex items-center gap-2">
              <GraduationCap className="text-secondary" />
              {schoolName}
            </h3>
            <p className="text-white/70 leading-relaxed mb-6">
              L'excellence pédagogique et sportive au service de la réussite de vos enfants. Sport Études & Réussite Académique.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors"><Facebook size={18} /></Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors"><Twitter size={18} /></Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors"><Linkedin size={18} /></Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors"><Instagram size={18} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-headline font-bold mb-6">Nos Campus</h4>
            <ul className="space-y-4">
              <li className="text-white/70 hover:text-secondary transition-colors">ESEPF Evron</li>
              <li className="text-white/70 hover:text-secondary transition-colors">ESEPF Sainte-Bazeilles</li>
              <li className="text-white/70 hover:text-secondary transition-colors">ESEPF Sainte-Tulle</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-headline font-bold mb-6">Contact Central</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-white/70">
                <MapPin size={18} className="text-secondary" />
                <span>Siège : Evron, France</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Phone size={18} className="text-secondary" />
                <span>01 88 44 22 00</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Mail size={18} className="text-secondary" />
                <span>contact@esepf-academy.fr</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-headline font-bold mb-6">Lettre d'Information</h4>
            <p className="text-white/70 mb-4">Suivez l'actualité de nos élèves et athlètes sur nos 3 sites.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="bg-white/10 border-none rounded-l-md px-4 py-3 w-full focus:ring-1 focus:ring-secondary text-white"
              />
              <button className="bg-secondary px-4 py-3 rounded-r-md font-bold hover:bg-secondary/90 transition-colors">OK</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-white/50">
          <p>© {currentYear || '2025'} {schoolName} - 3 Campus : Evron, Sainte-Bazeilles, Sainte-Tulle.</p>
        </div>
      </div>
    </footer>
  );
}