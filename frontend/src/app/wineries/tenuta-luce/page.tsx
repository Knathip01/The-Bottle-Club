import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TenutaLuceContent from './TenutaLuceContent';

export const metadata: Metadata = {
  title: 'Tenuta Luce Winery | The Bottle Club & Vivino',
  description: 'Explore Tenuta Luce in Montalcino, Tuscany, celebrated for iconic Luce, Lucente, Luce Brunello, and Lux Vitis by Vittorio Frescobaldi and Robert Mondavi.',
};

export default function TenutaLucePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TenutaLuceContent />
      </div>
      <Footer />
    </main>
  );
}
