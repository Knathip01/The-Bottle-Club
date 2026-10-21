import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LarocheWineryContent from './LarocheWineryContent';

export const metadata: Metadata = {
  title: 'Laroche | The Bottle Club & Vivino',
  description: 'Discover Laroche, a Chablis winery with more than 1,000 years of history and a passion for Chardonnay.',
};

export default function LarocheWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><LarocheWineryContent /></div>
      <Footer />
    </main>
  );
}
