import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MiravalWineryContent from './MiravalWineryContent';

export const metadata: Metadata = {
  title: 'Miraval | The Bottle Club & Vivino',
  description: 'Discover Miraval, a Provence rosé crafted by the Perrin family in a remarkable natural setting.',
};

export default function MiravalWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><MiravalWineryContent /></div>
      <Footer />
    </main>
  );
}
