import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Phone, Mail, Star } from 'lucide-react';

const storyBase = 'https://vivino.s3.amazonaws.com/misc/sponsorships/35643_domainesaintemarie/';
const stories = [
  {
    src: `${storyBase}35643_domainesaintemarie_1.jpg`,
    alt: 'Domaine Sainte Marie in the green hills of Provence',
    text: 'The estate lies in the heart of Provence, on land once belonging to the Chartreuse de la Verne. Its historic setting, Mediterranean air and rolling hills give Domaine Sainte Marie a distinctive sense of place.',
  },
  {
    src: `${storyBase}35643_domainesaintemarie_2.jpg`,
    alt: 'Tasting room and cellar at Domaine Sainte Marie',
    text: 'Domaine Sainte Marie follows organic and vegan practices, with careful work from the vineyard through bottling. The team aims to express the fruit and character of the land while avoiding chemical pesticides and artificial additions.',
  },
  {
    src: `${storyBase}35643_domainesaintemarie_3.jpg`,
    alt: 'Sheep grazing among the estate’s olive trees and vines',
    text: 'The vineyards extend across about 40 hectares among cork oaks, pines and Mediterranean woodland. Many vines are around 35 years old; warm, dry days and cooler nights help the grapes retain freshness.',
  },
  {
    src: `${storyBase}35643_domainesaintemarie_4.jpg`,
    alt: 'Old vine at Domaine Sainte Marie',
    text: 'The estate makes expressive rosé, white and red wines. Its rosés bring together bright citrus and berry notes, with Paparazzi among the wines that showcase the sunny, easy-going character of Provence.',
  },
  {
    src: `${storyBase}35643_domainesaintemarie_5.jpg`,
    alt: 'Stainless steel wine tanks in the Domaine Sainte Marie cellar',
    text: 'Respect for the landscape guides the work at Domaine Sainte Marie. The team seeks balance between sustainable farming, the local environment and the flavours of the Provençal terroir.',
  },
];

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

export default function DomaineSainteMarieWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/35643/logos/ZqA1MRVfT3KutIjrAcmLJQ.jpeg" alt="Domaine Sainte Marie logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Domaine Sainte Marie</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>16</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.9</b></span><span className="hidden sm:inline">2,667 total ratings</span><span className="sm:hidden">2,667 ratings</span></div></div>
            <Link href="/search?q=Domaine%20Sainte%20Marie" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/regions/france" className="hover:underline">France</a>} icon={<span>🇫🇷</span>}/>
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/provence" className="hover:underline">Provence</a>} icon={<Mountain size={17}/>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://domainesaintemarie.fr/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="tel:+33494495715" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14}/>+33 4 94 49 57 15</a>
            <a href="mailto:contact@domainesaintemarie.fr" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14}/>Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/gL7KpPPBSbKTlT2iBoVCSw_2560x1520.jpeg" alt="Domaine Sainte Marie estate in Provence" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          {stories.map((story, index) => <div key={story.src} className="space-y-1.5"><Image src={story.src} alt={story.alt} width={1280} height={760} unoptimized priority={index === 0} className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/><p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{story.text}</p></div>)}
        </article>
      </div>
    </div>
  );
}
