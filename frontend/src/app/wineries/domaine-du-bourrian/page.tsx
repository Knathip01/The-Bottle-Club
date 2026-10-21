import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DomaineDuBourrianWineryContent from './DomaineDuBourrianWineryContent';

export const metadata: Metadata = {
  title: 'Domaine du Bourrian | The Bottle Club & Vivino',
  description: 'Discover Domaine du Bourrian, an organic family winery in Côtes de Provence.',
};

export default function DomaineDuBourrianWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><DomaineDuBourrianWineryContent /></div>
      <Footer />
    </main>
  );
}
