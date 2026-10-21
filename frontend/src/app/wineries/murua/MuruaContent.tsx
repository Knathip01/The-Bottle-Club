import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/11664/logos/MgfzHLghRc6LL8OySI6OfQ.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/WkUPQVOBQIS0qduZL0WAiQ_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/11664_murua/11664_murua_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/11664_murua/11664_murua_2_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/11664_bodegasmurua_2025/11664_bodegasmurua_3_2560x1520_2025.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/11664_murua/11664_murua_4_2560x1520.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/11664_bodegasmurua_2025/11664_bodegasmurua_5_2560x1520_2025.jpg',
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

export default function MuruaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Murua logo"
                width={56}
                height={56}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Murua</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientMurua)"></path>
                  <defs>
                    <linearGradient id="badgeGradientMurua" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>18</strong> Wines</span>
            </div>

            <Link
              href="/search?q=Murua"
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
              value="Masaveu Bodegas"
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="http://www.bodegasmurua.com"
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
              href="https://www.facebook.com/bodegasmasaveu"
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
              href="https://x.com/MasaveuBodegas"
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
              <span>34 945 606 260</span>
            </div>

            <a
              href="mailto:info@bodegasmurua.com"
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
              alt="Bodegas Murua winery estate in Elciego, Rioja Alavesa"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <StoryImage
            src={images.story1}
            alt="Bodegas Murua picturesque landscape in Rioja Alavesa with church and hills"
          />

          <Paragraph>
            Bodegas Murua is located in the heart of Rioja Alavesa, in the municipality of Elciego, an area with a unique winemaking tradition. Since 1974, Masaveu Bodegas has been crafting exceptional wines here, always from their own vineyards, blending history, quality, and passion for wine.
          </Paragraph>

          <StoryImage
            src={images.story2}
            alt="Murua vineyard rows curved gently along sunny hillside slopes"
          />

          <Paragraph>
            With 51 plots of their own vineyards and 80 hectares in the privileged soils of Rioja Alavesa, Murua cultivates its grapes in the municipalities of Elciego, Laguardia, Villabuena de Álava, Leza, Lanciego, and Navaridas, ensuring wines with identity, character, and unique personality.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Historic wooden box with dusty vintage bottles labelled Murua Rioja"
          />

          <Paragraph>
            Murua&apos;s nearly century-old vines give birth to wines with soul. The star variety is tempranillo, used to create true gems such as M de Murua, 100% tempranillo, or Murua Reserva, the winery&apos;s great reference.
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Murua barrel aging cellar with long rows of premium oak casks"
          />

          <Paragraph>
            Moreover, Murua blends tradition and innovation with native varieties. For whites, viura, garnacha blanca, and malvasía bring Murua Blanco Fermentado en Barrica to life. For reds, graciano, mazuelo, and garnacha add complexity to wines such as VS Murua and Veguín de Murua Gran Reserva, made only in exceptional vintages.
          </Paragraph>

          <StoryImage
            src={images.story5}
            alt="Winemaker tasting wine from glass beside oak aging barrels"
          />

          <Paragraph>
            To experience Murua, the winery offers enotourism activities designed to immerse visitors in its world, discover its wines, and enjoy a unique setting. A sensory journey for those seeking more than just a glass of wine: a story, an emotion, and an unforgettable taste.
          </Paragraph>

          {/* Links Section */}
          <div className="space-y-1 pt-1 text-[11px] sm:text-xs">
            <div>
              <a
                href="https://bodegasmurua.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#b31412] hover:underline"
              >
                Murua Wineries
              </a>
            </div>
            <div>
              <a
                href="https://bodegasmurua.com/el-vinedo/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#b31412] hover:underline"
              >
                Vineyard
              </a>
            </div>
            <div>
              <a
                href="https://bodegasmurua.com/collections/?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#b31412] hover:underline"
              >
                Collections
              </a>
            </div>
            <div>
              <a
                href="https://bodegasmurua.com/visits/?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#b31412] hover:underline"
              >
                Wine Tourism
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
