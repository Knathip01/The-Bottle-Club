import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/66011_ChateauMaineGazin/66011_ChateauMaineGazin_';
const opening = [
  'When Geoff and Marion Cook arrived in Bordeaux from Australia, Château Maine Gazin was not a finished dream.',
  'They found a neglected vineyard overlooking the Gironde River, with vines to replant, buildings to restore and a region to learn. Rather than inherit a thriving estate, they chose to rebuild one.',
];
const stories = [
  {
    src: `${storyBase}1.jpg`,
    alt: 'Château Maine-Gazin vineyard sign among the vines',
    text: 'Bordeaux has a remarkable history, and Geoff and Marion came ready to learn from it. They studied, worked with local oenologists and listened to their neighbours, gradually discovering what this small plot could express. For them, tradition provides a foundation for new ideas.',
  },
  {
    src: `${storyBase}2.jpg`,
    alt: 'Vineyard landscape overlooking the Gironde countryside',
    paragraphs: [
      'Many Bordeaux wines begin with a familiar formula, often led by Merlot. At Château Maine Gazin, the team asks a different question: what makes the best wine from this vineyard?',
      'That curiosity guides their choices in the vines and the cellar.',
    ],
  },
  {
    src: `${storyBase}3.jpg`,
    alt: 'Winemaker working with barrels in the Château Maine-Gazin cellar',
    paragraphs: [
      'The estate chose organic farming as a thoughtful way to care for its vineyard, even though it brings more work, risk and uncertainty. Healthy soil, healthy vines and long-term respect for the land matter more than convenience.',
      'Here, organic farming is a lasting commitment rather than a label.',
    ],
  },
  {
    src: `${storyBase}4.jpg`,
    alt: 'Grapes growing on the Château Maine-Gazin vines',
    text: 'The wines are made to feel serious without being intimidating. Whether someone knows Bordeaux well or is discovering it for the first time, the estate aims to offer something personal and welcoming.',
  },
  {
    src: `${storyBase}5.jpg`,
    alt: 'Geoff Cook beside a tractor in the vineyard',
    text: 'A family estate, a restored vineyard and a fresh perspective on Bordeaux: Château Maine Gazin brings these elements together in wines that share the character of their place.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ChateauMaineGazinWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/66011/logos/0r_j_CJwTn6vkXHL2suZVQ.jpeg" alt="Château Maine-Gazin logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Château Maine-Gazin</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>9</b> Wines</span></div></div>
            <Link href="/search?q=Ch%C3%A2teau%20Maine-Gazin" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Geoff Cook" icon={<span className="text-base">♙</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://chateau-maine-gazin.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/chateaumainegazin" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/chateaumainegazin" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11}/></a>
            <a href="mailto:bureau@chateau-maine-gazin.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14}/>Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/tPzIUf3YTaa0esa4CB9spw_2560x1520.jpeg" alt="Aerial vineyard view of Château Maine-Gazin and the Gironde valley" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          {opening.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.text && <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p>}{story.paragraphs?.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}</div>)}
        </article>
      </div>
    </div>
  );
}
