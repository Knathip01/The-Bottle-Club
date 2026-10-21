import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import NativContent from './NativContent';

export const metadata: Metadata = {
  title: 'Nativ Winery | The Bottle Club & Vivino',
  description: 'Explore Nativ in Campania, Italy, owned by Mario Ercolino and Roberta Pirone, renowned for expressive native wines including Aglianico and Greco di Tufo.',
};

export default function NativPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <NativContent />
      </div>
      <Footer />
    </main>
  );
}
