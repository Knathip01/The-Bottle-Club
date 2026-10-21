import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AntanoContent from './AntanoContent';

export const metadata: Metadata = {
  title: 'Antaño Winery | The Bottle Club & Vivino',
  description: 'Explore Antaño winery in Rioja Alavesa, Spain. Crafting wines within old stone walls that have witnessed centuries of winemaking.',
};

export default function AntanoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <AntanoContent />
      </div>
      <Footer />
    </main>
  );
}
