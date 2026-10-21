import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import StanzingerWineryContent from './StanzingerWineryContent';

export const metadata: Metadata = {
  title: 'Stanzinger Wines - Château La Favière | The Bottle Club & Vivino',
  description: 'Discover Stanzinger Wines and Château La Favière in Bordeaux.',
};

export default function StanzingerWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><StanzingerWineryContent /></div>
      <Footer />
    </main>
  );
}
