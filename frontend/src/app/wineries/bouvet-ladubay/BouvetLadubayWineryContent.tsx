import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const base = 'https://images.vivino.com/misc/sponsorships/11476_bouvetladubay/';
const articles = [
  {
    src: `${base}11476_bouvetladubay_2_2560x1520.jpg`,
    alt: 'Etienne and Célestine Ladubay in the wine cellar',
    text: "The finesse, minerality, and distinctive floral aromas of its Bruts de Loire are typical of its signature blends which can be found within the Crémant de Loire and Saumur Brut appellations, as well as the historic grape varieties of the Loire Valley: Chenin Blanc and Chardonnay. Cabernet Franc is dedicated to its rosé wines.",
  },
  {
    src: `${base}11476_bouvetladubay_3_2560x1520.jpg`,
    alt: 'Bouvet Ladubay barrels in the cellar',
    text: 'Resulting from the collaboration with over 80 winegrowers committed to a sustainable viticulture, its cuvées are benefiting from the highest technology available in sparkling wine making in its new state of the art winery facility named “Bouvet Ladubay Full Metal” built in 2008.',
  },
  {
    src: `${base}11476_bouvetladubay_4_2560x1520.jpg`,
    alt: 'Bouvet Ladubay sparkling wine production facility',
    text: "Bouvet Ladubay's art of blending ensures the consistent quality of its regularly awarded vintages. A selection of still wines from the Loire Valley, Les Pépites de Bouvet Ladubay, also completes the collection.",
  },
  {
    src: `${base}11476_bouvetladubay_5_2560x1520.jpg`,
    alt: 'Bouvet Ladubay wine range',
    text: 'A pioneer in wine tourism for over 30 years, Bouvet-Ladubay opens the doors of its historic winery and its cellars dug into the white Tuffeau, the emblematic limestone of the Loire Valley, all year round.',
  },
  {
    src: `${base}11476_bouvetladubay_6_NEW_2560x1520.jpg`,
    alt: 'Visitors discovering Bouvet Ladubay’s historic cellars',
    text: 'The centuries-old cellars can be visited on foot or by vintage bike to discover the “méthode traditionnelle” sparkling wine-making process and the history of the House.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function BouvetLadubayWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/11476/logos/Rfg3AQArQKqVZiNbIriu6A.jpeg" alt="Bouvet Ladubay logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Bouvet Ladubay</h1><VerifiedBadge /><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>123</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.8</b></span><span className="hidden sm:inline">36,738 total ratings</span><span className="sm:hidden">36,738 ratings</span></div></div>
            <Link href="/search?q=Bouvet%20Ladubay" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Owned by" value="Bouvet-Ladubay" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.bouvet-ladubay.fr" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/bouvetladubay" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/BouvetLadubay" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">𝕏 X</a>
            <a href="tel:+33241838383" className="block px-2.5 py-2.5 font-semibold">☎ +33 2 41 83 83 83</a>
            <a href="mailto:contact@bouvet-ladubay.fr" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src={`${base}11476_bouvetladubay_1_2560x1520.jpg`} alt="Historic Bouvet Ladubay winery in Saumur" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">In 1851, Etienne Bouvet and Célestine Ladubay founded the house that bears their names. Thanks to Etienne Bouvet&apos;s talent, the company quickly became one of the leading producers of sparkling wines and from 1890 onwards was exporting them all over the world. Since 1932, the Monmousseau family is perpetuating the values of excellence of its founder.</p>
          {articles.map((article) => <div key={article.src} className="space-y-1.5"><Image src={article.src} alt={article.alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{article.text}</p></div>)}
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/Yl73zmhiQE-ptiMMxCyX3Q_600x356.jpeg" alt="Bouvet Ladubay sparkling wines" width={1280} height={760} unoptimized className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">For Patrice Monmousseau, “Nothing is more essential to the sparkling bubbles finesse than art and artists”, therefore, Bouvet Ladubay has been committed to the arts for decades, notably through its 19th century Petit Théâtre, its Contemporary Art Center, and numerous cultural activities. Over 100 renowned artists have taken over its 9 exhibition rooms and have been celebrating contemporary creation in all its diversity for 30 years.</p>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Discover the Bouvet Ladubay house through this <a className="font-semibold text-red-700 underline" href="https://www.youtube.com" target="_blank" rel="noreferrer">film</a>.</p>
        </article>
      </div>
    </div>
  );
}
