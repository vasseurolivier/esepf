
"use client";

import React from 'react';
import { ArrowDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface FrenchSystemSchemaProps {
  bacType: string;
}

export function FrenchSystemSchema({ bacType }: FrenchSystemSchemaProps) {
  const { t } = useTranslation();

  return (
    <div className="py-16 bg-white rounded-[3rem] shadow-inner border border-muted/50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          
          {/* Top Level: Bac */}
          <div className="flex items-center gap-4 w-full justify-center">
            <div className="bg-white border-2 border-primary p-6 rounded-xl shadow-lg min-w-[280px] text-center">
              <span className="text-xl font-headline font-bold text-black italic">{bacType}</span>
            </div>
            <ArrowRight className="text-muted-foreground" />
            <div className="bg-muted p-4 rounded-xl border border-border min-w-[200px] text-center">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                {t.common.jobs_prefix} (niveau Bac)
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
              <div className="relative bg-[#f5f1e8] p-8 rounded-2xl border border-[#d1c7b7] shadow-md w-full text-center group hover:scale-105 transition-transform">
                <h4 className="text-xl font-headline font-bold text-black uppercase tracking-widest mb-1">UNIVERSITÉS</h4>
                <p className="text-sm italic text-muted-foreground mb-4">Licences</p>
                <div className="flex justify-center gap-3">
                  <div className="w-6 h-4 bg-blue-600 relative overflow-hidden flex shadow-sm"><div className="w-1/3 bg-blue-600 h-full"></div><div className="w-1/3 bg-white h-full"></div><div className="w-1/3 bg-red-600 h-full"></div></div>
                  <div className="w-6 h-4 bg-red-600 relative overflow-hidden flex shadow-sm items-center justify-center"><span className="text-[4px] text-white">★</span></div>
                  <div className="w-6 h-4 bg-red-600 relative overflow-hidden flex shadow-sm"><div className="w-full bg-red-600 h-full flex items-center justify-center"><span className="text-yellow-400 text-[6px]">★</span></div></div>
                </div>
                
                {/* Job Link */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2">
                   <div className="bg-muted p-3 rounded-lg border border-border text-[8px] font-bold uppercase whitespace-nowrap">{t.common.jobs_prefix} (Bac +3)</div>
                   <ArrowRight className="text-muted-foreground rotate-180" size={16} />
                </div>
              </div>

              <ArrowDown className="text-red-500 w-6 h-6 animate-bounce" />

              <div className="bg-[#f5f1e8] p-6 rounded-2xl border border-[#d1c7b7] shadow-md w-full text-center">
                <h4 className="text-xl font-headline font-bold text-black uppercase tracking-widest mb-1">UNIVERSITÉS</h4>
                <p className="text-sm italic text-muted-foreground">Masters</p>
                
                {/* Job Link */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2">
                   <div className="bg-muted p-3 rounded-lg border border-border text-[8px] font-bold uppercase whitespace-nowrap">{t.common.jobs_prefix} (Bac +5)</div>
                   <ArrowRight className="text-muted-foreground rotate-180" size={16} />
                </div>
              </div>
            </div>

            {/* BTS Path */}
            <div className="flex flex-col items-center justify-start pt-4">
              <div className="flex items-center gap-4 w-full">
                <div className="bg-[#f5f1e8] p-8 rounded-2xl border border-[#d1c7b7] shadow-md flex-1 text-center">
                  <h4 className="text-2xl font-headline font-bold text-black uppercase tracking-widest">BTS</h4>
                </div>
                <ArrowRight className="text-muted-foreground" />
                <div className="bg-muted p-3 rounded-lg border border-border text-[8px] font-bold uppercase min-w-[120px] text-center">
                  {t.common.jobs_prefix} (Bac +2)
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
