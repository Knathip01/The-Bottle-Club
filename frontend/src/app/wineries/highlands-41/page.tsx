import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import Highlands41Content from './Highlands41Content';

export const metadata: Metadata = {
  title: 'Highlands 41 | The Bottle Club & Vivino',
  description: 'Highlands 41 crafts bold, expressive wines in Paso Robles inspired by Highway 41 and the rugged Creston Highlands.',
};

export default function Highlands41Page() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <Highlands41Content />
      </div>
      <Footer />
    </main>
  );
}
