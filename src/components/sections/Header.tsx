
"use client";

import React, { useState, useEffect } from 'react';
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
  { name: 'CAMPUS', href: '#', hasDropdown: true },
  { name: 'FORMATIONS', href: '#', hasDropdown: true },
  { name: 'FOOTBALL ACADEMY', href: '#', hasDropdown: true },
  { name: 'CAMPS', href: '/#news' },
  { name: 'CONTACT', href: '/#contact' },
];

const campusSubLinks = [
  { name: 'Campus Evron', href: '/campus/evron' },
  { name: 'Campus Sainte-Bazeilles', href: '/campus/sainte-bazeilles' },
  { name: 'Campus Sainte-Tulle', href: '/campus/sainte-tulle' },
];

const formationsSubLinks = [
  { name: "CLASSE D'INTEGRATION", href: '/formations/integration' },
  { name: 'COLLÈGE', href: '/formations/college' },
  { name: 'LYCÉE', href: '/formations/lycee' },
  { name: 'LANGUES ÉTRANGÈRES', href: '/formations/langues' },
  { name: 'BACCALAUREAT AMERICAIN', href: '/formations/bac-americain' },
];

const footballSubLinks = [
  { name: 'Programme Football', href: '/football-academy/programme' },
  { name: 'Compétition Officielle', href: '/football-academy/competition' },
  { name: "Qu'est-ce que le Sport-Études ?", href: '/football-academy/sport-etudes' },
  { name: 'Le Parcours du Joueur', href: '/football-academy/parcours' },
  { name: 'Accompagnement', href: '/football-academy/accompagnement' },
  { name: 'Les Métiers du Sport', href: '/football-academy/metiers' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const db = useFirestore();
  const { data: settings } = useDoc(db, 'settings/global');

  useEffect(() => {
    setMounted(true);
  }, []);

  const schoolName = settings?.schoolName || "ESEPF";
  const logoUrl = settings?.logoUrl;

  const getSubLinks = (name: string) => {
    if (name === 'CAMPUS') return campusSubLinks;
    if (name === 'FORMATIONS') return formationsSubLinks;
    if (name === 'FOOTBALL ACADEMY') return footballSubLinks;
    return [];
  };

  // Empêche l'erreur d'hydratation en ne rendant rien avant le montage client
  if (!mounted) {
    return (
      <header className="h-20 w-full bg-white shadow-md flex items-center px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="w-14 h-14 bg-muted animate-pulse rounded-full" />
          <div className="h-6 w-48 bg-muted animate-pulse rounded" />
          <div className="h-10 w-32 bg-muted animate-pulse rounded" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      <div className="bg-white py-4 border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-14 w-14 flex items-center justify-center">
              {logoUrl ? (
                <img src={logoUrl} alt={schoolName} className="h-full w-auto object-contain" />
              ) : (
                <div className="p-2 border-2 border-primary rounded-full">
                  <GraduationCap className="text-primary h-8 w-8" />
                </div>
              )}
            </div>
            <span className="text-2xl md:text-3xl font-headline font-bold text-black tracking-tighter">
              {schoolName}
            </span>
          </Link>

          <div className="hidden lg:block">
            <h2 className="text-3xl font-serif italic text-black font-medium tracking-tight">
              L'excellence de la formation française
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <Button className="hidden sm:flex rounded-md bg-[#e31e24] text-white font-bold px-6 py-6 uppercase tracking-wider">
              Nous rejoindre
            </Button>
            
            <Link href="/admin">
              <Button variant="ghost" className="text-gray-400 hover:text-primary">
                <Settings size={20} />
              </Button>
            </Link>

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-black p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block bg-[#1a1a1a] w-full">
        <nav className="w-full flex">
          {navLinks.map((link) => (
            link.hasDropdown ? (
              <DropdownMenu key={link.name}>
                <DropdownMenuTrigger className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold text-white py-5 hover:bg-white/10 uppercase tracking-widest border-r border-white/10 outline-none">
                  {link.name} <ChevronDown size={12} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1a1a1a] border-white/10 p-2 min-w-[280px]">
                  {getSubLinks(link.name).map((sub) => (
                    <DropdownMenuItem key={sub.name} asChild>
                      <Link href={sub.href} className="text-white hover:bg-secondary cursor-pointer py-3 px-4 font-headline text-xs font-bold uppercase tracking-wider block">
                        {sub.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link key={link.name} href={link.href} className="flex-1 flex items-center justify-center text-[10px] font-bold text-white py-5 hover:bg-white/10 uppercase tracking-widest border-r border-white/10 last:border-r-0">
                {link.name}
              </Link>
            )
          ))}
        </nav>
      </div>

      <div className={cn("lg:hidden absolute w-full bg-[#1a1a1a] border-t border-white/10 transition-all z-50 overflow-hidden", isOpen ? "max-h-[800px] py-6" : "max-h-0")}>
        <div className="flex flex-col space-y-4 px-6">
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link href={link.href} onClick={() => setIsOpen(false)} className="text-base font-bold text-white uppercase tracking-wider">{link.name}</Link>
              {link.hasDropdown && (
                <div className="pl-4 mt-2 flex flex-col space-y-2">
                  {getSubLinks(link.name).map(sub => (
                    <Link key={sub.name} href={sub.href} onClick={() => setIsOpen(false)} className="text-white/70 text-sm">{sub.name}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
