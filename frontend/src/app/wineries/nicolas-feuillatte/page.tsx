import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import NicolasFeuillatteWineryContent from './NicolasFeuillatteWineryContent';

export const metadata: Metadata = {
  title: 'Nicolas Feuillatte | The Bottle Club & Vivino',
  description: 'Discover Champagne Nicolas Feuillatte and its cuvées, crafted from grapes grown across the Champagne region.',
};

export default function NicolasFeuillatteWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><NicolasFeuillatteWineryContent /></div>
      <Footer />
    </main>
  );
}
