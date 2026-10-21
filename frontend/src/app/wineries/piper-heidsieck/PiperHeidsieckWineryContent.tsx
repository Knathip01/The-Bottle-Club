import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const storyImages = [
  { src: 'https://images.vivino.com/misc/sponsorships/2049_piperheidsieck_NEW/2049_Piper-Heidsieck_1.jpg', alt: 'Champagne vineyards at Piper-Heidsieck' },
  { src: 'https://images.vivino.com/misc/sponsorships/2049_piperheidsieck_NEW/2049_Piper-Heidsieck_2.jpg', alt: 'Cellar Master Émilien Boutillat in the vineyard' },
  { src: 'https://images.vivino.com/misc/sponsorships/2049_piperheidsieck_NEW/2049_Piper-Heidsieck_3.jpg', alt: 'Piper-Heidsieck vineyard and estate marker' },
  { src: 'https://images.vivino.com/misc/sponsorships/2049_piperheidsieck_NEW/2049_Piper-Heidsieck_4.jpg', alt: 'Vineyards of Champagne Piper-Heidsieck' },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function PiperHeidsieckWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/2049/logos/Fl_0dZ38QwuIYmb3ZewQOg.jpeg" alt="Piper-Heidsieck logo" width={56} height={56} unoptimized/></div>
            <div>
              <h1 className="text-xs font-bold leading-tight text-[#1e1e1e] sm:text-xl">Piper-Heidsieck</h1>
              <VerifiedBadge/>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>40</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.0</b></span><span className="hidden sm:inline">82,542 total ratings</span><span className="sm:hidden">82,542 ratings</span></div>
            </div>
            <Link href="/search?q=Piper-Heidsieck" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Champagne Piper-Heidsieck" icon={<span className="text-base">◉</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.piper-heidsieck.com/en/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/PiperHeidsieckIndiaOfficial?brand_redir=301771406504358" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="https://x.com/piperheidsieck" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">𝕏 X</a>
            <a href="tel:+33326844300" className="block px-2.5 py-2.5 font-semibold">☎ 33 03 2684 4300</a>
            <a href="mailto:contact.piperheidsieck@champagnes-ph-ch.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/6XiaXqEbQ1Wf9RYfZstuZw_600x356.jpeg" alt="Champagne vineyards at sunset" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]"/>
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">A Legacy Born to Make Wines Smile</h2>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>Since 1785, Piper-Heidsieck has been guided by a simple yet profound ambition: create wines that smile. Founded by Florens-Louis Heidsieck, the House was born from the dream of crafting a “cuvée worthy of a queen.” That dream became reality when Queen Marie Antoinette tasted his first champagne and immediately fell under its charm, becoming the House’s earliest ambassador.</p><p>When Henri-Guillaume Piper joined the venture in 1815, alongside Christian Heidsieck, their shared vision propelled the House far beyond the borders of France. Today, Piper-Heidsieck is enjoyed in more than 100 countries and stands as the most awarded Champagne House of the century, with over 275 medals.</p></div>
          <Image src={storyImages[0].src} alt={storyImages[0].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">Craftsmanship Led by a New Generation</h2>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">At the heart of Piper-Heidsieck’s success lies the passion and expertise of its winemakers. Cellar Master Émilien Boutillat, one of the youngest to lead a major Champagne House, carries forward the House’s uncompromising dedication to excellence. His modern vision blends precision with creativity, ensuring that each cuvée embodies balance, vibrancy and emotion. Under his leadership, Piper-Heidsieck continues to elevate its style while remaining deeply rooted in its historic savoir-faire.</p>
          <Image src={storyImages[1].src} alt={storyImages[1].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">A Commitment to Sustainability and Terroir</h2>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>Protecting the future of Champagne is central to the House’s philosophy. Piper-Heidsieck proudly holds two leading environmental certifications — Viticulture Durable en Champagne (VDC) and Haute Valeur Environnementale (HVE) — demonstrating a long-standing commitment to responsible viticulture. In addition, the House is B-Corp certified, reinforcing its dedication to social and environmental progress.</p><p>Grapes are sourced from winegrower partners across 319 crus, primarily in Montagne de Reims, Vallée de la Marne, Côte des Blancs and Côte des Bar. These growers share Piper-Heidsieck’s drive for eco-friendly practices, reducing chemical inputs, enhancing biodiversity, promoting dry farming, and advancing energy and waste management.</p></div>
          <Image src={storyImages[2].src} alt={storyImages[2].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <h2 className="px-0.5 pt-1 text-[10px] font-bold text-[#1e1e1e] sm:text-[13px]">The Spirit of Joy</h2>
          <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">From its royal beginnings to its modern, sustainability-driven vision, Piper-Heidsieck remains united by a single philosophy: champagne should spark joy. Every bottle is an invitation to celebrate — to smile, share, and savor life’s brightest moments.</p>
          <Image src={storyImages[3].src} alt={storyImages[3].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
        </article>
      </div>
    </div>
  );
}
