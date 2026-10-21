import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CapitalCallContent from './CapitalCallContent';

export const metadata: Metadata = {
  title: 'Capital Call Vintners | The Bottle Club & Vivino',
  description: 'Capital Call Vintners produces handcrafted artisanal wines from Windhorse Vineyard and Wheatfield Vines Vineyard in Washington.',
};

export default function CapitalCallVintnersPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CapitalCallContent />
      </div>
      <Footer />
    </main>
  );
}
