import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AgrapartAvizeWineryContent from './AgrapartAvizeWineryContent';

export const metadata: Metadata = {
  title: 'Agrapart Avize | The Bottle Club & Vivino',
  description: 'Discover Agrapart Avize, a Champagne house rooted in the Côte des Blancs.',
};

export default function AgrapartAvizeWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><AgrapartAvizeWineryContent /></div>
      <Footer />
    </main>
  );
}
