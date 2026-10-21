import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/iHqs7s3nSNCe4dRzedrLDw_2560x1520.jpeg',
  sign: 'https://vivino.s3.amazonaws.com/misc/sponsorships/27282_vonwinning/27282_vonwinning_1.jpg',
  winemaker: 'https://vivino.s3.amazonaws.com/misc/sponsorships/27282_vonwinning/27282_vonwinning_2.jpg',
  vineyards: 'https://vivino.s3.amazonaws.com/misc/sponsorships/27282_vonwinning/27282_vonwinning_3.jpg',
  barrels: 'https://vivino.s3.amazonaws.com/misc/sponsorships/27282_vonwinning/27282_vonwinning_4.jpg',
  bottles: 'https://vivino.s3.amazonaws.com/misc/sponsorships/27282_vonwinning/27282_vonwinning_5+(2).jpg',
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

export default function VonWinningContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/27282/logos/dkKNX9evQ_aMRGbQc4nGHw.jpeg" alt="Von Winning logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Von Winning</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>141</b> Wines</span></div></div>
            <Link href="/search?q=Von%20Winning" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=Germany" className="hover:underline">Germany</Link>} icon={<span>🇩🇪</span>} />
              <Row label="Winemaker" value="Stephan Attmann" icon={<span className="text-base">◉</span>} />
              <Row label="Owned by" value="Von Winning" icon={<span className="text-base">◉</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.von-winning.de/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://www.instagram.com/von.winning/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11} /></a>
            <a href="https://www.facebook.com/weingutvonwinning/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11} /></a>
            <a href="tel:+496326966870" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14} />+49 6326 966 870</a>
            <a href="mailto:weingut@von-winning.de" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src={images.hero} alt="Historic Von Winning estate in Deidesheim" />
          <Paragraph>The vineyards of the Pfalz region offer a large variation of soil types, the base and fundament for the production of outstanding and individual wines. Since 1849, unique wines reflecting the best vineyards from Deidesheim, Forst, Ruppertsberg, and Königsbach have been produced in the historic cellar of the estate.</Paragraph>
          <StoryImage src={images.sign} alt="Von Winning estate entrance sign" />
          <Paragraph>Leopold von Winning, Dr. Andreas Deinhard’s son-in-law, dedicated himself to elevating the quality of the domaine’s wines, guided by a deep respect for the remarkable terroir of the region. His philosophy of gentle, nature-conscious winemaking lives on today, driving the commitment of the talented winemaking team led by Stephan Attmann.</Paragraph>
          <StoryImage src={images.winemaker} alt="Von Winning winemaker in an autumn vineyard" />
          <Paragraph>A resource-saving way of working in harmony with nature ensures a careful approach to wine as a cultural asset. Von Winning combines proven traditional methods with scientific research to achieve the highest quality in the vineyards and cellar.</Paragraph>
          <StoryImage src={images.vineyards} alt="Aerial view of Von Winning vineyards in the Pfalz" />
          <Paragraph>The estate extends over more than 50 hectares of the best vineyards, from Neustadt-Haardt via Deidesheim to Forst. The Haardt is part of the Upper Rhine Graben, a north-south tectonic rift valley bordered to the west by the Palatinate Forest, which protects it from Atlantic lows and cold winds.</Paragraph>
          <StoryImage src={images.barrels} alt="Oak barrels in the Von Winning cellar" />
          <Paragraph>Von Winning focuses on cool-climate, mineral white wines, including powerful Riesling, mineral Chardonnay, and fruit-driven Sauvignon Blanc, as well as remarkable Pinot Noir. Fermentation in wooden barrels from high-quality cooperages is reserved for wines from the estate’s best plots.</Paragraph>
          <StoryImage src={images.bottles} alt="Von Winning wine bottles from the estate" />
        </article>
      </div>
    </div>
  );
}
