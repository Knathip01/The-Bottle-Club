import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/aEQGH2QlR66VbUh4qlg_qg_600x356.jpeg',
  history: 'https://images.vivino.com/misc/sponsorships/8074_Hardys/8074_hardys_6b_2560x1520.jpg',
  picking: 'https://images.vivino.com/misc/sponsorships/8074_Hardys/8074_hardys_5b_2560x1520.jpg',
  cellar: 'https://images.vivino.com/misc/sponsorships/8074_Hardys/8074_hardys_4b_2560x1520.jpg',
  people: 'https://images.vivino.com/misc/sponsorships/8074_Hardys/8074_hardys_3b_2560x1520.jpg',
  winery: 'https://images.vivino.com/misc/sponsorships/8074_Hardys/8074_hardys_2b_2560x1520.jpg',
  vines: 'https://images.vivino.com/misc/sponsorships/8074_Hardys/8074_hardys_1b_2560x1520.jpg',
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

export default function HardysContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/8074/logos/aI433mcsRsO4km64yB_DGw.jpeg" alt="Hardys logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Hardys</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>391</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.5</b></span><span className="hidden sm:inline">198,454 total ratings</span><span className="sm:hidden">198,454 ratings</span></div></div>
            <Link href="/search?q=Hardys" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=Australia" className="hover:underline">Australia</Link>} icon={<span>🇦🇺</span>} />
              <Row label="Winemaker" value="Helen McCarthy" icon={<span className="text-base">◉</span>} />
              <Row label="Owned by" value="Vinarchy" icon={<span className="text-base">◉</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.hardyswines.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://www.instagram.com/hardyswines/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11} /></a>
            <a href="https://www.facebook.com/HardysWineUSA" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11} /></a>
            <a href="https://x.com/hardyswine" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>X</span><ExternalLink size={11} /></a>
            <a href="tel:+61883294124" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14} />61883294124</a>
            <a href="mailto:info@hardyswines.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src={images.hero} alt="Hardys vineyard landscape" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">Hardys is here because of one man, Thomas Hardy.</h2>
          <StoryImage src={images.history} alt="Historic Hardys Tintara winery" />
          <Paragraph>A man with an audacious goal. Well ahead of his time.</Paragraph>
          <StoryImage src={images.picking} alt="Hand harvesting grapes at Hardys" />
          <Paragraph>In 1853, against a backdrop of global uncertainty and in a colony yet to become a country, Thomas Hardy set out to make wines “revered around the world” and “enjoyed and understood by all.”</Paragraph>
          <StoryImage src={images.cellar} alt="Hardys wine cellar and tasting room" />
          <Paragraph>And so began a journey that would see his wines awarded in his lifetime and his name live on for generations.</Paragraph>
          <StoryImage src={images.people} alt="Visitors enjoying Hardys wine at the cellar door" />
          <Paragraph>Today, 165 years later, the world remains as unpredictable as it was then.</Paragraph>
          <StoryImage src={images.winery} alt="Hardys Tintara winery building" />
          <Paragraph>With over 9,000 global awards and a band of loyal ambassadors, Hardys continues to deliver quality recognised across the globe, giving consumers certainty in their wine choice each and every time.</Paragraph>
          <StoryImage src={images.vines} alt="Hardys vineyard workers among the vines" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">With every bottle a mark of … Certainty in an Uncertain World.</h2>
        </article>
      </div>
    </div>
  );
}
