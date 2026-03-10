
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Figures } from '@/components/sections/Figures';
import { Programs } from '@/components/sections/Programs';
import { OrientationSimulator } from '@/components/sections/OrientationSimulator';
import { StudentLife } from '@/components/sections/StudentLife';
import { News } from '@/components/sections/News';
import { Partners } from '@/components/sections/Partners';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Figures />
      <Programs />
      <OrientationSimulator />
      <StudentLife />
      <News />
      <Partners />
      <Footer />
    </main>
  );
}
