import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Phone, Mail, Star } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/79743_BB/79743_BB_';
const intro = 'Domaine de la Borie Blanche is one of six family estates in Maison Lorgeril, an independent Languedoc wine family with more than 400 years of history. Nicolas and Miren de Lorgeril acquired the estate in 1999. It sits in the heart of the La Livinière appellation, on the foothills of the Montagne Noire.';
const stories = [
  {
    src: `${storyBase}2.jpg`,
    alt: 'Bottles from Domaine de la Borie Blanche among the vines',
    text: 'The estate’s 16 hectares form a broad south-facing amphitheatre, like a balcony above the Mediterranean. Some of the appellation’s highest plots reach almost 400 metres. Sunny days and cooler nights help the grapes ripen slowly while keeping their natural balance.',
  },
  {
    src: `${storyBase}1.jpg`,
    alt: 'Vineyards of Domaine de la Borie Blanche on the green hills',
    text: 'This landscape has a distinctive mineral character, shaped by schist and limestone soils and traditional dry-stone walls. Grenache, Syrah, Mourvèdre and Carignan thrive here, making generous wines with vibrant fruit, silky tannins, freshness and hints of wild Mediterranean herbs.',
  },
  {
    src: `${storyBase}3.jpg`,
    alt: 'Schist and limestone stones from the estate’s terroir',
    text: 'The name tells a story of both place and family. A “borie” is a small dry-stone shelter once used in vineyards; “Borie Blanche” refers to the pale stone huts across the landscape and to Blanche, the daughter of Nicolas and Miren de Lorgeril.',
  },
  {
    src: `${storyBase}4.jpg`,
    alt: 'Traditional dry-stone wall in the wooded hills of La Livinière',
    text: 'Nicolas and Miren continue the estate’s story with their son Henri, who is gradually joining Maison Lorgeril as its thirteenth generation. Together, they aim to express this high-altitude terroir with precision and craft fresh, elegant wines.',
  },
  {
    src: `${storyBase}5.jpg`,
    alt: 'Domaine de la Borie Blanche wine bottle in the vineyard',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function DomaineBorieBlancheWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/79743/logos/avaF4Es6ReeMjeNNVBvMjg.jpeg" alt="Domaine de la Borie Blanche logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Domaine de la Borie Blanche</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>5</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.8</b></span><span className="hidden sm:inline">1,632 total ratings</span><span className="sm:hidden">1,632 ratings</span></div></div>
            <Link href="/search?q=Domaine%20de%20la%20Borie%20Blanche" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Nicolas de Lorgeril" icon={<span className="text-base">♙</span>}/>
              <Row label="Owned by" value="Lorgeril" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://lorgeril.wine/domaine-de-la-borie-blanche/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/maisonlorgeril/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/LORGERIL" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11}/></a>
            <a href="tel:+33468726529" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14}/>+33 4 68 72 65 29</a>
            <a href="mailto:contact@lorgeril.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14}/>Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/eKAWqFYhQG-4OG5oIkVgcA_2560x1520.jpeg" alt="Domaine de la Borie Blanche vineyard on the hills of La Livinière" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{intro}</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.text && <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p>}</div>)}
        </article>
      </div>
    </div>
  );
}
