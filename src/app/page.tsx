
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Figures } from '@/components/sections/Figures';
import { ThreeAxes } from '@/components/sections/ThreeAxes';
import { StudentJourney } from '@/components/sections/StudentJourney';
import { Campuses } from '@/components/sections/Campuses';
import { Programs } from '@/components/sections/Programs';
import { FootballAcademy } from '@/components/sections/FootballAcademy';
import { OrientationSimulator } from '@/components/sections/OrientationSimulator';
import { StudentLife } from '@/components/sections/StudentLife';
import { Footer } from '@/components/sections/Footer';
import { PromoPopup } from '@/components/ui/PromoPopup';

export default function Home() {
  return (
    <main className="min-h-screen">
      <PromoPopup />
      <Header />
      <Hero />
      <Figures />
      <ThreeAxes />
      <StudentJourney />
      <Campuses />
      <Programs />
      <FootballAcademy />
      <OrientationSimulator />
      <StudentLife />
      <Footer />
    </main>
  );
}
