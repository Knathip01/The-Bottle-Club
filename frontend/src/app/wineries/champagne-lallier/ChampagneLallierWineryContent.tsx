import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain } from 'lucide-react';

const lallierSite = 'https://www.champagne-lallier.com/app/uploads/';
const stories = [
  {
    src: 'https://thumbs.vivino.com/region_backgrounds/pDAYNERYTeqN3vazOSIscw_1280x760.jpg',
    alt: 'Champagne vineyards and village in the Grand Cru region',
    paragraphs: [
      'Nestled in Aÿ, the heart of the Champagne region, and owned by the Lallier family since 1906, Champagne Lallier celebrates more than a century of tradition with a fresh perspective on Champagne growing and making. The Maison creates wines guided by the individuality of the terroir and defined by the intuition of its winemakers.',
      'Under the stewardship of Cellar Master Dominique Demarville, the Lallier team brings passion, knowledge of terroir, and multigenerational craftsmanship to every bottle.',
    ],
  },
  {
    src: `${lallierSite}2022/08/ourhouse-timeline2-min.jpg`,
    alt: 'The historic Champagne Lallier house in Aÿ',
    paragraphs: [
      'Champagne Lallier calls home to two complementary locations in the iconic Grand Cru region: the first in Aÿ, which houses the aging cellar, and the second in Oger, Côte des Blancs, where the Maison’s contemporary production facilities are held. Each location complements the other, marrying aged-old techniques with creative innovation.',
    ],
  },
  {
    src: `${lallierSite}2022/08/ourhouse-people-dominique-1-min.jpg`,
    alt: 'Lallier vineyard team carefully harvesting grapes',
    paragraphs: [
      'The esteemed terroirs surrounding Aÿ boast an enviable combination of climate, soil, and exposure. With the founding philosophy firmly at the heart of its work, Champagne Lallier highlights what nature brings each year. Grapes are blended to express the unique personality of each harvest, offering subtle variations of character from one year to the next.',
    ],
  },
  {
    src: `${lallierSite}2023/03/lallier_vinage.jpg`,
    alt: 'Green vineyard rows at Champagne Lallier',
    paragraphs: [
      'The Lallier signature is driven by the intersection of four atmospheres: Purity, Freshness, Intensity, and Depth. Purity and Freshness come from the intrinsic characteristics of the terroir and grape varieties; Intensity and Depth result from long aging, creative blending, and a distinctive meeting of tradition and innovation.',
    ],
  },
  {
    src: `${lallierSite}2022/12/OurHouse-People-Cyrille-4.jpg`,
    alt: 'Lallier winemakers tasting and evaluating Champagne',
    paragraphs: [
      'Handcrafted with precision and an open mind, Lallier uses fragmented vinification, separating base wines in small-volume stainless-steel tanks and 228-litre wooden barrels to unveil diverse and expressive flavours. The team ferments with homemade yeasts and carefully uses malolactic fermentation to retain freshness while enhancing each wine’s personality.',
      'The Maison favours base wines over reserve wines and ages its Champagnes longer on the lees for their signature intense texture. Dosage is kept low to respect the intrinsic qualities of each blend.',
    ],
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ChampagneLallierWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/7393/logos/E8seZnKxQ0ebIL67Gzf6jQ.jpeg" alt="Champagne Lallier logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Champagne Lallier</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>41</b> Wines</span></div></div>
            <Link href="/search?q=Champagne%20Lallier" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Owned by" value="Campari Group" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.champagne-lallier.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/champagne_lallier" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/ChampagneLALLIER" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="https://x.com/lallieray" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">𝕏 X</a>
            <a href="tel:+33326554340" className="block px-2.5 py-2.5 font-semibold">☎ +33 3 26 55 43 40</a>
            <a href="mailto:contact@champagne-lallier.fr" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://images.vivino.com/wineries/sponsorship_cards/D-hyDyC_QfO4CG2Yrf-YBQ.jpeg" alt="Lallier Champagne barrels in the cellar" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Nestled in Aÿ, the heart of the Champagne region, and owned by the Lallier family since 1906, Champagne Lallier celebrates more than a century of tradition. The Maison offers fresh perspectives on Champagne growing and making, guided by terroir individuality and defined by the intuition of its winemakers.</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.paragraphs.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}</div>)}
        </article>
      </div>
    </div>
  );
}
