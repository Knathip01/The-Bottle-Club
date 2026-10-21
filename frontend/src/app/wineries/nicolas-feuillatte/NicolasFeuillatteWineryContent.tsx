import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyImages = [
  { src: 'https://images.vivino.com/misc/sponsorships/7991_nicolasfeuillatte_2024/7991_nicolasfeuillatte_2024_1_2560x1520.jpg', alt: 'Champagne grapes in the vineyard' },
  { src: 'https://images.vivino.com/misc/sponsorships/7991_nicolasfeuillatte_2024/7991_nicolasfeuillatte_2024_2_2560x1520.jpg', alt: 'Harvesting grapes for Nicolas Feuillatte Champagne' },
  { src: 'https://images.vivino.com/misc/sponsorships/7991_nicolasfeuillatte_2024/7991_nicolasfeuillatte_2024_3_2560x1520.jpg', alt: 'Cellar master Guillaume Roffiaen in the vineyard' },
  { src: 'https://images.vivino.com/misc/sponsorships/7991_nicolasfeuillatte_2024/7991_nicolasfeuillatte_2024_4_2560x1520.jpg', alt: 'Nicolas Feuillatte Champagne bottle and glasses' },
  { src: 'https://images.vivino.com/misc/sponsorships/7991_nicolasfeuillatte_2024/7991_nicolasfeuillatte_2024_5_2560x1520.jpg', alt: 'Palmes d’Or Champagne bottle' },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function NicolasFeuillatteWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/7991/logos/nts7_EgDQLS0y6dwaneENQ.jpeg" alt="Nicolas Feuillatte logo" width={56} height={56} unoptimized /></div>
            <div>
              <h1 className="text-xs font-bold leading-tight text-[#1e1e1e] sm:text-xl">Nicolas Feuillatte</h1>
              <VerifiedBadge />
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>59</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.9</b></span><span className="hidden sm:inline">102,858 total ratings</span><span className="sm:hidden">102,858 ratings</span></div>
            </div>
            <Link href="/search?q=Nicolas+Feuillatte" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/champagne" className="hover:underline">Champagne</a>} icon={<Mountain size={17}/>}/>
              <Row label="Winemaker" value="Champagne Nicolas Feuillatte" icon={<span className="text-base">◉</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.nicolas-feuillatte.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/nicolasfeuillatte" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/feuillatte.int" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="https://x.com/feuillatte" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">𝕏 X</a>
            <a href="tel:+33326595550" className="block px-2.5 py-2.5 font-semibold">☎ 33 326 595550</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/-0qUTXbXQZWhpeiKVDh7PQ_600x356.jpeg" alt="Champagne Nicolas Feuillatte cellar" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]"/>
          <div className="space-y-2 px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">
            <p>Since grapes are supplied by more than 5,000 growers across the entire Champagne region, Nicolas Feuillatte has access to a creative palette of exceptional quality.</p>
            <p>To assemble the blends, a judicious selection of crus is made from 11 of the 17 Grands Crus, 26 of the 42 Premiers Crus and 145 of the 260 remaining Champagne Crus.</p>
            <p>The Premiers Crus are subject to 100% dedicated cuvée: Réserve Exclusive Premier Cru Extra Brut is our Cellar Master’s latest creation.</p>
          </div>
          <Image src={storyImages[0].src} alt={storyImages[0].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">All the elements align to create perfectly balanced Champagnes reflecting their origin. It all begins with perfectly ripe grapes vinified separately by cru, by different plot, and by grape varietal, which in years to come will form the cuvées within the range.</p>
          <Image src={storyImages[1].src} alt={storyImages[1].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Like an artist in front of a blank canvas, Guillaume Roffiaen the cellar master is faced with a vast spectrum of textures and aromas, offering scores of potential combinations, which epitomise the beauty and sheer wealth of the Champagne region.</p>
          <Image src={storyImages[2].src} alt={storyImages[2].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Since quality requires time and cannot be hurried, the amount of time each Nicolas Feuillatte Champagne quietly rests in the cellars before its release far exceeds the legal minimum: at least three years, and as many as ten years for the most prestigious cuvées such as Palmes d’Or, which is enriched by lengthy contact with the lees.</p>
          <Image src={storyImages[3].src} alt={storyImages[3].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <Image src={storyImages[4].src} alt={storyImages[4].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <a href="https://nicolas-feuillatte.tickeasy.com" target="_blank" rel="noreferrer" className="block px-0.5 pb-1 text-[10px] font-semibold text-[#ba1628] underline sm:text-[13px]">Learn more about Champagne Nicolas Feuillatte, come and visit us near Epernay</a>
        </article>
      </div>
    </div>
  );
}
