import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import OpaqueContent from './OpaqueContent';

export const metadata: Metadata = {
  title: 'Opaque | The Bottle Club & Vivino',
  description: 'Opaque wines: Dark, intense, full-bodied reds estate-grown in Paso Robles on mineral-rich calcareous shale soils.',
};

export default function OpaquePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <OpaqueContent />
      </div>
      <Footer />
    </main>
  );
}
