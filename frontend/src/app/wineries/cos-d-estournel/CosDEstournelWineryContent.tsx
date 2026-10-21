import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const image1 = 'https://images.vivino.com/misc/sponsorships/10864_CosdEstournel/cos-destournel1_1200x750.jpg';
const image2 = 'https://images.vivino.com/misc/sponsorships/10864_CosdEstournel/cos-destournel2_1500x1001.jpg';
const image3 = 'https://images.vivino.com/misc/sponsorships/10864_CosdEstournel/cos-destournel3_1500x1000.jpg';
const video = "https://vivino.s3.amazonaws.com/misc/sponsorships/10864_CosdEstournel/Cos%2Bd%27Estournel%2B-%2BGravity%2Bin%2BMotion.mov";

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function CosDEstournelWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/10864/logos/VTftuVunSHueNN_T4tcjzQ.jpeg" alt="Cos d'Estournel logo" width={56} height={56} unoptimized/></div>
            <div>
              <h1 className="text-xs font-bold leading-tight text-[#1e1e1e] sm:text-xl">Cos d&apos;Estournel</h1>
              <VerifiedBadge/>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>10</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>4.3</b></span><span className="hidden sm:inline">88,968 total ratings</span><span className="sm:hidden">88,968 ratings</span></div>
            </div>
            <Link href="/search?q=Cos+d%27Estournel" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/saint-estephe" className="hover:underline">Saint-Estèphe</a>} icon={<Mountain size={17}/>}/>
              <Row label="Owned by" value="Michel Reybier" icon={<span className="text-base">⌂</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.estournel.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/cosdestournel" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/CosdEstournel" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="tel:+33556731550" className="block px-2.5 py-2.5 font-semibold">☎ 33 05 5673 1550</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/QBz6WKfIQmiyep-aAe7uWw_600x356.jpeg" alt="Château Cos d'Estournel and its pagodas" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]"/>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">Go behind the scenes at Cos d’Estournel and get access to exclusive events, personalized advice on your wines, as well as news direct from the estate.</p>
          <a href="https://www.estournel.com" target="_blank" rel="noreferrer" className="block px-0.5 text-[9px] font-bold uppercase text-[#ba1628] sm:text-[11px]">REGISTRATION</a>
          <div className="space-y-2 px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>Louis Gaspard d’Estournel inherited Cos and Pomys in 1791. Deeply convinced that the terroir of the hill of Cos was exceptional, he took many risks to enhance his estate, investing massively in the acquisition of neighboring land, and to innovate, with technical improvements such as the use of glass stoppers and new grape varieties.</p><p>Rather than depending on Bordeaux’s traditional network of negociants, he chose to personally dispatch his wines to remote places, signing each bottle as a symbol of his emancipation from the system.</p><p>Louis Gaspard d’Estournel was filled with curiosity about and openness to the world around him. His pursuit of new markets led him to Asia, where British officers stationed in India would begin savoring his wine as early as 1838.</p></div>
          <Image src={image1} alt="Louis-Gaspard d’Estournel, founder of Cos d’Estournel" width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 text-[9px] leading-snug text-[#242424] sm:text-[11px]">Louis-Gaspard d’Estournel, founder of Cos d’Estournel</p>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>Cos d’Estournel is ideally situated at the heart of an undulating landscape in the northern Médoc. The estate’s rolling contours served as inspiration for its name; “cos” is derived from the word for “hill of pebbles” in the old Gascon dialect.</p><p>A near miracle in geographic and geologic terms, Cos d’Estournel benefits from an unparalleled combination of soils and exposures. This wealth of natural variations fully expresses itself in the estate’s wines, which are among the world’s most highly reputed.</p></div>
          <Image src={image2} alt="Vineyard landscape at Cos d’Estournel" width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>Louis Gaspard d’Estournel chose to ornate his château to top it with monumental pagodas. Entirely devoted to winemaking, the main edifice of Cos d’Estournel houses state-of-the-art facilities.</p><p>Cos d’Estournel once again proved a paragon of innovation in 2008 with the construction of a vat room entirely based on the laws of gravity. The winemaking process, from harvest reception to bottling, would take place without pumping. Grape berries, their juices and the resulting wines would be handled as gently as possible, resulting in a subtle nectar with softer, more refined tannins.</p></div>
          <video controls preload="metadata" poster={image2} className="aspect-[3/2] w-full rounded-md bg-stone-100"><source src={video} type="video/quicktime"/>Your browser does not support embedded video.</video>
          <div className="space-y-2 px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]"><p>Owner of Cos d’Estournel since 2000, entrepreneur Michel Reybier is a simple and discreet man.</p><p>Moved by the extraordinary personality of the estate and the audacity of its founder, his decision to acquire was clear: it would be “Cos and only Cos.” With his predecessor Louis Gaspard d’Estournel, he shares a profound passion for Cos d’Estournel.</p></div>
          <Image src={image3} alt="Michel Reybier, owner of Cos d’Estournel" width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>
          <p className="px-0.5 pb-1 text-[9px] leading-snug text-[#242424] sm:text-[11px]">Michel Reybier, owner of Cos d’Estournel</p>
        </article>
      </div>
    </div>
  );
}
