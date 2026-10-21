import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/2GMv9TmKQ_WgY6Kl9nKbCw_600x356.jpeg',
  vines: 'https://images.vivino.com/misc/sponsorships/1667_grantburge/1667_grantburge_6b_2560x1520.jpg',
  winemaker: 'https://images.vivino.com/misc/sponsorships/1667_grantburge/1667_grantburge_2b_2560x1520.jpg',
  cellar: 'https://images.vivino.com/misc/sponsorships/1667_grantburge/1667_grantburge_3b_2560x1520.jpg',
  wine: 'https://images.vivino.com/misc/sponsorships/1667_grantburge/1667_grantburge_4b_2560x1520.jpg',
  estate: 'https://images.vivino.com/misc/sponsorships/1667_grantburge/1667_grantburge_5b_2560x1520.jpg',
};

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function StoryImage({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]" />;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function GrantBurgeContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/1667/logos/YGrR7mhsQJChpz8j-vuAKQ.jpeg" alt="Grant Burge Wines logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Grant Burge Wines</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>217</b> Wines</span></div></div>
            <Link href="/search?q=Grant%20Burge%20Wines" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=Australia" className="hover:underline">Australia</Link>} icon={<span>🇦🇺</span>} />
              <Row label="Winemaker" value="Craig Stansborough" icon={<span className="text-base">◉</span>} />
              <Row label="Owned by" value="Vinarchy" icon={<span className="text-base">◉</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.grantburgewines.com.au/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://x.com/grantburgewines" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>X</span><ExternalLink size={11} /></a>
            <a href="tel:+61885633700" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14} />61 08 8563 3700</a>
            <a href="mailto:admin@grantburgewines.com.au" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src={images.hero} alt="Grant Burge vineyard landscape at sunset" />
          <Paragraph>The story of Grant Burge Wines is one of the past, the present, and the future. Planting their roots in the Barossa Valley, the Burges began as a family of devoted vignerons. For five generations, they spent their days working the land, understanding the soil, and growing grapes that would become luxurious wines. After years on the family vineyard, Meshach Burge, the eldest son, decided it was time to branch out from viticulture into agriculture.</Paragraph>
          <StoryImage src={images.vines} alt="Vines growing in the Barossa Valley" />
          <Paragraph>While he and his family worked their lands not far from the original Burge homestead, growing crops and cattle, Meshach couldn’t shake his love of wine and winemaking. Many say this was why he built fermenting tanks in one of his sheds in 1865. When he installed the tanks, he didn’t intend to spark a world-famous wine empire. He simply wanted to share wine with his favourite people: friends and family.</Paragraph>
          <StoryImage src={images.winemaker} alt="Grant Burge winemaker sharing wine" />
          <Paragraph>Out of his generosity came what is today the Grant Burge brand. Built on a foundation of devotion and sharing, the brand is driven by a desire to give more than expected. Each wine at every tier aims to exceed expectations. Grant Burge makes generous wines to inspire generosity in others and encourage them to share in the moment.</Paragraph>
          <StoryImage src={images.cellar} alt="A winemaker among barrels in the Grant Burge cellar" />
          <Paragraph>Stemming from this abundance mindset is an openness in the approach to the future. By staying true to their heritage while remaining unbound by existing norms, the team relentlessly pursues new avenues of evolution.</Paragraph>
          <StoryImage src={images.wine} alt="A glass of Grant Burge red wine being poured" />
          <Paragraph>They use their intrinsic knowledge of the land and winemaking to produce a progressive and varied portfolio of wines that encourages people to explore and share in the generosity of Grant Burge Wines.</Paragraph>
          <StoryImage src={images.estate} alt="The Grant Burge vineyard estate in South Australia" />
        </article>
      </div>
    </div>
  );
}
