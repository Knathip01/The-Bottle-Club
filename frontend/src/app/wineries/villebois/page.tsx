import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import VilleboisWineryContent from './VilleboisWineryContent';

export const metadata: Metadata = {
  title: 'Villebois | The Bottle Club & Vivino',
  description: 'Discover Villebois, specialist of Sauvignon Blanc in the Loire Valley.',
};

export default function VilleboisWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><VilleboisWineryContent /></div>
      <Footer />
    </main>
  );
}
