
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Figures } from '@/components/sections/Figures';
import { Programs } from '@/components/sections/Programs';
import { Apprenticeship } from '@/components/sections/Apprenticeship';
import { News } from '@/components/sections/News';
import { Partners } from '@/components/sections/Partners';
import { Footer } from '@/components/sections/Footer';
import { AIPoweredSummary } from '@/components/admin/AIPoweredSummary';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Figures />
      <Programs />
      <Apprenticeship />
      <News />
      
      {/* Admin Utility Demo */}
      <div className="container mx-auto px-4 py-8">
        <AIPoweredSummary />
      </div>

      <Partners />
      <Footer />
    </main>
  );
}
