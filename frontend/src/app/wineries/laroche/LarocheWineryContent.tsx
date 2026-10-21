import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const cover = 'https://thumbs.vivino.com/wineries/sponsorship_cards/CNg1ORlKQoed6NqjPdwSFg_600x356.jpeg';

const sections = [
  {
    image: 'https://vivino.s3.amazonaws.com/misc/sponsorships/6055_laroche/6055_laroche_1.jpg',
    alt: 'Laroche winery in southern France',
    text: 'Laroche in Béziers has been selecting Chardonnays and varietals for over 40 years from cool and high-altitude terroirs in the Orb Valley, Limoux and the Cévennes. With its ultra-modern, entirely gravity-fed winery called La Chevalière, Laroche has mastered key technologies – inerting, precise temperature control and dissolved gas management – to produce wines of exceptional aromatic purity. In 2021, the winery was awarded the Energy Performance Trophy by the Orygeen Institute, highlighting its remarkable energy efficiency. The Laroche style in the South is defined by fresh, precise, and finely chiselled wines, shaped by the diversity of soils and altitudes. In the South of France, Laroche embraces the consistent style, reflecting its Chablis heritage. This focus on purity and precision has shaped the identity of Laroche.',
  },
  {
    image: 'https://vivino.s3.amazonaws.com/misc/sponsorships/6055_laroche/6055_laroche_2.jpg',
    alt: 'Vineyards and hills in the Laroche region',
    text: 'Laroche has established itself as an essential reference in the world of Chardonnay, both nationally and internationally. With a bold approach in the South of France, Laroche combines respect for the terroir, expertise, and technical mastery to reveal all the richness and finesse of this iconic grape variety.',
  },
  {
    image: 'https://vivino.s3.amazonaws.com/misc/sponsorships/6055_laroche/6055_laroche_3.jpg',
    alt: 'Laroche wine and historic winery buildings',
    text: 'From Chablis to the South of France, Laroche style is precise, fresh, and chiselled, striving to reveal the diversity of the Chardonnay terroirs as faithfully as possible.',
  },
  {
    image: 'https://vivino.s3.amazonaws.com/misc/sponsorships/6055_laroche/6055_laroche_4.jpg',
    alt: 'Historic Laroche wine cellar with oak barrels',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
      <div className="w-5 shrink-0 text-[#262626]">{icon}</div>
      <div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div>
    </div>
  );
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function LarocheWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/6055/logos/axYsF6xfSReXS5BrOv6cUQ.jpeg" alt="Laroche logo" width={56} height={56} unoptimized /></div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Laroche</h1>
              <VerifiedBadge />
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>172</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.8</b></span><span className="hidden sm:inline">119,670 total ratings</span><span className="sm:hidden">119,670 ratings</span></div>
            </div>
            <Link href="/search?q=Laroche" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Romain Chevrolat" icon={<span className="text-base">◉</span>}/>
              <Row label="Owned by" value="Laroche" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.larochewines.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/domainelaroche" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/DomaineLarocheChablis" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="tel:+33386428900" className="block px-2.5 py-2.5 font-semibold">☎ +33 (0)3 86 42 89 00</a>
            <a href="mailto:info@larochewines.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src={cover} alt="Historic Laroche winery building" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]"/>
          <div className="space-y-2 px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">
            <p>A true Ode to Chardonnay. Laroche in Chablis is anchored in the northern part of Burgundy and has strong historical roots in Chablis, with more than 1,000 years of history.</p>
            <p>The vineyard is split into two banks by the Serein River. Structured around valleys and hillside slopes spread across the right and left banks, the landscape alternates between vines and forests. Chardonnay, the single grape variety of Chablis, expresses its unique terroir like nowhere else and produces exceptional white wines. Laroche covers 90 hectares of vineyards planted on the finest crus of Chablis, including 24 hectares of Premier and Grand Crus.</p>
            <p>The estate cultivates a mosaic of highly distinctive Chablis terroirs across four appellation levels (Petit Chablis, Chablis, Chablis Premier Cru, Chablis Grand Cru). The Premiers and Grands Crus are still vinified and aged in the historic cellars of the Obédiencerie, the former monastery, birthplace of the Chablis wine.</p>
          </div>
          {sections.map((section) => <section key={section.image} className="space-y-1"><Image src={section.image} alt={section.alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{section.text && <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{section.text}</p>}</section>)}
        </article>
      </div>
    </div>
  );
}
