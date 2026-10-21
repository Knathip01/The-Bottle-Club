import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const images = [
  { src: 'https://images.vivino.com/misc/sponsorships/11092_minuty/11092_minuty_1_2560x1520.jpg', alt: 'Garden and grounds at Château Minuty' },
  { src: 'https://images.vivino.com/misc/sponsorships/11092_minuty/11092_minuty_2_2560x1520.jpg', alt: 'Château Minuty rosé wine at the estate' },
  { src: 'https://images.vivino.com/misc/sponsorships/11092_minuty/11092_minuty_3_2560x1520.jpg', alt: 'Hand harvesting grapes at Château Minuty' },
  { src: 'https://images.vivino.com/misc/sponsorships/11092_minuty/11092_minuty_4_new_2560x1520.jpg', alt: 'Aerial view of Château Minuty vineyards' },
  { src: 'https://images.vivino.com/misc/sponsorships/11092_minuty/11092_minuty_5_2560x1520.jpg', alt: 'Grapes growing in the Minuty vineyard' },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function MinutyWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/11092/logos/adxeen5QRC6J6bJi_ExWaA.png" alt="Minuty logo" width={56} height={56} unoptimized /></div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Minuty</h1>
              <VerifiedBadge />
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>27</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.0</b></span><span className="hidden sm:inline">104,124 total ratings</span><span className="sm:hidden">104,124 ratings</span></div>
            </div>
            <Link href="/search?q=Minuty" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
              <Row label="Winemaker" value="Château Minuty" icon={<span className="text-base">◉</span>}/>
              <Row label="Owned by" value="Château Minuty" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.minuty.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.facebook.com/chateauminuty" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="tel:+33494561209" className="block px-2.5 py-2.5 font-semibold">☎ 33 04 94 56 12 09</a>
            <a href="mailto:info@minuty.fr" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/aXJvGUnOSCCJuiTL7rHCTw_600x356.jpeg" alt="Château Minuty surrounded by vineyards" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">For four generations, the men and women at Minuty have brought the know-how and expertise derived from a rich family heritage to life by producing rosés, whites, and reds, emblematic of the Côtes de Provence. Minuty wines symbolize the French Art de Vivre on the world&apos;s finest tables.</p>
          <Image src={images[0].src} alt={images[0].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold uppercase text-[#1e1e1e] sm:text-[13px]">THE CHÂTEAU MINUTY SAVOIR-FAIRE</h2>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">
            <p>For an estate wine, everything starts in the vineyard, in a preserved environment. The Château’s vines are cultivated using sustainable methods, without weedkillers or pesticides, as part of a continuous improvement process to reduce the impact of its activities on the environment.</p>
            <p>These ethical practices were rewarded in 2019 by obtaining the High Environmental Value (HVE) certification. This official recognition is in line with the sustainable farming practices implemented by three generations of winegrowers. HVE certification is a key way to develop sustainable production. It is part of a global approach to responsible farming, that minimizes the use of synthetic products, promotes alternative practices, and reduces the impact on the environment.</p>
          </div>
          <Image src={images[1].src} alt={images[1].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]" />
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>Château Minuty is one of the last estates in the Côtes de Provence where grapes are harvested entirely by hand to ensure their perfect integrity.</p><p>Jean-Etienne and François Matton, who are deeply attached to their land, are at the helm of the operation and have inherited their know-how and expertise from their family.</p></div>
          <Image src={images[2].src} alt={images[2].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]" />
          <h2 className="px-0.5 pt-1 text-[10px] font-bold uppercase text-[#1e1e1e] sm:text-[13px]">AN OUTSTANDING TERRITORY</h2>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>Château Minuty’s vineyard is remarkably well exposed on the hillsides of the villages of Gassin and Ramatuelle, overlooking the Gulf of Saint-Tropez. It benefits from a temperate maritime climate and puts the spotlight on southern grape varieties.</p><p>Château Minuty is surrounded by 65 hectares in a single block on schistose limestone soil, complemented by 120 hectares on clay-limestone soil in Vidauban and 15 hectares on the slopes of Val de Rian in Ramatuelle with magnificent views over the Bay of Pampelonne.</p></div>
          <Image src={images[3].src} alt={images[3].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]" />
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>The vines benefit from deep soils, they are mostly planted with Grenache. Each grape variety is skilfully planted in the most appropriate part of the estate, for it to fully flourish. The vines around the Château are reserved for Grenache, which benefits from deep, pebble-free soil.</p><p>The southwest-facing plots bathed in sunlight are devoted to red wines (Syrah and Mourvèdre). The stonier limestone hills are very favorable to the expression of minerality and have therefore been planted with Rolle. The vineyard is directly under the influence of the sea with southeast exposure. The wines produced exude a delicate character marked by the sea air. The wind from the sea dries out the vines after dew or rain and limits the risk of disease.</p><p>The great rosés of Château Minuty are made from Grenache, “the king variety of rosés”, and Tibouren, emblematic of the Saint-Tropez peninsula, which has been preserved to guarantee the local typicity of the wines. White wines are made from Rolle, and grown for generations in the Var. Finally, the reds are made from Syrah and Mourvèdre, the Provençal grape variety that flourishes on the schist soils by the sea.</p></div>
          <Image src={images[4].src} alt={images[4].alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]" />
        </article>
      </div>
    </div>
  );
}
