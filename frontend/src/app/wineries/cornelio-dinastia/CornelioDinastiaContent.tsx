import Image from 'next/image';
import Link from 'next/link';
import { Compass, ExternalLink, Globe, Mail, Mountain, Phone } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/226418/logos/8z2cDlf1R6iVwK5uN6k-Ww_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/NzST5hi_Rbqpk4KEyz2bYg_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/226418_bodegas_cornelio_dinastia/226418_bodegas_cornelio_dinastia_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/226418_bodegas_cornelio_dinastia/226418_bodegas_cornelio_dinastia_2_2560x3040.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/226418_bodegas_cornelio_dinastia/226418_bodegas_cornelio_dinastia_3_2560x3040.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/226418_bodegas_cornelio_dinastia/226418_bodegas_cornelio_dinastia_4_2560x1520.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/226418_bodegas_cornelio_dinastia/226418_bodegas_cornelio_dinastia_5_2560x1520.jpg',
  cert: 'https://images.vivino.com/misc/sponsorships/Cornelia_OCM.jpg',
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

export default function CornelioDinastiaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Cornelio Dinastía logo"
                width={56}
                height={56}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Cornelio Dinastía</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientCornelio)"></path>
                  <defs>
                    <linearGradient id="badgeGradientCornelio" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>31</strong> Wines</span>
            </div>

            <Link
              href="/search?q=Cornelio%20Dinast%C3%ADa"
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
                <Link href="/product?country=Spain" className="inline-flex items-center gap-1.5 hover:underline">
                  <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full border border-stone-200">
                    <span className="block h-full w-full bg-[#c60b1e] text-center text-[7px] leading-3 text-yellow-300">🇪🇸</span>
                  </span>
                  Spain
                </Link>
              }
              icon={<Globe className="h-4 w-4" />}
            />
            <Row
              label="Winemaker"
              value="José María Pangua"
              icon={<Compass className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="http://bodegascornelio.com/"
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
              href="https://www.instagram.com/bodegascornelio/"
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

            <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800">
              <Phone className="h-3.5 w-3.5 text-stone-500" />
              <span>0034 941 74 22 49</span>
            </div>

            <a
              href="mailto:info@bodegascornelio.es"
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
              alt="Bodegas Cornelio Dinastía winery and vineyard in Rioja Alta"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <StoryImage
            src={images.story1}
            alt="Old-growth bush vines of Bodegas Cornelio Dinastía in Rioja with tractor cultivating soil"
          />

          <Paragraph>
            The history of the Sánchez Antón family in viticulture dates back to 1820. It was then that the family&#39;s ancestors began to cultivate vines in various areas of the Alto Turia in Spain.
          </Paragraph>

          <StoryImage
            src={images.story2}
            alt="Cornelio Dinastía winemaker carefully tending to organic grape vines"
          />

          <Paragraph>
            100% of wines are obtained from organic farming.​ Everyone knows that organic farming is the future of food. ​At Bodegas Cornelio Dinastía they think it is the present.​ For this reason, Vega Vella wines are 100% made as organic wine with the guarantee of the Rioja Qualified Designation of Origin.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Hand-harvesting selected clusters of organic Tempranillo grapes"
          />

          <Paragraph>
            At Bodegas Cornelio Dinastía, prevention plays a crucial role in maintaining healthy soil and balanced plants. There is an intrinsic alliance with nature, a symbiosis that promotes life in the surrounding ecosystems.
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Bodegas Cornelio Dinastía barrel aging cellar with oak casks"
          />

          <Paragraph>
            This symbiotic relationship with the local fauna and flora helps prevent the appearance of fungal diseases, thus ensuring the health and vitality of their vineyards. This is an integral part of their commitment to producing wines of the highest quality.
          </Paragraph>

          <StoryImage
            src={images.story5}
            alt="Vega Vella and Cornelio wines lineup in tasting room"
          />

          <Paragraph>
            In short, the history of Bodegas Cornelio Dinastía is a story of passion, heritage, ecology, and dedication to the art of making wine. It is a story that continues to be written with each bottle produced, and that will surely continue to inspire future generations of the Sánchez Antón family.
          </Paragraph>

          {/* Social Follow */}
          <div className="pt-1 text-[11px] sm:text-xs">
            <p>
              <a
                href="https://www.instagram.com/bodegascornelio/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#b31412] hover:underline"
              >
                Follow
              </a>{' '}
              them so you don&#39;t miss anything!
            </p>
          </div>

          {/* Certification Image */}
          <StoryImage
            src={images.cert}
            alt="Bodegas Cornelio Dinastía official quality and organic certification"
          />
        </article>
      </div>
    </div>
  );
}
