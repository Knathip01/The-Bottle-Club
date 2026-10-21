import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/H9aLwkSQQ_q5oV3WJJ1lqw_600x356.jpeg',
  cellarDoor: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1924_StHallet/1924_sthallett_1b_2560x1520.jpg',
  bottles: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1924_StHallet/1924_sthallett_2b_2560x1520.jpg',
  history: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1924_StHallet/1924_sthallett_3b_2560x1520.jpg',
  vineyard: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1924_StHallet/1924_sthallett_4b_2560x1520.jpg',
  pour: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1924_StHallet/1924_sthallett_5b_2560x1520.jpg',
  landscape: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1924_StHallet/1924_sthallett_6b_2560x1520.jpg',
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

export default function StHallettContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/1924/logos/9HgmSJbIQl6rNKDm4QqDJQ.jpeg" alt="St Hallett logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">St Hallett</h1><div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>72</b> Wines</span><span>•</span><span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500"/><b>3.8</b></span><span className="hidden sm:inline">33,947 total ratings</span><span className="sm:hidden">33,947 ratings</span></div></div>
            <Link href="/search?q=St%20Hallett" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<a href="https://www.vivino.com/en/explore/countries/australia" className="hover:underline">Australia</a>} icon={<span>🇦🇺</span>} />
              <Row label="Region" value={<a href="https://www.vivino.com/en/explore/regions/barossa" className="hover:underline">Barossa</a>} icon={<Mountain size={17} />} />
              <Row label="Winemaker" value="Angus Seabrook" icon={<span className="text-base">◉</span>} />
              <Row label="Owned by" value="Vinarchy" icon={<span className="text-base">◉</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.sthallett.com.au/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://x.com/sthallettwines" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>X</span><ExternalLink size={11} /></a>
            <a href="tel:+61885637000" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14} />61 8 8563 7000</a>
            <a href="mailto:sthallett@sthallett.com.au" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14} />Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage src={images.hero} alt="St Hallett winery sign in the Barossa" />
          <Paragraph>When the Lindner family settled in Barossa’s Hallett Valley in the late 1800s, the modern world of fine wine was beyond comprehension.</Paragraph>
          <StoryImage src={images.cellarDoor} alt="St Hallett cellar door among the trees" />
          <Paragraph>Butchering was the family business and in 1912 a Shiraz vineyard was planted, starting a slow-moving chain of events that would result in the St Hallett of today.</Paragraph>
          <StoryImage src={images.bottles} alt="St Hallett bottles resting in the cellar" />
          <Paragraph>The winery began in 1944 with modest ambitions for the future and an agricultural attitude to winemaking. Its evolution into a jewel in the crown of Barossa wineries mirrored that of the region itself. Many wine legends have left their imprint on the cellar and helped shape modern St Hallett, but none more critical than Stuart Blackwell.</Paragraph>
          <StoryImage src={images.history} alt="St Hallett Barossa heritage etched into wood" />
          <Paragraph>Stuart started at St Hallett in 1972, before the average Australian knew the difference between Shiraz and Chardonnay. Through droughts, booms, near busts and bumper crops, he steered St Hallett, ensuring integrity and a steadfast commitment to the Barossa region remained at the top of the agenda.</Paragraph>
          <StoryImage src={images.vineyard} alt="St Hallett vineyard beside a lake in the Barossa" />
          <Paragraph>Today St Hallett is proudly one of Barossa’s leading wineries and specialises in the region’s most heralded grape variety, Shiraz.</Paragraph>
          <StoryImage src={images.pour} alt="A glass of St Hallett Shiraz being poured" />
          <Paragraph>From the consistency of Faith through to the majesty of Old Block, St Hallett’s reputation as the Masters of Barossa Shiraz has been hard-earned over many decades.</Paragraph>
          <StoryImage src={images.landscape} alt="Vineyard rows across the Barossa Valley" />
        </article>
      </div>
    </div>
  );
}
