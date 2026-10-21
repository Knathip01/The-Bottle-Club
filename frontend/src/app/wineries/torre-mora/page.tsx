import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TorreMoraContent from './TorreMoraContent';

export const metadata: Metadata = {
  title: 'Torre Mora Winery | The Bottle Club & Vivino',
  description: 'Explore Torre Mora on the volcanic slopes of Mount Etna in Sicily, Italy, renowned for organic Nerello Mascalese, Carricante, and boutique volcanic wines.',
};

export default function TorreMoraPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TorreMoraContent />
      </div>
      <Footer />
    </main>
  );
}
