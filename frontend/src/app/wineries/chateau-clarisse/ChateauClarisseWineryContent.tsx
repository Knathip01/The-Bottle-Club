import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/37162_chateauclarisse/';
const stories = [
  {
    src: `${storyBase}37162_chateauclarisse_NEW_1_2560x1520.jpg`,
    alt: 'Entrance gate to Château Clarisse among vineyards',
    text: 'Olivia and Didier’s research and shared ambition became an authentic stone estate set in the green landscape of Puisseguin. The property includes historic wine cellars and had been cared for by the Estager family for more than a century.',
  },
  {
    src: `${storyBase}37162_chateauclarisse_2_2560x1520.jpg`,
    alt: 'Barrels ageing in the Château Clarisse cellar',
    paragraphs: [
      'Driven by a passion for wine and a taste for a challenge, Olivia and Didier Le Calvez began making their own wines in 2010 in the Saint-Émilion area, a UNESCO World Heritage landscape.',
      'They named the estate after their daughter Clarisse, who was one year old when the first vintage was bottled, beginning a family story in wine.',
    ],
  },
  {
    src: `${storyBase}37162_chateauclarisse_3_2560x1520.jpg`,
    alt: 'Red wine being poured into a glass at Château Clarisse',
    text: 'The vineyard covers four hectares, including three hectares of woodland, mainly on the limestone plateau of Saint-Émilion. Harvesting is done by hand to protect the vines and the soil.',
  },
  {
    src: `${storyBase}37162_chateauclarisse_4_2560x1520.jpg`,
    alt: 'Hands sorting freshly harvested grapes',
    text: 'Château Clarisse has been certified organic since 2019. The certification followed a gradual transition that began in 2009, after the estate had already adopted more measured farming practices.',
  },
  {
    src: `${storyBase}37162_chateauclarisse_5_2560x1520.jpg`,
    alt: 'A grassy path between vineyard rows at Château Clarisse',
    text: 'Working with the French National Research Institute for Agriculture, the estate has restored its woodland and planted hedges to encourage agroforestry. It has also created a vegetable garden and installed beehives to support biodiversity.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ChateauClarisseWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/37162/logos/kKFlW7vqQsODU_qQ2DEcxg.jpeg" alt="Château Clarisse logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Château Clarisse</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>4</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.0</b></span><span className="hidden sm:inline">2,916 total ratings</span><span className="sm:hidden">2,916 ratings</span></div></div>
            <Link href="/search?q=Chateau%20Clarisse" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/libournais" className="hover:underline">Libournais</a>} icon={<Mountain size={17}/>}/>
              <Row label="Winemaker" value="Château Clarisse" icon={<span className="text-base">♙</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://chateau-clarisse.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/chateau_clarisse" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/ch%C3%A2teau-clarisse-puisseguin-saint-emilion-459741747387405/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11}/></a>
            <a href="https://x.com/ChateauClarisse" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>X</span><ExternalLink size={11}/></a>
            <a href="tel:0546678374" className="block px-2.5 py-2.5 font-semibold">0546678374</a>
            <a href="mailto:contact@chateau-clarisse.com" className="block px-2.5 py-2.5 font-semibold">Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/_gXpwZQISSqyldg92tjUgQ_2560x1520.jpeg" alt="Vineyard at Château Clarisse" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.text && <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p>}{story.paragraphs?.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}</div>)}
          <a href="https://chateau-clarisse.com/" target="_blank" rel="noreferrer" className="block px-0.5 py-1 text-[10px] text-red-700 underline sm:text-[13px]">Discover our website</a>
        </article>
      </div>
    </div>
  );
}
