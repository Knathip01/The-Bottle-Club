import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import IlFantoneContent from './IlFantoneContent';

export const metadata: Metadata = {
  title: 'Il Fantone Società Agricola Winery | The Bottle Club & Vivino',
  description: 'Explore Il Fantone Società Agricola in Tuscany, Italy. Compact boutique winery in the Maremma creating limited batches of expressive wines on the hills of Scansano.',
};

export default function IlFantonePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <IlFantoneContent />
      </div>
      <Footer />
    </main>
  );
}
