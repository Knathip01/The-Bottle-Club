import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/30044_chateau_galoupet_2560x1520_';
const stories = [
  {
    src: `${storyBase}1.JPG`,
    alt: 'Mediterranean landscape at Château Galoupet',
    text: 'Winds from the Massif des Maures, the former Hyères salt flats and the Golden Isles shape three distinct microterroirs and a unique climate. The estate has been recognised as a Cru Classé Côtes de Provence since 1955 and has roots reaching back to the 18th century.',
  },
  {
    src: `${storyBase}2_updated.jpg`,
    alt: 'Aerial rows of vines across Château Galoupet',
    text: 'Galoupet sees biodiversity as essential to expressing its terroir. The team works with specialists to restore a rare ecosystem and adapt vineyard practices to the natural balance of the vines. Energy-efficient facilities, plot-by-plot care and agroforestry help give back to nature.',
  },
  {
    src: `${storyBase}3.jpg`,
    alt: 'Château Galoupet rosé served with a meal',
    paragraphs: [
      'The Cru Classé Rosé is made with grapes from the estate and seven varieties. Careful work in each plot and precise winemaking aim to show the full potential of the terroir in fresh, characterful wines with ageing potential.',
      'Its versatile style can accompany a meal from aperitif through dessert, in every season.',
    ],
  },
  {
    src: `${storyBase}4.JPG`,
    alt: 'Amber Château Galoupet bottle with a glass of rosé',
    text: 'Packaging is a major part of wine’s carbon footprint, so Galoupet chose a lightweight 499-gram amber bottle made with 80% recycled glass. The rosé comes entirely from estate-owned grapes, and a QR code lets drinkers trace its journey from cellar to bottle.',
  },
  {
    src: `${storyBase}5.JPG`,
    alt: 'A beekeeper working with hives on the Château Galoupet estate',
    text: 'With guidance from local wildlife groups, the estate develops biodiversity through agroforestry and vineyard management. At a woodland bee station, the French Apidology Observatory monitors local bee populations and their effects on soil, vines, grape quality and the wines. Galoupet aims to make its estate a sanctuary for nature and a model for sustainability.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ChateauGaloupetWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/30044/logos/IsRjmibxQ--Bp6VVMVKnVw.jpeg" alt="Château Galoupet logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Château Galoupet</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>3</b> Wines</span></div></div>
            <Link href="/search?q=Chateau%20Galoupet" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Owned by" value="Moët Hennessy" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.chateaugaloupet.com/en-gb/home" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/pg/chateaudugaloupet/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11}/></a>
            <a href="https://x.com/ChateauGaloupet" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>X</span><ExternalLink size={11}/></a>
            <a href="tel:+33494664007" className="block px-2.5 py-2.5 font-semibold">+33 4 94 66 40 07</a>
            <a href="mailto:wines@galoupet.com" className="block px-2.5 py-2.5 font-semibold">Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/KFGYmyG3RwS9dJCLUYvQug_2560x1520.jpeg" alt="Château Galoupet landscape and Mediterranean vineyard" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Château Galoupet aims to express its exceptional terroir while caring for the environment from vineyard to bottle. Its Cru Classé Rosé is made entirely from estate-grown grapes and presented in a lightweight amber glass bottle. The Côtes de Provence wine is full-bodied, with a fine mineral finish and potential to age.</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.text && <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p>}{story.paragraphs?.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}</div>)}
          <a href="https://www.instagram.com/chateaugaloupet/" target="_blank" rel="noreferrer" className="block px-0.5 py-1 text-[10px] text-red-700 underline sm:text-[13px]">Follow Château Galoupet on Instagram</a>
        </article>
      </div>
    </div>
  );
}
