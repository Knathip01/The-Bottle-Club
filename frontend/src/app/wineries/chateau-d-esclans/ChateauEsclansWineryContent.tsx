import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const sections = [
  {
    // Use the winery's known-good Vivino cover asset here: the story image URL
    // occasionally returns a 404 while the cover remains available.
    image: 'https://thumbs.vivino.com/wineries/sponsorship_cards/rurSYrPiRDKEr42ldXveLg_600x356.jpeg',
    alt: "Château d'Esclans estate in Provence",
    text: 'The vision of Sacha Lichine (Founder) with his acquisition of the Château in 2006 was to create the greatest rosés in the world igniting the “rosé renaissance.”',
  },
  {
    image: "https://images.vivino.com/misc/sponsorships/6905_d%27Esclans/d%27EsclansMTW-2_2650x3084.jpg",
    alt: 'Grapes growing at Château d’Esclans',
    text: 'Patrick Léon (Founding Winemaker) became an essential part of the project bringing his many years of international winemaking experience to Château d’Esclans. He introduced new and innovative winemaking techniques to Provence which revolutionized the styles of rosés being produced from this appellation.',
  },
  {
    image: "https://images.vivino.com/misc/sponsorships/6905_d%27Esclans/d%27EsclansMTW-3_2650x1560.png",
    alt: 'Winemaker tasting rosé wine',
    text: 'This led to the creation of a world-class rosé portfolio from Château d’Esclans including Whispering Angel, Rock Angel, Les Clans, and Garrus—a new generation of rosés characterized by elegance, depth, richness, and complexity. Today, Patrick’s son Bertrand currently leads the winemaking team following in the footsteps of his father.',
  },
  {
    image: "https://images.vivino.com/misc/sponsorships/6905_d%27Esclans/d%27EsclansMTW-4_2650x1585.jpg",
    alt: 'Sacha Lichine and Bertrand Léon at Château d’Esclans',
    text: 'Sold in over 100 countries, these rosés are enjoyed globally from London to the Hamptons, and from St. Barth’s to the Swiss Alps. Whether you are relaxing by the beach, on a yacht, or in the mountains during “après ski,” Château d’Esclans rosés are a light and refreshing accompaniment to any destination. Whispering Angel is today’s worldwide reference for Provence rosé.',
  },
  {
    image: "https://images.vivino.com/misc/sponsorships/6905_d%27Esclans/d%27EsclansMTW-5_2650x1561.jpg",
    alt: 'Château d’Esclans Whispering Angel rosé bottles',
  },
];

function ProfileRow({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
      <div className="w-5 shrink-0 text-[#262626]">{icon}</div>
      <div className="min-w-0">
        <div className="text-[10px] leading-3 text-stone-500">{label}</div>
        <div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div>
      </div>
    </div>
  );
}

function VerifiedBadge() {
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
        <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified Partner Winery
    </div>
  );
}

export default function ChateauEsclansWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image src="https://images.vivino.com/wineries/6905/logos/WEgrrqf0ROOPc7veFa8i8w.jpeg" alt="Château d'Esclans logo" width={56} height={56} unoptimized />
            </div>
            <div>
              <h1 className="text-xs font-bold leading-tight text-[#1e1e1e] sm:text-xl">Château d&apos;Esclans</h1>
              <VerifiedBadge />
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>15</b> Wines</span><span>•</span>
                <span className="inline-flex items-center gap-1"><Star size={12} className="fill-amber-500 text-amber-500" /><b>4.1</b></span>
                <span className="hidden sm:inline">146,511 total ratings</span>
                <span className="sm:hidden">146,511 ratings</span>
              </div>
            </div>
            <Link href="/search?q=Ch%C3%A2teau+d%27Esclans" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <ProfileRow label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>} />
              <ProfileRow label="Owned by" value="Sacha Lichine" icon={<span className="text-base">⌂</span>} />
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.esclans.com" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14} />Website</span><ExternalLink size={11} /></a>
            <a href="https://www.instagram.com/thewhisperingangel" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">◎ Instagram</a>
            <a href="https://www.facebook.com/chateaudesclans" target="_blank" rel="noreferrer" className="block px-2.5 py-2.5 font-semibold">f Facebook</a>
            <a href="tel:+33494604040" className="block px-2.5 py-2.5 font-semibold">☎ 33 04 9460 4040</a>
            <a href="mailto:chateaudesclans@sachalichine.com" className="block px-2.5 py-2.5 font-semibold">✉ Winery Email</a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          {sections.map((section) => (
            <section key={section.image} className="space-y-1">
              <Image src={section.image} alt={section.alt} width={1280} height={760} unoptimized priority={section === sections[0]} className="h-auto max-h-[285px] w-full rounded-md object-cover sm:max-h-[420px]" />
              {section.text && <p className="px-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{section.text}</p>}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
