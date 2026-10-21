import { Suspense } from 'react';
import { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WineriesExplorer from '@/components/wineries/WineriesExplorer';

export const metadata: Metadata = {
  title: 'Wineries | The Bottle Club',
  description:
    'Explore the world’s most captivating wineries. Discover top wineries in Napa Valley, Sonoma County, Bordeaux, and beyond.',
};

export default function WineriesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <link rel="stylesheet" href="/wineryExplorerPage.css" />
      <MainHeader />
      <div className="flex-grow">
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-stone-400">
                <div className="w-8 h-8 border-2 border-stone-300 border-t-[#a11a1a] rounded-full animate-spin" />
                <span className="text-xs font-bold uppercase tracking-wider">Loading Wineries...</span>
              </div>
            </div>
          }
        >
          <WineriesExplorer />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
