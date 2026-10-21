import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ProtosContent from './ProtosContent';

export const metadata: Metadata = {
  title: 'Protos Winery | The Bottle Club & Vivino',
  description: 'Explore Protos in Castilla y León, Spain. Since 1927, pioneering wines across DOP Ribera del Duero, DOP Rueda, and DOP Cigales.',
};

export default function ProtosPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ProtosContent />
      </div>
      <Footer />
    </main>
  );
}
