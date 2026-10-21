import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyBase = 'https://vivino.s3.amazonaws.com/misc/sponsorships/11523_ch%C3%A2teausaintemarguerite+/11523_cha%CC%82teausaintemarguerite_';
const stories = [
  {
    src: `${storyBase}1.jpg`,
    alt: 'Olivier and Enzo Fayard sharing a glass of rosé',
    heading: 'THE AUTHENTIC AND SUSTAINABLE EXPRESSION OF THE TERROIR',
    paragraphs: [
      'Since the seven hectares purchased in 1977, the Château Sainte Marguerite vineyard has grown considerably.',
      "Over time, it was patiently built according to the quality of the terroirs and the careful selection of grape varieties. Today, with more than 450 hectares, the estate stretches across 25 kilometers within the most remarkable terroirs of the Côtes de Provence AOC and supplies all the grapes required to produce the estate's wines. This allows Château Sainte Marguerite to guarantee complete control and exceptional quality from vine to glass.",
      'Château Sainte Marguerite is one of the 18 Crus Classés estates of the Côtes de Provence, and it is the only one to offer 100% organic and vegan wines with the Fantastique and Marguerites cuvées.',
    ],
  },
  {
    src: `${storyBase}2.jpg`,
    alt: 'Stone staircase at Château Sainte Marguerite',
    heading: 'A DISTINCTIVE SIGNATURE',
    paragraphs: [
      'Twenty plots spread over 25 kilometers: a rare characteristic within the Côtes de Provence AOP. This diversity of terroirs, between La Londe and Pierrefeu, is a true asset for winemaking. No two plots share the same exposure, climate, or soil. This enables Olivier and Enzo Fayard to compose their blends with precision, drawing from a complete aromatic palette.',
      'To ensure its unique signature, the estate seeks Grenache that delivers aromatic intensity centered on white-fleshed fruits and exotic fruits, as well as citrus notes, generosity, and a beautifully silky texture.',
      'Cinsault brings finesse, delicacy, and subtlety to the rosé wines of Château Sainte Marguerite. Rolle (or Vermentino) completes the aromatic structure of the blend with notes of pear, lemon, and grapefruit, while also giving the wine a clear, bright appearance.',
    ],
  },
  {
    src: `${storyBase}3.jpg`,
    alt: 'Rosé wine served in the Château Sainte Marguerite tasting room',
    heading: 'THE CHÂTEAU SAINTE MARGUERITE TASTING EXPERIENCE',
    paragraphs: [
      'A signature in tune with the times: wines whose finesse and complexity create an ideal aromatic profile, illustrating the subtle balance between tradition and modernity that defines the identity of Château Sainte Marguerite.',
    ],
  },
  {
    src: `${storyBase}4.jpg`,
    alt: 'Tasting counter beneath an olive tree at Château Sainte Marguerite',
    heading: 'LE MOT DES VIGNERONS — A WORD FROM THE WINEMAKERS',
    paragraphs: [
      'The pleasure of sharing, creating something exceptional, crafting cuvées that delight the palate, with the constant desire to do better—this is what drives us every day. Everyone finds their place according to their skills and energy; everyone contributes their share, no one seeks the spotlight—a true family story.',
      "At Château Sainte Marguerite, each of its emblematic grape varieties—Rolle, Grenache, and Cinsault—expresses the nuances of the terroir in which it is grown. These varieties, combined with the estate's unique terroir, give rise to generous, fruity, and mineral wines, offering authentic pleasure with every tasting.",
    ],
  },
  { src: `${storyBase}5.jpg`, alt: 'Modern Château Sainte Marguerite winery among olive trees', paragraphs: [] },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function SainteMargueriteWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/11523/logos/q76ScEzZQlutUKaz1WKtOw.jpeg" alt="Château Sainte Marguerite logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Château Sainte Marguerite</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>13</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.1</b></span><span className="hidden sm:inline">15,905 total ratings</span><span className="sm:hidden">15,905 ratings</span></div></div>
            <Link href="/search?q=Chateau%20Sainte%20Marguerite" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Guillaume Fayard" icon={<span className="text-base">◉</span>}/>
              <Row label="Owned by" value="Pernod Ricard" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.chateausaintemarguerite.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/chateausaintemarguerite" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/ChateauSainteMarguerite" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="tel:+33494004444" className="block px-2.5 py-2.5 font-semibold">☎ 04 94 00 44 44</a>
            <a href="mailto:contact@chateausaintemarguerite.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/tlbM7pi2QJmeH5H9KJgY4w_1280x760.jpeg" alt="Modern Château Sainte Marguerite winery building" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold uppercase text-[#1e1e1e] sm:text-[13px]">A FAMILY STORY WOVEN WITH PASSION AND DREAMS</h2>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Nearly half a century ago, Brigitte and Jean-Pierre Fayard acquired seven hectares of vineyards. When the Fayard family settled on the estate, the property had already held—since 1955—the title of Cru Classé des Côtes de Provence*, in recognition of the quality of its terroir, its expertise, and its wines. Only 18 estates hold this distinction today.</p>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Brigitte and Jean-Pierre Fayard recognized the potential of Provence wines at a very early stage. They never ceased to raise their standards in pursuit of quality, actively helping to give Provence rosé wine its well-deserved prestige. This mission later became a true family commitment: to elevate the name of Château Sainte Marguerite by crafting rosé, white, and red wines of outstanding quality. A demanding path, without compromise.</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.heading && <h2 className="px-0.5 pt-1 text-[10px] font-bold uppercase text-[#1e1e1e] sm:text-[13px]">{story.heading}</h2>}{story.paragraphs.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}</div>)}
        </article>
      </div>
    </div>
  );
}
