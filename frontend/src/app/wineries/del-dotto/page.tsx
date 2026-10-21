import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DelDottoContent from './DelDottoContent';

export const metadata: Metadata = {
  title: 'Del Dotto | The Bottle Club & Vivino',
  description: 'Del Dotto Family Wineries & Caves in Napa Valley exemplifies small-production, luxury winemaking with an acclaimed single-barrel program.',
};

export default function DelDottoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <DelDottoContent />
      </div>
      <Footer />
    </main>
  );
}
