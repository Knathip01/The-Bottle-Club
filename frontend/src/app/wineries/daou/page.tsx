import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DaouContent from './DaouContent';

export const metadata: Metadata = {
  title: 'DAOU | The Bottle Club & Vivino',
  description: 'DAOU is dedicated to crafting Bordeaux-style wines that rival the best in the world, elevating and showcasing Paso Robles as the next frontier for ultra-premium Cabernet Sauvignon.',
};

export default function DaouPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <DaouContent />
      </div>
      <Footer />
    </main>
  );
}
