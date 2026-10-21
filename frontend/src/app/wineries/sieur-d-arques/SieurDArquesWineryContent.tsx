import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyImages = [
  { src: 'https://images.vivino.com/misc/sponsorships/3471_SieurdArques/3471_SieurdArques_1.jpg', alt: "Sieur d'Arques winery cellar and tasting room" },
  { src: 'https://images.vivino.com/misc/sponsorships/3471_SieurdArques/3471_SieurdArques_2.jpg', alt: 'Limoux valley and surrounding vineyards' },
  { src: 'https://images.vivino.com/misc/sponsorships/3471_SieurdArques/3471_SieurdArques_3.jpg', alt: "Sparkling wine at Sieur d'Arques" },
  { src: 'https://images.vivino.com/misc/sponsorships/3471_SieurdArques/3471_SieurdArques_4.jpg', alt: 'Barrels in the Sieur d’Arques cellar' },
  { src: 'https://images.vivino.com/misc/sponsorships/3471_SieurdArques/3471_SieurdArques_5.jpg', alt: "Aerial view of Sieur d'Arques vineyard" },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function SieurDArquesWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/3471/logos/9f9pOmeJTuW33Uujde0lyg.jpeg" alt="Sieur d'Arques logo" width={56} height={56} unoptimized/></div>
            <div>
              <h1 className="text-xs font-bold leading-tight text-[#1e1e1e] sm:text-xl">Sieur d&apos;Arques</h1>
              <VerifiedBadge/>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>347</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.8</b></span><span className="hidden sm:inline">72,388 total ratings</span><span className="sm:hidden">72,388 ratings</span></div>
            </div>
            <Link href="/search?q=Sieur+d%27Arques" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/languedoc" className="hover:underline">Languedoc</a>} icon={<Mountain size={17}/>}/>
              <Row label="Winemaker" value="Aimery-Sieur D`Arques" icon={<span className="text-base">◉</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.sieurdarques.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/sieurdarques" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/sieur.darques" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="https://x.com/SieurdArques" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">𝕏 X</a>
            <a href="tel:+33468746300" className="block px-2.5 py-2.5 font-semibold">☎ 33 4 68 74 63 00</a>
            <a href="mailto:barc@sieurdarques.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/ZaSytD3aRFS-e7Ksc9yMfQ_600x356.jpeg" alt="Limoux landscape and Pyrenees" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]"/>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">In 1946, families of winegrowers joined to create Sieur d’Arques, a unique cooperative. Located in the South of France, in the heart of the Languedoc on the foothills of the Pyrenees, our region, Limoux, is renowned as the birthplace of sparkling wine since the 16th century. Since the beginning, we seamlessly blend tradition and innovation to craft exceptional wines that honor our terroir.</p>
          <Image src={storyImages[0].src} alt={storyImages[0].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Today, Sieur d’Arques is one of the leading producers of traditional sparkling wines in France, ageing over 10 million bottles of Blanquette de Limoux and Crémant de Limoux. Our brands ensure that celebrations around the world are marked by quality and distinction.</p>
          <Image src={storyImages[1].src} alt={storyImages[1].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Choosing Sieur d&apos;Arques means embracing unparalleled expertise, a unique terroir, and a legacy of passion and authenticity, brought to life in every bottle.</p>
          <Image src={storyImages[2].src} alt={storyImages[2].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>The Cooperative is certified for its quality management system. All is formally in place for complete traceability from the vine to the bottle. Wine security and hygiene are based on 2 certifications, renewed annually:</p><ul className="list-disc space-y-1 pl-5"><li>IFS (International Food Standard)</li><li>BRC (British Retail Consortium Global Food Standard).</li></ul><p>An R&amp;D active unit which monitors progress and innovation at all stages of the vineyard and within the company.</p><p>At the same time, Sieur d’Arques is continuing its commitment to eco-friendly viticultural practices, actively contributing to sustainable development by preserving natural resources and promoting biodiversity.</p></div>
          <Image src={storyImages[3].src} alt={storyImages[3].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>96% of our vineyard obtained the HVE certification in 2024.</p><p>The objective of this HVE (High Environmental Value) is to respect biodiversity (insects, trees, hedgerows, flowers, etc.), reduce the use of phytosanitary products, optimize soil and vine fertilisation, manage waste, to protect the health and safety of our winegrowers, our employees and consumers.</p><p>All our wines are vegan friendly, and we also are one of the very few wineries to establish a 0 CMR policy in the vineyard, meaning we completely avoid the use of substances classified as Carcinogenic, Mutagenic, or Reprotoxic, ensuring safer practices for both workers and the environment.</p></div>
          <Image src={storyImages[4].src} alt={storyImages[4].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
        </article>
      </div>
    </div>
  );
}
