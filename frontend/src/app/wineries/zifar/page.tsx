import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ZifarContent from './ZifarContent';

export const metadata: Metadata = {
  title: 'Zifar | The Bottle Club & Vivino',
  description: 'Explore Bodegas Zifar wines from Ribera del Duero and Castilla y León, Spain. Exceptional Tempranillo wines crafted by Béquer Prieto and Pago de Cirsus.',
};

export default function ZifarPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ZifarContent />
      </div>
      <Footer />
    </main>
  );
}
