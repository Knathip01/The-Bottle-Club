import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TenutaMoraiaContent from './TenutaMoraiaContent';

export const metadata: Metadata = {
  title: 'Tenuta Moraia Winery | The Bottle Club & Vivino',
  description: 'Explore Tenuta Moraia in Maremma Toscana, Italy, organic viticulture, Sangiovese and Tuscan coast terroir wines.',
};

export default function TenutaMoraiaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TenutaMoraiaContent />
      </div>
      <Footer />
    </main>
  );
}
