import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import SassaiaContent from './SassaiaContent';

export const metadata: Metadata = {
  title: 'Sassaia Winery | The Bottle Club & Vivino',
  description: 'Explore Sassaia in Monferrato, Piedmont, Italy. A pioneer of Burgundy-style Timorasso crafting exceptional Piedmontese white wines.',
};

export default function SassaiaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <SassaiaContent />
      </div>
      <Footer />
    </main>
  );
}
