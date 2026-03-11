
"use client";

import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface FrenchSystemSchemaProps {
  bacType: string;
}

export function FrenchSystemSchema({ bacType }: FrenchSystemSchemaProps) {
  const { t } = useTranslation();

  // Mini composant pour les drapeaux
  const Flags = () => (
    <div className="flex justify-center gap-3 mb-4">
      {/* Drapeau Français */}
      <div className="w-6 h-4 flex shadow-sm border border-gray-200">
        <div className="flex-1 bg-[#002395]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#ED2939]"></div>
      </div>
      {/* Drapeau Chinois */}
      <div className="w-6 h-4 bg-[#DE2110] relative shadow-sm border border-gray-200">
        <div className="absolute top-0.5 left-0.5 text-yellow-400 text-[6px] leading-none">★</div>
      </div>
      {/* Drapeau Américain */}
      <div className="w-6 h-4 bg-white relative shadow-sm overflow-hidden flex flex-col border border-gray-200">
        <div className="h-[2px] bg-[#B22234]"></div>
        <div className="h-[2px] bg-white"></div>
        <div className="h-[2px] bg-[#B22234]"></div>
        <div className="h-[2px] bg-white"></div>
        <div className="h-[2px] bg-[#B22234]"></div>
        <div className="h-[2px] bg-white"></div>
        <div className="h-[2px] bg-[#B22234]"></div>
        <div className="h-[2px] bg-white"></div>
        <div className="absolute top-0 left-0 w-3 h-2.5 bg-[#3C3B6E]"></div>
      </div>
    </div>
  );

  return (
    <div className="py-16 bg-white rounded-[3rem] shadow-inner border border-muted/50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          
          {/* Top Level: Bac */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
            <div className="bg-white border-2 border-primary p-6 rounded-xl shadow-lg min-w-[280px] text-center">
              <span className="text-xl font-headline font-bold text-black italic">{bacType}</span>
            </div>
            <ArrowRight className="text-muted-foreground hidden md:block" />
            <ArrowDown className="text-muted-foreground md:hidden" />
            <div className="bg-muted p-4 rounded-xl border border-border min-w-[200px] text-center">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                {t.common.jobs_prefix} (Niveau Bac)
              </span>
            </div>
          </div>

          <ArrowDown className="text-black w-8 h-8" />

          {/* Higher Ed Label */}
          <div className="bg-secondary/10 border-2 border-secondary/20 py-4 px-12 rounded-full">
            <span className="text-lg font-headline font-bold text-black uppercase tracking-[0.2em]">
              {t.common.higher_ed}
            </span>
          </div>

          <div className="flex gap-8 justify-center w-full">
             <ArrowDown className="text-black w-8 h-8 -rotate-12" />
             <ArrowDown className="text-black w-8 h-8 rotate-12" />
          </div>

          {/* Split Path: University vs BTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            
            {/* University Path */}
            <div className="space-y-8 flex flex-col items-center">
              {/* Licence Box */}
              <div className="relative bg-[#f5f1e8] p-8 rounded-2xl border border-[#d1c7b7] shadow-md w-full text-center group hover:scale-[1.02] transition-transform">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-4 py-1 rounded-full shadow-sm">
                  BAC +3
                </div>
                <h4 className="text-xl font-headline font-bold text-black uppercase tracking-widest mb-1 mt-2">UNIVERSITÉS</h4>
                <p className="text-sm italic text-muted-foreground mb-4">Licences</p>
                <Flags />
                <div className="bg-white/50 p-2 rounded-lg border border-border inline-block">
                   <span className="text-[9px] font-bold uppercase text-primary">{t.common.jobs_prefix}</span>
                </div>
              </div>

              <ArrowDown className="text-secondary w-6 h-6 animate-bounce" />

              {/* Master Box */}
              <div className="relative bg-[#f5f1e8] p-8 rounded-2xl border border-[#d1c7b7] shadow-md w-full text-center group hover:scale-[1.02] transition-transform">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-bold px-4 py-1 rounded-full shadow-sm">
                  BAC +5
                </div>
                <h4 className="text-xl font-headline font-bold text-black uppercase tracking-widest mb-1 mt-2">UNIVERSITÉS</h4>
                <p className="text-sm italic text-muted-foreground mb-4">Masters</p>
                <Flags />
                <div className="bg-white/50 p-2 rounded-lg border border-border inline-block">
                   <span className="text-[9px] font-bold uppercase text-primary">{t.common.jobs_prefix}</span>
                </div>
              </div>
            </div>

            {/* BTS Path */}
            <div className="flex flex-col items-center justify-start">
              <div className="relative bg-[#f5f1e8] p-8 rounded-2xl border border-[#d1c7b7] shadow-md w-full text-center group hover:scale-[1.02] transition-transform">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-4 py-1 rounded-full shadow-sm">
                  BAC +2
                </div>
                <h4 className="text-2xl font-headline font-bold text-black uppercase tracking-widest mb-2 mt-2">BTS</h4>
                <p className="text-sm italic text-muted-foreground mb-4">Brevet de Technicien Supérieur</p>
                <div className="bg-white/50 p-2 rounded-lg border border-border inline-block">
                   <span className="text-[9px] font-bold uppercase text-primary">{t.common.jobs_prefix}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
