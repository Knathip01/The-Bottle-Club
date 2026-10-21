import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/5086_chateaumeaume_2023/5086_chateaumeaume_2023_';
const stories = [
  {
    src: 'https://images.vivino.com/misc/sponsorships/5086_chateaumeaume_new/5086_chateaumeaume_new_1_2650x1520.jpg',
    alt: 'Château Méaume estate house',
    text: 'Close to the celebrated wine regions of Pomerol and Saint-Émilion, Château Méaume is a family-owned estate focused on sustainable winegrowing. Its blend is primarily Merlot, complemented by Cabernet Franc and Cabernet Sauvignon.',
  },
  {
    src: `${storyBase}2_2560x1520.jpg`,
    alt: 'Aerial view of Château Méaume and its surrounding estate',
    text: 'The 250-acre property includes 100 acres of vineyards, with the remaining land divided between woodland and pasture. Sustainable practices guide the work in the vines, the care of the forests and the raising of animals.',
  },
  {
    src: `${storyBase}3_2560x1520.jpg`,
    alt: 'A horse working between rows of vines',
    text: 'Only grapes grown on the estate are harvested and fermented in the château’s own vats, keeping each stage of production closely connected to the vineyard.',
  },
  {
    src: `${storyBase}4_2560x1520.jpg`,
    alt: 'Château Méaume wines served at a tasting table',
    text: 'Careful grape selection creates a deep garnet-purple wine with notes of wild blueberry, baked cherry and garrigue. The wines are medium-bodied, with rounded tannins, smooth fruit and an elegant finish.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ChateauMeaumeWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/5086/logos/TGQmrzZsQCuG3fyui__h7Q.jpeg" alt="Château Méaume logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Château Méaume</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>5</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.5</b></span><span className="hidden sm:inline">4,254 total ratings</span><span className="sm:hidden">4,254 ratings</span></div></div>
            <Link href="/search?q=Chateau%20Meaume" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/bordeaux-superieur" className="hover:underline">Bordeaux Supérieur</a>} icon={<Mountain size={17}/>}/>
              <Row label="Winemaker" value="Mark & Sandra Johnson-Hill" icon={<span className="text-base">♙</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.chateaumeaume.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="tel:0557494104" className="block px-2.5 py-2.5 font-semibold">0557494104</a>
            <a href="mailto:info@chateaumeaume.com" className="block px-2.5 py-2.5 font-semibold">Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/-57D0Tv9Sq-gCrEnKSuqfw_2560x1520.jpeg" alt="Château Méaume estate house" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
        </article>
      </div>
    </div>
  );
}
