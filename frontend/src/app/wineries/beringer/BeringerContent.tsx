import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star, User } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/1306/logos/rpHcAG3uRYON2T8a7pSNmQ_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/mqOsY64DTfiqrJVfz5StBA_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/1306_beringer_2025/1306_beringer_1_2025_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/1306_beringer_2025/1306_beringer_2_2025_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/1306_beringer_2025/1306_beringer_3_2025_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/1306_beringer_2025/1306_beringer_4_2025_2560x1520.jpg',
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
    <div className="overflow-hidden rounded-md">
      <Image
        src={src}
        alt={alt}
        width={1280}
        height={760}
        unoptimized
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

function Paragraph({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px] ${className}`}>{children}</p>;
}

export default function BeringerContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Beringer logo"
                width={56}
                height={56}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Beringer</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientBeringer)"></path>
                  <defs>
                    <linearGradient id="badgeGradientBeringer" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>187</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                3.8
              </span>
              <span className="text-stone-500">277,051 total ratings</span>
            </div>

            <Link
              href="/search?q=Beringer"
              className="inline-flex h-8 w-full items-center justify-center rounded-full bg-[#1e1e1e] text-xs font-semibold text-white transition hover:bg-black sm:h-9"
            >
              View wines
            </Link>
          </section>

          {/* Details Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <Row
              label="Country"
              value={
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full border border-stone-200">
                    <span className="block h-full w-full bg-[#3c3b6e] text-center text-[7px] leading-3 text-white">🇺🇸</span>
                  </span>
                  United States
                </span>
              }
              icon={<Globe className="h-4 w-4" />}
            />
            <Row
              label="Region"
              value="St. Helena"
              icon={<Mountain className="h-4 w-4" />}
            />
            <Row
              label="Winemaker"
              value="Margo Van Staaveren"
              icon={<User className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value={
                <a
                  href="http://www.tweglobal.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Treasury Wine Estates
                </a>
              }
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://www.beringer.com/?utm_source=vivino&utm_campaign=website"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-stone-500" />
                Website
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <a
              href="https://www.instagram.com/beringervyds/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-[8px] font-bold text-white">IG</span>
                Instagram
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <a
              href="https://www.facebook.com/beringervineyards"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-stone-900 text-[9px] font-bold text-white">f</span>
                Facebook
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <a
              href="https://twitter.com/beringervyds"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-stone-900 text-[9px] font-bold text-white">𝕏</span>
                X
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800">
              <Phone className="h-3.5 w-3.5 text-stone-500" />
              <span>(707) 302-7592</span>
            </div>

            <a
              href="mailto:cs_beringer@beringer.com"
              className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <Mail className="h-3.5 w-3.5 text-stone-500" />
              <span>Winery Email</span>
            </a>
          </section>
        </aside>

        {/* Right Article & Content */}
        <article className="space-y-4 rounded-md border border-stone-200 bg-white p-3 sm:space-y-6 sm:p-5">
          {/* Hero Banner */}
          <div className="overflow-hidden rounded-md">
            <Image
              src={images.hero}
              alt="Historic Rhine House Victorian mansion with lush gardens and fountain at Beringer Vineyards"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <Paragraph>
            With 145 years of innovation, heritage, and unmatched quality, Beringer stands as Napa Valley’s most iconic and enduring winery.
          </Paragraph>

          <StoryImage
            src={images.story1}
            alt="Bottle of Beringer Private Reserve Cabernet Sauvignon with glass in front of the historic Rhine House"
          />

          <Paragraph>
            Founded in 1876 by brothers Jacob and Frederick Beringer, the estate pioneered many Napa Valley firsts—from gravity-fed winemaking and hand-dug caves to launching the region’s very first public wine tours in 1934. This bold, visionary spirit earned Beringer a historic distinction: the only winery to have both a red and a white named #1 Wine of the Year by Wine Spectator.
          </Paragraph>

          <StoryImage
            src={images.story2}
            alt="Atmospheric underground barrel cellar with grand wood chandeliers and wine tasting table"
          />

          <Paragraph>
            Today, Beringer remains a cornerstone of American wine, stewarding a collection of sustainably farmed vineyards across Napa and Sonoma’s Knights Valley. At the helm is Chief Winemaker Ryan Rech, guiding each bottle with a philosophy rooted in authenticity: “<em>Never ask a wine to masquerade as something it’s not.</em>”
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Beringer wine bottles and glasses around a cozy modern outdoor firepit lounge"
          />

          <Paragraph>
            A walk through Beringer’s historic estate—graced with 19th-century architecture and lush gardens—is a journey through Napa’s past. Designated a National Historic District, it remains one of California’s most treasured wine destinations.
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Friends toasting with red wine glasses at a bright banquet table adorned with white flowers"
          />

          <Paragraph>
            Raise a glass to 145 years of Napa Valley legacy—best enjoyed through a classic Beringer Cabernet Sauvignon or Chardonnay.
          </Paragraph>

          <div className="space-y-1.5 pt-1 text-[11px] font-semibold text-[#8b1527] sm:text-xs">
            <div>
              <a
                href="http://www.beringer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Beringer Website
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/beringervyds/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
