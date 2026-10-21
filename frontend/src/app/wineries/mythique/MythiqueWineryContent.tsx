import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const official = 'https://www.mythique-wine.com/wp-content/uploads/';
const stories = [
  {
    src: `${official}2024/07/design-sans-titre-24.png`,
    alt: 'Sharing a bottle of Mythique wine among friends',
    text: 'For more than 30 years, a collective of winemakers has worked together to reveal the unique terroir of Occitanie through an emblematic cuvée. La Cuvée Mythique is a carefully selected blend that brings together the best of this region and the expertise of its winegrowers.',
  },
  {
    src: `${official}2026/01/design-mythique.png`,
    alt: 'Mythique wine bottle among green vineyard leaves',
    text: 'Since 2005, oenologist Marie Julian has continued this work of selection with partner winegrowers, sourcing the best terroirs and grape varieties according to each season’s climatic conditions.',
  },
  {
    src: `${official}2024/07/design-sans-titre-27.png`,
    alt: 'Grapes growing in the Languedoc vineyard',
    text: 'The winemakers behind Mythique chose the owl as a symbol of healthy soils and ecosystems. Sensitive to farming practices, habitat loss, and the quality of its environment, the owl plays an important role in protecting the vineyard ecosystems of the South of France.',
  },
  {
    src: `${official}2024/07/design-sans-titre-29.png`,
    alt: 'Mythique winemakers and the people behind the wines',
    text: 'The owl has been entrusted with an important mission: helping study the terroirs of Occitanie and protect the region’s wildlife and ecosystems.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function MythiqueWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/323369/logos/LK55WooKSimdu2_fWCdIfA.jpeg" alt="Mythique logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Mythique</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>29</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.5</b></span><span className="hidden sm:inline">24,554 total ratings</span><span className="sm:hidden">24,554 ratings</span></div></div>
            <Link href="/search?q=Mythique" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Owned by" value="Vinadeis" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.mythique-wine.com/en/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/winery_backgrounds/TxdeB5ugQAWqIo3_fNysXA_1280x760.jpeg" alt="Rolling vineyards and countryside in Occitanie" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Mythique, pioneer wine of Occitanie, is the balance between its terroir, its traditions, its unique landscapes and its know-how.</p>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">For 35 years, a collective of winemakers has come together to highlight the unique terroir of Occitanie with an emblematic cuvée. Since 2005, oenologist Marie Julian has continued the selection work alongside partner winegrowers.</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
          <Image src={`${official}2022/10/marie-julian-dans-les-vignes-mythique-vins.jpg`} alt="Mythique oenologist in the vineyard" width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Marie Julian-Izard has been the oenologist in charge of selecting grapes and creating the Mythique range since 2005. From a family of passionate Languedoc winegrowers, she brings generations of knowledge of the wines and terroirs of southern France to each cuvée.</p>
        </article>
      </div>
    </div>
  );
}
