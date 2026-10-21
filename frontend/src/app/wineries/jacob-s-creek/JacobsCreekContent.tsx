import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = [
  'https://images.vivino.com/misc/sponsorships/6806_jacobscreek/6806_jacobscreek_1_2560x1520.jpg',
  'https://images.vivino.com/misc/sponsorships/6806_jacobscreek/6806_jacobscreek_2_2560x1520.jpg',
  'https://images.vivino.com/misc/sponsorships/6806_jacobscreek/6806_jacobscreek_3_2560x1520.jpg',
  'https://images.vivino.com/misc/sponsorships/6806_jacobscreek/6806_jacobscreek_4_2560x1520.jpg',
  'https://images.vivino.com/misc/sponsorships/6806_jacobscreek/6806_jacobscreek_5_2560x1520.jpg',
  'https://images.vivino.com/misc/sponsorships/6806_jacobscreek/6806_jacobscreek_6_2560x1520.jpg',
  'https://images.vivino.com/misc/sponsorships/6806_jacobscreek/6806_jacobscreek_7_2560x1520.jpg',
  'https://images.vivino.com/misc/sponsorships/6806_jacobscreek/6806_jacobscreek_8_2560x1520.jpg',
  'https://images.vivino.com/misc/sponsorships/6806_jacobscreek/6806_jacobscreek_9_2560x1520.jpg',
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function StoryImage({ index, alt }: { index: number; alt: string }) {
  return <Image src={images[index]} alt={alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]" />;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function JacobsCreekContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/6806/logos/vpFqcEe6STembSQvnr-ctQ.jpeg" alt="Jacob's Creek logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Jacob’s Creek</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>280</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.5</b></span><span className="hidden sm:inline">253,375 total ratings</span><span className="sm:hidden">253,375 ratings</span></div></div>
            <Link href="/search?q=Jacob%27s%20Creek" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=Australia" className="hover:underline">Australia</Link>} icon={<span>🇦🇺</span>} />
              <Row label="Winemaker" value="Bernard Hickin" icon={<span className="text-base">◉</span>} />
              <Row label="Owned by" value="Vinarchy" icon={<span className="text-base">◉</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.jacobscreek.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://www.instagram.com/jacobscreekwine/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11} /></a>
            <a href="https://www.facebook.com/jacobscreek" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11} /></a>
            <a href="https://x.com/JacobsCreek" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>X</span><ExternalLink size={11} /></a>
            <a href="tel:+61885213000" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14} />08 8521 3000</a>
            <a href="mailto:info@jacobscreek.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage index={0} alt="Jacob's Creek winery visitor centre" />
          <Paragraph>From the humble cottage of William Jacob set along the banks of a small creek to the legacy of the Gramp family, Jacob’s Creek has over 150 years of winemaking tradition flowing through its vineyards. The wines are produced along the creek across the Barossa, created to reflect the true character of the grapes and the land. It’s a heritage the team is passionate about, and what drives them to create new wines to be enjoyed for years to come.</Paragraph>
          <Paragraph>From vine to glass, these are the people whose dedication to craft and place can be tasted in every bottle of Jacob’s Creek.</Paragraph>
          <StoryImage index={1} alt="Historic homestead among the Jacob's Creek vineyards" />
          <Paragraph>As Chief Winemaker since 2018, Dan is determined to craft innovative wines that continue to build the international recognition of Jacob’s Creek for their exceptional quality and distinctive style. He is responsible for the style and quality of every bottle—over a million glasses enjoyed daily across 80 countries around the world.</Paragraph>
          <StoryImage index={2} alt="Jacob's Creek wine cellar lined with oak barrels" />
          <Paragraph>Jacob’s Creek wines are enjoyed in the homes of families and friends. The winery is proud to source grapes from more than 120 independent growers, most of which are still family-run vineyards. Many have been working with the winery for generations.</Paragraph>
          <StoryImage index={3} alt="Jacob's Creek winemaker in the barrel cellar" />
          <Paragraph>The growers are called “wine growers” rather than “grape growers” because of the special understanding required to grow grapes that make great wine. They work closely with viticulturists and winemakers on key decisions, bringing years of day-to-day experience in managing the vines.</Paragraph>
          <StoryImage index={4} alt="Rows of vines in the Jacob's Creek vineyards at sunset" />
          <Paragraph>The vineyards spread across the Barossa, Coonawarra and Adelaide Hills regions of South Australia.</Paragraph>
          <StoryImage index={5} alt="Grapes ripening among green Jacob's Creek vines" />
          <Paragraph>Situated about 70km north east of Adelaide, the Barossa is home to iconic Australian wines, especially world-class Shiraz and Riesling, and some of the oldest Shiraz vines and vineyard soils in the world. The lower altitude Barossa Valley is warmer and drier, with deeper soils suited to intense, full-bodied Shiraz.</Paragraph>
          <StoryImage index={6} alt="Vineyard rows across a South Australian wine region" />
          <Paragraph>Located in the Mount Lofty Ranges, the Adelaide Hills are a short drive east of Adelaide and are recognised as one of Australia’s premium cool-climate wine regions, ideal for Chardonnay and Pinot Noir.</Paragraph>
          <StoryImage index={7} alt="Jacob's Creek estate garden and vineyard landscape" />
          <Paragraph>Coonawarra is widely regarded as one of Australia’s best regions for premium Cabernet Sauvignon. Its temperate climate is influenced by cooling breezes from the Southern Ocean, with frequently cloudy skies and a flat landscape.</Paragraph>
          <StoryImage index={8} alt="Aerial view across the Jacob's Creek vineyard estate" />
          <Paragraph>During the dry summer, moisture drains away from the vine, yielding small berries with highly concentrated flavour. As grapes ripen slowly in the mild climate, they develop the structure and fine-grained tannins for which the region’s wines are renowned.</Paragraph>
        </article>
      </div>
    </div>
  );
}
