import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyImages = [
  { src: 'https://images.vivino.com/misc/sponsorships/26164_Miraval/26164_Miraval_1.jpg', alt: 'Miraval rosé wine among the vines' },
  { src: 'https://images.vivino.com/misc/sponsorships/26164_Miraval/26164_Miraval_2.jpg', alt: 'Vineyards at Château Miraval' },
  { src: 'https://images.vivino.com/misc/sponsorships/26164_Miraval/26164_Miraval_3.jpg', alt: 'Vines growing in the Miraval terroir' },
  { src: 'https://images.vivino.com/misc/sponsorships/26164_Miraval/26164_Miraval_4.jpg', alt: 'Oak barrel in the Château Miraval cellar' },
  { src: 'https://images.vivino.com/misc/sponsorships/26164_Miraval/26164_Miraval_5.jpg', alt: 'Miraval rosé served with a meal' },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function MiravalWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/26164/logos/wbq4bwRFTJOE0jg1_TCwEw.jpeg" alt="Miraval logo" width={56} height={56} unoptimized/></div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Miraval</h1>
              <VerifiedBadge/>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>21</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.9</b></span><span className="hidden sm:inline">95,216 total ratings</span><span className="sm:hidden">95,216 ratings</span></div>
            </div>
            <Link href="/search?q=Miraval" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/cotes-de-provence" className="hover:underline">Côtes de Provence</a>} icon={<Mountain size={17}/>}/>
              <Row label="Owned by" value="Famille Perrin" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://miraval-provence.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/miraval.provence" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="https://x.com/miravalprovence" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">𝕏 X</a>
            <a href="mailto:contact@miraval-provence.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/5GBLhnTGR4eZgsfGAMHsWg_600x356.jpeg" alt="The Miraval estate and vineyard in Provence" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]"/>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Miraval is an authentic rosé crafted by a 5th generation winemaking family, Famille Perrin, in the heart of Provence where natural beauty flourishes. The synergy of its unique location, the people, and the surrounding nature creates a harmonious environment that blends wine, music, food, and culture.</p>
          <Image src={storyImages[0].src} alt={storyImages[0].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>Nestled in its own private valley in the ancient village of Correns – France&apos;s first organic village – Château Miraval estate spans over 1,400 acres, featuring two valleys, a lake, and a world-renowned recording studio. Throughout its storied history, the estate has served as home to a monastic order, to members of the French court in the 14th century, to musician and composer Jacques Loussier in the 1970s.</p><p>Today, the estate is renowned for producing legendary rosé wines, thanks to the collaboration between the Perrin family&apos;s winemaking expertise and the artistic vision of the Pitt family.</p></div>
          <Image src={storyImages[1].src} alt={storyImages[1].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">From a clay and limestone vineyard, partially in terraces, at an average of 350 meters, Miraval balances richness with freshness. The site&apos;s cool microclimate, with big temperature swings between night and day, give this wine a verve and lift that keeps you reaching for another sip.</p>
          <Image src={storyImages[2].src} alt={storyImages[2].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">The grapes are harvested exclusively in the morning and sorted twice. Cinsault, Grenache and Rolle are direct-pressed while the Syrah is destemmed and partially made using the saignée method. The wine is then fermented and aged in temperature controlled stainless steel vats (95%) and in barrels (5%) with bâtonnage.</p>
          <Image src={storyImages[3].src} alt={storyImages[3].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>The resulting wine is a magnificent bright rose-gold color with silver undertones. The nose reveals a delicate aromatic bouquet, mixing notes of hibiscus and amaryllis with aromas of vine peaches. The palate holds a beautiful tension – ample, fleshy, silky texture, a very nice balance. Crunchy fruit combines with the minerality of saline and limestone notes. The finish is outstanding, full of length.</p><p>With its subtle complexity and rounded profile, Miraval is the perfect selection to pair across an entire meal – from hors d’oeuvres and appetizers to dessert.</p></div>
          <Image src={storyImages[4].src} alt={storyImages[4].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
        </article>
      </div>
    </div>
  );
}
