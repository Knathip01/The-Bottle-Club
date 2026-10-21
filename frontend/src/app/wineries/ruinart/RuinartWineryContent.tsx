import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain } from 'lucide-react';

const story = [
  {
    image: 'https://images.vivino.com/misc/sponsorships/2471_ruinart/2471_ruinart_1_2560x1520.jpeg',
    alt: 'Ruinart Champagne house in Reims',
    paragraphs: [
      'Following in the footsteps of his uncle, Dom Thierry Ruinart, a brilliant and modest monk, Nicolas Ruinart drafted the founding charter of Maison Ruinart. On September 1st, 1729, in Reims, at the heart of the Champagne region, he created the world’s first ever champagne-producing company. This gave rise to an enterprise that continues to flourish and prosper nearly three hundred years later.',
      'The intuition of his uncle the monk, who had first shown him the art, had thus inspired an initiative that was to make history.',
    ],
  },
  {
    image: 'https://images.vivino.com/misc/sponsorships/2471_ruinart/2471_ruinart_2_2560x1520.jpg',
    alt: 'Ruinart stone in Reims',
    paragraphs: [
      'By the mid-18th century, Ruinart acquired the first chalk quarries outside the city of Reims to store bottles. They are today classified on the UNESCO World Heritage List and the only ones to be classified as a “natural site” since 1931 by the French Government. To wander into the chalk quarries that act as Maison Ruinart’s cellars is to discover the beating heart of the Champagne region.',
    ],
  },
  {
    image: 'https://images.vivino.com/misc/sponsorships/2471_ruinart/2471_ruinart_3_2560x1520.jpeg',
    alt: 'Ruinart bottles aging in the chalk cellars',
    paragraphs: [
      'Maison Ruinart Crayères are an essential ingredient in the creation of Ruinart exceptional champagnes. The deep chalk caves, or Crayères, were dug by the Romans over 2000 years ago and are essential to the creation of exceptional Ruinart Champagne. Over 125 feet below ground and almost 5 miles long, these unique caves are absent of vibration and offer optimal conditions for temperature, fermentation and maturation.',
    ],
  },
  {
    image: 'https://images.vivino.com/misc/sponsorships/2471_ruinart/2471_ruinart_4_2560x1520.jpeg',
    alt: 'Chardonnay grapes at Ruinart',
    paragraphs: [
      'Chardonnay is at the heart of every cuvée in Ruinart range. Ruinart cuvées have been based on chardonnay since the second half of the 20th century.',
      'Chardonnay is a noble grape, the rarest in Champagne and the most sought after, predominant in Grands & Premiers Crus vineyards.',
      'Ruinart winemaking team aims at revealing the aromatic freshness of this grape. “Aromatic” here stands for a large variety of flavors and aromas, while the freshness enhances the vivacity, the energy and the character of the cuvée.',
    ],
  },
  {
    image: 'https://images.vivino.com/misc/sponsorships/2471_ruinart/2471_ruinart_5_2560x1520.jpg',
    alt: 'Rows of bottles in Ruinart cellars',
    paragraphs: [
      'Chef de Caves, Frédéric Panaiotis aims to reveal the aromatic freshness of Chardonnay and has established Blancs de Blancs as the flagship of the house, a rare style in the region. Ruinart NV Champagnes use reserve wines from 2–3 previous years and age for 2–2.5 years. Dom Ruinart ages for 9–10 years before release. The trademark Ruinart taste is obtained by controlling the oxygen that reacts with the wine during winemaking.',
    ],
  },
];

function VerifiedBadge() {
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
        <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified Partner Winery
    </div>
  );
}

function ProfileRow({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
      <div className="w-5 shrink-0 text-[#262626]">{children}</div>
      <div className="min-w-0">
        <div className="text-[10px] leading-3 text-stone-500">{label}</div>
        <div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{label === 'Country' ? <Link href="/product?country=France" className="hover:underline">France</Link> : label === 'Region' ? <Link href="/product?country=Champagne" className="hover:underline">Champagne</Link> : label === 'Winemaker' ? 'Ruinart' : 'Moët Hennessy'}</div>
      </div>
    </div>
  );
}

export default function RuinartWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image src="https://images.vivino.com/wineries/2471/logos/e4u1FiUGTdiLcJ17yENWwg.jpeg" alt="Ruinart logo" width={56} height={56} unoptimized />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Ruinart</h1>
              <VerifiedBadge />
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>16</b> Wines</span>
              </div>
            </div>
            <Link href="/search?q=Ruinart" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <ProfileRow label="Country"><span>🇫🇷</span></ProfileRow>
              <ProfileRow label="Winemaker"><span className="text-base">◉</span></ProfileRow>
              <ProfileRow label="Owned by"><span className="text-base">⌂</span></ProfileRow>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.ruinart.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://www.instagram.com/ruinart/" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/Ruinart" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="tel:+33326775151" className="block px-2.5 py-2.5 font-semibold">☎ 33 03 26 77 51 51</a>
          </section>
        </aside>

        <article className="min-w-0 overflow-hidden rounded-md border border-stone-200 bg-white">
          <Image src={story[0].image} alt={story[0].alt} width={1280} height={760} priority unoptimized className="h-auto max-h-[220px] w-full object-cover sm:max-h-[310px]" />
          <div className="space-y-2 px-2.5 py-3 sm:space-y-3 sm:px-4 sm:py-4">
            <h2 className="text-[11px] font-bold uppercase leading-snug tracking-wide text-[#1e1e1e] sm:text-sm">THE FIRST ESTABLISHED HOUSE OF CHAMPAGNE</h2>
            {story[0].paragraphs.map((paragraph) => <p key={paragraph} className="text-[10px] leading-[1.5] text-[#242424] sm:text-[13px]">{paragraph}</p>)}
            {story.slice(1).map((section) => (
              <section key={section.image} className="space-y-2">
                <Image src={section.image} alt={section.alt} width={1280} height={760} unoptimized className="h-auto max-h-[260px] w-full rounded-md object-cover sm:max-h-[390px]" />
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-[10px] leading-[1.5] text-[#242424] sm:text-[13px]">{paragraph}</p>)}
              </section>
            ))}
            <section className="space-y-2 border-t border-stone-200 pt-3">
              <h2 className="text-xs font-bold sm:text-sm">Sustainability Commitments</h2>
              <p className="text-[10px] leading-[1.5] sm:text-[13px]">Maison Ruinart’s commitment to the preservation of nature and know-how is historically rooted. Since its inception in 1729, the House has always considered terroir and ancestral know-how as the base for its exceptional wines. In response to the global environmental challenges, Maison Ruinart has made strong commitments to carry out numerous transformations with a positive impact on the world.</p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
