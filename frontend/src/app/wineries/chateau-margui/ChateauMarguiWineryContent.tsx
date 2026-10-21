import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/17315_ChateauMargui/17315_ChateauMargui_';
const stories = [
  {
    src: `${storyBase}1.1.jpg`,
    alt: 'Château Margüi estate house and gardens',
    text: 'The story of Domaine de Margüi reaches back to 600 BC, when the land around Châteauvert was already cultivated. Archaeological remains and amphorae discovered in 2002 confirmed its ancient past. The 1784 country house was built in classic Provençal style, with gardens and farm buildings; the vines were replanted in 2000 and a chapel later added.',
  },
  {
    src: `${storyBase}2.1.jpg`,
    alt: 'Château Margüi wine barrels in the cellar',
    text: 'In 2017 the estate joined Skywalker Vineyards, George Lucas’s collection of three small-scale wine estates in California, Umbria and Provence. The vineyards are cultivated organically at altitude, with hand harvesting and respect for nature. Traditional expertise is paired with modern cellar equipment to make expressive wines.',
  },
  {
    src: `${storyBase}3.1.jpg`,
    alt: 'Hand-harvested grapes being sorted at Château Margüi',
    text: 'At the foot of the Sainte-Baume massif, Margüi benefits from a distinctive microclimate, clay-limestone soils and rich biodiversity within a Natura 2000 area. Its 20 hectares of organic vines are harvested by hand. The cellar, renovated in 2018, uses gravity to move the juice gently while combining traditional methods with modern technology.',
  },
  {
    src: `${storyBase}4.1.jpg`,
    alt: 'Château Margüi wine bottles including rosé and white',
    text: 'The wines reflect the Coteaux Varois appellation and the variety of grapes grown on the estate. Rosés are fresh and balanced; whites are rich and distinctive, made in new barrels or stainless-steel vats; and reds come from low-yielding plots and age for around 18 months in barrel.',
  },
  {
    src: `${storyBase}5.1.jpg`,
    alt: 'Château Margüi wine served by a fireplace',
    text: 'Built in 1784, the Bastide is a landmark of Provençal heritage. The château’s signature cuvée is selected plot by plot, fermented in Tulip vats and aged in carefully chosen barrels. Research and experimentation help reveal the richness and complexity of the Margüi terroir.',
  },
  {
    src: `${storyBase}6.1.jpg`,
    alt: 'Château Margüi wine at a seaside dining table',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ChateauMarguiWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/17315/logos/8G-f8uuBTWGSttcm-mRs-Q.jpeg" alt="Château Margüi logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Château Margüi</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>20</b> Wines</span></div></div>
            <Link href="/search?q=Chateau%20Margui" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Château Margüi" icon={<span className="text-base">♙</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.chateaumargui.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/chateaumargui/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/chateaumarguivineyards" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11}/></a>
            <a href="tel:+33977902318" className="block px-2.5 py-2.5 font-semibold">+33 9 77 90 23 18</a>
            <a href="mailto:contact@chateaumargui.com" className="block px-2.5 py-2.5 font-semibold">Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/258zRdhHSC25_0IGSPZuJg_2560x1520.jpeg" alt="Château Margüi estate in Provence" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Château Margüi is a 20-hectare vineyard in the Coteaux Varois appellation of Provence. The estate has farmed organically since 1999 and harvests by hand. Its terroir, cultivated since Gallo-Roman times, produces two distinct ranges: the Château wines and the more limited Bastide 1784. In 2017, it joined George Lucas’s Skywalker Vineyards.</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.text && <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p>}</div>)}
        </article>
      </div>
    </div>
  );
}
