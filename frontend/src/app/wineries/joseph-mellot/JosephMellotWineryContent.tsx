import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function JosephMellotWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/12640/logos/PVCiQdMvQNet91wl-YEpGA.jpeg" alt="Joseph Mellot logo" width={56} height={56} unoptimized/></div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Joseph Mellot</h1>
              <VerifiedBadge/>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>75</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.9</b></span><span className="hidden sm:inline">37,705 total ratings</span><span className="sm:hidden">37,705 ratings</span></div>
            </div>
            <Link href="/search?q=Joseph+Mellot" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/loire-valley" className="hover:underline">Loire Valley</a>} icon={<Mountain size={17}/>}/>
              <Row label="Owned by" value="Joseph Mellot" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.josephmellot.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/josephmellot" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/JosephMellot" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="tel:+33248785454" className="block px-2.5 py-2.5 font-semibold">☎ +33(0)248 785 454</a>
            <a href="mailto:josephmellot@josephmellot.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="/images/wineries/joseph-mellot/cover.jpg" alt="Sancerre village surrounded by Joseph Mellot vineyards" width={189} height={76} priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]"/>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">With generations of expertise and craftsmanship, the Joseph Mellot family estate has become a leading specialist in Loire-Centre’s finest wines.</p>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>At the helm of the Maison Joseph Mellot since 2005, Catherine Corbeau-Mellot has passionately continued the work of her husband, Alexandre. The winery is deeply committed to its core values of quality, eco-responsibility, sharing, and passing on knowledge.</p><p>The Joseph Mellot Estate produces wines across all 8 controlled origin names of the Centre-Loire region: Sancerre, Menetou-Salon, Pouilly-Fumé, Pouilly-sur-Loire, Quincy, Reuilly, Coteaux du Giennois, Châteaumeillant, and recently Touraine-Chenonceaux. Now joined by her two sons, Adrien and Armand, they are continuing the family tradition.</p></div>
          <Image src="/images/wineries/joseph-mellot/family-vineyard.jpg" alt="Catherine Corbeau-Mellot with her sons in the vineyard" width={177} height={106} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[9px] leading-snug text-[#242424] sm:text-[11px]">The Joseph Mellot family continues its tradition across the Centre-Loire appellations.</p>
          <Image src="/images/wineries/joseph-mellot/barrel-cellar.jpg" alt="Oak casks in the Joseph Mellot family cellar" width={179} height={105} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>Rigorous winemaking respects the various regions. Particular attention is paid to the selection of plots and the monitoring of ripeness, making it possible to obtain grapes of optimal quality for each vintage.</p><p>Each wine benefits from tailor-made aging, specifically adapted to its characteristics: in vats on fine lees, in oak barrels from regional forests and made by local cooper artisans. The “Prestige” white vintages are vinified and aged in the 12th-century family cellar in the heart of Sancerre. The red vintages are also aged in oak barrels.</p></div>
          <Image src="/images/wineries/joseph-mellot/family-cellar.jpg" alt="Catherine Corbeau-Mellot and her sons in the cellar" width={177} height={107} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[9px] leading-snug text-[#242424] sm:text-[11px]">Catherine Corbeau-Mellot and her sons carry the family tradition forward.</p>
          <Image src="/images/wineries/joseph-mellot/vineyard.jpg" alt="Rows of Sauvignon Blanc vines in Sancerre" width={178} height={106} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 pb-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Very committed to respecting the environment, Maison Joseph Mellot works for sustainable viticulture with respect for the land and biodiversity in order to pass on unspoiled nature for future generations. All its vineyards are operated using sustainable agriculture, certified High Environmental Value (HVE), and part of them are certified Organic Agriculture (AB).</p>
        </article>
      </div>
    </div>
  );
}
