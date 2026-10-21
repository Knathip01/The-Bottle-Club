import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain } from 'lucide-react';

const storyImages = [
  { src: 'https://images.vivino.com/misc/sponsorships/17370_xaviervignon/17370_xaviervignon_1_2560x1520.jpg', alt: 'Vineyards and terroir of Xavier Vignon' },
  { src: 'https://images.vivino.com/misc/sponsorships/17370_xaviervignon/17370_xaviervignon_2_2560x1520.jpg', alt: 'Xavier Vignon vineyard in the Rhône Valley' },
  { src: 'https://images.vivino.com/misc/sponsorships/17370_xaviervignon/17370_xaviervignon_3_2560x1520.jpg', alt: 'Winemaker Xavier Vignon tasting wine' },
  { src: 'https://images.vivino.com/misc/sponsorships/17370_xaviervignon/17370_xaviervignon_4_2560x1520.jpg', alt: 'Xavier Vignon winery and wine cellar' },
  { src: 'https://images.vivino.com/misc/sponsorships/17370_xaviervignon/17370_xaviervignon_5_2560x1520.jpg', alt: 'Tasting Xavier Vignon wines' },
  { src: 'https://images.vivino.com/misc/sponsorships/17370_xaviervignon/17370_xaviervignon_6_2560x1520.jpg', alt: 'Xavier Vignon wine display' },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function XavierVignonWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/17370/logos/N2FGE5oSSxS4cL07pAeIfg.jpeg" alt="Xavier Vignon logo" width={56} height={56} unoptimized/></div>
            <div>
              <h1 className="text-xs font-bold leading-tight text-[#1e1e1e] sm:text-xl">Xavier Vignon</h1>
              <VerifiedBadge/>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>152</b> Wines</span></div>
            </div>
            <Link href="/search?q=Xavier+Vignon" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Owned by" value="Xavier" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.xaviervignon.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/xaviervignon_officiel" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/xavier-vins-377072125660340/" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="https://x.com/Xaviervins" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">𝕏 X</a>
            <a href="tel:+33954020567" className="block px-2.5 py-2.5 font-semibold">☎ 33 9 54 02 05 67</a>
            <a href="mailto:contact@xaviervignon.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/oZyYzqPlSTKXdmnehJU1vw_600x356.jpeg" alt="Rhône valley landscape near Xavier Vignon" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]"/>
          <Image src={storyImages[0].src} alt={storyImages[0].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Since 1998, Xavier Vignon shares its extensive knowledge of vine-growing, winemaking, blending, and wine-aging expertise with the next generation of winemakers to create truly unique wines.</p>
          <Image src={storyImages[1].src} alt={storyImages[1].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Established since 2005 in the core of the iconic southern Rhône Valley appellation of Châteauneuf-du-Pape, Maison Xavier Vignon shapes its own creations with boldness, authenticity, creativity and respect for the terroirs.</p>
          <Image src={storyImages[2].src} alt={storyImages[2].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">The winery embarked on winegrowing adventures within the stunning landscapes of the Dentelles de Montmirail. This growth led to the acquisition of a vast 35-hectare estate exploring the distinct terroirs of Ventoux and Beaumes de Venise.</p>
          <Image src={storyImages[3].src} alt={storyImages[3].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Now, having made their mark in over thirty countries, Xavier Vignon’s wines persist in enchanting aficionados with their distinctiveness, precision, and superior quality.</p>
          <Image src={storyImages[4].src} alt={storyImages[4].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <div className="space-y-1 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>Every bottle serves as an invitation to experience a unique perspective on wine, embodying a collective passion and an unwavering pursuit of perfection.</p><p>“This is how we share Our Idea of Wine.” X. Vignon</p></div>
          <Image src={storyImages[5].src} alt={storyImages[5].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
        </article>
      </div>
    </div>
  );
}
