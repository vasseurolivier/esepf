
"use client";

import React, { useState } from 'react';
import { adminContentSummarizer } from '@/ai/flows/admin-content-summarizer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';

export function AIPoweredSummary() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text) return;
    setIsLoading(true);
    try {
      const result = await adminContentSummarizer({ text });
      setSummary(result.summary);
    } catch (error) {
      console.error("AI Summary failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 max-w-2xl mx-auto my-12">
      <div className="flex items-center gap-2 mb-4 text-primary">
        <Sparkles size={20} className="text-secondary" />
        <h3 className="font-headline font-bold">Outil d'Édition IA (Admin)</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Utilisez notre IA pour générer un extrait engageant pour vos articles de blog ou descriptions de programmes.
      </p>
      <Textarea 
        placeholder="Collez ici le texte complet de l'article ou du programme..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mb-4 min-h-[120px]"
      />
      <Button 
        onClick={handleSummarize} 
        disabled={isLoading || !text}
        className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold"
      >
        {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" size={16} />}
        {isLoading ? 'Génération en cours...' : 'Générer l\'extrait'}
      </Button>

      {summary && (
        <div className="mt-6 p-4 bg-white rounded-lg border border-border">
          <h4 className="text-xs font-bold text-muted-foreground uppercase mb-2">Extrait généré :</h4>
          <p className="text-primary italic leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
}
