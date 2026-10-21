import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DomaineHelenaContent from './DomaineHelenaContent';

export const metadata: Metadata = {
  title: 'Domaine Helena | The Bottle Club & Vivino',
  description: 'Domaine Helena: Certified organic volcanic mountain wines shaped by elevation, intensity, and precision on the slopes of Mount St. Helena.',
};

export default function DomaineHelenaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <DomaineHelenaContent />
      </div>
      <Footer />
    </main>
  );
}
