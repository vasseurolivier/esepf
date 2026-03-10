
import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About */}
          <div>
            <h3 className="text-2xl font-headline font-bold mb-6 tracking-tighter">
              PACK<span className="text-secondary">VISION</span>
            </h3>
            <p className="text-white/70 leading-relaxed mb-6">
              L'excellence pédagogique au service des métiers du packaging et de la finition depuis plus de 20 ans.
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
            <h4 className="text-lg font-headline font-bold mb-6">Liens Rapides</h4>
            <ul className="space-y-4">
              <li><Link href="#programs" className="text-white/70 hover:text-secondary transition-colors">Nos Programmes</Link></li>
              <li><Link href="#admission" className="text-white/70 hover:text-secondary transition-colors">Admissions</Link></li>
              <li><Link href="#international" className="text-white/70 hover:text-secondary transition-colors">International</Link></li>
              <li><Link href="#news" className="text-white/70 hover:text-secondary transition-colors">Actualités</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-headline font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-white/70">
                <MapPin size={18} className="text-secondary" />
                <span>12 Rue de l'Industrie, 75012 Paris</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Phone size={18} className="text-secondary" />
                <span>+33 (0)1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Mail size={18} className="text-secondary" />
                <span>contact@packvision.fr</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-headline font-bold mb-6">Newsletter</h4>
            <p className="text-white/70 mb-4">Recevez nos dernières actualités et offres de formations.</p>
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
          <p>© {new Date().getFullYear()} PackVision Campus - Tous droits réservés. <Link href="#" className="hover:text-white underline ml-4">Mentions Légales</Link> | <Link href="#" className="hover:text-white underline ml-2">RGPD</Link></p>
        </div>
      </div>
    </footer>
  );
}
