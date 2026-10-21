import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AstraleContent from './AstraleContent';

export const metadata: Metadata = {
  title: 'Astrale Winery | The Bottle Club & Vivino',
  description: 'Explore Astrale in Chianti, Tuscany, founded by Sicilian oenologist Peppe Randazzo, redefining the standards of Italian wine with celestial inspiration.',
};

export default function AstralePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <AstraleContent />
      </div>
      <Footer />
    </main>
  );
}
