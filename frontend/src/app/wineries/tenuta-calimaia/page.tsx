import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TenutaCalimaiaContent from './TenutaCalimaiaContent';

export const metadata: Metadata = {
  title: 'Tenuta Calimaia Winery | The Bottle Club & Vivino',
  description: 'Explore Tenuta Calimaia in Montepulciano, Tuscany, Italy. Producing prestigious Vino Nobile di Montepulciano by Marchesi Frescobaldi.',
};

export default function TenutaCalimaiaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TenutaCalimaiaContent />
      </div>
      <Footer />
    </main>
  );
}
