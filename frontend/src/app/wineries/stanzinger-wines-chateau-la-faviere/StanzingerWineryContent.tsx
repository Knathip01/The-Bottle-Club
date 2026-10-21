import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/49219_stanzinger/49219_stanzinger_';
const stories = [
  {
    src: `${storyBase}1_2560x1520.jpg`,
    alt: 'A historic photograph from Château La Favière',
    text: 'Stanzinger Wines is a family and artistic journey rooted in Bordeaux. Founded by a winemaker devoted to the land, the project aims to express the character of the terroir and the pleasure of sharing wine.',
  },
  {
    src: `${storyBase}2_2560x1520.jpg`,
    alt: 'The winemaker in the Château La Favière vineyard',
    text: 'At Saint-Seurin-sur-l’Isle, Château La Favière tends 21 hectares of vines. Since 2023, the estate has followed organic practices, with care for the soil, hand harvesting, gentle vinification and patient ageing in barrels.',
  },
  {
    src: `${storyBase}3_2560x1520.jpg`,
    alt: 'Château La Favière vineyard sign',
    text: 'Art is part of the family’s wine story. Labels such as L’Arlequin and Opéra feature original artwork, bringing a distinctive visual identity to wines made with a sense of freedom and creativity.',
  },
  {
    src: `${storyBase}4_2560x1520.jpg`,
    alt: 'Bottles with colourful Château La Favière labels',
    text: 'The range explores expressive wines beyond the usual appellation conventions. Each cuvée gives the winemaker room to follow an idea and translate it into a wine with its own character.',
  },
  {
    src: `${storyBase}5_2560x1520.jpg`,
    alt: 'Harvest work in the Château La Favière cellar',
    text: 'Stanzinger Wines brings together an independent spirit, precise craftsmanship and a contemporary view of Bordeaux. The result is a collection of elegant, lively wines made to be shared.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function StanzingerWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/49219/logos/Dm-OySnKSPmWvpXNKi6B_w.jpeg" alt="Stanzinger Wines logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Stanzinger Wines - Château La Favière</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>15</b> Wines</span></div></div>
            <Link href="/search?q=Stanzinger%20Wines%20Chateau%20La%20Faviere" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Château La Favière" icon={<span className="text-base">♙</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://lafaviere.fr/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://instagram.com/lafaviere/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11}/></a>
            <a href="https://facebook.com/chateaulafaviere/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11}/></a>
            <div className="px-2.5 py-2.5 font-semibold">33 (0) 5.57.49.72.08</div>
            <a href="mailto:contact@lafaviere.fr" className="block px-2.5 py-2.5 font-semibold">Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/vAT-2o9FS5iuN16_aHhr5A_2560x1520.jpeg" alt="Historic vineyard scene at Château La Favière" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
        </article>
      </div>
    </div>
  );
}
