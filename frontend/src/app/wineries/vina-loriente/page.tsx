import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import VinaLorienteContent from './VinaLorienteContent';

export const metadata: Metadata = {
  title: 'Viña Loriente | The Bottle Club & Vivino',
  description: 'Welcome to Viña Loriente, a family-owned estate vineyard in Santa Ynez Valley, California producing authentic Spanish Tempranillo and Verdejo.',
};

export default function VinaLorienteWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <VinaLorienteContent />
      </div>
      <Footer />
    </main>
  );
}
