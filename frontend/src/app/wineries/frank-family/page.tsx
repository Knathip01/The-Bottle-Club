import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FrankFamilyContent from './FrankFamilyContent';

export const metadata: Metadata = {
  title: 'Frank Family | The Bottle Club & Vivino',
  description: 'Frank Family Vineyards is celebrated for its world-class winemaking, hospitality, and award-winning wines in Calistoga, Napa Valley.',
};

export default function FrankFamilyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <FrankFamilyContent />
      </div>
      <Footer />
    </main>
  );
}
