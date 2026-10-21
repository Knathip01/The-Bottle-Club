import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import IcarioContent from './IcarioContent';

export const metadata: Metadata = {
  title: 'Icario Winery | The Bottle Club & Vivino',
  description: 'Explore Icario in Montepulciano, Tuscany, Italy. Elegant Vino Nobile di Montepulciano, contemporary architecture, and award-winning Tuscan wines.',
};

export default function IcarioPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <IcarioContent />
      </div>
      <Footer />
    </main>
  );
}
