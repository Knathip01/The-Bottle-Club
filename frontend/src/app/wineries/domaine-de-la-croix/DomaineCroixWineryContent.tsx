import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/10264_domainedelacroix/10264_domainedelacroix_2560x1520_';
const stories = [
  {
    src: `${storyBase}1.jpg`,
    alt: 'The historic Domaine de la Croix estate house',
    heading: 'THE ESTATE',
    paragraphs: [
      'The story began in 1882, when Albert de Vrégille, a young entrepreneur passionate about wine, discovered the beauty of this coast, its microclimate, and its bay. He set out to create a substantial wine estate that people could visit and that would help the surrounding village flourish.',
    ],
  },
  {
    src: `${storyBase}2.jpg`,
    alt: 'The Mediterranean bay and landscape around Domaine de la Croix',
    heading: 'A UNIQUE EXPERTISE',
    paragraphs: [
      'Certified High Environmental Value, the estate is committed to biodiversity and reducing its impact. Vineyard manager Guillaume Biais is guiding the conversion to organic farming and broader environmental practices, while oenologist and cellar master Edouard Planel oversees each wine from vine to bottling.',
      'Planel draws on his experience to express the terroirs in distinctive cuvées, working with specialists including French oenologist Michel Rolland.',
    ],
  },
  {
    src: `${storyBase}3.jpg`,
    alt: 'Domaine de la Croix rosé served by the sea',
    heading: 'THE AUTHENTICITY OF A TERROIR',
    paragraphs: [
      'The estate’s maritime sites, especially Bastide Blanche near the sea, contribute complexity and elegance. Sandy schist soils encourage deep roots and help the vines withstand dry conditions. A Cru Classé de Provence since 1955, the property also has a modern winery designed for precise winemaking.',
    ],
  },
  {
    src: `${storyBase}4.jpg`,
    alt: 'Aerial view over the Domaine de la Croix vineyards',
    heading: 'THE ESTATE THROUGH THE SEASONS',
    paragraphs: [
      'The vineyard team cares for the vines in detail and uses contemporary winemaking methods throughout the season. Visitors can discover the estate and its craft in a quieter setting outside the busy tourist months, surrounded by preserved vineyard landscapes.',
    ],
  },
  {
    src: `${storyBase}5.jpg`,
    alt: 'Domaine de la Croix cushion on a garden terrace',
    heading: 'THE ART OF LIVING IN PROVENCE',
    paragraphs: [
      'Domaine de la Croix captures the spirit of Provence through expressive wines from exceptional sites. Tastings, local produce, and a peaceful setting come together for a relaxed visit to the estate.',
    ],
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function DomaineCroixWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/10264/logos/ef-hMgeORsGKD7I06f2FMg.jpeg" alt="Domaine de la Croix logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Domaine de la Croix</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>12</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.9</b></span><span className="hidden sm:inline">6,630 total ratings</span><span className="sm:hidden">6,630 ratings</span></div></div>
            <Link href="/search?q=Domaine%20de%20la%20Croix" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Owned by" value="Bolloré Group" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.domainedelacroix.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/domainedelacroix/?hl=fr" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>◎ Instagram</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/domaine-de-la-croix-691716287629550/?ref=hl" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>f Facebook</span><ExternalLink size={11}/></a>
            <a href="https://x.com/DomaineCroix" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">𝕏 X</a>
            <a href="tel:+330494950175" className="block px-2.5 py-2.5 font-semibold">☎ +33 0 494 95 01 75</a>
            <a href="mailto:contact@domainedelacroix.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/42Ot1GBfRWCvM8gjVbMtyA_2560x1520.jpeg" alt="Coastal landscape around Domaine de la Croix" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          {stories.map((story) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><h2 className="px-0.5 pt-1 text-[10px] font-bold uppercase text-[#1e1e1e] sm:text-[13px]">{story.heading}</h2>{story.paragraphs.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}</div>)}
        </article>
      </div>
    </div>
  );
}
