import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain } from 'lucide-react';

const storyImages = [
  { src: 'https://images.vivino.com/misc/sponsorships/37080_LaPerriere/37080_LaPerriere_1_2560x1520.jpg', alt: 'Domaine de la Perrière in Sancerre' },
  { src: 'https://images.vivino.com/misc/sponsorships/37080_LaPerriere/37080_LaPerriere_2_2560x1520.jpg', alt: 'The La Perrière team in the vineyard' },
  { src: 'https://images.vivino.com/misc/sponsorships/37080_LaPerriere/37080_LaPerriere_3_2560x1520.jpg', alt: 'Hand sorting grapes during harvest' },
  { src: 'https://images.vivino.com/misc/sponsorships/37080_LaPerriere/37080_LaPerriere_4_2560x1520.jpg', alt: 'Oak barrels in the La Perrière wine cellar' },
  { src: 'https://images.vivino.com/misc/sponsorships/37080_LaPerriere/37080_LaPerriere_5_2560x1520.jpg', alt: 'Wine cellar at Domaine de la Perrière' },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function LaPerriereWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/37080/logos/cF1774qNSoGosZJPJph7Zw.jpeg" alt="La Perrière logo" width={56} height={56} unoptimized/></div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">La Perrière</h1>
              <VerifiedBadge/>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>34</b> Wines</span></div>
            </div>
            <Link href="/search?q=La+Perriere" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Owned by" value="Saget la Perriere" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://domainelaperriere.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="tel:0248541693" className="block px-2.5 py-2.5 font-semibold">☎ 0248541693</a>
            <a href="mailto:info@domainelaperriere.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/T8jC5VtNSyqrIXLTwG_KrA_600x356.jpeg" alt="Aerial view of La Perrière vineyards in Sancerre" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]"/>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">The jewel in the Saget La Perrière wine company’s crown, La Perrière’s vineyards are located in Verdigny-en-Sancerre, extending over 5 different districts and producing prestigious Sancerre-appellation wines. La Perrière possesses a unique, single 10-hectare block of vineyards planted on flint soils, known to be the most suitable for the production of fine Sauvignon Blanc wines.</p>
          <Image src={storyImages[0].src} alt={storyImages[0].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">The Vineyards</h2>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>The 43 hectares of La Perrière are heavily dominated by Sauvignon Blanc, planted over roughly 38 hectares, compared to only 5 hectares of Pinot Noir. Only Sauvignon Blanc is permitted for the production of Sancerre Blanc wines, while Pinot Noir can be used for either reds or rosés.</p><p>All the vineyards are sustainably managed using soil tillage and grass cover. The landscape of the Sancerre wine region and its rolling hills provide very good exposure, which helps the grapes to attain exceptional maturity.</p></div>
          <Image src={storyImages[1].src} alt={storyImages[1].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>We especially want the Pinot Noir grapes to mature well, so meticulous work is carried out each year to achieve this. De-budding, leaf thinning and green harvesting are commonly carried out to enable the grapes to attain better concentration.</p><p>Although flint soils produce pure, well-structured white wines, Pinot Noir grapes are more expressive on clay-limestone soils, which produce soft and generous wines.</p></div>
          <Image src={storyImages[2].src} alt={storyImages[2].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">Vinification</h2>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>Great care and attention are taken during harvest, with 50% of the Sauvignon Blanc grapes and 100% of the Pinot Noir grapes picked by hand. This first sorting carried out in the vineyard ensures the less healthy grapes are rejected and only the grapes that have reached the desired maturity level are retained.</p><p>The Sauvignon Blanc grapes are then taken to the cellars to undergo a short, cold, pre-fermentation maceration before being pressed and fermented. The aging on fine lees lasts for 3–4 months before the wines are bottled in early spring. However some of La Perrière’s wines are aged on the lees for longer or benefit from partial barrel vinification to ensure the wines have good structure and aging potential.</p></div>
          <Image src={storyImages[3].src} alt={storyImages[3].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>The Pinot Noir grapes are sorted a second time upon arrival at the winery before going into vats, which are specially adapted for the “extraction” of this delicate grape variety. After spending 3 weeks in vat, the wines are aged in barrels for 6 months before being bottled.</p><p>The rosés are made by 50% direct pressing and 50% bleeding. After fermentation, the wines are aged on the lees for a few months before early bottling.</p></div>
          <Image src={storyImages[4].src} alt={storyImages[4].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
        </article>
      </div>
    </div>
  );
}
