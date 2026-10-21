'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star } from 'lucide-react';

const storyImages = [
  ['https://images.vivino.com/misc/sponsorships/321844_FlyingWhale/321844_FlyingWhale_1.jpg', 'Maba Ba standing among the vineyard rows'],
  ['https://images.vivino.com/misc/sponsorships/321844_FlyingWhale/321844_FlyingWhale_2.jpg', 'Maba Ba in the Flying Whale wine cellar beside oak barrels'],
  ['https://images.vivino.com/misc/sponsorships/321844_FlyingWhale/321844_FlyingWhale_3.jpg', 'Maba Ba holding a glass of Flying Whale wine'],
  ['https://images.vivino.com/misc/sponsorships/321844_FlyingWhale/321844_FlyingWhale_4.jpg', 'Maba Ba and winemaker Didier Rodriguez sharing a bottle of wine'],
  ['https://images.vivino.com/misc/sponsorships/321844_FlyingWhale/321844_FlyingWhale_5.jpg', 'Maba Ba walking among the vines with winemaker Didier Rodriguez'],
];

function StoryImage({ index }: { index: number }) {
  const [src, alt] = storyImages[index];
  return <Image src={src} alt={alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>;
}

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function FlyingWhaleWineContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/321844/logos/x1SkfukBQHioPecBbGkfig.jpeg" alt="Flying Whale Wine logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Flying Whale Wine</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>2</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.8</b></span><span className="hidden sm:inline">20 total ratings</span><span className="sm:hidden">20 ratings</span></div></div>
            <Link href="/search?q=Flying%20Whale%20Wine" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>} />
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/languedoc-roussillon" className="hover:underline">Languedoc-Roussillon</a>} icon={<Mountain size={17} />} />
              <Row label="Winemaker" value="Maba Ba and Didier Rodriguez" icon={<span className="text-base">◉</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://flyingwhalewine.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://instagram.com/flyingwhalewine" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11} /></a>
            <a href="mailto:Info@flyingwhalewine.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/5Ha0sOHsQJ-s7hr3ukYd3w_600x356.jpeg" alt="Vineyards at Flying Whale Wine" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">Flying Whale Wine began with a story that refused to disappear.</h2>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Long before modern telescopes, the Dogon people of West Africa carried a precise understanding of the Sirius star system. This knowledge lived through myth, ritual, and oral transmission, passed carefully from one generation to the next. One of their stories speaks of a cosmic being who arrived on Earth in a vessel shaped like a whale, bringing balance, order, and renewal. The story sits at the edge of science and mystery. It invites us to reconsider how knowledge travels, how it survives, and who history chooses to listen to.</p>
          <StoryImage index={0}/>
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">Flying Whale exists to keep that lineage breathing.</h2>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">The brand was founded by Maba Ba, a filmmaker, writer, and musician who grew up between Senegal, France, and the United States. His life has unfolded across borders, languages, and cultures. That experience shaped a way of seeing the world that values movement, memory, and connection. Flying Whale is the first project where that personal journey became something physical. A bottle meant to be opened. A wine meant to be shared.</p>
          <StoryImage index={1}/>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">The wines are made in the Roussillon region of southern France at Domaine Sol Payre, a family estate that has worked the land since 1913. The landscape is marked by sun, stone, and Mediterranean winds. Some of the vines are over eighty years old, with roots that run deep and yields that stay small. The result is wine with natural concentration, balance, and ease.</p>
          <StoryImage index={2}/>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">The Gold red blend is warm and generous, with smooth texture and a clean finish. It carries depth without heaviness. The Rosegold rosé is bright and mineral, with notes of peach, citrus, and sea air. It is structured and expressive, built for year round drinking and for people who usually reach for red wine.</p>
          <StoryImage index={3}/>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Flying Whale stands for return, renewal, and gathering. It is a bridge between Africa, Europe, and America. Between ancestral memory and present day pleasure. Between story and craft. Each bottle offers a moment to slow down, sit together, and feel part of something larger.</p>
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">This is wine as culture. Wine as movement. Wine as shared breath at the table.</h2>
          <StoryImage index={4}/>
        </article>
      </div>
    </div>
  );
}
