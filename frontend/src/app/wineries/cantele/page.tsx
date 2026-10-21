import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CanteleContent from './CanteleContent';

export const metadata: Metadata = {
  title: 'Cantele Winery | The Bottle Club & Vivino',
  description: 'Explore Cantele Winery in Salento, Puglia. Founded in 1979 by the Cantele family, pioneering quality winemaking in Southern Italy.',
};

export default function CantelePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CanteleContent />
      </div>
      <Footer />
    </main>
  );
}
