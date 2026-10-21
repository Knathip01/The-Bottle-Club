import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail } from 'lucide-react';

const storyBase = 'https://vivino.s3.amazonaws.com/misc/sponsorships/274027_rumor/274027_rumor_';
const intro = 'Every great love story can begin with a small detail that keeps returning. For Barry Bayat, it was a glass of rosé, present in life’s special moments: a Côte d’Azur sunset, dinner with friends or a night that seemed never to end. RUMOR was created to bottle that feeling, ready to be shared wherever a bottle is opened.';
const stories = [
  {
    src: `${storyBase}1.jpg`,
    alt: 'RUMOR founder Barry Bayat with Provence winemaker Pierre Guérin among the vines',
    text: 'To bring that idea to life, Barry partnered with Provençal winemaker Pierre Guérin, who has more than 30 years of experience. His approach lets the grapes speak: harvesting before sunrise to keep the fruit cool, vinifying each lot separately, then blending by hand for balance.',
  },
  {
    src: `${storyBase}2.jpg`,
    alt: 'RUMOR rosé bottles displayed at an outdoor event',
    text: 'Provence is the historic home of rosé, where abundant sunshine, warm days and cool nights help retain freshness. Limestone and clay soils add depth, and RUMOR selects organically farmed grapes from vineyards across the Côtes de Provence appellation.',
  },
  {
    src: `${storyBase}3.jpg`,
    alt: 'RUMOR Côtes de Provence rosé bottle label',
    paragraphs: [
      'The result is an Ecocert-certified organic, vegan and gluten-free wine, made with minimal intervention and no residual sugar. It offers a pale colour, white-flower and citrus aromas, and a lively, smooth finish.',
      'RUMOR is made for sharing at the table, pairing naturally with Mediterranean dishes, light pasta, sushi, grilled seafood and more. The wine is now poured at well-known venues around the world and has appeared on screen in Emily in Paris. As its founder says, taste needs no translation: pour and enjoy the moment.',
    ],
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function RumorWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/274027/logos/tE4FdF2GRjK6aJcTCEa6Xg.jpeg" alt="RUMOR logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">RUMOR</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>2</b> Wines</span></div></div>
            <Link href="/search?q=RUMOR" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://rumorrose.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/rumorrose" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11}/></a>
            <a href="mailto:contact@rumorrose.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14}/>Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/winery_backgrounds/Qs-X5WWGT76eLf0semgz2A_2560x1520.jpeg" alt="Rosé glass in the vineyards of Provence" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{intro}</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.text && <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p>}{story.paragraphs?.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}</div>)}
        </article>
      </div>
    </div>
  );
}
