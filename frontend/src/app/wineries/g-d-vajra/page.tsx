import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import GDVajraContent from './GDVajraContent';

export const metadata: Metadata = {
  title: 'G.D. Vajra Winery | The Bottle Club & Vivino',
  description: 'Discover G.D. Vajra, historic organic Barolo producer crafting translucent, superbly elegant Piemonte wines.',
};

export default function GDVajraPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <GDVajraContent />
      </div>
      <Footer />
    </main>
  );
}
