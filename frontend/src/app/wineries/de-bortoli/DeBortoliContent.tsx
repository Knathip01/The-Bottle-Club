import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/RPZKePKMT62TLIccU2GnJg_600x356.jpeg',
  heritage: 'https://images.vivino.com/misc/sponsorships/2114_de_bortoli/2114_de_bortoli_1_2560x1520.jpg',
  locations: 'https://images.vivino.com/misc/sponsorships/2114_de_bortoli/2114_de_bortoli_4_2560x1520.jpeg',
  sustainability: 'https://images.vivino.com/misc/sponsorships/2114_debortoli_2025/2114_debortoli_2025_3_NEW_2560x1520.jpg',
  awards: 'https://images.vivino.com/misc/sponsorships/2114_de_bortoli/2114_de_bortoli_6_2560x1520.jpg',
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

export default function DeBortoliContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/2114/logos/gu26zjbjRHCc37zw-eEZLA.jpeg" alt="De Bortoli logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">De Bortoli</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>585</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.5</b></span><span className="hidden sm:inline">107,041 total ratings</span><span className="sm:hidden">107,041 ratings</span></div></div>
            <Link href="/search?q=De%20Bortoli" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=Australia" className="hover:underline">Australia</Link>} icon={<span>🇦🇺</span>} />
              <Row label="Owned by" value="De Bortoli Wines" icon={<span className="text-base">◉</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.debortoli.com.au/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://www.instagram.com/debortoliwines/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11} /></a>
            <a href="https://www.facebook.com/DeBortoliWines" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11} /></a>
            <a href="https://x.com/debortoliwines" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>X</span><ExternalLink size={11} /></a>
            <a href="tel:+61269660100" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14} />61 2 6966 0100</a>
            <a href="mailto:info@debortoli.com.au" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src={images.hero} alt="The De Bortoli family" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">Company Heritage</h2>
          <Paragraph>Almost 100 years later, De Bortoli Wines remains one of Australia’s largest and oldest family-owned wine companies. Today, it is led by the third generation: Managing Director Darren De Bortoli and his siblings Leanne, Kevin, and Victor. As the fourth generation begins to join the family business, a new chapter unfolds, continuing Vittorio’s enduring values of good wine, good food, and good friends.</Paragraph>
          <StoryImage src={images.heritage} alt="Historic De Bortoli winery and family" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">Find Us / Winery Locations</h2>
          <Paragraph>The company has expanded from its modest farm in the Riverina and now includes vineyards in the Yarra Valley, Rutherglen, Riverina, Hunter Valley, King Valley, and Heathcote throughout New South Wales and Victoria.</Paragraph>
          <Paragraph>De Bortoli’s winemaking philosophy is that great wines begin in the vineyard, emphasizing innovation and sustainability. Each vineyard is distinct in its own right, with every wine expressing a unique identity and reflecting the region where its grapes are grown.</Paragraph>
          <StoryImage src={images.locations} alt="Map of De Bortoli winery locations across Australia" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">Sustainability Journey</h2>
          <Paragraph>Striving to become a <a href="https://www.debortoli.com.au/sustainability" className="text-red-700 underline">Zero Waste Wine Company</a>, the journey reached a key milestone in 2016 when De Bortoli became the first NSW business to achieve Sustainability Advantage Platinum status. In 2024, this commitment deepened with all vineyard holdings across the Yarra Valley, Riverina, King Valley, Heathcote, and Rutherglen—906 hectares in total—receiving certification from <a href="https://www.debortoli.com.au/whats-on/de-bortoli-wines-earns-sustainable-winegrowing-australia-certification-across-all-vineyards" className="text-red-700 underline">Sustainable Winegrowing Australia (SWA)</a>.</Paragraph>
          <StoryImage src={images.sustainability} alt="Sustainable Winegrowing Australia vineyards" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">Wine Overview &amp; Accolades</h2>
          <Paragraph>De Bortoli produces a broad range of wines from its iconic vineyards: from the beguiling cool-climate styles of the Yarra Valley to the brooding power of Heathcote and Rutherglen and the fruit purity for which the Riverina is renowned. Its whites, rosés, sparklings, and reds are both delicate and expressive; in sweet wine, the company stands apart.</Paragraph>
          <StoryImage src={images.awards} alt="De Bortoli team celebrating wine awards" />
          <Paragraph>Find out more at: <a href="https://www.debortoli.com.au/" className="text-red-700 underline">www.debortoli.com.au</a></Paragraph>
          <Paragraph><a href="https://shop.debortoli.com.au/" className="text-red-700 underline">Shop here</a></Paragraph>
        </article>
      </div>
    </div>
  );
}
