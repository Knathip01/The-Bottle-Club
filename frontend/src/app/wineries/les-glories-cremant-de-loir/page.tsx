import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LesGloriesWineryContent from './LesGloriesWineryContent';

export const metadata: Metadata = {
  title: 'Les Glories | The Bottle Club & Vivino',
  description: 'Discover Les Glories wines from France’s celebrated wine regions.',
};

export default function LesGloriesWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><LesGloriesWineryContent /></div>
      <Footer />
    </main>
  );
}
