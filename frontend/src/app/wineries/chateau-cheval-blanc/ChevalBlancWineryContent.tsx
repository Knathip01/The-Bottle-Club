import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyImages = [
  { src: 'https://images.vivino.com/misc/sponsorships/9754_chateauchevalblanc/9754_chevalblanc_1_2560x1520.jpg', alt: 'Vineyard rows and trees at Château Cheval Blanc' },
  { src: 'https://images.vivino.com/misc/sponsorships/9754_chateauchevalblanc/9754_chevalblanc_2_2560x1520.jpg', alt: 'Aerial view of Château Cheval Blanc winery' },
  { src: 'https://images.vivino.com/misc/sponsorships/9754_chateauchevalblanc/9754_chevalblanc_3_2560x1520.jpg', alt: 'Cheval Blanc vineyard plot marker' },
  { src: 'https://images.vivino.com/misc/sponsorships/9754_chateauchevalblanc/9754_chevalblanc_4_2560x1520.jpg', alt: 'Modern fermentation cellar at Cheval Blanc' },
  { src: 'https://images.vivino.com/misc/sponsorships/9754_chateauchevalblanc/9754_chevalblanc_5_2560x1520.jpg', alt: 'Cheval Blanc winemaking team tasting wine' },
  { src: 'https://images.vivino.com/misc/sponsorships/9754_chateauchevalblanc/9754_chevalblanc_6_2560x1520.jpg', alt: 'Barrel cellar at Château Cheval Blanc' },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ChevalBlancWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/9754/logos/1-9pMfwbQQGohbZOif-fCw.jpeg" alt="Château Cheval Blanc logo" width={56} height={56} unoptimized/></div>
            <div>
              <h1 className="text-xs font-bold leading-tight text-[#1e1e1e] sm:text-xl">Château Cheval Blanc</h1>
              <VerifiedBadge/>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>6</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.6</b></span><span className="hidden sm:inline">42,856 total ratings</span><span className="sm:hidden">42,856 ratings</span></div>
            </div>
            <Link href="/search?q=Ch%C3%A2teau+Cheval+Blanc" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/saint-emilion-grand-cru" className="hover:underline">Saint-Émilion Grand Cru</a>} icon={<Mountain size={17}/>}/>
              <Row label="Winemaker" value="Pierre Lurton" icon={<span className="text-base">◉</span>}/>
              <Row label="Owned by" value="Moët Hennessy" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.chateau-cheval-blanc.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="tel:+33557555555" className="block px-2.5 py-2.5 font-semibold">☎ 33 05 57 55 55 55</a>
            <a href="mailto:contact@chateau-cheval-blanc.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/q12MZkCFQJ-QPsgEkFV8nA_600x356.jpeg" alt="Château Cheval Blanc estate" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]"/>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Situated on the edge of the Pomerol appellation, Château Cheval Blanc has been in the commune of Saint-Emilion for two centuries. It was established in the middle of the 19th century and since then, for over 150 years it has been run by only two families, joined by marriage. Since those origins so long ago and up to the present day, ownership passed hands only once: Bernard Arnault and Baron Albert Frère purchased this prestigious estate in 1998.</p>
          <Image src={storyImages[0].src} alt={storyImages[0].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Fine wine connoisseurs and old friends, they are steadfast in their desire to uphold and to nurture the unique wine born here. The management of Cheval Blanc is based on continuity; all of the characteristics of this legendary Bordeaux have been preserved over time – its terroir, grape varieties and style – whilst its qualities continue to refine and define themselves.</p>
          <Image src={storyImages[1].src} alt={storyImages[1].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">The 39 hectares of vineyards are a generous inheritance with their three soil types composed of clay, gravel and sandy clay which, together, form a rich mosaic. Added to this natural resource are the unique plantings of grape varieties which are very unusual for the Right Bank. Since its beginning, Château Cheval Blanc has been planted with more than half Cabernet Franc (55%), Merlot (40%) and Cabernet Sauvignon (5%).</p>
          <Image src={storyImages[2].src} alt={storyImages[2].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Each of the 53 plots on the property has its own characteristics according to age, size, soil type and grape varietal. Every plot is unique and produces specific traits: powerful wines with velvet, smooth tannins on the clay, aromatic complexity and chiselled tannins on the gravel.</p>
          <Image src={storyImages[3].src} alt={storyImages[3].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Each plot is vinified separately in order to preserve its individual expression in a winery completed in 2011 which was designed by Christian de Portzamparc for that very purpose. Once blended, the wines of Cheval Blanc are both powerful and elegant with a fresh, precise and complex nose.</p>
          <Image src={storyImages[4].src} alt={storyImages[4].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Designated a Premier Grand Cru Classé « A » right from the start of the 1954 Saint-Emilion classification, it has become one of the most identifiable wines in the world; its charm, alchemy and elegance incarnate the refinement and unparalleled quality of French culture. Unaffected by fashions and trends, this exceptional wine continues in its quest for quality and precision.</p>
          <Image src={storyImages[5].src} alt={storyImages[5].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
        </article>
      </div>
    </div>
  );
}
