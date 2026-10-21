import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const stories = [
  {
    src: 'https://www.hola.com/horizon/landscape/7955ae6aa48a-fernanda-paloma-pennautier-paris-21cut.jpg',
    alt: 'Nicolas and Miren de Lorgeril with the next generation of the family',
    text: 'Today, Nicolas and Miren de Lorgeril lead the estate, while their son Henri is gradually joining them as the thirteenth generation. Over the past 30 years, they have developed Maison Lorgeril into a recognized family signature across Languedoc and Roussillon, with wines produced from six family estates across eight appellations.',
  },
  {
    src: 'https://thumbs.vivino.com/winery_backgrounds/2bUIu_9RR3a55X5DW1MbBA_1280x760.jpeg',
    alt: 'Château de Pennautier, historic home of Maison Lorgeril',
    text: 'Château de Pennautier, near Carcassonne in the heart of the Languedoc, has been the historic home of the Lorgeril family for more than 400 years. Built in 1620 and once visited by King Louis XIII, it remains a living family estate and the birthplace of Maison Lorgeril.',
  },
  {
    src: 'https://www.grandsudinsolite.fr/client/gfx/photos/produit/vignes-2-photo-2-du-slider_21459.jpg',
    alt: 'Pennautier vineyards with the Pyrenees in the distance',
    text: 'Château de Pennautier lies in the Cabardès wine region, a rare meeting point between Atlantic freshness and Mediterranean warmth. This unique climate allows grape varieties from both regions to grow side by side. The vineyards climb the sunny, rocky hillsides of the Montagne Noire, with views toward the Pyrenees and the Massif Central.',
  },
  {
    src: 'https://images.vivino.com/labels/dJzInfGNRTCkx__B3ZwPnw.jpg',
    alt: 'Château de Pennautier Syrah-Viognier wine label',
    text: 'Freshness is the guiding principle behind the wines, bringing elegance, balance, and energy to every cuvée. The estate’s altitude helps temper the Mediterranean heat, while organic farming and careful attention to soils and biodiversity express the character of each terroir.',
  },
  {
    src: 'https://www.chateau-fort-manoir-chateau.eu/image/chateau-de-pennautier-11_g.jpg',
    alt: 'Historic salon inside Château de Pennautier',
    text: 'Château de Pennautier is also a destination in its own right. Visitors can taste the family wines, tour the cellars, explore the château and gardens, enjoy a meal at La Table du Château, or stay in one of the estate’s holiday cottages.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function PennautierWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/4743/logos/am59jC9vR12aGQekQoEYCQ.jpeg" alt="Château de Pennautier logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Château de Pennautier</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>28</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.7</b></span><span className="hidden sm:inline">17,188 total ratings</span><span className="sm:hidden">17,188 ratings</span></div></div>
            <Link href="/search?q=Chateau%20de%20Pennautier" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/cabardes" className="hover:underline">Cabardès</a>} icon={<Mountain size={17}/>}/>
              <Row label="Winemaker" value="Nicolas de Lorgeril" icon={<span className="text-base">◉</span>}/>
              <Row label="Owned by" value="Lorgeril" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.lorgeril.wine/en/chateau-de-pennautier/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/chateaudepennautiercarcassonne/" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/chateau.depennautier.9" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="tel:+33468726529" className="block px-2.5 py-2.5 font-semibold">☎ +33 4 68 72 65 29</a>
            <a href="mailto:contact@chateaudepennautier.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/winery_backgrounds/2bUIu_9RR3a55X5DW1MbBA_1280x760.jpeg" alt="Château de Pennautier and its gardens" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Château de Pennautier, historic home of Maison Lorgeril, crafts elegant organic Cabardès wines where Atlantic freshness meets Mediterranean warmth. The family estate has been rooted in the Languedoc for more than 400 years.</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
        </article>
      </div>
    </div>
  );
}
