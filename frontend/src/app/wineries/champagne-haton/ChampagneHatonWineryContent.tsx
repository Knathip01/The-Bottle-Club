import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/21250_JeanNoelHaton/21250_JeanNoelHaton_';
const stories = [
  {
    src: `${storyBase}1_2560x1520.jpg`,
    alt: 'Jean-Noël Haton and a family member among the vines',
    heading: 'The HATON Vineyard:',
    text: 'The Haton family has tended vines for generations, with plots in six villages of the Marne Valley: Damery, Hautvillers, Cumières, Boursault, Fleury-la-Rivière, Vauciennes, and Cuchery. All are within a few kilometres of the house.',
  },
  {
    src: `${storyBase}2_2560x1520.jpg`,
    alt: 'Two generations tasting Champagne in the cellar',
    heading: 'The Village of Damery:',
    text: 'Damery sits among the Champagne vineyards of the Marne Valley. The village and its growers played a notable part in the Champagne growers’ revolt of 1911, when winegrowers protested the treatment of their harvest.',
  },
  {
    src: `${storyBase}3_2560x1520.jpg`,
    alt: 'Historic illustration of Damery and its vineyards',
    heading: 'The Perfect Gesture',
    text: 'For more than 30 years, Sébastien has overseen blending and the wines in the cellar. Together with Baptiste and Rémi, he continues the family’s careful work from harvest through bottling. A reserve of wines collected over many vintages gives the house material for its cuvées.',
  },
  {
    src: `${storyBase}4_2560x1520.jpg`,
    alt: 'A Haton family member tending Champagne bottles in the cellar',
    heading: 'The HATON touch:',
    text: 'Three generations now work at Champagne Haton, combining practical experience in the vineyard and cellar. The family remains independent, with its own vines, presses, and cellars, and oversees each step from grape to finished Champagne.',
  },
  {
    src: `${storyBase}5_2560x1520.jpg`,
    alt: 'Haton Champagne oak barrels in the cellar',
    text: '',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ChampagneHatonWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/21250/logos/A4aFpaMxTxuNJgX65zyjjw.jpeg" alt="Champagne Haton logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Champagne Haton</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>20</b> Wines</span></div></div>
            <Link href="/search?q=Champagne%20Haton" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Jean-Noël Haton" icon={<span className="text-base">◉</span>}/>
              <Row label="Owned by" value="Jean-Noël Haton" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.champagne-haton.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/champagnehaton/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>◎ Instagram</span><ExternalLink size={11}/></a>
            <a href="tel:+33326584045" className="block px-2.5 py-2.5 font-semibold">☎ 03 26 58 40 45</a>
            <a href="mailto:baptiste.haton@champagne-haton.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/vaz4H_HYSWmtoIp0jfvTzA_2560x1520.jpeg" alt="Champagne Haton family among the vineyard rows" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">The HATON Family:</h2>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">The Haton family’s roots in Champagne reach back centuries. Today, Jean-Noël Haton, Sébastien, and the next generation, Baptiste and Rémi, continue the family tradition with estate vineyards, presses, and cellars of their own.</p>
          {stories.map((story) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.heading && <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">{story.heading}</h2>}{story.text && <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p>}</div>)}
        </article>
      </div>
    </div>
  );
}
