import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import GutHermannsbergContent from './GutHermannsbergContent';

export const metadata: Metadata = {
  title: 'Gut Hermannsberg Winery | The Bottle Club & Vivino',
  description: 'Discover Gut Hermannsberg, the historic Nahe Riesling estate known for VDP.GROSSE LAGE® steep slope vineyards and extraordinary minerality.',
};

export default function GutHermannsbergPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <GutHermannsbergContent />
      </div>
      <Footer />
    </main>
  );
}
