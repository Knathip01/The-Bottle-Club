import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/634OjjhtQuipqhTIu-H6Yw_600x356.jpeg',
  bottles: 'https://images.vivino.com/misc/sponsorships/261910_little_giant/261910_little_giant_1_2560x3040.jpg',
  vineyard: 'https://images.vivino.com/misc/sponsorships/261910_little_giant/261910_little_giant_2_2560x1520.jpg',
  winemaker: 'https://images.vivino.com/misc/sponsorships/261910_little_giant/261910_little_giant_3_2560x1520.jpg',
  friends: 'https://images.vivino.com/misc/sponsorships/261910_little_giant/261910_little_giant_4_2560x1520.jpg',
  pour: 'https://images.vivino.com/misc/sponsorships/261910_little_giant/261910_little_giant_5_2560x3040.jpg',
};

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function StoryImage({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} width={1280} height={1520} unoptimized className="h-auto max-h-[360px] w-full rounded-md object-cover sm:max-h-[480px]" />;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function LittleGiantContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/261910/logos/iAsahMHsTdG8BeGKyKvINg.jpeg" alt="Little Giant logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Little Giant</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>32</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.0</b></span><span className="hidden sm:inline">17,892 total ratings</span><span className="sm:hidden">17,892 ratings</span></div></div>
            <Link href="/search?q=Little%20Giant" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=Australia" className="hover:underline">Australia</Link>} icon={<span>🇦🇺</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://littlegiantaustralia.com.au/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://www.instagram.com/littlegiantwines/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11} /></a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src={images.hero} alt="Aerial view of Little Giant vineyards" />
          <Paragraph>Little Giant delivers wines with character and interest, well above their size and weight—a homage to the southern hairy-nose wombat. Crafted from premium regional fruit from established South Australian regions, Little Giant offers signature and premium ranges, “Little Batch” small-run innovations, and exclusive releases. Each range showcases contemporary Australian wines in an unforgettable short, stumpy bottle, reminding everyone that good things come in small packages.</Paragraph>
          <StoryImage src={images.bottles} alt="Little Giant wine bottles arranged together" />
          <Paragraph>Little Giant wines are modern expressions of South Australia’s traditional wine-growing regions, including Adelaide Hills, Barossa Valley, Coonawarra, and McLaren Vale.</Paragraph>
          <StoryImage src={images.vineyard} alt="Aerial view across Little Giant vineyard rows" />
          <Paragraph>The wines are hand-crafted and true to each vineyard region’s characteristics. Grapes are picked at optimal ripeness, minimally handled in the winery, and made into full, flavoursome wines that deliver on taste, quality, and experience.</Paragraph>
          <StoryImage src={images.winemaker} alt="Winemaker among the vines at Little Giant" />
          <Paragraph>Little Giant is all about community: bringing people together on occasions great or small and offering the warmth of laid-back Australian culture. From the signature range to exclusive offerings, the team hopes your wine journey evolves with them.</Paragraph>
          <StoryImage src={images.friends} alt="Friends sharing Little Giant wine over dinner" />
          <Paragraph>Join the Giant Community and follow them on <a href="https://www.instagram.com/littlegiantwines/" className="text-red-700 underline">Instagram</a>.</Paragraph>
          <StoryImage src={images.pour} alt="Little Giant wine being poured into a glass" />
        </article>
      </div>
    </div>
  );
}
