import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/313138_champagnetelmont/313138_champagnetelmont_';
const stories = [
  {
    src: `${storyBase}1_2560x1520.jpg`,
    alt: 'Champagne Telmont winery building',
    text: 'Founded in 1912 in Damery, near Épernay, Champagne Telmont began with local grower Henri Lhôpital. The family house is now guided by the fourth generation, with Bertrand Lhôpital serving as Cellar Master and Head of Viticulture.',
  },
  {
    src: `${storyBase}2_2560x1520.jpg`,
    alt: 'A grower tending the Telmont vineyard',
    text: 'Telmont believes good wine depends on a healthy Earth. After gaining its first organic certification for some parcels in 2017, the house launched its “In the Name of Mother Nature” program in 2021 to make high-quality Champagne while reducing its environmental footprint.',
  },
  {
    src: `${storyBase}3_2560x1520.jpg`,
    alt: 'An old vine trunk and vineyard parcel marker',
    text: 'The estate is working to convert all its own vineyards and partner-grower parcels to organic viticulture, while protecting biodiversity. Its wider measures include lighter bottles, less packaging, renewable energy and ending air freight for transporting bottles. Telmont aims to become Climate Positive by 2030 and Net Positive by 2050; Leonardo DiCaprio has invested in the project.',
  },
  {
    src: `${storyBase}4_2560x1520.jpg`,
    alt: 'Telmont Réserve de la Terre bottle held among the vines',
    text: 'The Réserve de la Terre cuvée reflects the house’s environmental commitments and its close connection to the vineyard. Telmont lets the character of each parcel and the natural conditions of the vintage shape its Champagnes.',
  },
  {
    src: `${storyBase}5_2560x1520.jpg`,
    alt: 'Champagne Telmont bottle and glasses beside oak barrels',
    text: 'Telmont Champagnes balance freshness and tension with an elegant, structured style. The house draws on its winemaking know-how to reveal the different expressions of its terroir.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ChampagneTelmontWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/313138/logos/LuFrZ-AuQs-PinZz4a2vRg.jpeg" alt="Champagne Telmont logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Champagne Telmont</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>11</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.1</b></span><span className="hidden sm:inline">4,770 total ratings</span><span className="sm:hidden">4,770 ratings</span></div></div>
            <Link href="/search?q=Champagne%20Telmont" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Owned by" value="Champagne Telmont" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://champagne-telmont.com/?c=INT" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/champagnetelmont/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/ChampagneTelmont" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11}/></a>
            <a href="https://twitter.com/maisontelmont" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>X</span><ExternalLink size={11}/></a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/Ia_rgS8gQP2fI13ADkl57g_1280x760.jpeg" alt="Champagne Telmont vineyard and bottle" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
        </article>
      </div>
    </div>
  );
}
