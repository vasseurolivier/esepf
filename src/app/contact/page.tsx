
"use client";

import React, { useState } from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, Loader2, MessageSquare, Globe, Clock } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContactPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Message Envoyé !",
        description: t.contact_page.form_success,
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const contactInfos = [
    {
      title: t.contact_page.campus_evron,
      phone: t.contact_page.phone_wechat,
      email: "contact@esepf.fr"
    },
    {
      title: t.contact_page.campus_bazeilles,
      phone: t.contact_page.phone_wechat,
      email: "contact@esepf.fr"
    },
    {
      title: t.contact_page.campus_tulle,
      phone: t.contact_page.phone_wechat,
      email: "contact@esepf.fr"
    }
  ];

  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* Hero Section */}
        <section className="bg-primary text-white py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 -translate-y-1/4 translate-x-1/4">
            <Globe size={600} />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal>
              <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 tracking-tighter uppercase">
                {t.contact_page.title}
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                {t.contact_page.subtitle}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Form Side */}
              <div className="lg:col-span-7">
                <ScrollReveal>
                  <Card className="rounded-[2.5rem] shadow-2xl border-none overflow-hidden">
                    <div className="bg-secondary p-8 text-white">
                      <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
                        <MessageSquare size={32} />
                        {t.contact_page.form_title}
                      </h2>
                    </div>
                    <CardContent className="p-8 lg:p-12">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="font-bold text-xs uppercase tracking-widest">{t.contact_page.form_name}</Label>
                            <Input required placeholder="Ex: Jean Dupont" className="rounded-xl h-14 bg-muted/30 border-muted focus:border-secondary transition-all" />
                          </div>
                          <div className="space-y-2">
                            <Label className="font-bold text-xs uppercase tracking-widest">{t.contact_page.form_email}</Label>
                            <Input required type="email" placeholder="Ex: jean@example.com" className="rounded-xl h-14 bg-muted/30 border-muted focus:border-secondary transition-all" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold text-xs uppercase tracking-widest">{t.contact_page.form_subject}</Label>
                          <Input required placeholder={t.contact_page.form_subject} className="rounded-xl h-14 bg-muted/30 border-muted focus:border-secondary transition-all" />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold text-xs uppercase tracking-widest">{t.contact_page.form_message}</Label>
                          <Textarea required placeholder="..." className="rounded-xl min-h-[200px] bg-muted/30 border-muted focus:border-secondary transition-all" />
                        </div>
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full h-16 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 shadow-xl transition-all uppercase tracking-widest"
                        >
                          {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Send size={20} className="mr-2" />}
                          {isSubmitting ? t.contact_page.form_sending : t.contact_page.form_send}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>

              {/* Info Side */}
              <div className="lg:col-span-5 space-y-8">
                <ScrollReveal className="space-y-8">
                  <h2 className="text-4xl font-headline font-bold text-primary flex items-center gap-3">
                    <span className="w-12 h-1 bg-secondary rounded-full" />
                    {t.contact_page.info_title}
                  </h2>

                  <div className="space-y-6">
                    {contactInfos.map((info, idx) => (
                      <div key={idx} className="p-8 rounded-[2rem] bg-muted/20 border border-muted group hover:bg-primary hover:text-white transition-all duration-500">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <MapPin className="text-secondary" />
                          {info.title}
                        </h3>
                        <div className="space-y-3 opacity-80 text-sm">
                          <p className="flex items-center gap-3"><Phone size={16} /> {info.phone}</p>
                          <p className="flex items-center gap-3"><Mail size={16} /> {info.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 rounded-[2rem] bg-secondary/10 border-2 border-dashed border-secondary/20 flex items-center gap-6">
                    <div className="bg-secondary text-white p-4 rounded-2xl">
                      <Clock size={32} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary uppercase text-xs tracking-widest">{t.contact_page.opening_hours}</h4>
                      <p className="text-sm text-muted-foreground">{t.contact_page.mon_fri}</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">{t.contact_page.faq_title}</h2>
              <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="bg-white rounded-2xl px-6 border border-muted shadow-sm overflow-hidden">
                  <AccordionTrigger className="text-lg font-bold text-primary hover:no-underline">{t.contact_page.faq_q1}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {t.contact_page.faq_a1}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="bg-white rounded-2xl px-6 border border-muted shadow-sm overflow-hidden">
                  <AccordionTrigger className="text-lg font-bold text-primary hover:no-underline">{t.contact_page.faq_q2}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {t.contact_page.faq_a2}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="bg-white rounded-2xl px-6 border border-muted shadow-sm overflow-hidden">
                  <AccordionTrigger className="text-lg font-bold text-primary hover:no-underline">{t.contact_page.faq_q3}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {t.contact_page.faq_a3}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
