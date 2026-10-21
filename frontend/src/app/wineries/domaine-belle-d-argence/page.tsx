import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DomaineBelleArgenceWineryContent from './DomaineBelleArgenceWineryContent';

export const metadata: Metadata = {
  title: "Domaine Belle d'Argence | The Bottle Club & Vivino",
  description: "Discover Domaine Belle d'Argence, an organic winery in Costières-de-Nîmes, France.",
};

export default function DomaineBelleArgenceWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><DomaineBelleArgenceWineryContent /></div>
      <Footer />
    </main>
  );
}
