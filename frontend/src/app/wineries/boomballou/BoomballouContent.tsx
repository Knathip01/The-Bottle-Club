import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/1wqD3bf-QS6S_I9_jvP3gA_600x356.jpeg',
  grapes: 'https://images.vivino.com/misc/sponsorships/321802_Boomballou/321802_Boomballou_1.jpg',
  dried: 'https://images.vivino.com/misc/sponsorships/321802_Boomballou/321802_Boomballou_2.jpg',
  infographic: 'https://images.vivino.com/misc/sponsorships/321802_Boomballou/321802_Boomballou_3.jpg',
};

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function StoryImage({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} width={1280} height={760} unoptimized className="h-auto max-h-[360px] w-full rounded-md object-cover sm:max-h-[480px]" />;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function BoomballouContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/321802/logos/083dFkwpQwK5bFpLFuV01g.jpeg" alt="Boomballou logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Boomballou</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>4</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.1</b></span><span className="hidden sm:inline">188 total ratings</span><span className="sm:hidden">188 ratings</span></div></div>
            <Link href="/search?q=Boomballou" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=Australia" className="hover:underline">Australia</Link>} icon={<span>🇦🇺</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://byrnevineyards.com.au/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://www.facebook.com/byrnevineyards?fref=ts" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11} /></a>
            <a href="tel:+64881320022" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14} />+64 8 8132 0022</a>
            <a href="mailto:admin@byrnevineyards.com.au" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src={images.hero} alt="Aerial view of the Boomballou Riverland vineyard" />
          <Paragraph>Over 10 years ago, Master of Wine Phil Reedman and legendary winemaker Peter Gajewski had a vision: they recognised that a special location in South Australia’s Riverland, on the Murray River, had the potential to produce a distinctive and unique wine. After years of experimentation in the vineyard and cellar, they found the formula and created a wine winning the hearts and palates of red wine fans around the world.</Paragraph>
          <StoryImage src={images.grapes} alt="Shiraz grapes growing at the Boomballou vineyard" />
          <Paragraph>In the vineyard discovered by Reedman and Gajewski, the grapes grow on a large limestone outcrop and enjoy incomparable climatic and geological conditions. This is the basis for an Amarone-style wine with a unique combination of complexity, intensity, and freshness, thanks to vines deeply rooted in limestone.</Paragraph>
          <Paragraph>The Shiraz grapes that grow in this vineyard and are dried on the vine form the basis for the intense style of Vine Dried Shiraz. A few weeks before harvest, deficit irrigation allows the grapes to dry on the vine, building concentrated flavours while preserving the liveliness of the fruit. This technique, known as Appassimento, is familiar from Italian Ripasso and Amarone; Reedman and Gajewski have adapted it for Riverland Shiraz.</Paragraph>
          <StoryImage src={images.dried} alt="Vine-dried Shiraz grapes ready for harvest" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">Here’s how Vine-Dried Shiraz is made in detail:</h2>
          <ul className="list-disc space-y-1 px-5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">
            <li><b>Extended hanging time:</b> Grapes remain on the vines longer than usual, allowing reduced irrigation and natural dehydration to concentrate sugars, acids, flavours, and aromas.</li>
            <li><b>Partial raisin formation:</b> As grapes dry, they shrink slightly. Lower water content and a higher skin-to-juice ratio intensify tannins and colour.</li>
            <li><b>Monitoring balance:</b> The grapes are carefully monitored to avoid over-drying, excessive sugar, and loss of acidity. The aim is balance between richness and freshness.</li>
            <li><b>Harvest:</b> Once the desired degree of drying and aroma profile are achieved, the grapes are harvested with care.</li>
            <li><b>Fermentation:</b> Concentrated grapes are fermented, often with prolonged maceration to extract deep colour and complex aromas.</li>
            <li><b>Aging:</b> Vine Dried Shiraz is usually aged partly in oak for added complexity and smoothness.</li>
          </ul>
          <StoryImage src={images.infographic} alt="Boomballou Vine-Dried Shiraz production details" />
        </article>
      </div>
    </div>
  );
}
