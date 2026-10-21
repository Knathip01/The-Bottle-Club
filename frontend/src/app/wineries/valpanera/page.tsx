import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ValpaneraContent from './ValpaneraContent';

export const metadata: Metadata = {
  title: 'Valpanera Winery | The Bottle Club & Vivino',
  description: 'Explore Cantina Valpanera in Aquileia, Friuli-Venezia Giulia, Italy. High-quality Refosco dal Peduncolo Rosso and artisanal Friulian wines.',
};

export default function ValpaneraPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ValpaneraContent />
      </div>
      <Footer />
    </main>
  );
}
