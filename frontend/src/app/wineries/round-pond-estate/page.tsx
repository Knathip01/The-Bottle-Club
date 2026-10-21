import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import RoundPondEstateContent from './RoundPondEstateContent';

export const metadata: Metadata = {
  title: 'Round Pond Estate | The Bottle Club & Vivino',
  description: 'Round Pond Estate is a Rutherford winery and farm specializing in expressive wines, artisan foods, and unforgettable experiences in Napa Valley.',
};

export default function RoundPondEstatePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <RoundPondEstateContent />
      </div>
      <Footer />
    </main>
  );
}
