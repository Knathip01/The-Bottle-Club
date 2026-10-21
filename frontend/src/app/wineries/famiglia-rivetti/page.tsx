import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FamigliaRivettiContent from './FamigliaRivettiContent';

export const metadata: Metadata = {
  title: 'Famiglia Rivetti Winery | The Bottle Club & Vivino',
  description: 'Explore Famiglia Rivetti in Barbaresco, Italy. Five generations strong, crafting organic wines on Barbaresco’s famed hills rooted in tradition and respect for the land.',
};

export default function FamigliaRivettiPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <FamigliaRivettiContent />
      </div>
      <Footer />
    </main>
  );
}
