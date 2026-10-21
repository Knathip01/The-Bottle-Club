import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LidiaEAmatoContent from './LidiaEAmatoContent';

export const metadata: Metadata = {
  title: 'Lidia e Amato Winery | The Bottle Club & Vivino',
  description: 'Explore Lidia e Amato in Controguerra, Abruzzo, Italy. Artisanal wines crafted with passion, tradition, and respect for the Teramo hills.',
};

export default function LidiaEAmatoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <LidiaEAmatoContent />
      </div>
      <Footer />
    </main>
  );
}
