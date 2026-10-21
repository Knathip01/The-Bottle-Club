import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FrancisFordCoppolaWineryContent from './FrancisFordCoppolaWineryContent';

export const metadata: Metadata = {
  title: 'Francis Ford Coppola Winery | The Bottle Club & Vivino',
  description: 'Explore Francis Ford Coppola Winery in Sonoma County, where cinema magic meets world-class winemaking, food, and hospitality.',
};

export default function FrancisFordCoppolaWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <FrancisFordCoppolaWineryContent />
      </div>
      <Footer />
    </main>
  );
}
