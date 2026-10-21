import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TenutaCastiglioniContent from './TenutaCastiglioniContent';

export const metadata: Metadata = {
  title: 'Tenuta Castiglioni Winery | The Bottle Club & Vivino',
  description: 'Explore Tenuta Castiglioni, the cradle of 700 years of winemaking heritage of the Frescobaldi family in Montespertoli, Tuscany.',
};

export default function TenutaCastiglioniPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TenutaCastiglioniContent />
      </div>
      <Footer />
    </main>
  );
}
