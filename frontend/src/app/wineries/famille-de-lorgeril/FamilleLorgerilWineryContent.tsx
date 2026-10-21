import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/6846_FDL/6846_FDL_';
const stories = [
  {
    src: `${storyBase}1.jpg`,
    alt: 'Château de Pennautier, the historic Famille de Lorgeril estate',
    text: 'Altitude is the thread that runs through the range. In the highest vineyards, cool nights temper the heat of the day and allow the grapes to ripen gradually. The result is balanced, expressive, and elegant wines, true to both their origin and grape variety.',
  },
  {
    src: `${storyBase}2.jpg`,
    alt: 'Famille de Lorgeril wine range and vineyard terroir illustration',
    text: 'The collection is structured around four distinct expressions: Terrasses, for immediate pleasure and conviviality; Coteaux, firmly rooted in their terroir; Terroirs d’Altitude, the family signature, combining complexity and elegance; and Parcelles d’Altitude, rare wines from remarkable vineyard sites.',
  },
  {
    src: `${storyBase}3.jpg`,
    alt: 'Famille de Lorgeril wines presented in a tasting room',
    text: 'Today, Nicolas and Miren de Lorgeril continue to develop the range alongside their son Henri, who is gradually joining Maison Lorgeril as the thirteenth generation. Together, they share the same ambition: to reveal the character of each terroir and craft wines defined by freshness, elegance, and a strong sense of place.',
  },
  {
    src: `${storyBase}4.jpg`,
    alt: 'Close-up of a Famille de Lorgeril Syrah Viognier wine label',
    text: 'From easy-going wines made for sharing to cuvées for special occasions, the Famille de Lorgeril range offers a wine for every moment, always in a fresh and elegant style.',
  },
  {
    src: `${storyBase}5.jpg`,
    alt: 'Famille de Lorgeril wine bottle displayed at the estate',
    text: 'The Famille de Lorgeril range brings together fine wines rooted in the expertise of an independent family wine estate established in the Languedoc for over 400 years. It showcases the remarkable diversity of the region’s terroirs and grape varieties, from Mediterranean landscapes to the higher slopes of the Haut-Languedoc.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function FamilleLorgerilWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/6846/logos/ZP9StagMTKWOkuzRpLlx7A.jpeg" alt="Famille de Lorgeril logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Famille de Lorgeril</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>177</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.6</b></span><span className="hidden sm:inline">17,846 total ratings</span><span className="sm:hidden">17,846 ratings</span></div></div>
            <Link href="/search?q=Famille%20de%20Lorgeril" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Nicolas de Lorgeril" icon={<span className="text-base">◉</span>}/>
              <Row label="Owned by" value="Lorgeril" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.lorgeril.wine" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/familledelorgeril" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/familledelorgeril" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="tel:+33468726529" className="block px-2.5 py-2.5 font-semibold">☎ +33 4 68 72 65 29</a>
            <a href="mailto:contact@lorgeril.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/winery_backgrounds/XlCjX2QBRmWBdlJHjYcSLg_1280x760.jpeg" alt="High-altitude Languedoc vineyards in the Famille de Lorgeril range" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">The Famille de Lorgeril range brings together a collection of fine wines rooted in the expertise of Maison Lorgeril, an independent family wine estate established in the Languedoc for over 400 years. It showcases the remarkable diversity of the region’s terroirs and grape varieties, from Mediterranean landscapes to the higher slopes of the Haut-Languedoc.</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
        </article>
      </div>
    </div>
  );
}
