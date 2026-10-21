import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PenfoldsContent from './PenfoldsContent';

export const metadata: Metadata = {
  title: 'Penfolds Winery | The Bottle Club & Vivino',
  description: 'Explore Penfolds wines from South Australia, including the story, people and winemaking philosophy behind the house.',
};

export default function PenfoldsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><PenfoldsContent /></div>
      <Footer />
    </main>
  );
}
