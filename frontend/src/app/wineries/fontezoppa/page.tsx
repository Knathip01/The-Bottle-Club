import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FontezoppaContent from './FontezoppaContent';

export const metadata: Metadata = {
  title: 'Fontezoppa Winery | The Bottle Club & Vivino',
  description: "Explore Cantine Fontezoppa in Civitanova Marche, Italy, renowned for Riserva dell'Asola, Serrapetrona, Verdicchio, and Marche Rosso.",
};

export default function FontezoppaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <FontezoppaContent />
      </div>
      <Footer />
    </main>
  );
}
