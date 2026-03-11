
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Sparkles, ArrowRight, RefreshCcw, GraduationCap } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';

export function OrientationSimulator() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    {
      id: 1,
      question: t.orientation.q1,
      options: [
        { label: t.orientation.q1_o1, value: "GEN" },
        { label: t.orientation.q1_o2, value: "STMG" },
        { label: t.orientation.q1_o3, value: "GEN" }
      ]
    },
    {
      id: 2,
      question: t.orientation.q2,
      options: [
        { label: t.orientation.q2_o1, value: "GEN" },
        { label: t.orientation.q2_o2, value: "STMG" },
        { label: t.orientation.q2_o3, value: "STMG" }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    const stmgCount = finalAnswers.filter(a => a === "STMG").length;
    if (stmgCount >= 1) {
      setResult("Bac Technologique STMG");
    } else {
      setResult("Bac Général");
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <section id="orientation" className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4">
        <ScrollReveal className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4">{t.sections.orientation_title}</h2>
            <p className="text-white/70 text-lg">{t.sections.orientation_desc}</p>
          </div>

          <Card className="bg-white text-primary border-none shadow-2xl overflow-hidden rounded-3xl">
            {!result ? (
              <>
                <CardHeader className="bg-muted/50 p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="text-secondary" />
                    <span className="text-sm font-bold text-secondary uppercase tracking-widest">Question {step + 1}/{questions.length}</span>
                  </div>
                  <CardTitle className="text-2xl font-headline font-bold">{questions[step].question}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <RadioGroup className="space-y-4">
                    {questions[step].options.map((option, i) => (
                      <div 
                        key={i} 
                        className="flex items-center space-x-4 p-4 rounded-xl border-2 border-muted hover:border-secondary hover:bg-secondary/5 cursor-pointer transition-all"
                        onClick={() => handleAnswer(option.value)}
                      >
                        <RadioGroupItem value={option.value} id={`q${step}-o${i}`} className="border-secondary text-secondary" />
                        <Label htmlFor={`q${step}-o${i}`} className="text-lg font-medium cursor-pointer w-full">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </>
            ) : (
              <CardContent className="p-12 text-center animate-in fade-in duration-500">
                <div className="bg-secondary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="text-secondary w-12 h-12" />
                </div>
                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">{t.orientation.result_prefix}</h3>
                <CardTitle className="text-4xl md:text-5xl font-headline font-bold text-primary mb-8">{result}</CardTitle>
                <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
                  {result === "Bac Technologique STMG" 
                    ? t.orientation.stmg_desc
                    : t.orientation.gen_desc
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold py-6 px-8 rounded-full text-lg uppercase tracking-wider">
                    {t.orientation.discover_btn} <ArrowRight className="ml-2" />
                  </Button>
                  <Button variant="outline" onClick={reset} className="border-2 border-primary text-primary font-bold py-6 px-8 rounded-full text-lg hover:bg-primary/5 uppercase tracking-wider">
                    {t.orientation.restart_btn} <RefreshCcw className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
