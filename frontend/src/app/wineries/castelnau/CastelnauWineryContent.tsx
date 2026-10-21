import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/17289_castelnau/17289_castelnau_';
const stories = [
  {
    src: `${storyBase}1_2560x1520.jpg`,
    alt: 'Champagne in a delicate-stemmed glass against a dark background',
    text: 'Champagne Castelnau invites guests to appreciate the finesse and delicacy of its wines. Fine bubbles rise in the glass, opening onto a rich, expressive character and turning a shared moment into a memorable experience.',
  },
  {
    src: `${storyBase}2_2560x1520.jpg`,
    alt: 'Cellar master Carine Bailleul in the Castelnau cellar',
    text: 'More than a century of Champagne know-how lives on through the people who make each cuvée. Their experience is passed from one generation to the next, with cellar master Carine Bailleul bringing this depth and continuity to the collection.',
  },
  {
    src: `${storyBase}3_2560x1520.jpg`,
    alt: 'Castelnau Champagne label on bottles ageing in the cellar',
    text: 'Long cellar ageing gives the wines time to develop their fine bubbles and graceful maturity. Since the house was established in 1916, Castelnau has pursued nuanced Champagne with a distinctive character.',
  },
  {
    src: `${storyBase}4_2560x1520.jpg`,
    alt: 'A dark bunch of grapes photographed in black and white',
    text: 'The house began with a group of Champagne enthusiasts seeking a style that was delicate, generous, and individual. During the lively 1920s, Castelnau found a place in the celebrated restaurants of Paris and embraced the era’s renewed appetite for celebration.',
  },
  {
    src: `${storyBase}5_2560x1520.jpg`,
    alt: 'Champagne bottles resting in a Castelnau cellar',
    text: 'By the 1930s, Castelnau was reaching markets around the world, from Europe to Africa and the Americas. Its international presence grew over the following decades, alongside recognition from wine critics.',
  },
  {
    src: `${storyBase}6_2560x1520.jpg`,
    alt: 'A bottle of Castelnau Champagne served with a glass of white wine',
    text: 'Castelnau’s next chapter reconnects with the thistle emblem adopted in 1916. Refined presentation meets a lively spirit, expressing the house’s pursuit of Champagne with depth, technical precision, and elegance.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function CastelnauWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/17289/logos/8kwFvJC4QbWHPlPBmtZ-Hw.jpeg" alt="Castelnau logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Castelnau</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>18</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.9</b></span><span className="hidden sm:inline">11,400 total ratings</span><span className="sm:hidden">11,400 ratings</span></div></div>
            <Link href="/search?q=Castelnau" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Champagne Castelnau" icon={<span className="text-base">◉</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://champagne-castelnau.fr/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/champagnecastelnau" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>◎ Instagram</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/castelnauchampagne/?fref=ts" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>f Facebook</span><ExternalLink size={11}/></a>
            <a href="https://x.com/de_castelnau" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">𝕏 X</a>
            <a href="tel:+33326778900" className="block px-2.5 py-2.5 font-semibold">☎ 33 03 26 77 89 00</a>
            <a href="mailto:commercial@champagne-castelnau.fr" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/KXLKFjPRRBiRyHMWmEnnJw_2560x1520.jpeg" alt="Castelnau Champagne glass in a dramatic black and white image" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
        </article>
      </div>
    </div>
  );
}
