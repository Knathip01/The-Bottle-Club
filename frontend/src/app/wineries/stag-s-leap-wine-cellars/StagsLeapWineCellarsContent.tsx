import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star, User } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/11184/logos/IcrWWrCMT5GF-381Z_9buw_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/Bo01eGhtQZmIJ5vgzpPa3Q_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/11184_stagsleap/11184_stagsleap_1new_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/11184_stagsleap/11184_stagsleap_2new_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/11184_stagsleap/11184_stagsleap_3new_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/11184_stagsleap/11184_stagsleap_4new_2560x1520.jpg',
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

export default function StagsLeapWineCellarsContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white sm:mx-0 sm:h-16 sm:w-16">
              <Image
                src={images.logo}
                alt="Stags' Leap logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Stags&#39; Leap</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientStagsLeap)"></path>
                  <defs>
                    <linearGradient id="badgeGradientStagsLeap" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>40</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.2
              </span>
              <span className="text-stone-500">155,481 total ratings</span>
            </div>

            <Link
              href="/search?q=Stags%27%20Leap"
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
              value="Ludovic Dervin"
              icon={<User className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value="Treasury Wine Estates"
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://www.stagsleap.com/?utm_source=vivino&utm_campaign=websit"
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
              href="https://www.facebook.com/stagsleapwinery"
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
              href="https://x.com/stagsleapwines"
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
              <span>800-395-2441</span>
            </div>

            <a
              href="mailto:cs_stags@stagsleap.com"
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
              alt="Outdoor porch with wicker chairs and stone pillars overlooking Napa Valley mountains"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <StoryImage
            src={images.story1}
            alt="Couple walking down garden path with glasses of wine and palm trees at Stags' Leap estate"
          />

          <div>
            <h4 className="text-sm font-bold text-stone-900 sm:text-base">Vineyard</h4>
            <Paragraph>
              Nestled inside a micro-valley within Napa Valley, the Stags’ Leap estate vineyard is renowned for the sheer volume of rock it contains and the effect that has on the climate and wine that’s grown there. The Palisades offer protection from the harsh early morning sun and, after sunset, retain warmth to share with the vines, while also funneling cool marine air from San Pablo Bay. Soil eroded from the rock merges with ancient river sediment, enriching the valley floor. All providing an environment perfectly suited to long, slow grape ripening and the creation of complex, elegant wine.
            </Paragraph>
          </div>

          <StoryImage
            src={images.story2}
            alt="Winemaker Ludovic Dervin in front of the historic stone Manor House with stone tower"
          />

          <div>
            <h4 className="text-sm font-bold text-stone-900 sm:text-base">Winemaker</h4>
            <Paragraph>
              A native of the Champagne region, Ludovic Dervin was always drawn to the people, culture, and complexity of winemaking. He initially studied microbiology, but soon found his way back to his true calling. After earning his viticulture and winemaking degree at the University of Reims, he immersed himself in the industry, making wine in Greece, South Africa, Canada, California, Australia, and New Zealand. Ludovic now exploring his passion for Napa Valley as General Manager and Senior Winemaker for Stags’ Leap Winery.
            </Paragraph>
          </div>

          <StoryImage
            src={images.story3}
            alt="Wooden crate filled with bottles of Stags' Leap wine surrounded by sunflowers on stone terrace"
          />

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-stone-900 sm:text-base">125 YEARS PIONEERING THE STAGS LEAP DISTRICT:</h4>
            <Paragraph>
              Since our first vintage in 1893, Stags’ Leap Winery has inspired the creation of the AVA that bears our name and has become the foremost producer of Napa Valley Petite Sirah and a leading producer of Napa Valley Cabernet Sauvignon.
            </Paragraph>
          </div>

          <StoryImage
            src={images.story4}
            alt="Stone balcony with wicker seating and wine bottle overlooking the valley and vineyards"
          />

          <div>
            <h4 className="mb-2 text-sm font-bold text-stone-900 sm:text-base">Featured Accolades</h4>
            <div className="space-y-1.5 text-[11px] text-[#242424] sm:text-[13px]">
              <p>Cabernet Sauvignon - Napa Valley 2020: <strong>93 points</strong> James Suckling (2023)</p>
              <p>Petite Sirah - Napa Valley 2019: <strong>94 points</strong> James Suckling (2023)</p>
              <p>Petite Sirah - Ne Cede Malis 2018: <strong>96 points</strong> James Suckling (2022)</p>
              <p>Red Blend - The Investor 2019: <strong>95 points</strong> James Suckling (June 2022)</p>
              <p>Cabernet Sauvignon - Audentia 2018: <strong>96 points</strong> Wine Advocate (2021)</p>
              <p>Chardonnay - Napa Valley 2019: <strong>90 points</strong> Wine Advocate (2020)</p>
              <p>Chardonnay - Napa Valley 2017: <strong>95 points</strong> James Suckling (2019)</p>
              <p className="pt-1 font-medium text-stone-600">Wine &amp; Spirits Top 100 Winery: 2013, 2014, 2018 &amp; 2019</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
