import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const imageBase = 'https://vivino.s3.amazonaws.com/misc/sponsorships/2358_maisonchampy/';
const storyImages = [
  {
    src: `${imageBase}2358_MaisonChampy_1.jpg`,
    alt: 'Historic Maison Champy cellar with oak wine barrels',
    paragraphs: [
      'In the heart of Beaune, the historic site of Maison Champy traces its long and illustrious history, shared with great figures such as Eiffel and Pasteur. In these walls, in the 15th-century cellars, wines continue to be vinified, aged and bottled to this day. The estate is a place steeped in soul and history, a living witness to a rare heritage. Maison Champy is also the only wine house to maintain its activity in the historic centre of Beaune.',
      'Since 2021, Maison Champy was the first wine house awarded the Entreprise du Patrimoine Vivant (Living Heritage Company) label, a prestigious government distinction that honours French companies with outstanding craftsmanship. A guarantee of authenticity, mastery and passion.',
    ],
  },
  {
    src: `${imageBase}2358_MaisonChampy_2.jpg`,
    alt: 'Vineyard rows at Maison Champy in Burgundy',
    paragraphs: [
      'Maison Champy is also a vision, a philosophy, and a strong commitment to the terroirs of the Côte de Beaune. With technical director Dimitri Bazas, for over 25 years, and his technical team, the House has maintained a unique “haute couture” approach to wine. Listening to the terroir and mastery of time by our team are at the heart of our concerns: precision and attention to detail.',
      'Maison Champy grapes are harvested at peak ripeness, produced in an environmentally friendly manner and crafted using traditional methods. The wines are aged in 228-litre Burgundy barrels made of French oak, from regional appellations to Grands Crus. Each cuvée expresses with precision the typical characteristics and purity of its terroir.',
    ],
  },
  {
    src: `${imageBase}2358_MaisonChampy_3.jpg`,
    alt: 'Glass-roofed historic Maison Champy winery building',
    paragraphs: ['With over 300 years of history, Maison Champy is committed to promoting Burgundy wines, its heritage and its values.'],
  },
  {
    src: `${imageBase}2358_MaisonChampy_4.jpg`,
    alt: 'Selection of Maison Champy Burgundy wines',
    paragraphs: [],
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function MaisonChampyWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/2358/logos/YTHCCOgZTwGAVYbcxMG8-g.jpeg" alt="Maison Champy logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Maison Champy</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>116</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.0</b></span><span className="hidden sm:inline">24,043 total ratings</span><span className="sm:hidden">24,043 ratings</span></div></div>
            <Link href="/search?q=Maison%20Champy" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/cote-de-beaune" className="hover:underline">Côte de Beaune</a>} icon={<Mountain size={17}/>}/>
              <Row label="Winemaker" value="Dimitri Bazas" icon={<span className="text-base">◉</span>}/>
              <Row label="Owned by" value="AdVini" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.maisonchampy.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/maisonchampy" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="tel:+33380237521" className="block px-2.5 py-2.5 font-semibold">☎ +33 (0)3 80 23 75 21</a>
            <a href="mailto:boutique.champy@maisonchampy.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/4pEh4c8rQNqx_dHtSg2FdA_600x356.jpeg" alt="Maison Champy historic winery facade in Beaune" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Maison Champy, Burgundy&apos;s first wine house, owns a 21-hectare vineyard on the Côte de Beaune, stretching from Pernand-Vergelesses on the Corton hill to Volnay. We grow iconic plots, worked with care and organically, on 8 main appellations, with two grape varieties of Bourgogne: Pinot Noir and Chardonnay. Maison Champy produces exceptional wines, marked by finesse and authenticity, reflecting their unique terroir.</p>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Maison Champy was the first Burgundy wine house to obtain the “Entreprise du Patrimoine Vivant” (Living Heritage Company) label in 2021.</p>
          {storyImages.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.paragraphs.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}</div>)}
        </article>
      </div>
    </div>
  );
}
