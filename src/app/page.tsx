
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Figures } from '@/components/sections/Figures';
import { ThreeAxes } from '@/components/sections/ThreeAxes';
import { Campuses } from '@/components/sections/Campuses';
import { Programs } from '@/components/sections/Programs';
import { FootballAcademy } from '@/components/sections/FootballAcademy';
import { OrientationSimulator } from '@/components/sections/OrientationSimulator';
import { StudentLife } from '@/components/sections/StudentLife';
import { News } from '@/components/sections/News';
import { Footer } from '@/components/sections/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export default function Home() {
  return (
    <FirebaseClientProvider>
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Figures />
        <ThreeAxes />
        <Campuses />
        <Programs />
        <FootballAcademy />
        <OrientationSimulator />
        <StudentLife />
        <News />
        <Footer />
      </main>
    </FirebaseClientProvider>
  );
}
