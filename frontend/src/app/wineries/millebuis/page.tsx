import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MillebuisWineryContent from './MillebuisWineryContent';

export const metadata: Metadata = {
  title: 'Millebuis | The Bottle Club & Vivino',
  description: 'Discover Millebuis, wines from the Côte Chalonnaise growers’ cooperative.',
};

export default function MillebuisWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><MillebuisWineryContent /></div>
      <Footer />
    </main>
  );
}
