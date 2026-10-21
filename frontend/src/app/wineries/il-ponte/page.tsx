import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import IlPonteContent from './IlPonteContent';

export const metadata: Metadata = {
  title: 'Il Ponte Winery | The Bottle Club & Vivino',
  description: 'Explore Il Ponte in Capalbio, Maremma, Tuscany, Italy. Authentic wines and extra virgin olive oil crafted with artisanal care and family passion.',
};

export default function IlPontePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <IlPonteContent />
      </div>
      <Footer />
    </main>
  );
}
