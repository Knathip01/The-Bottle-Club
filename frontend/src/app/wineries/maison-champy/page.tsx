import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MaisonChampyWineryContent from './MaisonChampyWineryContent';

export const metadata: Metadata = {
  title: 'Maison Champy | The Bottle Club & Vivino',
  description: 'Discover Maison Champy, Burgundy’s first wine house, established in 1720.',
};

export default function MaisonChampyWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><MaisonChampyWineryContent /></div>
      <Footer />
    </main>
  );
}
