import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BargemoneWineryContent from './BargemoneWineryContent';

export const metadata: Metadata = {
  title: 'Bargemone | The Bottle Club & Vivino',
  description: 'Discover Bargemone, a sustainable winery in Coteaux d’Aix-en-Provence.',
};

export default function BargemoneWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><BargemoneWineryContent /></div>
      <Footer />
    </main>
  );
}
