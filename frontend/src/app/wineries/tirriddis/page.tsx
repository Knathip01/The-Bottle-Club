import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TirriddisContent from './TirriddisContent';

export const metadata: Metadata = {
  title: 'Tirriddis | The Bottle Club & Vivino',
  description: 'Tirriddis: Original, authentic, and unapologetically Washington traditional method sparkling wines from Prosser, Washington.',
};

export default function TirriddisPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TirriddisContent />
      </div>
      <Footer />
    </main>
  );
}
