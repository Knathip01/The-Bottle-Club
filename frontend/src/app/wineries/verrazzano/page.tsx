import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import VerrazzanoContent from './VerrazzanoContent';

export const metadata: Metadata = {
  title: 'Verrazzano Winery | The Bottle Club & Vivino',
  description: 'Explore Castello di Verrazzano in Greve in Chianti, historic birthplace of navigator Giovanni da Verrazzano with organic DOCG Chianti Classico wines.',
};

export default function VerrazzanoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <VerrazzanoContent />
      </div>
      <Footer />
    </main>
  );
}
