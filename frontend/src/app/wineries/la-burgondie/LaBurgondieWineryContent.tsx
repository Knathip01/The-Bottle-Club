import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/224823_laburgondie_';
const stories = [
  {
    src: `${storyBase}1_2560x1520_2024.jpg`,
    alt: 'La Burgondie winemakers sharing a meal',
    text: 'Say what you do and do what you say. The winemakers of La Burgondie understood very early on the need to progress in the knowledge of the soil and the plant, to ask themselves the right questions, and to place respect for people, workers, consumers, and nature above all.',
  },
  {
    src: `${storyBase}2_2560x1520_2024.jpg`,
    alt: 'La Burgondie wine served with food',
    text: 'Committed to sustainable agriculture, their practices are transparent. All houses are committed to the HVE standard in particular, and some adhere to the “Engaged Winemakers” label. Their commitment goes further: their strategies are based on an economic model that is fair to the consumer and the vintner.',
  },
  {
    src: `${storyBase}3_2560x1520_2024.jpg`,
    alt: 'Vineyards at a La Burgondie wine estate',
    text: 'From Auxerrois in the north to the Beaujolais hills in the south, the winemakers of La Burgondie cultivate the vineyard and produce wines from Burgundy that express the diversity of the region.',
  },
  {
    src: `${storyBase}4_2560x1520_2024.jpg`,
    alt: 'La Burgondie wine presented in a harvest basket',
    text: 'The Burgondie brand is composed of a whole range of still wines from the wine regions of the North to the South of Burgundy, as well as sparkling wines with the famous Crémants de Bourgogne.',
  },
  {
    src: `${storyBase}5_2560x1520_2024.jpg`,
    alt: 'La Burgondie wine served with a French meal',
    text: 'The wines of La Burgondie are versatile and go perfectly with traditional dishes of French cuisine, as well as Asian cuisine, pizza, or hamburgers.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function LaBurgondieWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/224823/logos/OW-kM_L_RuWG8prBMHealQ.jpeg" alt="La Burgondie logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">La Burgondie</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>44</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.7</b></span><span className="hidden sm:inline">17,753 total ratings</span><span className="sm:hidden">17,753 ratings</span></div></div>
            <Link href="/search?q=La%20Burgondie" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/bourgogne" className="hover:underline">Bourgogne</a>} icon={<Mountain size={17}/>}/>
              <Row label="Owned by" value="La Compagnie de Burgondie" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.laburgondie.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="tel:+330386349638" className="block px-2.5 py-2.5 font-semibold">☎ +33 0 3 86 34 96 38</a>
            <a href="mailto:commercial@burgondie.info" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/zWfWPNEBR4qg6A1oVHPAfA_600x356.jpeg" alt="La Burgondie wine cellar" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">800 families of cooperating winegrowers have united under the banner of La Burgondie. They are owners, farmers, or tenants of their vineyards, but share everything else. They are the fourth generation of cooperating winemakers. Equity, sharing, and solidarity are daily values that characterize their way of living and cooperation.</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
          <p className="px-0.5 py-1 text-[10px] font-semibold text-red-700 sm:text-[13px]"><a href="https://www.laburgondie.com" target="_blank" rel="noreferrer" className="underline">La Burgondie</a></p>
        </article>
      </div>
    </div>
  );
}
