import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/21915_abele1757/21915_abele1757_';
const stories = [
  {
    src: `${storyBase}1_2560x1520.jpg`,
    alt: 'Abelé 1757 historic Champagne house and gate',
    text: 'Since its founding in the 18th century, Abelé 1757 has made time part of its craft. Each year’s harvest is joined with reserve wines in a long pursuit of excellence, with technical progress supporting the house’s Champagne-making for more than 250 years.',
  },
  {
    src: `${storyBase}2_2560x1520.jpg`,
    alt: 'Golden chalk cellar passage beneath the Champagne house',
    text: 'Twenty metres beneath the surface, vaulted cellars cut into the chalk provide steady darkness, temperature, and humidity. In these conditions the bottles can mature slowly, developing fine, delicate bubbles.',
  },
  {
    src: `${storyBase}3_2560x1520.jpg`,
    alt: 'Champagne vines across the countryside',
    text: 'Creating Champagne begins with selecting terroirs. Abelé 1757 chooses promising sites and works closely with a small group of committed winegrowers who use nature-conscious vineyard practices to deliver excellent fruit.',
  },
  {
    src: `${storyBase}4_2560x1520.jpg`,
    alt: 'Abelé Champagne served with a meal',
    text: 'The cuvées bring together a broad palette of aromas: citrus and jasmine from the Côte des Blancs, pear and spice from the Montagne de Reims, lime blossom and peony from the Marne Valley, and strawberry from Les Riceys. Each vintage balances fruit and floral notes with power and finesse.',
  },
  {
    src: `${storyBase}5_2560x1520.jpg`,
    alt: 'Abelé 1757 cellar master among the Champagne bottles',
    text: 'The house values the freedom to imagine and create new wines while maintaining high standards. Cellar master Etienne Eteneau oversees the ageing and future of Abelé 1757’s bottles.',
  },
  {
    src: `${storyBase}6_2560x1520.jpg`,
    alt: 'Abelé 1757 Champagne and glasses in the cellar',
    text: 'As Champagne’s fifth-oldest house, Abelé 1757 carries forward a history of innovation and quality. Its legacy includes advances such as the riddling table and ice disgorgement, and those same values continue to guide the production of refined wines today.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function Abele1757WineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/21915/logos/RJPgf8ZRRhmK0SNyxD1DXA.jpeg" alt="Abelé 1757 logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Abelé 1757</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>19</b> Wines</span></div></div>
            <Link href="/search?q=Abele%201757" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Henri Abelé" icon={<span className="text-base">◉</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.abele1757.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="tel:+33326877980" className="block px-2.5 py-2.5 font-semibold">☎ +33 03 26 87 79 80</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/MS9QrHFjTGW6AGGCrElCZA_2560x1520.jpeg" alt="Historic Abelé 1757 Champagne cellar" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
        </article>
      </div>
    </div>
  );
}
