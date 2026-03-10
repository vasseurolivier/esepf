"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, GraduationCap, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDoc, useFirestore } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: 'ACCUEIL', href: '/', active: true },
  { name: 'CAMPUS', href: '#campus' },
  { name: 'FORMATIONS', href: '#formations' },
  { name: 'FOOTBALL ACADEMY', href: '#football', hasDropdown: true },
  { name: 'CAMPS', href: '#news' },
  { name: 'CONTACT', href: '#contact' },
];

const footballSubLinks = [
  { name: 'Programme de Football', href: '#football' },
  { name: 'Compétition Officielle Française', href: '#football' },
  { name: "Qu'est-ce que le Sport-Études ?", href: '#football' },
  { name: 'Le Parcours du Joueur', href: '#football' },
  { name: 'Accompagnement Physique et Mental', href: '#football' },
  { name: 'Notre Réseau de Clubs', href: '#football' },
  { name: 'Les Métiers du Sport', href: '#football' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const db = useFirestore();
  const { data: settings } = useDoc(db ? `settings/global` : null);

  const schoolName = settings?.schoolName || "ESEPF";
  const logoUrl = settings?.logoUrl;

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top Bar (White) */}
      <div className="bg-white py-4 border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-14 w-14 flex items-center justify-center">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt={`${schoolName} Logo`} 
                  className="h-full w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="p-2 border-2 border-primary rounded-full">
                  <GraduationCap className="text-primary h-8 w-8" />
                </div>
              )}
            </div>
            <span className="text-3xl font-headline font-bold text-black tracking-tighter">
              {schoolName}
            </span>
          </Link>

          {/* Slogan (Center) - Hidden on mobile */}
          <div className="hidden lg:block">
            <h2 className="text-4xl font-serif italic text-black font-medium tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              L'excellence de la formation française
            </h2>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button className="hidden sm:flex rounded-md bg-[#e31e24] hover:bg-[#c41a1f] text-white font-bold px-6 py-6 text-base border-none shadow-sm uppercase tracking-wider">
              Nous rejoindre
            </Button>
            
            {/* Language Selector Mockup */}
            <div className="hidden md:flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-300">
                <img src="https://flagcdn.com/w40/fr.png" alt="FR" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium text-gray-600">Français</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>

            <Link href="/admin">
              <Button variant="ghost" className="text-gray-400 hover:text-primary p-2">
                <Settings size={20} />
              </Button>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-black p-2 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar (Dark Menu) - Full Width */}
      <div className="hidden lg:block bg-[#1a1a1a] w-full border-t border-white/5">
        <nav className="w-full flex">
          {navLinks.map((link) => (
            link.hasDropdown ? (
              <DropdownMenu key={link.name}>
                <DropdownMenuTrigger className={cn(
                  "flex-1 flex items-center justify-center gap-1 text-xs font-bold text-white py-5 hover:bg-white/10 transition-colors focus:outline-none uppercase tracking-widest border-r border-white/10",
                  link.active && "bg-[#b8955d]"
                )}>
                  {link.name} <ChevronDown size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1a1a1a] border-white/10 p-2 min-w-[280px]">
                  {footballSubLinks.map((sub) => (
                    <DropdownMenuItem key={sub.name} asChild>
                      <Link 
                        href={sub.href}
                        className="text-white hover:bg-[#b8955d] hover:text-white cursor-pointer py-3 px-4 font-headline text-xs font-bold uppercase tracking-wider"
                      >
                        {sub.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex-1 flex items-center justify-center text-xs font-bold text-white py-5 hover:bg-white/10 transition-colors uppercase tracking-widest border-r border-white/10 last:border-r-0",
                  link.active && "bg-[#b8955d]"
                )}
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>
      </div>

      {/* Mobile Nav (Expanded) */}
      <div
        className={cn(
          "lg:hidden absolute w-full bg-[#1a1a1a] border-t border-white/10 transition-all duration-300 ease-in-out z-50",
          isOpen ? "max-h-[800px] opacity-100 py-6" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="flex flex-col space-y-4 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg font-bold text-white hover:text-[#b8955d] uppercase tracking-wider",
                link.active && "text-[#b8955d]"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button className="w-full rounded-md bg-[#e31e24] text-white font-bold py-6 uppercase tracking-widest">
            Nous rejoindre
          </Button>
        </div>
      </div>
    </header>
  );
}
