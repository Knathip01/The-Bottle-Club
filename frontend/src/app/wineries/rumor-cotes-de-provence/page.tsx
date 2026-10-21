import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import RumorWineryContent from './RumorWineryContent';

export const metadata: Metadata = {
  title: 'RUMOR | The Bottle Club & Vivino',
  description: 'Discover RUMOR, an organic rosé from Côtes de Provence.',
};

export default function RumorWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><RumorWineryContent /></div>
      <Footer />
    </main>
  );
}
