import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import StHugoContent from './StHugoContent';

export const metadata: Metadata = {
  title: 'St Hugo Winery | The Bottle Club & Vivino',
  description: 'Discover St Hugo and the legacy of Hugo Gramp in the Barossa Valley.',
};

export default function StHugoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><StHugoContent /></div>
      <Footer />
    </main>
  );
}
