import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/Y6s3CnewQiWtf1IAcECBdg_600x356.jpeg',
  vineyard: 'https://images.vivino.com/misc/sponsorships/236437_sthugo/236437_sthugo_1_2560x1520.jpg',
  vines: 'https://images.vivino.com/misc/sponsorships/236437_sthugo/236437_sthugo_2_2560x1520.jpg',
  visitors: 'https://images.vivino.com/misc/sponsorships/236437_sthugo/236437_sthugo_3_2560x1520.jpg',
  arch: 'https://images.vivino.com/misc/sponsorships/236437_sthugo/236437_sthugo_4_2560x1520.jpg',
  coonawarra: 'https://images.vivino.com/misc/sponsorships/236437_sthugo/236437_sthugo_5_2560x1520.jpg',
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

export default function StHugoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/236437/logos/oiz5Z-zPQPGfhwxEnE8uWQ.jpeg" alt="St Hugo logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">St Hugo</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>44</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.1</b></span><span className="hidden sm:inline">24,393 total ratings</span><span className="sm:hidden">24,393 ratings</span></div></div>
            <Link href="/search?q=St%20Hugo" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=Australia" className="hover:underline">Australia</Link>} icon={<span>🇦🇺</span>} />
              <Row label="Owned by" value="Vinarchy" icon={<span className="text-base">◉</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://sthugo.com/wines" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://www.instagram.com/sthugowines/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11} /></a>
            <a href="https://www.facebook.com/pages/st-hugo/360749870994000" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11} /></a>
            <a href="https://x.com/sthugowines" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>X</span><ExternalLink size={11} /></a>
            <a href="tel:+61881159200" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14} />61 8 8115 9200</a>
            <a href="mailto:info@sthugo.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src={images.hero} alt="St Hugo estate entrance" />
          <Paragraph>Born on 19 September 1895 in the Barossa Valley, Hugo Gramp lived and worked his entire life in this world-renowned wine region. Today, his legacy is celebrated in the magnificent new brand home of St Hugo in the Barossa.</Paragraph>
          <StoryImage src={images.vineyard} alt="St Hugo vineyards and brand home in the Barossa" />
          <Paragraph>Hugo’s grandfather, Johann Gramp, was one of the wine pioneers of this revered region, planting his first vines in 1847 and starting the wine business later called G Gramp &amp; Sons by Hugo’s father Gustav. Hugo would one day lead the company. His entrepreneurial spirit and quest for excellence inspired new additions to the St Hugo range, including exceptional red wines from his beloved Barossa home.</Paragraph>
          <StoryImage src={images.vines} alt="Old vine rows at St Hugo" />
          <Paragraph>An appreciation of fine wines and the secrets to making them ran through Hugo Gramp’s veins. He joined the family business at a young age and proved himself a worthy prodigy. At just 25, Hugo was appointed Managing Director of Gramp &amp; Sons. From 1920 to 1938, he led the winery through a period of unparalleled growth, driven by his inspiring vision and endless pursuit of excellence.</Paragraph>
          <StoryImage src={images.visitors} alt="Visitors enjoying the St Hugo winery terrace" />
          <Paragraph>On 25 October 1938, Hugo Gramp was flying from Adelaide to Melbourne with two other prominent wine industry members, Thomas Hardy and Sidney Hill Smith, when tragedy struck. The Kyeema plane encountered heavy cloud on its approach to Essendon Airport and crashed into Mount Dandenong, taking the lives of all 18 people on board.</Paragraph>
          <StoryImage src={images.arch} alt="Guests dining beneath a stone arch at St Hugo" />
          <Paragraph>In 1983, Hugo Gramp’s legacy was honoured with the release of the first wine named St Hugo. The title “St” was inspired by the European tradition of naming vineyards after saints to bestow good fortune upon them. Crafted from the outstanding 1980 vintage, the first St Hugo Coonawarra Cabernet Sauvignon was acclaimed for its power and elegance, much like the great man himself.</Paragraph>
          <Paragraph>Today, more than 30 vintages on, St Hugo continues to set the benchmark for excellence in Australian Cabernet Sauvignon, with every vintage released awarded gold.</Paragraph>
          <StoryImage src={images.coonawarra} alt="Historic Coonawarra winery building" />
        </article>
      </div>
    </div>
  );
}
