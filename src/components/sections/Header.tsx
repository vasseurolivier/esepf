
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'Programme', href: '#programs' },
  { name: 'Admission', href: '#admission' },
  { name: 'Campus', href: '#campus' },
  { name: 'International', href: '#international' },
  { name: 'Entreprises', href: '#business' },
  { name: 'Blog', href: '#news' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-headline font-bold text-white tracking-tighter">
              PACK<span className="text-secondary">VISION</span>
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
            <Button className="rounded-[30px] bg-secondary hover:bg-secondary/90 text-white font-bold px-6">
              CANDIDATER
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
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
          isOpen ? "max-h-[500px] opacity-100 py-6" : "max-h-0 opacity-0 overflow-hidden"
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
            CANDIDATER
          </Button>
        </div>
      </div>
    </header>
  );
}
