import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/hw28Y1IcRcm_JE2l6VIK7g_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/1951_santa_margherita_2_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/1951_santa_margherita_3_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/1951_santa_margherita_4_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/1951_santa_margherita_5_2560x1520.jpg',
};

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
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

function StoryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1280}
      height={760}
      unoptimized
      className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"
    />
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function SantaMargheritaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://thumbs.vivino.com/wineries/1951/logos/Acgp7xHdRgu4z8WWH3mgwQ_500x500.jpeg"
                alt="Santa Margherita logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Santa Margherita</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>50</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.8</b>
                </span>
                <span className="hidden sm:inline">134,840 total ratings</span>
                <span className="sm:hidden">134,840 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Santa+Margherita"
              className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs"
            >
              View wines
            </Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row
                label="Country"
                value={
                  <a href="https://www.vivino.com/en/explore/countries/italy" className="hover:underline">
                    Italy
                  </a>
                }
                icon={<span>🇮🇹</span>}
              />
              <Row
                label="Region"
                value={
                  <a href="https://www.vivino.com/en/explore/regions/veneto" className="hover:underline">
                    Veneto
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row label="Winemaker" value="Santa Margherita" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.santamargherita.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"
            >
              <span className="flex items-center gap-2">
                <Globe size={14} />
                Website
              </span>
              <ExternalLink size={11} />
            </a>
            <a
              href="https://www.instagram.com/santamargheritawines/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                Instagram
              </span>
              <ExternalLink size={11} />
            </a>
            <a
              href="https://www.facebook.com/@SantaMargheritaIt"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </span>
              <ExternalLink size={11} />
            </a>
            <a
              href="https://x.com/ViniSMargherita"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"
            >
              <span className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:+390421246111" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              +39 0421 246111
            </a>
            <a href="mailto:info@santamargherita.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Vintners tending vineyard rows at Santa Margherita estate"
          />
          <Paragraph>
            Santa Margherita has innovation, exploration, and creativity in its blood, and has always adapted to the changes in taste that have occurred over the last sixty years of Italian wine. Their intuition allows them to take new paths, unafraid to try new techniques and flavors.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Panoramic view of rolling hillside vineyards in Veneto"
          />
          <Paragraph>
            Ever since its creation in 1935, Santa Margherita has represented the dream of its founder, Gaetano Marzotto: putting into practice a form of viticulture that is modern and efficient, made up of people, nature, and technology working in harmony. It was his tribute to Margherita, his beloved wife, from whom the company takes its name.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Golden sunrise over terraced vineyards"
          />
          <Paragraph>
            But it is also the story of a family, recalled in its logo depicting the municipal villa of Portogruaro, where Gaetano and his wife lived with their eight children; a love story that has involved an entire community and vast area, forging an intimate relationship with them whilst becoming an icon of Italian wine around the world.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Pouring Santa Margherita Pinot Grigio into a crystal wine glass"
          />
          <Paragraph>
            Since 1961, Santa Margherita has made Pinot Grigio an international icon and contributed to the global success of Prosecco—two wines that embody freshness and a strong sense of place, anticipating consumer tastes and continuing to represent Italian style worldwide.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Bottles of Santa Margherita sparkling wine"
          />
          <Paragraph>
            At Santa Margherita, quality is at the heart of everything they do—in the wines, the community, and respect for the environment. From vineyard to glass, every step reflects their tradition and commitment to excellence, embodying the Italian way of life and their passion as true “explorers of taste.”
          </Paragraph>
        </article>
      </div>
    </div>
  );
}
