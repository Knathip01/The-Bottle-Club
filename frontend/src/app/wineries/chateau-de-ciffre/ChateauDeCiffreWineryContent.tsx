import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/210220_Ciffre/';
const stories = [
  {
    src: `${storyBase}210220_Ciffre_2.jpg`,
    alt: 'A Château de Ciffre wine bottle resting on rocky soil',
    paragraphs: [
      'The vineyards meet three appellations—Faugères, Saint-Chinian and Languedoc—near Pic de la Coquillade. Dark schist gives Faugères wines a mineral, spicy freshness, while the limestone and rounded stones of Saint-Chinian bring fruit and generosity.',
      'The estate’s varied landscapes and soils are reflected in the wines, with each parcel bringing a distinct character, freshness and balance.',
    ],
  },
  {
    src: `${storyBase}210220_Ciffre_1.jpg`,
    alt: 'Vineyard rows across the Château de Ciffre hillsides',
    text: 'The vines grow on steep slopes surrounded by Mediterranean scrubland. Their elevation and cooling air currents temper the summer heat and help the grapes retain freshness.',
  },
  {
    src: `${storyBase}210220_Ciffre_3.jpg`,
    alt: 'A small historic tower among trees at the estate',
    text: 'The property’s history extends beyond winemaking. The site is thought to have once held a Roman villa, while two former mills—one by the stream and another higher on the estate—recall earlier uses of the landscape.',
  },
  {
    src: `${storyBase}210220_Ciffre_4.jpg`,
    alt: 'Two generations of the Lorgeril family in the winery',
    text: 'Today, Nicolas and Miren de Lorgeril continue the estate with their son Henri, who is gradually joining the family business. Their shared aim is to reveal each terroir with precision and make fresh, elegant wines that express the region’s diversity.',
  },
  {
    src: `${storyBase}210220_Ciffre_5.jpg`,
    alt: 'A bottle of Château de Ciffre wine presented among vines',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ChateauDeCiffreWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/210220/logos/0GmCAn2tQsKamiPozhc23Q.jpeg" alt="Château de Ciffre logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Château de Ciffre</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>7</b> Wines</span></div></div>
            <Link href="/search?q=Chateau%20de%20Ciffre" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Nicolas de Lorgeril" icon={<span className="text-base">♙</span>}/>
              <Row label="Owned by" value="Lorgeril" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://lorgeril.wine/domaine-chateau-de-ciffre/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/maisonlorgeril/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/LORGERIL" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11}/></a>
            <a href="tel:+33468726529" className="block px-2.5 py-2.5 font-semibold">+33 4 68 72 65 29</a>
            <a href="mailto:contact@lorgeril.com" className="block px-2.5 py-2.5 font-semibold">Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/pNrFZPIgRHK3p2CJzJEGag_2560x1520.jpeg" alt="Château de Ciffre vineyards in the Languedoc" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Château de Ciffre is one of Maison Lorgeril’s six family estates. The independent family business has been rooted in Languedoc for more than 400 years, among the untamed landscapes of the Haut-Languedoc foothills.</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.text && <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p>}{story.paragraphs?.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}</div>)}
        </article>
      </div>
    </div>
  );
}
