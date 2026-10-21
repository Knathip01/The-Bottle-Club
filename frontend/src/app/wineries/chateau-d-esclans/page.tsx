import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChateauEsclansWineryContent from './ChateauEsclansWineryContent';

export const metadata: Metadata = {
  title: "Château d'Esclans | The Bottle Club & Vivino",
  description:
    "Discover Château d'Esclans and its world-renowned Provence rosés, including Whispering Angel, Rock Angel, Les Clans, and Garrus.",
};

export default function ChateauEsclansWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ChateauEsclansWineryContent />
      </div>
      <Footer />
    </main>
  );
}
