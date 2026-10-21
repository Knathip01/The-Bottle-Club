import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/9094/logos/LiuoRvDkSUuOsmP3aN7x4w.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/Js696N8NTnqwLeGLiYXEkw_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/9094_ysios/9094_ysios_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/9094_ysios/9094_ysios_2_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/9094_ysios/9094_ysios_3_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/9094_ysios/9094_ysios_4_2560x1520.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/9094_ysios/9094_ysios_5_2560x1520.jpg',
  story6: 'https://images.vivino.com/misc/sponsorships/9094_ysios/9094_ysios_6_2560x1520.jpg',
  story7: 'https://images.vivino.com/misc/sponsorships/9094_ysios/9094_ysios_7_2560x1520.jpg',
  story8: 'https://images.vivino.com/misc/sponsorships/9094_ysios/9094_ysios_8_2560x1520.jpg',
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

export default function YsiosContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Ysios logo"
                width={56}
                height={56}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Ysios</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientYsios)"></path>
                  <defs>
                    <linearGradient id="badgeGradientYsios" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>23</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.1
              </span>
              <span className="text-stone-500">12,740 total ratings</span>
            </div>

            <Link
              href="/search?q=Ysios"
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
              label="Owned by"
              value="Vinarchy"
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="http://www.clubysios.com"
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
              href="https://x.com/bodegasysios"
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
              <span>34 945 600 640</span>
            </div>

            <a
              href="mailto:ysios@domecqbodegas.com"
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
              alt="Bodegas Ysios undulating Calatrava architecture and vineyards in Rioja Alavesa"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <StoryImage
            src={images.story1}
            alt="Bodegas Ysios architectural facade rising toward Sierra Cantabria mountains"
          />

          <div>
            <h2 className="text-xs font-bold text-stone-900 sm:text-base">Distinctive Connections. Remarkable wines.</h2>
            <Paragraph className="mt-1">
              Bodegas Ysios is located in the heart of Rioja Alavesa in the foothills of the Sierra Cantabria, and our vineyards enjoy all the benefits provided by this land for producing the highest quality grapes. The intense personal connection with the land, our micro cultivation philosophy and small-batch winemaking approach let us craft remarkable wines that showcase a distinctive expression of our region, terroir and heritage.
            </Paragraph>
          </div>

          <StoryImage
            src={images.story2}
            alt="Traditional horse ploughing century-old vines in Ysios Rioja Alavesa vineyards"
          />

          <Paragraph>
            We explore every variable in incredible depth and by understanding the diversity that contributes to our wines, we can go further and find distinctive connections to express the unique qualities of our region. We look to the future with confidence, honouring our heritage.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Long rows of oak casks resting in the Ysios barrel aging hall"
          />

          <Paragraph>
            In pursuit of upmost quality in grapes, we use methods handed down through the generations. Vines that are over 100 years old are lasting proof of the wisdom of our grandparents and great-grandparents who planted them.
          </Paragraph>

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="overflow-hidden rounded-md">
              <Image
                src={images.story4}
                alt="Ysios Blanco wine bottle label detail"
                width={640}
                height={400}
                unoptimized
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-md">
              <Image
                src={images.story5}
                alt="Ysios Selección wine bottle label detail"
                width={640}
                height={400}
                unoptimized
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          <Paragraph>
            A state-of-the-art boutique winery in complete harmony with the landscape and devoted to craft wines that are honest to the terroir. Our boutique approach to winemaking lets us cultivate intensely personal connections with our vineyards, allowing us to craft remarkable expressions of our region terroir.
          </Paragraph>

          <StoryImage
            src={images.story6}
            alt="Magnificent curved circular barrel cellar with dramatic modern lighting"
          />

          <div>
            <h2 className="text-xs font-bold text-stone-900 sm:text-base">Cultivate the Remarkable.</h2>
            <Paragraph className="mt-1">
              It is only through nurturing connections that we become enriched, we progress, we are refined, we enhance our lives. The intensely personal connections we develop nourish our life and in turn help us cultivate something remarkable. At Ysios, we capture the distinctive expressions of Rioja Alavesa terroirs by unlocking the secrets hidden within the soils of each of our small plot vineyards.
            </Paragraph>
          </div>

          <StoryImage
            src={images.story7}
            alt="Frontal shot of the iconic undulating Ysios winery against the mountain backdrop"
          />

          <Paragraph>
            Electing the exact moment to hand-pick the best grapes from distinctive lots of clay-limestone earth — carefully connected with our avant-garde winemaking mindset. It is this intense personal connection with each small lot vineyard framed by the backdrop of the majestic landscape that showcases the remarkable at Ysios.
          </Paragraph>

          <StoryImage
            src={images.story8}
            alt="Ysios sculptural roofline cresting above lush grapevines under dramatic clouds"
          />
        </article>
      </div>
    </div>
  );
}
