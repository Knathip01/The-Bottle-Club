import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/12679_Joblot/12679_Joblot_';
const stories = [
  {
    src: `${storyBase}1.jpg`,
    alt: 'Vineyards of Domaine Joblot in the Givry hills',
    text: 'Domaine Joblot works 15 hectares in the heart of the Givry appellation. Founded in 1946 by Charles Joblot, the estate has helped shape the region with pure, poised wines that balance concentration and minerality, bright fruit, and a long finish. Enjoyable young, they also develop beautifully with age.',
  },
  {
    src: `${storyBase}2.jpg`,
    alt: 'Oak barrels used to mature Domaine Joblot wines',
    text: 'The domaine aims to express its fruit naturally at every stage. Vineyard care avoids synthetic products, encourages permanent grass cover, and keeps yields low. Native yeasts and gentle sulphiting support fermentation, while the team chooses maturation vessels to suit each vintage without masking the fruit.',
  },
  {
    src: `${storyBase}3.jpg`,
    alt: 'The varied soil and stones of the Givry vineyard',
    text: 'People and nature guide the estate’s decisions. Joblot continues to refine its practices, encourage biodiversity with hedgerows, and return vine prunings to the soil. The team is also exploring agroecology, agroforestry, planting density, and more considered packaging.',
  },
  {
    src: `${storyBase}4.jpg`,
    alt: 'The Domaine Joblot team working in the vineyard',
    text: 'Research and exchange with other growers help the domaine respond to today’s challenges and prepare for the future. At Joblot, people give life to the estate: shared learning, training, and a collaborative team culture make room for everyone to grow and contribute.',
  },
  {
    src: `${storyBase}5.jpg`,
    alt: 'The Domaine Joblot team tasting wine together in the cellar',
    text: 'Beyond certifications, Domaine Joblot values genuine connections and local collaboration. Its approach brings people together and keeps the work responsible, practical, and mindful of the living world around the estate.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function DomaineJoblotWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/12679/logos/pvkpWMfSTc-ctXTKcbUTNw.jpeg" alt="Domaine Joblot logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Domaine Joblot</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>15</b> Wines</span></div></div>
            <Link href="/search?q=Domaine%20Joblot" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Hélène Sarkis" icon={<span className="text-base">◉</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.domaine-joblot.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/domainejoblot/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>◎ Instagram</span><ExternalLink size={11}/></a>
            <a href="tel:+33385443077" className="block px-2.5 py-2.5 font-semibold">☎ +33 3 85 44 30 77</a>
            <a href="mailto:contact@domaine-joblot.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/P2ugRfLZSxWi6bJo-xkokg_2560x1520.jpeg" alt="Domaine Joblot vineyards in Givry" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Domaine Joblot covers 15 hectares in the heart of Givry. Founded in 1946 by Charles Joblot, the estate has become one of the appellation’s leading voices, making pure, finely balanced wines with vivid fruit, minerality, and the structure to age gracefully.</p>
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
        </article>
      </div>
    </div>
  );
}
