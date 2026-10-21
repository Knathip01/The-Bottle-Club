import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, User } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/1500/logos/eSfKi57iSvSOAWDystqCJQ_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/MksYqncySRKTitDky6EpSg_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/1500_francisfordcoppola/1500_francisfordcoppolawinery_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/1500_francisfordcoppola/1500_francisfordcoppolawinery_2_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/1500_francisfordcoppola/1500_francisfordcoppolawinery_3_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/1500_francisfordcoppola/1500_francisfordcoppolawinery_4_2560x1520.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/1500_francisfordcoppola/1500_francisfordcoppolawinery_5_2560x1520.jpg',
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

export default function FrancisFordCoppolaWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Francis Ford Coppola Winery logo"
                width={56}
                height={56}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Francis Ford Coppola Winery</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientCoppola)"></path>
                  <defs>
                    <linearGradient id="badgeGradientCoppola" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>177</strong> Wines</span>
            </div>

            <Link
              href="/search?q=Francis%20Ford%20Coppola"
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
                <Link href="/product?country=United%20States" className="inline-flex items-center gap-1.5 hover:underline">
                  <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full border border-stone-200">
                    <span className="block h-full w-full bg-[#3c3b6e] text-center text-[7px] leading-3 text-white">🇺🇸</span>
                  </span>
                  United States
                </Link>
              }
              icon={<Globe className="h-4 w-4" />}
            />
            <Row
              label="Winemaker"
              value="Andrea Card"
              icon={<User className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value={
                <a
                  href="http://www.delicato.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Delicato Family Wines
                </a>
              }
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://francisfordcoppolawinery.com"
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
              href="https://www.instagram.com/coppolawine/"
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
              href="https://www.facebook.com/coppolawine"
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
              href="https://twitter.com/CoppolaWine"
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
              <span>(707) 857-1484</span>
            </div>

            <a
              href="mailto:service@francisfordcoppolawinery.com"
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
              alt="Ornate iron gate framing vineyard view in Sonoma County at Francis Ford Coppola Winery"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="pt-1">
            <h2 className="text-xs font-bold text-stone-900 sm:text-base">More than you ever dreamed a winery could be.</h2>
          </div>

          <Paragraph>
            Born from Francis Ford Coppola’s passion for storytelling, our winery blends the magic of cinema with the breathtaking allure of Sonoma County. Here our wine is crafted like a great film: layered, careful, expressive and grounded in personal identity. It’s meant to be shared, discussed, visited and revisited.
          </Paragraph>

          <StoryImage
            src={images.story1}
            alt="Francis Ford Coppola Winery estate with pyramid pavilion tower and grand outdoor stairway"
          />

          <Paragraph>
            Among the many attractions at the property, Francis Ford Coppola Winery features a wine tasting bar, two restaurants, swimming pools, a movie gallery, a performing arts pavilion, and a park area with game tables and bocce courts.
          </Paragraph>

          <StoryImage
            src={images.story2}
            alt="Movie gallery inside the winery displaying the iconic red 1948 Tucker automobile beneath curved staircase"
          />

          <div className="pt-1">
            <h3 className="text-xs font-bold text-stone-900 sm:text-sm">Tradition and Flavor at the Coppola Table</h3>
          </div>

          <Paragraph>
            At Rustic, the spirit of Francis Ford Coppola’s childhood table lives on – where food, wine and conversation are inseparable. Raised with homemade pastas, hearty sauces and his grandfather’s wine from the cellar, Francis believed meals should nourish both body and story.
          </Paragraph>

          <Paragraph>
            Today, Executive Chef Tim Bodell carries that tradition forward with wood-fired classics, global flavors and seasonal Sonoma ingredients—crafted to pair seamlessly with Coppola wines. Whether you’re a local craving something fresh or visiting wine country for the first time, Rustic is where tradition meets modern Sonoma hospitality.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Scenic outdoor terrace seating at Rustic restaurant overlooking Sonoma vineyards"
          />

          <Paragraph>
            Francis puts it best, saying the winery is meant to be &quot;a wine wonderland, a park of pleasure where people of all ages can enjoy all the best things in life – food, wine, music, dancing, games, swimming, and performances of all types. A place to celebrate the love of life.&quot;
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Resort-style pool area with sun loungers and cabanas surrounded by lush Sonoma hills"
          />

          <div className="pt-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 sm:text-sm">WONDERLAND AWAITS.</h3>
          </div>

          <Paragraph>
            “I wanted family‑friendly venues… a wine wonderland of sorts. To be a park of pleasure where everyone can enjoy the best things in life. Enjoy food, wine, music, dancing, games, swimming, performances of all types. A place to celebrate the love of life.”– Francis Ford Coppola
          </Paragraph>

          <StoryImage
            src={images.story5}
            alt="Outdoor performing arts pavilion stage with flags and teepee tent under summer sky"
          />
        </article>
      </div>
    </div>
  );
}
