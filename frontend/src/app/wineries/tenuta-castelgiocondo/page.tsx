import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TenutaCastelgiocondoContent from './TenutaCastelgiocondoContent';

export const metadata: Metadata = {
  title: 'Tenuta CastelGiocondo Winery | The Bottle Club & Vivino',
  description: 'Explore Tenuta CastelGiocondo in Montalcino, Tuscany, celebrated for Brunello di Montalcino and Ripe al Convento by Marchesi Frescobaldi.',
};

export default function TenutaCastelgiocondoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TenutaCastelgiocondoContent />
      </div>
      <Footer />
    </main>
  );
}
