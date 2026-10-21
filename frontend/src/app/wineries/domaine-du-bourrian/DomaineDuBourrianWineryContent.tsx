import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Phone, Mail, Star } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/233164_domainedubourrian/';
const stories = [
  { src: `${storyBase}233164_domainedubourrian_1_2560x1520.jpg`, alt: 'Domaine du Bourrian winery buildings in the hills near Saint-Tropez', text: 'In the Saint-Tropez golden triangle, Domaine du Bourrian is a family estate with a history of around 150 years. Its 65 hectares bring together tradition and modern winemaking, with rosé, sparkling, white and red wines.' },
  { src: `${storyBase}233164_domainedubourrian_2_2560x1520.jpg`, alt: 'The Domaine du Bourrian winery cellar and tasting space', text: 'At the western foot of Gassin hill, the vines benefit from abundant sunshine and refreshing sea breezes. The 24-hectare vineyard includes both Côtes de Provence AOP and IGP plots.' },
  { src: `${storyBase}233164_domainedubourrian_3_2560x1520.jpg`, alt: 'Organic vineyard work at Domaine du Bourrian', text: 'Every plot is organically certified. The vineyard team avoids synthetic pesticides and herbicides, using natural methods to maintain a healthy ecosystem and let the grapes reflect their surroundings.' },
  { src: `${storyBase}233164_domainedubourrian_4_2560x1520.jpg`, alt: 'Vineyard landscape at Domaine du Bourrian', text: 'Vermentino and Viognier bring aromatic character to the white wines. Grenache noir, Cinsault, Syrah and Tibouren form delicate Provençal rosés, while Syrah, Grenache noir and Merlot Sauvignon are used for fuller, spicy reds.' },
  { src: `${storyBase}233164_domainedubourrian_5_2560x1520.jpg`, alt: 'Wine tasting and private events at Domaine du Bourrian', text: 'The estate welcomes private visits that pair a guided tour with a tasting. Its property is also available for tailored weddings and private or corporate events.' },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function DomaineDuBourrianWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/233164/logos/NrpVrcIYTia2XW-pY0y2AA.jpeg" alt="Domaine du Bourrian logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Domaine du Bourrian</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>8</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.1</b></span><span className="hidden sm:inline">947 total ratings</span><span className="sm:hidden">947 ratings</span></div></div>
            <Link href="/search?q=Domaine%20du%20Bourrian" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Domaine du Bourrian" icon={<span className="text-base">♙</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.bourrian.fr/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/domainedubourrian/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/DomaineDuBourrian" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11}/></a>
            <a href="tel:0494561628" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14}/>04 94 56 16 28</a>
            <a href="mailto:info@bourrian.fr" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14}/>Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/WWAOMyYKSA-k0NYcJNDj-A_2560x1520.jpeg" alt="Domaine du Bourrian estate among the hills" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
          <a href="https://www.bourrian.fr/" target="_blank" rel="noreferrer" className="block px-0.5 py-1 text-[10px] text-red-700 underline sm:text-[13px]">Book a wine tour</a>
        </article>
      </div>
    </div>
  );
}
