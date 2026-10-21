import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PagoDeMarinaceaContent from './PagoDeMarinaceaContent';

export const metadata: Metadata = {
  title: 'Pago de Marinacea | The Bottle Club & Vivino',
  description: 'Explore Pago de Marinacea, crafting exceptional DO Toro wines from organic old vines dating up to 120 years old in Zamora, Spain.',
};

export default function PagoDeMarinaceaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <PagoDeMarinaceaContent />
      </div>
      <Footer />
    </main>
  );
}
