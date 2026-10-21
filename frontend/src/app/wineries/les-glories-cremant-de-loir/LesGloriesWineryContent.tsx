import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/313036_lesglories/313036_Les+Glories_';
const intro = 'Centuries ago, monks protected France’s treasured vineyards through war and unrest, helping preserve vines and advance winemaking. Les Glories celebrates that legacy with wines grounded in tradition, shaped by time and made to be shared across generations.';
const stories = [
  {
    src: `${storyBase}1.png`,
    alt: 'A collection of Les Glories wines from French regions',
    text: 'Les Glories honours the people who cared for France’s vineyards, from monks tending the vines to today’s growers. The wines reflect a continuing respect for the land, the craft and the character of each region.',
  },
  {
    src: `${storyBase}2.png`,
    alt: 'Les Glories bottles served with fresh fruit and food',
    text: 'Working with multi-generational wine families, Les Glories selects grapes from acclaimed appellations across France, from the Loire Valley to Burgundy. Each bottle expresses the soils and climate of its place.',
  },
  {
    src: `${storyBase}3.png`,
    alt: 'Vineyard slopes and village in the Loire region',
    text: 'Care for the land is central to the project. Reduced ploughing, grassed strips and thoughtful vineyard rows encourage biodiversity, support water health and capture carbon, helping create resilient vineyard ecosystems.',
  },
  {
    src: `${storyBase}4.png`,
    alt: 'Goats grazing in a green French vineyard landscape',
    text: 'Each wine connects the drinker to a wider story of resilience, respect and careful craftsmanship. These are bottles to savour and share, carrying a tradition forward with every generation.',
  },
  {
    src: `${storyBase}5.png`,
    alt: 'Les Glories wine bottle styled with flowers and a glass of red wine',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function LesGloriesWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/313036/logos/mRgkyry3TnuYg8lmJTrOog.png" alt="Les Glories logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Les Glories</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>8</b> Wines</span></div></div>
            <Link href="/search?q=Les%20Glories" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Owned by" value="San Antonio Winery" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://lesglorieswines.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/-eiySHB1S76ly75U_zrhlg_2560x1520.jpeg" alt="Countryside vineyards in the Loire Valley" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{intro}</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.text && <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p>}</div>)}
        </article>
      </div>
    </div>
  );
}
