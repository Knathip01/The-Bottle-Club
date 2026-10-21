import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/e2ToaiF5Qjukv6XR3VZSBw_600x356.jpeg',
  bottle: 'https://images.vivino.com/misc/sponsorships/242588_thechampion/242588_thechampion_1_2560x1520.png',
  vineyard: 'https://images.vivino.com/misc/sponsorships/242588_thechampion/242588_thechampion_2_2560x1520.png',
  glasses: 'https://images.vivino.com/misc/sponsorships/242588_thechampion/242588_thechampion_3_2560x1520.png',
  dinner: 'https://images.vivino.com/misc/sponsorships/242588_thechampion/242588_thechampion_4_2560x1520.png',
  cheers: 'https://images.vivino.com/misc/sponsorships/242588_thechampion/242588_thechampion_5_2560x1520.png',
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

export default function TheChampionContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/242588/logos/pHly9YOgQPynm8xNSg7fsg.png" alt="The Champion logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">The Champion</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>1</b> Wine</span></div></div>
            <Link href="/search?q=The%20Champion" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=Australia" className="hover:underline">Australia</Link>} icon={<span>🇦🇺</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://thechampionwine.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src={images.hero} alt="South Island mountain lake landscape" />
          <Paragraph>The Champion gets its name from the legendary racehorses of New Zealand’s South Island. Just like them, this wine is fast, focused, and full of energy—crafted to perform. Grown in Marlborough, it brings the same precision and strength to your glass that a thoroughbred brings to the track.</Paragraph>
          <StoryImage src={images.bottle} alt="The Champion Sauvignon Blanc beside a mountain lake" />
          <Paragraph>Great wine starts with balance—between the earth, the elements, and the people who care for it. The Champion’s vineyards are trained like athletes, with smaller canopies and sunlit grapes that thrive under ocean-cooled skies. It’s nature and know-how working in perfect sync.</Paragraph>
          <StoryImage src={images.vineyard} alt="Sunlit vineyard rows at The Champion" />
          <Paragraph>The Champion is all about crisp, clean flavour. It is crafted in a cool, oxygen-free environment to lock in that bright citrusy punch. Stainless-steel tanks help preserve its fresh character, so every sip feels like a breeze off the South Island coast.</Paragraph>
          <StoryImage src={images.glasses} alt="The Champion Sauvignon Blanc served with glasses" />
          <Paragraph>When the Riboli family set out to add a New Zealand wine to their lineup, they knew it had to be special. They partnered with a small Marlborough vineyard to bring their vision to life: a Sauvignon Blanc made with intention, energy, and a true sense of place.</Paragraph>
          <StoryImage src={images.dinner} alt="Friends sharing food and wine together" />
          <Paragraph>With its light body, zippy acidity, and low alcohol, The Champion is made for good food and good company. It pairs with everything from seafood to salads—or a sunny afternoon. No fuss, no pressure, just a seriously good Sauvignon Blanc.</Paragraph>
          <StoryImage src={images.cheers} alt="Friends clinking glasses of The Champion Sauvignon Blanc" />
        </article>
      </div>
    </div>
  );
}
