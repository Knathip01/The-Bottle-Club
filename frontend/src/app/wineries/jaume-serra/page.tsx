import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import JaumeSerraContent from './JaumeSerraContent';

export const metadata: Metadata = {
  title: 'Jaume Serra Winery | The Bottle Club & Vivino',
  description: 'Explore Jaume Serra winery in Catalunya, Spain. High on a hill gently sloping toward the Mediterranean, crafting celebrated cavas.',
};

export default function JaumeSerraPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <JaumeSerraContent />
      </div>
      <Footer />
    </main>
  );
}
