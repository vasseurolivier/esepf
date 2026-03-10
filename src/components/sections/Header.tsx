
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
  { name: 'Accueil', href: '/' },
  { name: 'Campus', href: '#campus' },
  { name: 'Formations', href: '#formations' },
  { name: 'Vie Scolaire', href: '#vie-scolaire' },
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
    <header className="sticky top-0 z-50 w-full bg-primary shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            {logoUrl ? (
              <div className="relative h-12 w-auto min-w-[48px] flex items-center">
                <img 
                  src={logoUrl} 
                  alt={`${schoolName} Logo`} 
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            ) : (
              <GraduationCap className="text-secondary h-8 w-8" />
            )}
            <span className="text-2xl font-headline font-bold text-white tracking-tighter">
              {schoolName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/90 hover:text-secondary transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Football Academy Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-secondary transition-colors focus:outline-none">
                Football Academy <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border-white/10 p-2 min-w-[280px]">
                {footballSubLinks.map((sub) => (
                  <DropdownMenuItem key={sub.name} asChild>
                    <Link 
                      href={sub.href}
                      className="text-white hover:bg-secondary hover:text-white cursor-pointer py-3 px-4 font-headline text-xs font-bold uppercase tracking-wider"
                    >
                      {sub.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/admin">
              <Button variant="ghost" className="text-white hover:text-secondary p-2">
                <Settings size={20} />
              </Button>
            </Link>
            <Button className="rounded-[30px] bg-secondary hover:bg-secondary/90 text-white font-bold px-6 border-none shadow-md">
              PORTES OUVERTES
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
             <Link href="/admin" className="text-white">
                <Settings size={20} />
              </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "lg:hidden absolute w-full bg-primary border-t border-white/10 transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[800px] opacity-100 py-6" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="flex flex-col space-y-4 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-white hover:text-secondary"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 pb-2 border-t border-white/10">
            <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Football Academy</p>
            {footballSubLinks.map((sub) => (
              <Link
                key={sub.name}
                href={sub.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm text-white/70 hover:text-white"
              >
                {sub.name}
              </Link>
            ))}
          </div>
          <Button className="w-full rounded-[30px] bg-secondary hover:bg-secondary/90 text-white font-bold py-6">
            S'INSCRIRE
          </Button>
        </div>
      </div>
    </header>
  );
}
