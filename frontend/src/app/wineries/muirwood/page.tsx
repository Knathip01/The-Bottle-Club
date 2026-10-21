import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MuirwoodContent from './MuirwoodContent';

export const metadata: Metadata = {
  title: 'Muirwood | The Bottle Club & Vivino',
  description: 'Muirwood Vineyards crafts expressive, terroir-driven wines rooted in the dramatic, maritime microclimates of Monterey County and the windswept Arroyo Seco appellation.',
};

export default function MuirwoodPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <MuirwoodContent />
      </div>
      <Footer />
    </main>
  );
}
