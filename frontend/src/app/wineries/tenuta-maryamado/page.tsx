import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TenutaMaryamadoContent from './TenutaMaryamadoContent';

export const metadata: Metadata = {
  title: 'Tenuta Maryamado Winery | The Bottle Club & Vivino',
  description: 'Explore Tenuta Maryamado in Tuscany, Italy. A reimagined Tuscan estate in San Casciano in Val di Pesa where nature, knowledge, and beauty engage in dialogue.',
};

export default function TenutaMaryamadoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TenutaMaryamadoContent />
      </div>
      <Footer />
    </main>
  );
}
