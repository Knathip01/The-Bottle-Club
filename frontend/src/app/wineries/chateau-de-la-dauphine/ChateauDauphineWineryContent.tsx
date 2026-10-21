import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const imageBase = 'https://images.vivino.com/misc/sponsorships/3404_ChaateaudelaDauphine/3404_Cha%CC%82teaudeLaDauphine_';
const stories = [
  {
    src: `${imageBase}1.jpg`,
    alt: 'Vineyards of Château de La Dauphine in Bordeaux',
    heading: 'Organic Farming Certification',
    paragraphs: [
      'Château de La Dauphine is committed to the natural world. Organic farming began in 2015, followed by biodynamic methods in 2017. The vineyard is managed as a living ecosystem, with ponds, hedges, bees, bats, grazing sheep, and wildlife supporting biodiversity.',
      'Here, the vineyard is both a place to grow grapes and a landscape where nature and winegrowing can thrive together.',
    ],
  },
  {
    src: `${imageBase}3.jpg`,
    alt: 'Sheep grazing among the vines at Château de La Dauphine',
    heading: 'One Dauphine, two châteaux',
    paragraphs: [
      'The estate’s story reaches back to the 18th century and its connection with Versailles. Marie-Josèphe of Saxony, Dauphine of France and mother of three future kings, visited to discover wines served at the Royal Court. The château took its name from her.',
      'In 2019, the estate’s royal connection was celebrated when its wine was selected for the reopening of the restored Apartments of the Dauphin and Dauphine at Versailles.',
    ],
  },
  {
    src: `${imageBase}4.jpg`,
    alt: 'Portrait of Marie-Josèphe of Saxony',
    paragraphs: [
      'Château de La Dauphine brings together its royal heritage and care for the environment in a Bordeaux style grounded in history and oriented toward people, nature, and the future.',
    ],
  },
  {
    src: `${imageBase}5.jpg`,
    alt: 'Champagne and flowers beneath the ornate ceiling of a palace hall',
    paragraphs: [],
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ChateauDauphineWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/3404/logos/nqAHTWX5SpGheuSLhpRBRw.jpeg" alt="Château de La Dauphine logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Château de La Dauphine</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>6</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.8</b></span><span className="hidden sm:inline">8,544 total ratings</span><span className="sm:hidden">8,544 ratings</span></div></div>
            <Link href="/search?q=Chateau%20de%20La%20Dauphine" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Labrune Family" icon={<span className="text-base">◉</span>}/>
              <Row label="Owned by" value="Château de la Dauphine" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.chateau-dauphine.com/en/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/chateaudeladauphine" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>◎ Instagram</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/chateaudeladauphine" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>f Facebook</span><ExternalLink size={11}/></a>
            <a href="https://x.com/ChDeLaDauphine" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">𝕏 X</a>
            <a href="tel:+33557740661" className="block px-2.5 py-2.5 font-semibold">☎ 05 57 74 06 61</a>
            <a href="mailto:contact@chateau-dauphine.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/Ndv1fHH3SnmuIY04eeO-8A_2560x1520.jpeg" alt="Château de La Dauphine in Bordeaux" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">The Château de la Dauphine, a story of women and emotions</h2>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Set in a bend of the Dordogne in Bordeaux’s Right Bank, Château de La Dauphine sits among rolling limestone hillsides often likened to Tuscany. The landscape brings together the estate’s distinctive geology and natural beauty.</p>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">The organic, biodynamic vineyard is planted with 70% Merlot and 30% Cabernet Franc. Its limestone soils shape wines known for freshness, minerality, precision, and balance.</p>
          {stories.map((story) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.heading && <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">{story.heading}</h2>}{story.paragraphs.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}</div>)}
        </article>
      </div>
    </div>
  );
}
