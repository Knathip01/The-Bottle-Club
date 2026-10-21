import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/fEuTUVqOQAmngbrObtbaMw_600x356.jpeg',
  bottle: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1305_penfolds_2.jpg',
  people: 'https://images.vivino.com/misc/sponsorships/1305_penfolds_3.jpg',
  collection: 'https://images.vivino.com/misc/sponsorships/1305_penfolds_4.jpg',
  glass: 'https://images.vivino.com/misc/sponsorships/1305_penfolds_5.jpg',
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

export default function PenfoldsContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/1305/logos/UQo_d14XQCi9iiLfqjdlSg.jpeg" alt="Penfolds logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Penfolds</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>212</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.0</b></span><span className="hidden sm:inline">466,939 total ratings</span><span className="sm:hidden">466,939 ratings</span></div></div>
            <Link href="/search?q=Penfolds" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/australia" className="hover:underline">Australia</a>} icon={<span>🇦🇺</span>} />
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/south-australia" className="hover:underline">South Australia</a>} icon={<Mountain size={17} />} />
              <Row label="Winemaker" value="Peter Gago" icon={<span className="text-base">◉</span>} />
              <Row label="Owned by" value="Treasury Wine Estates" icon={<span className="text-base">◉</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.penfolds.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://www.instagram.com/penfolds/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11} /></a>
            <a href="https://www.facebook.com/Penfolds" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Facebook</span><ExternalLink size={11} /></a>
            <a href="https://x.com/Penfolds" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>X</span><ExternalLink size={11} /></a>
            <a href="tel:+61885620389" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14} />(085) 62 0389</a>
            <a href="mailto:info@penfolds.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src={images.hero} alt="Penfolds red signature banner" />
          <Paragraph>For over 180 years, Penfolds has been grounded in experimentation, curiosity and uncompromising quality. Their wines are big and bold: made to be complex, remarkable and to live long.</Paragraph>
          <StoryImage src={images.bottle} alt="A Penfolds wine bottle presented against a red background" />
          <Paragraph>Underpinned by an enduring House Style and winemaking philosophy, the Penfolds Collection has grown to encompass an array of diverse wines. Whether for the cellar or to be enjoyed today, there is a perfect Penfolds wine for every palate and occasion. Highlights include their flagships: Grange, one of the world’s most celebrated wines, Yattarna, their flagship white wine, and Bin 707 Cabernet Sauvignon.</Paragraph>
          <StoryImage src={images.people} alt="Penfolds winemaking team outside the winery" />
          <Paragraph>Penfolds’ success has been driven by a lineage of visionary winemakers. It began with Dr Christopher and Mary Penfold, the pioneers who dreamed big, inventing tonics, brandies, and fortified wines made from grapes and Australian sunshine. It continued with Alf Vesey, Ray Beckwith and Max Schubert, celebrated winemaking legends who pushed development to extraordinary, bold new heights.</Paragraph>
          <StoryImage src={images.collection} alt="Penfolds wine bottles from the collection" />
          <Paragraph>Penfolds wines are immediately recognisable thanks to an uncompromising commitment to quality and a winemaking philosophy that has endured since 1844. This approach drives the team to select and blend quality grapes irrespective of block, vineyard, region, state or country—Penfolds always goes where the fruit grows best and where it best suits the style.</Paragraph>
          <StoryImage src={images.glass} alt="A glass and bottle of Penfolds wine" />
          <Paragraph>Each wine released holds its own discernible character, yet the stamp of the distinctive Penfolds House Style is always present. The sourcing changes but the philosophy never does: everything to do with winemaking between the sun above and the soil below is Penfolds.</Paragraph>
        </article>
      </div>
    </div>
  );
}
