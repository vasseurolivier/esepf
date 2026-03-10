"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, GraduationCap, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDoc, useFirestore } from '@/firebase';
import Image from 'next/image';

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'Formations', href: '#formations' },
  { name: 'Academy Football', href: '#football' },
  { name: 'Vie Scolaire', href: '#vie-scolaire' },
  { name: 'Actualités', href: '#news' },
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
              <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-white/20">
                <Image src={logoUrl} alt="Logo" fill className="object-contain" />
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
          isOpen ? "max-h-[600px] opacity-100 py-6" : "max-h-0 opacity-0 overflow-hidden"
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
          <Button className="w-full rounded-[30px] bg-secondary hover:bg-secondary/90 text-white font-bold py-6">
            S'INSCRIRE
          </Button>
        </div>
      </div>
    </header>
  );
}
