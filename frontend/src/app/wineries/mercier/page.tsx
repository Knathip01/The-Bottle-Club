import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MercierWineryContent from './MercierWineryContent';

export const metadata: Metadata = {
  title: 'Mercier | The Bottle Club & Vivino',
  description: 'Discover Mercier, the Champagne house founded in Épernay in 1858.',
};

export default function MercierWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><MercierWineryContent /></div>
      <Footer />
    </main>
  );
}
