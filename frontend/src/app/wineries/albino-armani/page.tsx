import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AlbinoArmaniContent from './AlbinoArmaniContent';

export const metadata: Metadata = {
  title: 'Albino Armani Winery | The Bottle Club & Vivino',
  description: 'Explore Albino Armani with 400 years of winemaking heritage in Verona, Trentino, and Friuli-Venezia Giulia.',
};

export default function AlbinoArmaniPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <AlbinoArmaniContent />
      </div>
      <Footer />
    </main>
  );
}
