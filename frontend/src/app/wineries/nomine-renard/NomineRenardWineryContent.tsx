import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/33138_nominerenard/33138_nominerenard_';
const stories = [
  {
    src: `${storyBase}1_2560x1520.jpg`,
    alt: 'Selection of Nominé-Renard Champagne bottles and glasses',
    text: 'Founded in 1960 by André Nominé and Germaine Renard, the house is now led by their great-grandson Simon. Four generations later, the family continues to care for the land and craft Champagne with the same hands-on approach.',
  },
  {
    src: `${storyBase}2_2560x1520.jpg`,
    alt: 'A Nominé-Renard winemaker tasting Champagne',
    text: 'As a grower-producer, Nominé-Renard oversees its Champagne from vineyard through bottling. This close involvement lets the wines reflect both their place and the people behind them, with small-scale, handcrafted production.',
  },
  {
    src: `${storyBase}3_2560x1520.jpg`,
    alt: 'Sustainable vineyard rows at Nominé-Renard',
    text: 'The vineyard is part of the family’s heritage. Low-intervention and sustainable methods help protect the land for future generations, support healthy soils and vines, and allow grapes to be hand-picked at their ideal ripeness.',
  },
  {
    src: 'https://images.vivino.com/misc/sponsorships/33138_nomine_renard_2025/33138_nomine_renard_4_2560x1520.png',
    alt: 'Champagne being poured and tasted',
    text: 'Nominé-Renard helped found the Special Club, a group of grower-producers showcasing distinctive Champagne. Only the top cuvées receive the label, after passing rigorous blind tastings.',
  },
  {
    src: 'https://images.vivino.com/misc/sponsorships/33138_nomine_renard_2025/33138_nomine_renard_5_2560x1520.png',
    alt: 'Nominé-Renard Champagne served with glasses at a table',
    text: '',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function NomineRenardWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/33138/logos/64xRq1noSD6BcIPyzfVPeQ.png" alt="Nominé-Renard logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Nominé-Renard</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>9</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.9</b></span><span className="hidden sm:inline">6,535 total ratings</span><span className="sm:hidden">6,535 ratings</span></div></div>
            <Link href="/search?q=Nomine-Renard" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Owned by" value="San Antonio Winery" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.champagne-nomine-renard.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="tel:+33326528260" className="block px-2.5 py-2.5 font-semibold">☎ +33 326 52 82 60</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/Fvs4K_NkQZGC8PqgpEaJaQ_2560x1520.jpeg" alt="Nominé-Renard vineyard in Champagne" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Family-owned for four generations, Nominé-Renard makes grower Champagne with care and character, expressing its place from vine to bottle.</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.text && <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p>}</div>)}
        </article>
      </div>
    </div>
  );
}
