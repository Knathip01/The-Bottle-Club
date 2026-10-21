import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MinutyWineryContent from './MinutyWineryContent';

export const metadata: Metadata = {
  title: 'Minuty | The Bottle Club & Vivino',
  description: 'Discover Château Minuty, a family estate producing emblematic wines of Côtes de Provence for four generations.',
};

export default function MinutyWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><MinutyWineryContent /></div>
      <Footer />
    </main>
  );
}
