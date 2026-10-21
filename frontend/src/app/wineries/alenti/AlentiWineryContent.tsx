import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star } from 'lucide-react';

const alentiImages = {
  hero: 'https://alenti.fr/cdn/shop/files/859A4428.jpg?v=1763027854&width=2400',
  friends: 'https://alenti.co/cdn/shop/files/859A0825.jpg?v=1771512660&width=1600',
  glasses: 'https://alenti.co/cdn/shop/files/859A0946.jpg?v=1765471441&width=2048',
  boxes: 'https://alenti.fr/cdn/shop/files/cubi_de_rouge_alenti.jpg?v=1771601668',
  dining: 'https://alenti.co/cdn/shop/files/859A0836.jpg?v=1771513477&width=1600',
  coast: 'https://alenti.fr/cdn/shop/files/859A0750.jpg?v=1771514362',
};

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

function StoryImage({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]" />;
}

export default function AlentiWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 text-[9px] font-semibold tracking-tight text-stone-700 sm:mx-0 sm:h-14 sm:w-14 sm:text-sm">alentí</div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Alenti</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>3</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.6</b></span><span className="hidden sm:inline">63 total ratings</span><span className="sm:hidden">63 ratings</span></div></div>
            <Link href="/search?q=Alenti" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://alenti.co/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://www.instagram.com/alenti_wine" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11} /></a>
            <a href="https://www.facebook.com/profile.php?id=61577988452478" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11} /></a>
            <a href="mailto:hello@alenti.co" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src={alentiImages.hero} alt="Alenti red, white and rosé wine boxes" />
          <Paragraph>Alenti began with five friends who wanted to make French wine feel easier to enjoy. Their wines come in a practical, contemporary format designed for sharing and everyday occasions.</Paragraph>
          <StoryImage src={alentiImages.friends} alt="Alenti wine set beside the sea" />
          <Paragraph>The team brings a shared love of wine and travel to a simple idea: offer carefully made French wines without the formality. Alenti’s range includes one wine in each of three colors.</Paragraph>
          <StoryImage src={alentiImages.glasses} alt="Alenti white wine with a glass by the sea" />
          <Paragraph>Alenti presents its wines in Bag-in-Box packaging. The vacuum tap helps keep the wine fresh for up to six weeks after opening, while the format is lighter to handle and transport than glass bottles.</Paragraph>
          <StoryImage src={alentiImages.boxes} alt="Alenti wine boxes in front of a fireplace" />
          <Paragraph>The range includes a fruity red, a fresh rosé and an aromatic white. The wines are made for relaxed meals, from simple weeknight dishes to a table shared with friends.</Paragraph>
          <StoryImage src={alentiImages.dining} alt="Alenti wine alongside a shared meal" />
          <Paragraph>Alenti’s approach is straightforward: make French wine approachable, convenient and enjoyable, while keeping taste at the center.</Paragraph>
          <StoryImage src={alentiImages.coast} alt="Alenti wine enjoyed by the coast" />
        </article>
      </div>
    </div>
  );
}
