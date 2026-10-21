import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/FMBID9uZSrKUNgyPJSnJyw_600x356.jpeg',
  family: 'https://images.vivino.com/misc/sponsorships/272274_eight_at_the_gate/272274_eightatthegate_2_2560x1520.jpeg',
  flock: 'https://images.vivino.com/misc/sponsorships/272274_eight_at_the_gate/272274_eightatthegate_3_2560x1520.jpeg',
  vines: 'https://images.vivino.com/misc/sponsorships/272274_eight_at_the_gate/2025_update/272274_eight_at_the_gate_3_2560x1520.jpg',
  barrels: 'https://images.vivino.com/misc/sponsorships/272274_eight_at_the_gate/272274_eightatthegate_5_2560x1520.jpeg',
  bottles: 'https://images.vivino.com/misc/sponsorships/272274_eight_at_the_gate/2025_update/272274_eight_at_the_gate_5_2560x1520.jpg',
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

export default function EightAtTheGateContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/272274/logos/H3sYrPA9QI6uOKT9gA8QWw.jpeg" alt="Eight at the Gate logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Eight at the Gate</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>13</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.2</b></span><span className="hidden sm:inline">1,520 total ratings</span><span className="sm:hidden">1,520 ratings</span></div></div>
            <Link href="/search?q=Eight%20at%20the%20Gate" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/australia" className="hover:underline">Australia</a>} icon={<span>🇦🇺</span>} />
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/wrattonbully" className="hover:underline">Wrattonbully</a>} icon={<Mountain size={17} />} />
              <Row label="Winemaker" value="Peter Douglas" icon={<span className="text-base">◉</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://eightatthegate.com.au/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://www.instagram.com/eightatthegate/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11} /></a>
            <a href="https://www.facebook.com/eightatthegate/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11} /></a>
            <a href="tel:+61400843126" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14} />+61 400 843 126</a>
            <a href="mailto:admin@eightatthegate.com.au" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src={images.hero} alt="Eight at the Gate co-founders Jane and Claire" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">A Family-Owned Gem in Wrattonbully</h2>
          <Paragraph>Sisters Jane and Claire are thrilled to welcome you to Eight at the Gate, their family-owned and operated vineyard nestled in the stunning Wrattonbully Wine Region on South Australia’s Limestone Coast. Named after the morning ritual of assembling their eight children “at the gate” in time for the school bus, their passion is crafting exceptional cool-climate wines that capture the essence of their unique land.</Paragraph>
          <StoryImage src={images.family} alt="The Eight at the Gate family and team" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">Nurturing Nature’s Bounty</h2>
          <Paragraph>They believe in working with nature, not against it. Sustainable practices, a healthy environment, and minimal intervention allow their grapes to thrive. Wrattonbully’s diverse ecosystem—including sheep, guinea fowl, and restored natural habitats—naturally keeps pests and diseases at bay, helping ensure a healthy vineyard.</Paragraph>
          <StoryImage src={images.flock} alt="Sheep grazing beside Eight at the Gate vineyard" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">Award-Winning Expertise</h2>
          <Paragraph>The sisters’ philosophy around growing grapes and making wine is much like raising their children: provide a sustainable, healthy, nurturing environment and don’t interfere too much. Renowned winemaker Peter Douglas brings decades of experience and countless awards, including his time as a senior winemaker at Penfolds.</Paragraph>
          <StoryImage src={images.vines} alt="Jane and Claire tending vines at the vineyard" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">Crafted with Care</h2>
          <Paragraph>Jane and Claire hand-select only the finest fruit from their vineyard for Eight at the Gate wines. Their red wines are patiently aged in premium oak barrels for two to three years, resulting in wines well worth the wait.</Paragraph>
          <StoryImage src={images.barrels} alt="Winemaker checking Eight at the Gate oak barrels" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">Wrattonbully’s Best Kept Secret</h2>
          <Paragraph>The Wrattonbully Wine Region, with its limestone caves and pristine underground water, is producing some of the world’s most exciting wines—and Eight at the Gate is proud to be part of it. Discover the unique flavours of this hidden gem.</Paragraph>
          <StoryImage src={images.bottles} alt="Eight at the Gate wines displayed for tasting" />
        </article>
      </div>
    </div>
  );
}
