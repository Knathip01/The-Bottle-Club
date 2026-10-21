import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyImages = [
  { src: 'https://images.vivino.com/misc/sponsorships/14076_VigneronsDeBuxy/14076_VigneronsDeBuxy_1.jpg', alt: 'The Vignerons de Buxy team during grape harvest' },
  { src: 'https://images.vivino.com/misc/sponsorships/14076_VigneronsDeBuxy/14076_VigneronsDeBuxy_2.jpg', alt: 'Winegrowers at a historic winery in Burgundy' },
  { src: 'https://images.vivino.com/misc/sponsorships/14076_VigneronsDeBuxy/14076_VigneronsDeBuxy_3.jpg', alt: 'Vineyard landscape of the Côte Chalonnaise' },
  { src: 'https://images.vivino.com/misc/sponsorships/14076_VigneronsDeBuxy/14076_VigneronsDeBuxy_4.jpg', alt: 'Pinot Noir grapes from Burgundy' },
  { src: 'https://images.vivino.com/misc/sponsorships/14076_VigneronsDeBuxy/14076_VigneronsDeBuxy_5.jpg', alt: 'Burgundy wine and food pairing' },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function VigneronsDeBuxyWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/14076/logos/WpNCYVEgScqM0USA84po5g.jpeg" alt="Vignerons de Buxy logo" width={56} height={56} unoptimized/></div>
            <div>
              <h1 className="text-xs font-bold leading-tight text-[#1e1e1e] sm:text-xl">Vignerons de Buxy</h1>
              <VerifiedBadge/>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>101</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.7</b></span><span className="hidden sm:inline">45,384 total ratings</span><span className="sm:hidden">45,384 ratings</span></div>
            </div>
            <Link href="/search?q=Vignerons+de+Buxy" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/bourgogne" className="hover:underline">Bourgogne</a>} icon={<Mountain size={17}/>}/>
              <Row label="Winemaker" value="Vignerons de Buxy" icon={<span className="text-base">◉</span>}/>
              <Row label="Owned by" value="La Compagnie de Burgondie" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.vigneronsdebuxy.fr" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/vigneronsdebuxy" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="tel:+33385920303" className="block px-2.5 py-2.5 font-semibold">☎ 33 3 85 92 03 03</a>
            <a href="mailto:contact@vigneronsdebuxy.fr" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/7PUyg7uNRR-3E6he8sNWuw_600x356.jpeg" alt="Autumn vineyard landscape of Vignerons de Buxy" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]"/>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Mobilised and united to promote the Côte Chalonnaise region from vine to glass: the people at the heart of the project, the quality of the wines, innovation and investment, with sustainable development as the driving force. For nearly 90 years, the winegrowers of Buxy have followed a course from which they have never deviated, based on three founding pillars.</p>
          <Image src={storyImages[0].src} alt={storyImages[0].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">The grape harvest is an intense time in the life of a winery. The most advanced technologies are used in traditional winemaking.</p>
          <Image src={storyImages[1].src} alt={storyImages[1].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Des terroirs contrastés du sud de la Côte chalonnaise au nord de la Côte maconnaise, avec comme trame commune une belle minéralité.</p>
          <Image src={storyImages[2].src} alt={storyImages[2].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Our iconic grape varieties: Pinot Noir and Gamay for red wines, and Chardonnay and Aligoté for white wines.</p>
          <Image src={storyImages[3].src} alt={storyImages[3].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Fine, finely crafted wines with expressive aromas and silky tannins, wines with excellent drinkability.</p>
          <Image src={storyImages[4].src} alt={storyImages[4].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
        </article>
      </div>
    </div>
  );
}
