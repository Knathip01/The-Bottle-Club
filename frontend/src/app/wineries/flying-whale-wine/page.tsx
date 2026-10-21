import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FlyingWhaleWineContent from './FlyingWhaleWineContent';

export const metadata: Metadata = {
  title: 'Flying Whale Wine | The Bottle Club & Vivino',
  description: 'Discover Flying Whale Wine, a story of culture, movement, and shared wine from the Roussillon region of France.',
};

export default function FlyingWhaleWinePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><FlyingWhaleWineContent /></div>
      <Footer />
    </main>
  );
}
