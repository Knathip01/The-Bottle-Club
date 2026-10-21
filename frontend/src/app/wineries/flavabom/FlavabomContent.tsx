import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/BadDHBNKRq-KkWkfMOA--g_600x356.jpeg',
  vines: 'https://images.vivino.com/misc/sponsorships/226218_flavabom/226218_Flavabom_1.jpg',
  wetland: 'https://images.vivino.com/misc/sponsorships/226218_flavabom/226218_flavabom_2_2560x1520.jpeg',
  rows: 'https://images.vivino.com/misc/sponsorships/226218_flavabom/226218_flavabom_3_2560x1520.jpeg',
  shiraz: 'https://images.vivino.com/misc/sponsorships/226218_flavabom/226218_Flavabom_4.jpg',
  fieldWhite: 'https://images.vivino.com/misc/sponsorships/226218_flavabom/226218_flavabom_5_2560x1520.jpeg',
  bottle: 'https://images.vivino.com/misc/sponsorships/226218_flavabom/226218_Flavabom_6.jpg',
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

export default function FlavabomContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/226218/logos/Hz3nHYPiQY-4iW5EybDH4g.jpeg" alt="Flavabom logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Flavabom</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>6</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.0</b></span><span className="hidden sm:inline">5,610 total ratings</span><span className="sm:hidden">5,610 ratings</span></div></div>
            <Link href="/search?q=Flavabom" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=Australia" className="hover:underline">Australia</Link>} icon={<span>🇦🇺</span>} />
              <Row label="Winemaker" value="Peter Gajewski" icon={<span className="text-base">◉</span>} />
              <Row label="Owned by" value="Byrne Vineyards" icon={<span className="text-base">◉</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://byrnevineyards.com.au/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="mailto:info@byrnevineyards.com.au" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src={images.hero} alt="Flavabom bottles in a vineyard setting" />
          <Paragraph>Byrne Vineyards is a family-owned, estate-grown wine business based on its 144-hectare Morgan vineyard, which includes a large natural wetland in South Australia’s Riverland. Deeply committed to sustainability, Byrne Vineyards sees itself as a long-term land carer, protecting and enhancing the region’s flora and fauna for generations to come while crafting high-quality wines from its own estate.</Paragraph>
          <StoryImage src={images.vines} alt="Sun shining through Flavabom vineyard vines" />
          <Paragraph>The vineyards that produce Flavabom wines enjoy hot and dry growing conditions, with relatively low-yielding mature vines grown on ancient limestone soils. This special terroir produces wines textured and full of flavour, ensuring the Flavabom promise.</Paragraph>
          <StoryImage src={images.wetland} alt="Aerial view of Byrne Vineyards and Riverland wetlands" />
          <Paragraph>Custodians of one of South Australia’s largest natural wetlands, Byrne Vineyards proudly protects a sanctuary for rare and endangered wildlife and birdlife. Recognised for sustainable wetland and water management, this commitment to the land flows through to the wines: sustainably grown, carefully made, and 100% vegan friendly.</Paragraph>
          <StoryImage src={images.rows} alt="Rows of mature vines at Byrne Vineyards" />
          <Paragraph>Flavabom Vine Dried Shiraz is inspired by Italian Ripasso and Amarone styles, with an Australian touch. Instead of drying grapes on racks after picking, the Shiraz grapes are dried on the vine before harvest to preserve natural concentrated flavours and sugars, resulting in rich flavours and a juicy mouthfeel. Flavabom keeps its promise!</Paragraph>
          <StoryImage src={images.shiraz} alt="Flavabom Shiraz bottle among grape leaves" />
          <Paragraph>Flavabom Field White is made from intuitively selected fruit grown on low-yielding, mature vines. Developed in harmony, the wine is seamless, layered, and naturally complex. Vibrant yet balanced, it is as enjoyable with food as it is on its own.</Paragraph>
          <StoryImage src={images.fieldWhite} alt="Flavabom wines displayed outdoors" />
          <Paragraph>Sourced from mature vines, Flavabom Chardonnay balances depth with elegance. Gentle oak ageing adds texture and warmth to ripe stone-fruit flavours, delivering a refined, generous wine with excellent length.</Paragraph>
          <StoryImage src={images.bottle} alt="A bottle of Flavabom wine in the vineyard" />
          <Paragraph>Bright, fresh and finely structured, Flavabom Blanc de Blanc showcases pure fruit expression and vibrant acidity. Crisp and elegant, it is a refreshing wine for celebration and everyday enjoyment.</Paragraph>
        </article>
      </div>
    </div>
  );
}
