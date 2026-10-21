import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LuigiBaudanaContent from './LuigiBaudanaContent';

export const metadata: Metadata = {
  title: 'Luigi Baudana Winery | The Bottle Club & Vivino',
  description: "Explore Luigi Baudana in Langhe, Italy, known for exceptional artisan Barolos from Serralunga d'Alba crafted in partnership with the Vajra family.",
};

export default function LuigiBaudanaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <LuigiBaudanaContent />
      </div>
      <Footer />
    </main>
  );
}
