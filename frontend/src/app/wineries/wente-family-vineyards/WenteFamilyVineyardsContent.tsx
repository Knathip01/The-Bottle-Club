import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star, User } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/2045/logos/OErLRuDVRfuN3Gh3XwNXCQ_500x500.png',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/cKH-7THZRge7jeK2yrDnmw_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/2045_wente_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/2045_Wente/2045_wente_2.1.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/2045_wente_3_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/2045_wente_4_2560x1520.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/2045_wente_2.jpg',
  story6: 'https://images.vivino.com/misc/sponsorships/2045_wente_6_2560x1520.jpg',
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
  return <p className={`px-0.5 py-1 text-[11px] leading-[1.5] text-[#242424] sm:text-[13.5px] ${className}`}>{children}</p>;
}

export default function WenteFamilyVineyardsContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white sm:mx-0 sm:h-16 sm:w-16">
              <Image
                src={images.logo}
                alt="Wente Family Vineyards logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Wente Family Vineyards</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientWente)"></path>
                  <defs>
                    <linearGradient id="badgeGradientWente" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>120</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                3.8
              </span>
              <span className="text-stone-500">124,401 total ratings</span>
            </div>

            <Link
              href="/search?q=Wente%20Family%20Vineyards"
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
              value="Livermore Valley"
              icon={<Mountain className="h-4 w-4" />}
            />
            <Row
              label="Winemaker"
              value="Wente Vineyards"
              icon={<User className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="http://www.wentevineyards.com"
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
              href="https://www.instagram.com/wente"
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
              href="https://www.facebook.com/WenteVineyards"
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
              href="https://x.com/Wente"
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
              <span>925-456-2300</span>
            </div>

            <a
              href="mailto:email@wentevineyards.com"
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
              alt="Historic Spanish Mission style winery building with white facade and large oak tree"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <StoryImage
            src={images.story1}
            alt="Fourth and fifth generations of the Wente family gathered together in front of the winery estate"
          />

          <Paragraph>
            Wente Family Vineyards is the longest, continuously operated family-owned winery in the United States. Today, the winery maintains its leadership role in California winegrowing under ownership and management by the fourth and fifth generations of the Wente family.
          </Paragraph>

          <StoryImage
            src={images.story2}
            alt="Four bottles of Wente wine displayed on a marble mantel with fresh floral arrangement and vintage wine book"
          />

          <Paragraph>
            Blending traditional and innovative winemaking practices, the winery draws from certified sustainable vineyards in the Central Coast of California, including Livermore Valley and Arroyo Seco, Monterey, appellations to create an outstanding portfolio of fine wines.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Ripe purple wine grapes hanging on vines in the foreground with sunlit rolling vineyard hills"
          />

          <Paragraph>
            For five generations, sustainable farming has been rooted in the Wente family. Every year, the winery sets out to continuously improve its sustainability action plan and measures. In 2022 the winery received the Green Medal Leader award for its dedication and leadership in sustainable practices
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Winemaker and grower inspecting Chardonnay grapevines during golden hour"
          />

          <Paragraph>
            The Wente family is widely regarded as California&#39;s First Family of Chardonnay. In 1912, 2nd Generation Winegrower Ernest Wente worked with Chardonnay cuttings from the vine nursery at the University of Montpellier in France to the Livermore Valley to create the Wente Clone of Chardonnay. Today, roughly 75% of all California Chardonnay is derived from the Wente Clone.
          </Paragraph>

          <StoryImage
            src={images.story5}
            alt="Beautiful dining table set with chilled Wente Chardonnay, gourmet cheese, grapes, and florals"
          />

          <Paragraph>
            Wente Family Vineyards draws from two-world class wine regions in the Central Coast of California to create a diverse selection of wine. From our Coastal Vineyard Series, Riva Ranch Series, Legacy Series, and nth DEGREE, there is a wine for every palate and consumer. A selection of their wines can be found in over 75 countries.
          </Paragraph>

          <StoryImage
            src={images.story6}
            alt="Friends laughing and enjoying a wine flight and charcuterie on the outdoor patio terrace"
          />

          <Paragraph>
            Located just east of San Francisco in the historic Livermore Valley, Wente Family Vineyards is recognized as one of California’s premier wine country destinations, featuring wine tasting, food and wine experiences, and championship golf.
          </Paragraph>

          <div className="pt-1">
            <a
              href="https://wentevineyards.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#8b1527] underline transition hover:text-stone-950 sm:text-sm"
            >
              Visit the Wente winery website
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
