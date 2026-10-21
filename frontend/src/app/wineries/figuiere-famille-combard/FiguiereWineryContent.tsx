import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const base = 'https://images.vivino.com/misc/sponsorships/30152_figuiere_2024/';
const stories = [
  {
    src: `${base}30152_figuiere_1_2560x1520_2024.jpg`,
    alt: 'Sunlit Figuière vineyard in Provence',
    paragraphs: [
      'Between sky and sea, Figuière looks like paradise. Here, on 185 hectares, the vineyards are spread over three terroirs of Provence, as magnificent as they are complementary! From the schists of the Mediterranean coast to the clay-limestone soils of the central Var, all the nuances of the Massif des Maures shine through. No wonder that the 10 typical Provençal grape varieties flourish here.',
    ],
  },
  {
    src: `${base}30152_figuiere_2_2560x1520_2024.jpg`,
    alt: 'Hands holding the schist-rich soil of Figuière',
    paragraphs: [
      'For over 50 years, their family has been crafting inspired wines with a deep sense of pride, passed down from father to son and now to daughters. Their inexhaustible passion is fueled by the region that embraced them, one they cherish and respect: Provence.',
      'For more than 50 years, the Combard family have been winemakers, from father to son and daughters. Magali, Delphine, and François succeeded their father, Alain, at the head of the estate and proudly continue his pioneering spirit. Between heritage and innovation, Figuière is a family Maison of tradition and craftsmanship that strives to grow with boldness and creativity, using new winemaking techniques; a true living heritage.',
    ],
  },
  {
    src: `${base}30152_figuiere_3_2560x1520_2024.jpg`,
    alt: 'The Combard family at the Figuière estate',
    paragraphs: [
      'Organic viticulture has been second nature to them since 1979. “Living soils, natural harmony. The purity of their wines starts here.”',
      'Quality grapes also mean pampered soils. The team uses organic fertilizers, compost, mulching of shredded prunings, and grass coverings every other row. The same attentive care is lavished on their vines, with gentle pruning techniques that respect the flow of sap, manual pruning vine by vine, and green harvesting.',
      'Giving back to nature is a matter of course: the estate has installed 200 nesting boxes for bats and chickadees, rehabilitated hedges, and introduced eco-pasturing.',
    ],
  },
  {
    src: `${base}30152_figuiere_4_2560x1520_2024.jpg`,
    alt: 'Vineyard parcels across the Figuière estate',
    paragraphs: [
      'The Figuière style—pure, restrained, and racy—draws its strength and natural elegance from this blend of schist terroirs.',
      'The winemaking process is deliberately refined, sincere, and without makeup, revealing the true personality of this terroir between land and sea, and of its winemaker. Figuière creates serious wines that combine power and finesse, balance and aromatic richness. While Provence is best known for rosés, Figuière also applies its know-how to reds and whites—a versatility that showcases the winemaker’s passion.',
    ],
  },
  {
    src: `${base}30152_figuiere_5_2560x1520_2024.jpg`,
    alt: 'Figuière wines served at an outdoor table',
    paragraphs: [],
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function FiguiereWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/30152/logos/5kZ7Q8DmSNq51ptMnZRDSA.jpeg" alt="Figuière winery logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Figuière, Famille Combard</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>40</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.9</b></span><span className="hidden sm:inline">22,702 total ratings</span><span className="sm:hidden">22,702 ratings</span></div></div>
            <Link href="/search?q=Figuiere%20Famille%20Combard" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://figuiere-provence.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/figuiere_provence" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/figuiereprovence" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="tel:+33494004470" className="block px-2.5 py-2.5 font-semibold">☎ 33 4 94 00 44 70</a>
            <a href="mailto:figuiere@figuiere.bio" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/uj9PpE4tToi2scaMnjvjAA_600x356.jpeg" alt="Figuière family winery estate in Provence" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>{story.paragraphs.map((paragraph) => <p key={paragraph} className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{paragraph}</p>)}</div>)}
          <div className="space-y-1 text-[10px] font-semibold text-red-700 sm:text-[13px]"><p><a href="https://www.facebook.com/figuiereprovence" target="_blank" rel="noreferrer" className="underline">Follow Figuière on Facebook</a></p><p><a href="https://www.instagram.com/figuiere_provence" target="_blank" rel="noreferrer" className="underline">Follow Figuière on Instagram</a></p></div>
        </article>
      </div>
    </div>
  );
}
