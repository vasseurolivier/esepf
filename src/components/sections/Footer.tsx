
import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About */}
          <div>
            <h3 className="text-2xl font-headline font-bold mb-6 tracking-tighter flex items-center gap-2">
              <GraduationCap className="text-secondary" />
              SAINT<span className="text-secondary">JEAN</span>
            </h3>
            <p className="text-white/70 leading-relaxed mb-6">
              L'excellence pédagogique au service de la réussite de vos enfants depuis 1920.
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
            <h4 className="text-lg font-headline font-bold mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="#college" className="text-white/70 hover:text-secondary transition-colors">Collège</Link></li>
              <li><Link href="#lycee" className="text-white/70 hover:text-secondary transition-colors">Lycée (Général & STMG)</Link></li>
              <li><Link href="#admission" className="text-white/70 hover:text-secondary transition-colors">Espace Inscriptions</Link></li>
              <li><Link href="#news" className="text-white/70 hover:text-secondary transition-colors">Agenda Scolaire</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-headline font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-white/70">
                <MapPin size={18} className="text-secondary" />
                <span>42 Avenue de l'École, 75005 Paris</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Phone size={18} className="text-secondary" />
                <span>01 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Mail size={18} className="text-secondary" />
                <span>secretariat@saint-jean.edu</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-headline font-bold mb-6">Lettre d'Information</h4>
            <p className="text-white/70 mb-4">Inscrivez-vous pour recevoir les actualités de l'établissement.</p>
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
          <p>© {new Date().getFullYear()} Institution Saint-Jean - Tous droits réservés. <Link href="#" className="hover:text-white underline ml-4">Mentions Légales</Link> | <Link href="#" className="hover:text-white underline ml-2">Règlement Intérieur</Link></p>
        </div>
      </div>
    </footer>
  );
}
