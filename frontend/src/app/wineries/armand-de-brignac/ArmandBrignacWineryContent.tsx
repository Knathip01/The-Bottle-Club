import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/20691_Armand/20691_Armand_';
const stories = [
  {
    src: `${storyBase}1b_2560x1520.jpg`,
    alt: 'Champagne vineyard viewed through the vines',
    text: 'A small team of 18 skilled people takes care of every bottle, from pressing the grapes to its departure from the cellar. The fruit is picked by hand, and each bottle is finished and labelled individually, with careful attention at every stage.',
  },
  {
    src: `${storyBase}2b_2560x1520.jpg`,
    alt: 'A horse working in the Champagne vineyard rows',
    text: 'The house is based in the Montagne de Reims and farms 33 hectares across celebrated Champagne villages including Rilly-la-Montagne, Chigny-les-Roses, and Ludes. Each harvest, the team selects parcels for the character their fruit has developed that year.',
  },
  {
    src: `${storyBase}3b_2560x1520.jpg`,
    alt: 'Rows of vines in the Champagne countryside',
    text: 'Armand de Brignac uses only the freshest first pressing for its cuvées. Careful selection preserves vivid fruit, a soft texture, and balanced acidity. Its signature blend unites wines from three different vintages, bringing their qualities together while preserving a consistent house style.',
  },
  {
    src: `${storyBase}4_2560x1520.jpg`,
    alt: 'A pewter label being finished by hand on a Champagne bottle',
    text: 'Each bottle is covered in metal, hand-fitted with a French pewter label, and polished. The detailed finishing process is deliberately small-scale, so every bottle has its own individual character.',
  },
  {
    src: `${storyBase}5b_2560x1520.jpeg`,
    alt: 'Large-format Champagne bottles ageing in a golden cellar',
    text: 'The collection includes a wide range of large-format bottles, from 1.5-litre magnums to the rare 30-litre Midas, produced by special order.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ArmandBrignacWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/20691/logos/ry4X2KDxQCmHFRdjZTs--Q.jpeg" alt="Armand de Brignac logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Armand de Brignac</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>6</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.4</b></span><span className="hidden sm:inline">7,233 total ratings</span><span className="sm:hidden">7,233 ratings</span></div></div>
            <Link href="/search?q=Armand%20de%20Brignac" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/champagne" className="hover:underline">Champagne</a>} icon={<Mountain size={17}/>}/>
              <Row label="Winemaker" value="Armand de Brignac" icon={<span className="text-base">◉</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.armanddebrignac.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/armanddebrignac" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>◎ Instagram</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/armanddebrignac" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>f Facebook</span><ExternalLink size={11}/></a>
            <a href="https://x.com/armanddebrignac" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">𝕏 X</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/6-EzJAwvRfCgD1skf-OtTQ_2560x1520.jpeg" alt="Armand de Brignac Champagne bottles ageing in the cellar" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Armand de Brignac creates prestige Champagne cuvées focused on exceptional quality, craftsmanship, and luxury. The house is co-owned by Shawn “Jay-Z” Carter and Moët Hennessy.</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
        </article>
      </div>
    </div>
  );
}
