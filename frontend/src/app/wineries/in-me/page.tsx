import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import InMeContent from './InMeContent';

export const metadata: Metadata = {
  title: 'IN ME Winery | The Bottle Club & Vivino',
  description: 'Explore IN ME in Puglia, Italy, celebrated for Negroamaro Zinfandel, Primitivo Susumaniello, and modern expressive Apulian wines.',
};

export default function InMePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <InMeContent />
      </div>
      <Footer />
    </main>
  );
}
