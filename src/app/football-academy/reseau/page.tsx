
import React from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Globe, Link as LinkIcon, Handshake } from 'lucide-react';

export default function ReseauClubsPage() {
  return (
    <FirebaseClientProvider>
      <Header />
      <main className="min-h-screen">
        <section className="bg-primary text-white py-32 overflow-hidden relative">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6">Notre Réseau de Clubs</h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Un pont direct vers les plus grandes académies professionnelles d'Europe.</p>
          </div>
          <div className="absolute top-0 right-0 opacity-10"><Globe size={600} /></div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-muted p-12 rounded-3xl border border-border flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-headline font-bold text-primary mb-6">Plus de 50 partenariats</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Notre expertise et notre sérieux nous ont permis de tisser des liens étroits avec des clubs de Ligue 1, Ligue 2 et des championnats européens majeurs.
                </p>
                <div className="flex items-center gap-4 text-secondary font-bold">
                  <Handshake />
                  <span>Confiance, Excellence, Opportunité</span>
                </div>
              </div>
              <div className="md:w-1/2 grid grid-cols-2 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-white p-6 rounded-2xl border flex items-center justify-center font-headline font-bold text-primary/20">LOGO CLUB {i}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </FirebaseClientProvider>
  );
}
