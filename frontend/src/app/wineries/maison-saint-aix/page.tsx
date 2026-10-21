import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MaisonSaintAixWineryContent from './MaisonSaintAixWineryContent';

export const metadata: Metadata = {
  title: 'Maison Saint Aix | The Bottle Club & Vivino',
  description: 'Discover Maison Saint Aix and its iconic AIX Rosé from Provence.',
};

export default function MaisonSaintAixWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><MaisonSaintAixWineryContent /></div>
      <Footer />
    </main>
  );
}
