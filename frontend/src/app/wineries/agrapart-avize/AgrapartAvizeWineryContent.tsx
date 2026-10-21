import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Phone, Mail, Star } from 'lucide-react';

const storyBase = 'https://vivino.s3.amazonaws.com/misc/sponsorships/320300_brownestate/320300_AgrapartAvize_';
const intro = 'The Agrapart family has made Champagne in Avize for four generations. Arthur founded the original house in 1894. In 2020, Fabrice Agrapart began a new chapter with partners Emmanuel Turpin and Johanna Bergsborn Bertilsson. The village and chalky slopes of the Côte des Blancs remain the same; the vision is new.';
const stories = [
  {
    src: `${storyBase}1.jpg`,
    alt: 'Agrapart Avize champagne ageing in a barrel',
    text: 'Three values guide the house: Amour, a love of Champagne and its people; Amitié, the relationships built with vineyard teams, importers, restaurants and sommeliers; and Action, a commitment to ecology and local work. Climate considerations inform the choices made at the estate.',
  },
  {
    src: `${storyBase}2.jpg`,
    alt: 'Fabrice Agrapart with his partners among the vines',
    text: 'The name Agrapart echoes “A·Grape·Art”: wine as an art shaped from a single fruit. Fabrice helped bring horses back to Champagne vineyards, and created a natural grape-juice vinification for the Apura cuvée. The vines are farmed biodynamically, with organic certification planned for 2027.',
  },
  {
    src: `${storyBase}3.jpg`,
    alt: 'Fabrice Agrapart tasting Champagne',
    text: 'In the cellar, the team uses gravity pressing, indigenous yeasts and lunar rhythms, continuing a practice Fabrice learned from his grandparents. The Champagnes are Brut Nature and are not filtered.',
  },
  {
    src: `${storyBase}4.jpg`,
    alt: 'Champagne bottles resting in the Agrapart Avize cellar',
    text: 'Each cuvée tells a different Côte des Blancs story. Atoma, the perpetual Blanc de Blancs, blends seven crus and vintages dating back to 2020. Ameunia brings 100% Pinot Meunier to the range, while Anthocya rosé gets its delicate hue from the grapes’ own anthocyanins. These are Champagnes reimagined with no fining or filtration.',
  },
  {
    src: `${storyBase}5.jpg`,
    alt: 'Champagne being poured into glasses at Agrapart Avize',
    text: 'A new home in Avize is planned for 2027, with a working winery, small hotel, restaurant and private club conceived with artist Carsten Höller. The connected buildings will use renewable energy and house an international art collection. Visitors are welcome.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function AgrapartAvizeWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/320300/logos/gxgXYkHjTmmiHPY90GHOAQ.jpeg" alt="Agrapart Avize logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Agrapart Avize</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>7</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.3</b></span><span className="hidden sm:inline">214 total ratings</span><span className="sm:hidden">214 ratings</span></div></div>
            <Link href="/search?q=Agrapart%20Avize" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://agrapartavize.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/agrapartavize" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11}/></a>
            <a href="tel:+33326520434" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14}/>+33 3 26 52 04 34</a>
            <a href="mailto:info@agrapartavize.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14}/>Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/mvhS55x3QG-ExRvDEngKfw_2560x1520.jpeg" alt="A grower harvesting grapes in the Champagne vineyards" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{intro}</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
        </article>
      </div>
    </div>
  );
}
