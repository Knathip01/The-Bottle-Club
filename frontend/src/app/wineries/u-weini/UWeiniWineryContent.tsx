import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail } from 'lucide-react';

const storyImages = [
  'https://api.u.wine/api/v1/image/shop_manager.shop_product_image/5597/image/470x705.png',
  'https://www.lepoint.fr/resizer/v2/765M3F4MM5OK3L64NBDDTQBYF4.jpg?auth=3770be71285c98e79534ce3df715bb40db7a096cb5c00488f56776f478594e50&height=575&smart=true&width=765',
  'https://www.winam.cz/user/articles/images/chateau_de_chelivette.jpg',
  'https://www.datocms-assets.com/85621/1763129120-retail-app-home-page-banner.png',
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

function StoryImage({ src, alt, contain = false }: { src: string; alt: string; contain?: boolean }) {
  return <Image src={src} alt={alt} width={1280} height={760} unoptimized className={`h-auto max-h-[300px] w-full rounded-md sm:max-h-[420px] ${contain ? 'bg-stone-50 object-contain' : 'object-cover'}`} />;
}

export default function UWeiniWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/319648/logos/KGCrJ_EGT16lU4Ay559jxQ.jpeg" alt="U’Weini logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">U’Weini</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>3</b> Wines</span></div></div>
            <Link href="/search?q=U%27Weini" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.uweini.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://www.instagram.com/uweini_official" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11} /></a>
            <a href="mailto:marketing@uweini.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src="https://thumbs.vivino.com/wineries/sponsorship_cards/84GIxy-rQcaGFyKktChGhg_2560x1520.jpeg" alt="A raised glass among the U’Weini vineyard vines" />
          <Paragraph>U’Weini brings a playful, more personal approach to wine. Its name means “the best, for you” in Mandarin, and the brand invites drinkers to look beyond the label and enjoy wine on their own terms.</Paragraph>
          <StoryImage src={storyImages[0]} alt="U’Weini Bordeaux Supérieur wine bottle" contain />
          <Paragraph>Each bottle is designed to offer an experience as well as a wine. Tear away the label to reveal an illustration, then use the NFC tag by the neck to open the wine profile, a playlist and The Apostrophe series.</Paragraph>
          <StoryImage src={storyImages[1]} alt="U’Wine founder Thomas Hébrard overlooking vineyards" />
          <Paragraph>U’Weini is connected to the Hébrard family, winemakers since 1832. Founder Thomas Hébrard built the Bordeaux project around the idea that good wines should be easy to discover, even for people new to wine.</Paragraph>
          <StoryImage src={storyImages[2]} alt="A vineyard estate in the Bordeaux region" />
          <Paragraph>One of the featured estates is Château Chauvet in Entre-deux-Mers. Founded in 1907, the family property spans 55 hectares of clay-limestone hillside vineyards and is now run by oenologist Grégory Dalla Longa.</Paragraph>
          <StoryImage src={storyImages[3]} alt="A selection of U’Weini wines" />
          <Paragraph>The collection brings together a Bordeaux Supérieur red, a Bordeaux white and a Côtes de Provence rosé, each selected to express its own region and style.</Paragraph>
        </article>
      </div>
    </div>
  );
}
