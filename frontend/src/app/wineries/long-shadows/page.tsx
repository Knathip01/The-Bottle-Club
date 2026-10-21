import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LongShadowsContent from './LongShadowsContent';

export const metadata: Metadata = {
  title: 'Long Shadows | The Bottle Club & Vivino',
  description: 'Long Shadows brings celebrated international winemakers to Washington’s Columbia Valley to create world-class, ultra-premium wines.',
};

export default function LongShadowsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <LongShadowsContent />
      </div>
      <Footer />
    </main>
  );
}
