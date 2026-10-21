import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DonLucianoContent from './DonLucianoContent';

export const metadata: Metadata = {
  title: 'Don Luciano Winery | The Bottle Club & Vivino',
  description: 'Explore Don Luciano wines by J. García Carrión in Castilla y León, Spain. Discover approachable sparkling, white, and red wines.',
};

export default function DonLucianoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <DonLucianoContent />
      </div>
      <Footer />
    </main>
  );
}
