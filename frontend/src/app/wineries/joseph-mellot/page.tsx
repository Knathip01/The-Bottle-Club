import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import JosephMellotWineryContent from './JosephMellotWineryContent';

export const metadata: Metadata = {
  title: 'Joseph Mellot | The Bottle Club & Vivino',
  description: 'Discover the Joseph Mellot family estate, a leading specialist in the finest wines of the Centre-Loire.',
};

export default function JosephMellotWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><JosephMellotWineryContent /></div>
      <Footer />
    </main>
  );
}
