
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, GraduationCap, ChevronDown, Globe, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDoc, useFirestore, useMemoFirebase, useFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useTranslation } from '@/hooks/use-translation';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  
  const db = useFirestore();
  const { settings: serverSettings } = useFirebase();
  const settingsRef = useMemoFirebase(() => doc(db, 'settings', 'global'), [db]);
  const { data: clientSettings } = useDoc(settingsRef);
  
  const settings = clientSettings || serverSettings;
  const { t, language, setLanguage } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const homeSubLinks = [
    { name: t.nav.history, href: '/notre-histoire' },
    { name: t.nav.project_team, href: '/projet-equipe' },
    { name: t.nav.recognition, href: '/reconnaissance' },
  ];

  const campusSubLinks = [
    { name: 'Campus Aquitaine (Bordeaux)', href: '/campus/sainte-bazeille' },
    { name: 'Campus Provence (Aix en Provence)', href: '/campus/sainte-tulle' },
  ];

  const formationsSubLinks = [
    { name: t.header.integration, href: '/formations/integration' },
    { name: t.header.college, href: '/formations/college' },
    { name: t.header.lycee, href: '/formations/lycee' },
    { name: t.header.langues, href: '/formations/langues' },
    { name: t.header.bac_americain, href: '/formations/bac-americain' },
  ];

  const footballSubLinks = [
    { name: t.header.prog_foot, href: '/football-academy/programme' },
    { name: t.header.comp_off, href: '/football-academy/competition' },
    { name: t.header.sport_etudes, href: '/football-academy/sport-etudes' },
    { name: t.header.parcours, href: '/football-academy/parcours' },
    { name: t.header.accomp, href: '/football-academy/accompagnement' },
    { name: t.header.metiers, href: '/football-academy/metiers' },
    { name: t.header.reseau, href: '/football-academy/reseau' },
  ];

  const navLinks = [
    { name: t.nav.home, href: '/', hasDropdown: true },
    { name: t.nav.campus, href: '#', hasDropdown: true },
    { name: t.nav.formations, href: '#', hasDropdown: true },
    { name: t.nav.football, href: '#', hasDropdown: true },
    { name: t.nav.contact, href: '/contact' },
  ];

  const schoolName = settings?.schoolName || "ESEPE";
  const logoUrl = settings?.logoUrl;

  const getSubLinks = (name: string) => {
    if (name === t.nav.home) return homeSubLinks;
    if (name === t.nav.campus) return campusSubLinks;
    if (name === t.nav.formations) return formationsSubLinks;
    if (name === t.nav.football) return footballSubLinks;
    return [];
  };

  if (!mounted) {
    return <header className="h-20 bg-white border-b border-gray-100" />;
  }

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      <div className="bg-white py-3 md:py-4 border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 md:space-x-4">
            <div className="relative h-20 w-20 md:h-28 md:w-28 flex items-center justify-center">
              {logoUrl ? (
                <img src={logoUrl} alt={schoolName} className="h-full w-auto object-contain" />
              ) : (
                <div className="p-2 border-2 border-primary rounded-full">
                  < GraduationCap className="text-primary h-12 w-12 md:h-16 md:w-16" />
                </div>
              )}
            </div>
            <span className="text-xl md:text-3xl font-headline font-bold text-black tracking-tighter">
              {schoolName}
            </span>
          </Link>

          <div className="hidden lg:block">
            <h2 className="text-2xl xl:text-3xl font-serif italic text-black font-medium tracking-tight">
              {t.common.excellence}
            </h2>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5 font-bold text-[10px] md:text-xs uppercase tracking-widest outline-none h-9 hover:text-[#D4AF37] transition-colors">
                  <Globe size={14} className="md:w-4 md:h-4" />
                  {language}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-muted">
                <DropdownMenuItem onClick={() => setLanguage('fr')} className="font-bold cursor-pointer hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F9E2AF]">FRANÇAIS</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')} className="font-bold cursor-pointer hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F9E2AF]">ENGLISH</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('zh')} className="font-bold cursor-pointer hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F9E2AF]">中文</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/inscription">
              <Button className="hidden sm:flex rounded-md bg-[#e31e24] text-white font-bold px-4 md:px-6 py-5 md:py-6 uppercase tracking-wider text-xs">
                {t.nav.join}
              </Button>
            </Link>

            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden text-black p-2 h-10 w-10 flex items-center justify-center bg-muted/30 rounded-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block bg-[#1a1a1a] w-full">
        <nav className="w-full flex">
          {navLinks.map((link) => (
            link.hasDropdown ? (
              <div 
                key={link.name} 
                className="flex-1 relative group"
                onMouseEnter={() => setActiveMenu(link.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <DropdownMenu open={activeMenu === link.name} onOpenChange={(val) => !val && setActiveMenu(null)}>
                  <DropdownMenuTrigger asChild>
                    <div 
                      className="w-full flex items-center justify-center border-r border-white/10 hover:bg-white/10 transition-colors cursor-pointer outline-none group"
                      onClick={() => {
                        if (link.href !== '#') {
                          router.push(link.href);
                          setActiveMenu(null);
                        }
                      }}
                    >
                      <span className="pl-4 py-5 text-[10px] font-bold text-white uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors">
                        {link.name}
                      </span>
                      <div className="px-3 py-5 text-white">
                        <ChevronDown size={12} className={cn("transition-transform duration-200 group-hover:text-[#D4AF37]", activeMenu === link.name && "rotate-180 text-[#D4AF37]")} />
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="bg-[#1a1a1a] border-white/10 p-2 min-w-[280px] rounded-none shadow-2xl"
                    onMouseEnter={() => setActiveMenu(link.name)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    {getSubLinks(link.name).map((sub) => (
                      <DropdownMenuItem key={sub.name} asChild>
                        <Link href={sub.href} className="text-white hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#F9E2AF] hover:text-[#1a1a1a] cursor-pointer py-3 px-4 font-headline text-xs font-bold uppercase tracking-wider block border-b border-white/5 last:border-0 transition-all">
                          {sub.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link key={link.name} href={link.href} className="flex-1 flex items-center justify-center text-[10px] font-bold text-white py-5 hover:bg-white/10 uppercase tracking-widest border-r border-white/10 last:border-r-0 hover:text-[#D4AF37] transition-colors">
                {link.name}
              </Link>
            )
          ))}
        </nav>
      </div>

      <div className={cn(
        "lg:hidden absolute w-full bg-[#1a1a1a] border-t border-white/10 transition-all duration-500 ease-in-out z-50 overflow-hidden shadow-2xl",
        isOpen ? "max-h-[90vh] py-8" : "max-h-0"
      )}>
        <div className="flex flex-col space-y-2 px-6">
          {navLinks.map((link) => (
            <div key={link.name} className="flex flex-col">
              <div className="flex items-center justify-between py-4 border-b border-white/5 group">
                {link.hasDropdown ? (
                  <div 
                    className="flex-1 text-sm font-bold text-white uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                    onClick={() => {
                      if (link.href !== '#') {
                        router.push(link.href);
                        setIsOpen(false);
                      } else {
                        setExpandedMobileMenu(expandedMobileMenu === link.name ? null : link.name);
                      }
                    }}
                  >
                    {link.name}
                  </div>
                ) : (
                  <Link 
                    href={link.href} 
                    className="text-sm font-bold text-white uppercase tracking-widest block w-full hover:text-[#D4AF37] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
                {link.hasDropdown && (
                  <div 
                    className="p-2 cursor-pointer"
                    onClick={() => setExpandedMobileMenu(expandedMobileMenu === link.name ? null : link.name)}
                  >
                    <ChevronDown 
                      size={18} 
                      className={cn("text-white/40 transition-transform duration-300 group-hover:text-[#D4AF37]", expandedMobileMenu === link.name && "rotate-180 text-[#D4AF37]")} 
                    />
                  </div>
                )}
              </div>
              
              {link.hasDropdown && (
                <div className={cn(
                  "overflow-hidden transition-all duration-300 bg-white/5 rounded-lg mt-1",
                  expandedMobileMenu === link.name ? "max-h-[400px] py-2 mb-4" : "max-h-0"
                )}>
                  {getSubLinks(link.name).map(sub => (
                    <Link 
                      key={sub.name} 
                      href={sub.href} 
                      onClick={() => setIsOpen(false)} 
                      className="flex items-center gap-3 px-6 py-3.5 text-xs font-bold text-white/70 hover:text-[#D4AF37] border-b border-white/5 last:border-0 transition-colors"
                    >
                      <ChevronRight size={14} className="text-[#D4AF37]" />
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="pt-8">
            <Link href="/inscription" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-xl bg-[#e31e24] text-white font-bold py-7 uppercase tracking-widest shadow-xl">
                {t.nav.join}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
