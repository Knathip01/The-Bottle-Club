import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import KnightsBridgeContent from './KnightsBridgeContent';

export const metadata: Metadata = {
  title: 'Knights Bridge | The Bottle Club & Vivino',
  description: 'Knights Bridge Winery: 100% estate-grown, organically farmed boutique wines crafted on the slopes of Knights Valley, California.',
};

export default function KnightsBridgePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <KnightsBridgeContent />
      </div>
      <Footer />
    </main>
  );
}
