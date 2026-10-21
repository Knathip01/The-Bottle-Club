import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FincaValeriaContent from './FincaValeriaContent';

export const metadata: Metadata = {
  title: 'Finca Valeria | The Bottle Club & Vivino',
  description: 'Discover Finca Valeria by Valeria Mazza and Félix Solís. Two exceptional wines, a refreshing white and an elegant rosé, embodying glamour and fine winemaking.',
};

export default function FincaValeriaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <FincaValeriaContent />
      </div>
      <Footer />
    </main>
  );
}
