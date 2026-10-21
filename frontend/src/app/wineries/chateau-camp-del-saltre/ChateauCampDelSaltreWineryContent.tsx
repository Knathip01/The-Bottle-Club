import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Phone, Mail, Star } from 'lucide-react';

const storyBase = 'https://vivino.s3.amazonaws.com/misc/sponsorships/95487_ch%C3%A2teaucampdelsaltre/';
const intro = 'At the edge of Prayssac in the Lot, close to the Dordogne border, Château Camp del Saltre is a centuries-old château with space to welcome up to 60 guests. The family has produced wine here for generations.';
const stories = [
  {
    src: `${storyBase}95487_cha%CC%82teaucampdelsaltre_2.jpg`,
    alt: 'Vineyards surrounding Château Camp del Saltre in Cahors',
    text: 'The estate’s 24 hectares of vines stretch across a ridge and into the Prayssac valley, producing more than 120,000 litres each year. The range includes renowned Malbec, award-winning rosé and Chardonnay, introduced in 2022. Gérard Delbru, Julien Morand, Mylène Doux-Fantin and Patrick Banis guide the winemaking and quality.',
  },
  {
    src: `${storyBase}95487_cha%CC%82teaucampdelsaltre_3.jpg`,
    alt: 'Historic black and white photograph of the château’s winemaking family',
    text: 'The estate began centuries ago as Campagne de Satre. In 1860, the Delbru family established the winery that stands today and passed its winemaking knowledge from one generation to the next.',
  },
  {
    src: `${storyBase}95487_cha%CC%82teaucampdelsaltre_4.jpg`,
    alt: 'The current family team walking through the vines',
    text: 'Since 2022, family members Patrick Banis, Eddy van Heel and Jan Zantinge have brought a Dutch influence to the château. They work together to care for its heritage and continue its winemaking tradition.',
  },
  {
    src: `${storyBase}95487_cha%CC%82teaucampdelsaltre_5.jpg`,
    alt: 'A celebration evening at Château Camp del Saltre',
    text: 'Guests can stay at the château, host a wedding or enjoy a wine tasting among the vineyards. The estate offers a peaceful base for exploring the region and discovering its historic setting and wines.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function ChateauCampDelSaltreWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/95487/logos/9pQObz6ZSSa2TSoqf64m2A.jpeg" alt="Château Camp del Saltre logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Château Camp del Saltre</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>9</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.0</b></span><span className="hidden sm:inline">409 total ratings</span><span className="sm:hidden">409 ratings</span></div></div>
            <Link href="/search?q=Ch%C3%A2teau%20Camp%20del%20Saltre" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/cahors" className="hover:underline">Cahors</a>} icon={<Mountain size={17}/>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://chateaucampdelsaltre.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/chateaucampdelsaltre" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/chateaucampdelsaltre" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11}/></a>
            <a href="tel:+33749938146" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14}/>+33 7 49 93 81 46</a>
            <a href="mailto:wine@chateaucampdelsaltre.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14}/>Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/9Mq8WGJFQP-b-KhuR_x_5g_2560x1520.jpeg" alt="Aerial view of Château Camp del Saltre and its vineyards" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{intro}</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
        </article>
      </div>
    </div>
  );
}
