import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import YsiosContent from './YsiosContent';

export const metadata: Metadata = {
  title: 'Ysios | The Bottle Club & Vivino',
  description: 'Explore Bodegas Ysios in Rioja Alavesa, Spain. World-renowned architecture by Santiago Calatrava, century-old vines, micro-cultivation, and remarkable terroir wines.',
};

export default function YsiosPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <YsiosContent />
      </div>
      <Footer />
    </main>
  );
}
