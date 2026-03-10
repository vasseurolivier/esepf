
import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { HeartPulse, Brain, Utensils, Zap } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function AccompagnementPage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <div className="bg-muted py-20 border-b">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">Accompagnement Physique & Mental</h1>
          </div>
        </div>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ScrollReveal className="space-y-8">
                <div className="flex gap-6 p-8 bg-white rounded-3xl shadow-sm border border-border">
                  <div className="p-4 rounded-2xl bg-red-100 text-red-600"><HeartPulse size={32} /></div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Suivi Médical</h3>
                    <p className="text-muted-foreground">Kinesithérapie, ostéopathie et suivi traumatologique par des professionnels de santé du sport.</p>
                  </div>
                </div>
                <div className="flex gap-6 p-8 bg-white rounded-3xl shadow-sm border border-border">
                  <div className="p-4 rounded-2xl bg-blue-100 text-blue-600"><Brain size={32} /></div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Préparation Mentale</h3>
                    <p className="text-muted-foreground">Apprendre à gérer le stress, la concentration et la résilience face à la défaite.</p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200} className="space-y-8">
                <div className="flex gap-6 p-8 bg-white rounded-3xl shadow-sm border border-border">
                  <div className="p-4 rounded-2xl bg-orange-100 text-orange-600"><Utensils size={32} /></div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Nutrition Sportive</h3>
                    <p className="text-muted-foreground">Régimes alimentaires adaptés aux efforts intensifs et à la récupération.</p>
                  </div>
                </div>
                <div className="flex gap-6 p-8 bg-white rounded-3xl shadow-sm border border-border">
                  <div className="p-4 rounded-2xl bg-yellow-100 text-yellow-600"><Zap size={32} /></div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Récupération</h3>
                    <p className="text-muted-foreground">Cryothérapie, massages et protocoles de sommeil optimisés.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
