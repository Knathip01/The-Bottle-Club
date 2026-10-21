import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyImages = [
  { src: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1337_krug/1337_krug_2b_2560x1520.jpg', alt: 'A hand selecting a grape in a Champagne vineyard' },
  { src: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1337_krug/1337_krug_3new_2560x1520.jpg', alt: 'The Krug family and team' },
  { src: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1337_krug/1337_krug_4new_2560x1520.jpg', alt: 'Krug Champagne with ingredients in the kitchen' },
  { src: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1337_krug/1337_krug_5b_2560x1520.jpg', alt: 'Krug Champagne bottle with music speakers' },
  { src: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1337_krug/1337_krug_6b_2560x1520.jpg', alt: 'Krug iD on the back label of a bottle' },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function KrugWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/1337/logos/aH1XjYgbTvKbqdnO6WpmPw.png" alt="Krug logo" width={56} height={56} unoptimized/></div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Krug</h1>
              <VerifiedBadge/>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>7</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.6</b></span><span className="hidden sm:inline">72,670 total ratings</span><span className="sm:hidden">72,670 ratings</span></div>
            </div>
            <Link href="/search?q=Krug" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Owned by" value="Moët Hennessy" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.krug.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/krugchampagne" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/krug" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="https://x.com/krug" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">𝕏 X</a>
            <a href="tel:+33326844420" className="block px-2.5 py-2.5 font-semibold">☎ 33 3 26 84 44 20</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/4GrPAm45T0S92wD1E22yFA_600x356.jpeg" alt="Historic Krug Champagne house in Reims" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]"/>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Founded in Reims by Joseph Krug, a visionary and nonconformist man guided by a deep and rigorous philosophy, the House of Krug has always sought to transcend the traditional notion of vintage. His dream was to craft the best possible Champagne every year, regardless of climatic conditions.</p>
          <Image src={storyImages[0].src} alt={storyImages[0].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">To bring his vision to life, Joseph Krug paid meticulous attention to the unique character of each individual plot, honoring the individuality of every terroir and its wines. He also established a vast library of reserve wines from different years, enabling the creation of Krug Grande Cuvée each year — the fullest expression of his dream. Today, six generations of the Krug family continue to uphold this same passion, craftsmanship, and uncompromising pursuit of excellence.</p>
          <Image src={storyImages[1].src} alt={storyImages[1].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">To craft each new Édition of Krug Grande Cuvée, the Tasting Committee, led by Cellar Master Julie Cavil, meticulously examines around 250 wines from the year’s harvest, along with 150 reserve wines drawn from over 10 different vintages. Each of these 400 wines expresses the unique essence of a specific plot, allowing for the creation of a generous and harmonious composition.</p>
          <Image src={storyImages[2].src} alt={storyImages[2].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <div className="space-y-1 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>At the heart of Krug’s craftsmanship lies Individuality — the art of treating each plot of vines, through the wine it yields, as a single, unique ingredient in the creation of Krug Champagne. Every year, the House of Krug celebrates this philosophy by paying tribute to a humble Single Ingredient. In 2025, Krug shines a light on a new ingredient: the carrot — a multifaceted root vegetable.</p><p>This choice is part of the Krug in the Kitchen initiative, which brings together Krug Ambassade Chefs from around the globe to explore the creative potential of this ingredient, offering a fresh culinary perspective to pair with Krug Grande Cuvée Éditions and Krug Rosé.</p></div>
          <a href="https://www.krug.com/en-int" target="_blank" rel="noreferrer" className="block px-0.5 py-1 text-[10px] font-semibold text-[#ba1628] underline sm:text-[13px]">Discover Krug in the Kitchen</a>
          <Image src={storyImages[3].src} alt={storyImages[3].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Maison Krug has long understood the influence of sound on taste perception, applying the notion of food pairing to music. To enhance the experience of its champagnes, today Krug presents music pairings crafted by a worldwide community of artists, as it continues to foster creative encounters.</p>
          <Image src={storyImages[4].src} alt={storyImages[4].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 pb-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Discover the story of your bottle with the Krug iD — a six-digit code engraved on the back label of every bottle. By entering it on Krug.com or scanning it via the Krug app, you can explore the unique characteristics of your Champagne: its blend, insights from Cellar Master Julie Cavil, food pairing inspirations, musical suggestions, and other exclusive anecdotes linked to your Krug.</p>
        </article>
      </div>
    </div>
  );
}
