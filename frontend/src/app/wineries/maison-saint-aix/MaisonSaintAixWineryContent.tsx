import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const aix = 'https://images.vivino.com/misc/sponsorships/25239_aix/';
const saintAix = 'https://images.vivino.com/misc/sponsorships/25239_saintaix/';
const articles = [
  {
    src: `${aix}25239_aix_1_2560x1520.jpg`,
    alt: 'AIX Rosé bottles among the Maison Saint Aix vineyard rows',
    text: 'Nestled on the heights of Jouques, just north of Aix-en-Provence, Maison Saint Aix is where the authenticity of the terroir meets winemaking excellence. The estate is distinguished by its mineral-rich soils, Mediterranean climate, and 300 days of sunshine per year. At an altitude of 420 meters, one of the highest in the region, it provides the perfect conditions to cultivate Grenache, Syrah, and Cinsault, which make up our iconic cuvée, AIX Rosé.',
  },
  {
    src: `${saintAix}25239_saintaix_2025_2_2560x1520.jpg`,
    alt: 'Aerial view over the Provence countryside and vineyards',
    text: 'Our estate, with 75 hectares of vineyards, one of the largest in the region, is a true haven for Grenache vines, some of which are 50 to 60 years old, ensuring juices of exceptional quality. The constant work of replanting and respecting the terroir guarantees the longevity of our wines, maintaining great freshness and complexity in each vintage.',
  },
  {
    src: `${aix}25239_aix_3_2560x1520.jpg`,
    alt: 'Sunlit rows of vines at Maison Saint Aix',
    text: 'In addition to our iconic AIX Rosé, we are proud to present our Provence White, AIX Blanc (AOP Coteaux d’Aix-en-Provence). Elegant and fresh, AIX Blanc pairs perfectly with refined cuisine. Discover our premium IGP Méditerranée, Saint X, a refreshing rosé that expresses the richness of the Mediterranean terroir.',
  },
  {
    src: `${saintAix}25239_saintaix_2025_4_2560x1520.jpg`,
    alt: 'Freshly harvested dark grapes held at Maison Saint Aix',
    text: 'Last but not least, for a non-alcoholic rosé experience, BEAU VIVA offers a premium and refreshing alternative for those who want to celebrate life without compromise.',
  },
  {
    src: `${saintAix}25239_saintaix_2025_5_2560x1520.jpg`,
    alt: 'Golden grapes ripening on the vine',
    text: 'The wines of Maison Saint Aix can be found in carefully selected venues and fine wine specialists in over 50 countries, reflecting the international enthusiasm for our expertise. Each bottle embodies the Provençal art of living, ready to be shared and enjoyed around the world.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function MaisonSaintAixWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/25239/logos/uFe0bQ9nQnq5PLnnuInbjg.jpeg" alt="Maison Saint Aix logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Maison Saint Aix</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>4</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.0</b></span><span className="hidden sm:inline">31,609 total ratings</span><span className="sm:hidden">31,609 ratings</span></div></div>
            <Link href="/search?q=Maison%20Saint%20Aix" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Maison Saint Aix" icon={<span className="text-base">◉</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.aixrose.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/aixrose.official" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="mailto:info@maisonsaintaix.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/2u2FsFltTPK-UDZP_YVS4w_600x356.jpeg" alt="Maison Saint Aix AIX Rosé bottles in the vineyard" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Located in the heart of Provence, <a href="https://www.aixrose.com" className="font-semibold underline">Maison Saint Aix</a> produces fine wines, including AIX Rosé, our iconic cuvée. Experience the Provençal art of living through our wines, where terroir, sunshine, and passion come together in every bottle.</p>
          {articles.map((article) => <div key={article.src} className="space-y-1.5"><Image src={article.src} alt={article.alt} width={1280} height={760} unoptimized priority={article.src.endsWith('25239_aix_1_2560x1520.jpg')} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{article.text}</p></div>)}
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Join the AIX Family: <a href="https://www.instagram.com/aixrose.official" target="_blank" rel="noreferrer" className="font-semibold text-red-700 underline">@aixrose.official</a>.</p>
          <Image src="https://images.vivino.com/misc/sponsorships/25239_aix/25239_aix_6_2560x1520.jpg" alt="Maison Saint Aix gathering and tasting in Provence" width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
        </article>
      </div>
    </div>
  );
}
