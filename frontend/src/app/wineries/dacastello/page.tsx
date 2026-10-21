import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DacastelloContent from './DacastelloContent';

export const metadata: Metadata = {
  title: 'Dacastello Winery | The Bottle Club & Vivino',
  description: 'Explore Dacastello Vini Pregiati in Piedmont, Italy. Showcasing over 100 authentic Italian wines, tradition, innovation, and global wine distribution.',
};

export default function DacastelloPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <DacastelloContent />
      </div>
      <Footer />
    </main>
  );
}
