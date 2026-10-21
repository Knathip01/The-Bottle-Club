import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CoppiContent from './CoppiContent';

export const metadata: Metadata = {
  title: 'Coppi Winery | The Bottle Club & Vivino',
  description: 'Explore Casa Vinicola Coppi in Puglia, Italy, renowned for award-winning Primitivo DOC Gioia del Colle, Senatore, and authentic Apulian wines.',
};

export default function CoppiPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CoppiContent />
      </div>
      <Footer />
    </main>
  );
}
