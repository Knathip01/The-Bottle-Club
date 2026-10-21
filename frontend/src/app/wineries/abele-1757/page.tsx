import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import Abele1757WineryContent from './Abele1757WineryContent';

export const metadata: Metadata = {
  title: 'Abelé 1757 | The Bottle Club & Vivino',
  description: 'Discover Abelé 1757, a historic Champagne house founded in 1757.',
};

export default function Abele1757WineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><Abele1757WineryContent /></div>
      <Footer />
    </main>
  );
}
