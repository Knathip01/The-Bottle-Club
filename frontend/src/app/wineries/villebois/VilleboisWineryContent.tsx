import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/204832_jdevillebois/204832_jdevillebois_';
const stories = [
  {
    src: `${storyBase}1_2560x1520.jpg`,
    alt: 'Winemakers and guests sharing lunch among the vineyards',
    heading: 'Touraine as an Art of life, the Loire as a territory',
    paragraphs: [
      'This unique adventure began in Touraine, in the heart of the Loire Valley, between Chambord, Chenonceaux and Saint-Aignan-sur-Cher. Fascinated by the Medieval period, Joost de Villebois, aristocrat and a direct descendant of knights from the village of Villebois-Lavalette where the original family castle still stands proud in the foothills of the Périgord, Gironde and Charente, chose the Loire Valley to pursue his viticutural dreams.',
    ],
  },
  {
    src: `${storyBase}2_1520x2560.jpg`,
    alt: 'Villebois Sauvignon Blanc with Loire Valley cheese',
    heading: 'Sauvignon Blanc as a battle horse!',
    paragraphs: [
      "The grape variety originally from Loire, has conquered many new lands becoming the second most popular white grape variety in the world! It is on the banks of the Loire that it produces its most subtle nectars. Since 1936, many Loire appellations have adopted it as their favourite grape variety. As Joost de Villebois's “Choix de Coeur” he immediately understood its full potential. He dedicates himself daily to the task of ensuring it reaches the tables of wine lovers the world over.",
    ],
  },
  {
    src: `${storyBase}3_2560x1520.jpg`,
    alt: 'Two Villebois winemakers discussing a glass of wine',
    heading: 'Different Styles, a unified spirit!',
    paragraphs: [
      'The Loire as the union, Sauvignon Blanc as a common point. From his base in the heart of Touraine, J. de Villebois has gradually moved eastwards up the Loire and its appellations to the borders of Berry and Burgundy. As a man of the earth he loves contact with his vineyards and terroirs. A fine technician, he brings his magic touch to the vineyards he chooses, to create the wine of his passion. Demanding of himself, his vintages must first seduce him before they can join his family.',
      'His creations are driven by his passion and his desire to discover. Place yourself in his generous care and let him guide you on his astonishing journey to discover the terroirs and their subtleties.',
    ],
  },
  {
    src: `${storyBase}4_2560x1520.jpg`,
    alt: 'A Villebois winemaker tending vines at harvest',
    heading: 'One family, one team!',
    paragraphs: [
      'The best teamwork comes from (wo)men who are working independently toward one goal in unison. As he travels, preaches, seduces,… he patiently builds his team of technicians, oenologists, winegrowers, artists... who all work in union to become the specialist of Sauvignon Blanc in the Loire. Each member joins the family and contributes their unique set of skills & talents. As the union grows technical choices are debated, beliefs are reviewed and traditions are overthrown. Only the subtle nuances of Sauvignon Blanc are allowed to consistently prevail…',
    ],
  },
  {
    src: `${storyBase}5_2560x1520.jpg`,
    alt: 'A glass of Villebois wine beside its bottle',
    heading: 'J. de Villebois or Villebois?',
    paragraphs: [
      "Like two branches of the same family, they stand side by side, complement each other and carry the colours of the de Villebois family far and wide. The Villebois range reflects Mr de Villebois' desire to produce contemporary, accessible, unvarnished Sauvignon Blanc that remains faithful to the terroir that gave birth to it. As a result of a deliberate technical approach, Villebois provides the opportunity to enjoy the pleasures of Sauvignon Blanc on a tighter budget.",
      'Villebois wines are the flagships of the Domaine and the gateway for all to the great terroirs of the Loire.',
    ],
  },
  {
    src: `${storyBase}6_2560x1520.jpg`,
    alt: 'Traditional tractor working in a Villebois vineyard',
    paragraphs: [],
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function VilleboisWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/16123/logos/b8sEtk8RT6WC82CmlJko4A.jpeg" alt="Villebois logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Villebois</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>30</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.8</b></span><span className="hidden sm:inline">15,590 total ratings</span><span className="sm:hidden">15,590 ratings</span></div></div>
            <Link href="/search?q=Villebois" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/loire-valley" className="hover:underline">Loire Valley</a>} icon={<Mountain size={17}/>}/>
              <Row label="Winemaker" value="Alberto Tonetto" icon={<span className="text-base">◉</span>}/>
              <Row label="Owned by" value="Villebois" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.jdevillebois.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/domaine_villebois/" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/domainevillebois/" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="https://www.youtube.com/channel/UCF5_gdB49YnXOJvA3AU8oqg" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">𝕏 X</a>
            <a href="tel:+33673413853" className="block px-2.5 py-2.5 font-semibold">☎ +33 673 413 853</a>
            <a href="mailto:vin@villebois.eu" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/T12-4PVySZKkobXQO8G9Hg_2560x1520.jpeg" alt="Villebois estate in the Loire Valley" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={story.src.includes('2_1520x2560') ? 760 : 1280} height={story.src.includes('2_1520x2560') ? 1280 : 760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.heading && <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">{story.heading}</h2>}{story.paragraphs.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}</div>)}
        </article>
      </div>
    </div>
  );
}
