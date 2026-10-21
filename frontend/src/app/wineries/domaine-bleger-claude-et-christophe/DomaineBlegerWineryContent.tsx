import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Phone, Mail, Star } from 'lucide-react';

const storyBase = 'https://vivino.s3.amazonaws.com/misc/sponsorships/62334_Domaine_bleger/62334_Bleger_';
const opening = [
  'Our story is about family, our land and what we believe in.',
  'The Bléger family has grown grapes in Orschwiller, a small village beneath Haut-Koenigsbourg castle, since 1630. Across a few hectares and around thirty small plots, each season and terroir brings its own story. The family makes about 70,000 bottles a year, from dry whites and dessert wines to rosé, red and sparkling styles, all with an emphasis on honest, expressive wines.',
];
const stories = [
  {
    src: `${storyBase}1.jpg`,
    alt: 'The historic Domaine Bleger family winery in Alsace',
    heading: 'Organic is part of our roots',
    paragraphs: [
      'The estate has cared for its vines organically since the beginning. Earlier generations worked with the soil and nature, and the family has kept that approach through changing fashions and new solutions.',
      'For the Blégers, organic farming is simply part of the family’s identity.',
    ],
  },
  {
    src: `${storyBase}2.jpg`,
    alt: 'An archival black and white photograph of the Bléger family and vineyard',
    heading: 'Good wine starts with good grapes',
    paragraphs: [
      'The family tends the soil like a garden: aerating it, avoiding stress and competition, and encouraging the vines’ natural resilience.',
      'Time outdoors is spent observing and understanding the vineyard, then guiding it without forcing it. This patient work helps give the wines their character.',
    ],
  },
  {
    src: `${storyBase}3.jpg`,
    alt: 'The Bléger family working their vineyard with a small tractor',
    heading: 'In the cellar, the same care continues',
    paragraphs: [
      'The grapes are hand-harvested and gently pressed to preserve their complexity. Fermentation takes place naturally with indigenous yeasts from the terroir.',
      'The wines are given several months to rest and mature before bottling.',
    ],
  },
  {
    src: `${storyBase}4.jpg`,
    alt: 'Oak casks in the Domaine Bleger cellar',
    heading: 'Discover our wines',
    paragraphs: [
      'Today the family carries its experience forward while looking to the future. They welcome wine enthusiasts and curious visitors to share their wines, their philosophy and the corner of Alsace they call home.',
    ],
  },
  {
    src: `${storyBase}5.jpg`,
    alt: 'Members of the Bléger family among the vines',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function DomaineBlegerWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/62334/logos/kvaF-bL2Sbex3XGFrbogBA.jpeg" alt="Domaine Bleger Claude et Christophe logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Domaine Bleger Claude et Christophe</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>38</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.0</b></span><span className="hidden sm:inline">1,232 total ratings</span><span className="sm:hidden">1,232 ratings</span></div></div>
            <Link href="/search?q=Domaine%20Bleger%20Claude%20et%20Christophe" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/alsace" className="hover:underline">Alsace</a>} icon={<Mountain size={17}/>}/>
              <Row label="Winemaker" value="Christophe BLEGER" icon={<span className="text-base">♙</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.bleger.fr/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/bleger.fr" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11}/></a>
            <a href="tel:+33388923256" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14}/>+33 3 88 92 32 56</a>
            <a href="mailto:contact@bleger.fr" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14}/>Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/0oDVft1YQBOmHlp9G_qcPg_2560x1520.jpeg" alt="A tractor working between the Domaine Bleger vineyard rows" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          {opening.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.heading && <h2 className="px-0.5 pt-1 text-[11px] font-bold text-[#242424] sm:text-sm">{story.heading}</h2>}{story.paragraphs?.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}</div>)}
        </article>
      </div>
    </div>
  );
}
