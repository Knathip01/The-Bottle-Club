import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyBase = 'https://vivino.s3.amazonaws.com/misc/sponsorships/42136_Ch%C3%A2teaudeMille/42136_Chateau+de+Mille_';
const intro = 'In 2018, French-American couple Constance and Lawrence Slaughter took over Château de Mille, a historic estate ready for renewal. They have devoted their energy to restoring the château and revitalising its vineyards, with cover crops, biodiversity projects, new plantings and careful, natural winemaking.';
const stories = [
  {
    src: `${storyBase}1.jpg`,
    alt: 'A Château de Mille wine served in the shade of the estate',
    text: 'The estate became certified organic in 2022 and its vineyards are farmed biodynamically. Its wines have earned recognition at the Concours de Mâcon and from Decanter, IWSC and Wine Enthusiast.',
  },
  {
    src: `${storyBase}2.jpg`,
    alt: 'Vine rows in the green countryside around Château de Mille',
    text: 'On the eastern edge of the Rhône appellations, the Luberon receives cool air from the Alps through the Durance and Calavon rivers. Château de Mille’s elevated, north-facing vines yield wines with distinctive freshness and tension. The vineyard spans 25 hectares of the 100-hectare estate, including old Grenache, Syrah, Carignan and Cinsault, alongside young Mourvèdre.',
  },
  {
    src: `${storyBase}3.jpg`,
    alt: 'The Château de Mille team working in the vineyard',
    text: 'White grapes include old Ugni and Clairette vines, as well as younger Vermentino, Grenache blanc, Bourboulenc and Marsanne. Most of the fruit is picked by hand.',
  },
  {
    src: `${storyBase}4.jpg`,
    alt: 'Sheep grazing in a vineyard at Château de Mille',
    text: 'The winery combines precise, gentle techniques: hand sorting, gravity-fed vat filling and slow, cool pressing. This careful approach preserves the character of the fruit and the vineyard.',
  },
  {
    src: `${storyBase}5.jpg`,
    alt: 'Oak barrels in the organic Château de Mille wine cellar',
    text: 'Wines mature in stainless-steel and concrete vats, concrete eggs, amphorae and large oak barrels. Native yeasts, low sulphite use and no chemical inputs help deliver purity, complexity and elegance across all three colours.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ChateauDeMilleWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/42136/logos/svjmewATS96zwEOYZti1Qw.jpeg" alt="Château de Mille logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Château de Mille</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>24</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.9</b></span><span className="hidden sm:inline">1,314 total ratings</span><span className="sm:hidden">1,314 ratings</span></div></div>
            <Link href="/search?q=Ch%C3%A2teau%20de%20Mille" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/luberon" className="hover:underline">Luberon</a>} icon={<Mountain size={17}/>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.chateau-de-mille.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/qguiOrnzQ7mbXJIzYe1xiA_2560x1520.jpeg" alt="Historic Château de Mille in the Luberon" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{intro}</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
        </article>
      </div>
    </div>
  );
}
