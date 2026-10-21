import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PiperHeidsieckWineryContent from './PiperHeidsieckWineryContent';

export const metadata: Metadata = {
  title: 'Piper-Heidsieck | The Bottle Club & Vivino',
  description: 'Discover Piper-Heidsieck, the Champagne house founded in 1785 with a legacy of crafting wines that smile.',
};

export default function PiperHeidsieckWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><PiperHeidsieckWineryContent /></div>
      <Footer />
    </main>
  );
}
