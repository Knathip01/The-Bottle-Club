import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TenutaMahtaniContent from './TenutaMahtaniContent';

export const metadata: Metadata = {
  title: 'Tenuta Mahtani Winery | The Bottle Club & Vivino',
  description: 'Explore Tenuta Mahtani in Tuscany, Italy. Epitome of the new generation of winemakers, expressive boldness nurtured in Maremma.',
};

export default function TenutaMahtaniPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TenutaMahtaniContent />
      </div>
      <Footer />
    </main>
  );
}
