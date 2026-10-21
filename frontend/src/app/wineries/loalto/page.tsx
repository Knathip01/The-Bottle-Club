import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LoAltoContent from './LoAltoContent';

export const metadata: Metadata = {
  title: 'LoAlto | The Bottle Club & Vivino',
  description: 'Explore LoAlto, a sustainable winery in Utiel-Requena crafting quality wines from vineyards set within a unique Mediterranean ecosystem at 750 m altitude.',
};

export default function LoAltoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <LoAltoContent />
      </div>
      <Footer />
    </main>
  );
}
