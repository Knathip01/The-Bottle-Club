import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MaddalenaContent from './MaddalenaContent';

export const metadata: Metadata = {
  title: 'Maddalena Wines | The Bottle Club & Vivino',
  description: 'Maddalena Wines honors the Riboli Family matriarch with expressive estate wines from Paso Robles and California’s Central Coast.',
};

export default function MaddalenaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <MaddalenaContent />
      </div>
      <Footer />
    </main>
  );
}
