import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyBase = 'https://vivino.s3.amazonaws.com/misc/sponsorships/322871_gortgort/322871_gortgort_';
const stories = [
  {
    src: `${storyBase}1.jpg`,
    alt: 'Château Gort and its historic stone buildings',
    text: 'After a career in music and production, Ilja Gort acquired the neglected château in 1994. With his wife Caroline d’Hollosy, he restored the estate and built it into a prominent wine property. Ilja also writes wine novels and makes television programmes about wine, culture, and travel.',
  },
  {
    src: `${storyBase}2.jpg`,
    alt: 'Ilja Gort with his son Klaas at the château',
    text: 'Klaas Gort now leads the daily running of the château, with a focus on sustainable practices and new ideas such as quality alcohol-free wine. His partner Meriam, the château’s wine specialist, looks after the guest experience.',
  },
  {
    src: `${storyBase}3.jpg`,
    alt: 'The Gort family among the château vineyards',
    text: 'The estate farms about 20 hectares in separate plots, vinifying them individually. Its plantings include Merlot, Malbec, and Cabernet Sauvignon, with winemaker Caroline Shipley and oenologist Bruno Lacoste involved in production. The team also encourages biodiversity through wildflowers, herbs, beehives, and bat boxes.',
  },
  {
    src: `${storyBase}4.jpg`,
    alt: 'Guests tasting Gort wine at the château',
    text: 'Visitors can discover the château through guided tours and tastings, browse wines and signed books in the shop, stay at the holiday home in Asques, or join wine courses on the estate.',
  },
  {
    src: `${storyBase}5.jpg`,
    alt: 'Guests gathered outdoors at Château Gort & Gort',
    text: '',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ChateauGortWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/322871/logos/aP0IETVPQROwGEqKPVo2Dg.jpeg" alt="Château Gort & Gort logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Château Gort &amp; Gort</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>23</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.5</b></span><span className="hidden sm:inline">11,124 total ratings</span><span className="sm:hidden">11,124 ratings</span></div></div>
            <Link href="/search?q=Chateau%20Gort%20Gort" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/bordeaux" className="hover:underline">Bordeaux</a>} icon={<Mountain size={17}/>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://chateaugort.nl/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/chateaugort/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>◎ Instagram</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/iljagort" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>f Facebook</span><ExternalLink size={11}/></a>
            <a href="tel:+33557582105" className="block px-2.5 py-2.5 font-semibold">☎ 05 57 58 21 05</a>
            <a href="mailto:visite@chateaugort.fr" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/wcM3OCPfTSaL3jn8ARss9w_2560x1520.jpeg" alt="Château Gort & Gort and its family in the vineyards" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Château Gort &amp; Gort is a 13th-century wine estate in Bordeaux, set on a hill among vineyards overlooking the Dordogne. For more than 30 years, Ilja Gort and his son Klaas have made expressive wines with respect for nature.</p>
          {stories.map((story) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.text && <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p>}</div>)}
        </article>
      </div>
    </div>
  );
}
