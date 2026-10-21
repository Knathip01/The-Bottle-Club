import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LaPiemontinaContent from './LaPiemontinaContent';

export const metadata: Metadata = {
  title: 'La Piemontina Winery | The Bottle Club & Vivino',
  description: 'Discover La Piemontina, a winery in Colline Novaresi, Italy and explore their most popular wines.',
};

export default function LaPiemontinaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <LaPiemontinaContent />
      </div>
      <Footer />
    </main>
  );
}
