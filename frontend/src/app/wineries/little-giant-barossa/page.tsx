import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LittleGiantContent from './LittleGiantContent';

export const metadata: Metadata = {
  title: 'Little Giant Winery | The Bottle Club & Vivino',
  description: 'Discover Little Giant wines, crafted from premium South Australian wine regions.',
};

export default function LittleGiantPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><LittleGiantContent /></div>
      <Footer />
    </main>
  );
}
