import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DancingContent from './DancingContent';

export const metadata: Metadata = {
  title: 'Dancing | The Bottle Club & Vivino',
  description: 'In 2022, Cynthia and Lauren began restoring a vineyard in Dry Creek Valley, Sonoma. Dancing crafts expressive Zinfandel, sparkling, and rosé wines.',
};

export default function DancingWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <DancingContent />
      </div>
      <Footer />
    </main>
  );
}
