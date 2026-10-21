import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/udyrZQ2qQO6cYnjFarPYWQ_600x356.jpeg',
  grapes: 'https://images.vivino.com/misc/sponsorships/1974_petaluma/1974_petaluma_1b_2560x1520.jpg',
  bottle: 'https://images.vivino.com/misc/sponsorships/1974_petaluma/1974_petaluma_2b_2560x1520.jpg',
  vineyard: 'https://images.vivino.com/misc/sponsorships/1974_petaluma/1974_petaluma_3b_2560x1520.jpg',
  winery: 'https://images.vivino.com/misc/sponsorships/1974_petaluma/1974_petaluma_4b_2560x1520.jpg',
  bottles: 'https://images.vivino.com/misc/sponsorships/1974_petaluma/1974_petaluma_5b_2560x1520.jpg',
  landscape: 'https://images.vivino.com/misc/sponsorships/1974_petaluma/1974_petaluma_6b_2560x1520.jpg',
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

export default function PetalumaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/1974/logos/qgSzgnBnTQyqf8PbD8swrg.jpeg" alt="Petaluma logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Petaluma</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>51</b> Wines</span></div></div>
            <Link href="/search?q=Petaluma" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=Australia" className="hover:underline">Australia</Link>} icon={<span>🇦🇺</span>} />
              <Row label="Winemaker" value="Ben Thoman" icon={<span className="text-base">◉</span>} />
              <Row label="Owned by" value="Vinarchy" icon={<span className="text-base">◉</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.petaluma.com.au/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://x.com/PetalumaWine" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>X</span><ExternalLink size={11} /></a>
            <a href="tel:+61883399300" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14} />61 8 8339 9300</a>
            <a href="mailto:customers@petaluma.com.au" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src={images.hero} alt="Petaluma modern winery building" />
          <Paragraph>The Petaluma story is all about distinguished vineyard sites and meticulous attention to detail, from vineyard to glass.</Paragraph>
          <StoryImage src={images.grapes} alt="A glass of wine enjoyed among Petaluma vines" />
          <Paragraph>Petaluma is built on the belief of carefully selecting the best viticultural sites within iconic Australian wine regions and planting the right grape varieties specifically suited to each region. The wines are a singular expression of this founding belief.</Paragraph>
          <StoryImage src={images.bottle} alt="Petaluma wine bottle served with food" />
          <Paragraph>Regarded within the industry as a crusader of the modern Australian wine industry, Petaluma has developed a prestigious reputation over the past four decades, with five-star awards and Langton Classifications.</Paragraph>
          <StoryImage src={images.vineyard} alt="Petaluma vineyard vines and old wooden post" />
          <Paragraph>Today, Petaluma has a dedicated team of grape growers and winemakers working together to carefully craft truly great wines.</Paragraph>
          <StoryImage src={images.winery} alt="Petaluma winery nestled among trees" />
          <Paragraph>Their winemaking is uncompromised and intuitive, and the wines are handcrafted. Constant attention to detail and dedication to quality, above all else, see Petaluma wines setting the standard for now and decades to come.</Paragraph>
          <StoryImage src={images.bottles} alt="Petaluma bottles displayed against timber" />
          <Paragraph>The distinguished sites belief led Petaluma to nurture Riesling in the Clare Valley; Cabernet Sauvignon, Merlot and Shiraz in Coonawarra; Chardonnay in the Piccadilly Valley in the Adelaide Hills; Shiraz from the warm escarpment of Mt Barker; and Sauvignon Blanc from the Adelaide Hills.</Paragraph>
          <StoryImage src={images.landscape} alt="Petaluma vineyard landscape in South Australia" />
        </article>
      </div>
    </div>
  );
}
