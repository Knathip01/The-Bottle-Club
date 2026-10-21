import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import JarvisContent from './JarvisContent';

export const metadata: Metadata = {
  title: 'Jarvis | The Bottle Club & Vivino',
  description: 'Each bottle of Jarvis wine is a proud expression of the estate’s exceptional craftsmanship, terroir, and legacy winemaking from the world’s first entirely subterranean winery.',
};

export default function JarvisPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <JarvisContent />
      </div>
      <Footer />
    </main>
  );
}
