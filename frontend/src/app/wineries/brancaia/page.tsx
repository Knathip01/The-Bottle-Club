import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BrancaiaContent from './BrancaiaContent';

export const metadata: Metadata = {
  title: 'Brancaia Winery | The Bottle Club & Vivino',
  description: 'Explore Brancaia in Tuscany, acclaimed wine estate led by winemaker Barbara Widmer, creating iconic Super Tuscan wines with passion and artisan precision.',
};

export default function BrancaiaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BrancaiaContent />
      </div>
      <Footer />
    </main>
  );
}
