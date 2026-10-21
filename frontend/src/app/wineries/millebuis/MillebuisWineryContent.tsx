import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/204658_millebuis/204658_millebuis_';
const stories: Array<{ src: string; alt: string; text?: string; heading?: string; paragraphs?: string[] }> = [
  {
    src: `${storyBase}1_2560x1520.jpg`,
    alt: 'Stone winery building and flowers in the Côte Chalonnaise',
    text: 'Millebuis is based at the Cave des Vignerons de Buxy, formed in 1931 when Côte Chalonnaise winegrowers joined forces to make, age, and market their wines together. The cooperative has grown into a remarkable shared venture.',
  },
  {
    src: `${storyBase}2_2560x1520.jpg`,
    alt: 'A group of Côte Chalonnaise winegrowers by their red van',
    text: 'Today, 120 family farms tend the vines, carrying generations of knowledge forward. Working together, the growers focus on quality and care for the environment, bringing the character of their terroirs into each wine.',
  },
  {
    src: `${storyBase}3_2560x1520.jpg`,
    alt: 'A grower tending vine leaves in the vineyard',
    text: 'The cooperative brings together small family estates averaging around 20 hectares. Shared effort and close attention to the grapes support careful harvests and wines that express the quality of Côte Chalonnaise terroirs.',
  },
  {
    src: `${storyBase}4_2560x1520.jpg`,
    alt: 'Aerial view over the Côte Chalonnaise countryside and vineyards',
    text: 'For Millebuis growers, the vines are part of a way of life and a legacy for their children. They work with enthusiasm and confidence to care for their land and keep that way of life thriving.',
  },
  {
    src: `${storyBase}5_2560x1520.jpg`,
    alt: 'Alain Pierre, Cave oenologist, tasting wine beside barrels',
    heading: 'Alain Pierre, the Cave oenologist',
    paragraphs: [
      'For more than 30 years, Alain Pierre has worked with dedication to craft wines from the fruit grown on these lands. His relationship with the soil began early, helping his parents and grandparents in the fields and vineyards.',
    ],
  },
  {
    src: `${storyBase}6_2560x1520.jpg`,
    alt: 'Millebuis wine and glasses in a cellar tasting setting',
    paragraphs: [
      'The Pinot Noir reds are delicate and versatile, with vivid colour and berry notes. Chardonnay and Aligoté whites are harmonious, with floral and dried-fruit aromas, and can be enjoyed younger. The range also includes wines suited to cellaring and sparkling Bourgogne.',
    ],
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function MillebuisWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/204658/logos/cL0_z1AnQWCsoLHvriL58w.jpeg" alt="Millebuis logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Millebuis</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>38</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.8</b></span><span className="hidden sm:inline">6,111 total ratings</span><span className="sm:hidden">6,111 ratings</span></div></div>
            <Link href="/search?q=Millebuis" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Owned by" value="La Compagnie de Burgondie" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.millebuis.fr/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/SSDv1Q-PTzaQuYhPuu_qsQ_2560x1520.jpeg" alt="Barrel cellar at Millebuis" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.heading && <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">{story.heading}</h2>}{story.paragraphs ? story.paragraphs.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>) : <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p>}</div>)}
        </article>
      </div>
    </div>
  );
}
