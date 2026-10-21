import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/15201/logos/TF244xxkShWpVQA-UnABGA_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/-35WLuHfRtq77lE6_ZHZfQ_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/15201_loalto_2.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/15201_loalto_3.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/15201_loalto_4.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/15201_loalto_5.jpg',
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

export default function LoAltoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="LoAlto logo"
                width={56}
                height={56}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">LoAlto</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientLoAlto)"></path>
                  <defs>
                    <linearGradient id="badgeGradientLoAlto" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>6</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                3.9
              </span>
              <span className="text-stone-500">434 total ratings</span>
            </div>

            <Link
              href="/search?q=LoAlto"
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
                    <span className="block h-full w-full bg-[#c60b1e] text-center text-[7px] leading-3 text-yellow-300">🇪🇸</span>
                  </span>
                  Spain
                </span>
              }
              icon={<Globe className="h-4 w-4" />}
            />
            <Row
              label="Region"
              value="Utiel-Requena"
              icon={<Mountain className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value={
                <a
                  href="https://www.schenk-wine.ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Schenk
                </a>
              }
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://casaloalto.com/"
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
              href="https://www.instagram.com/_loalto_/"
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
              <span>(+34) 96 340 02 20</span>
            </div>

            <a
              href="mailto:murviedro@murviedro.es"
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
              alt="Panoramic view over Casa LoAlto vineyard landscape in Requena–Utiel"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="pt-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 sm:text-sm">THE STORY</h2>
          </div>

          <Paragraph>
            LoAlto, the inhabited landscape, is a reference wine project in the Requena–Utiel region, based on respectful, ecological viticulture focused on quality. The estate is home to the historic Casa LoAlto, located on a hill in Venta del Moro (hence its name, “LoAlto”), at 750 meters above sea level, in a privileged setting in inland Valencia.
          </Paragraph>

          <Paragraph>
            The project is set within a unique 150-hectare wine-growing landscape where vineyards, almond trees, and Mediterranean forest coexist. It is a living ecosystem where agriculture and nature are fully integrated.
          </Paragraph>

          <StoryImage
            src={images.story1}
            alt="LoAlto scenic vineyard with sweeping Mediterranean forest landscape under cloudy sky"
          />

          <Paragraph>
            LoAlto’s philosophy is based on producing wines with Mediterranean character, using a sustainable and minimal-intervention approach. The project is committed to ecological viticulture that fully respects the environment, eliminating synthetic chemicals to preserve soil biodiversity and its natural balance.
          </Paragraph>

          <Paragraph>
            In the winery, minimal intervention allows each wine to reflect its origin and individual vineyard with the greatest possible authenticity.
          </Paragraph>

          <StoryImage
            src={images.story2}
            alt="Vineyard rows cultivated in rich red soil bordered by trees at Casa LoAlto"
          />

          <Paragraph>
            Juanjo Muñoz, winemaker at LoAlto, advocates for a winemaking model that revives tradition to demonstrate that excellence is only possible through respect for the land.
          </Paragraph>

          <Paragraph>
            An Agricultural Technical Engineer and expert in enology and viticulture, Juanjo Muñoz has developed an international career in renowned regions such as Bordeaux, Australia, and Chile, experiences that have enriched his vision of wine and vineyard management.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Casa LoAlto winery exterior with the distinctive circular wheel logo and signature wine bottle"
          />

          <Paragraph>
            The winery&#39;s logo represents Finca Casa LoAlto. It consists of two concentric circles: the inner circle is the winery, surrounded by an outer circle that represents the estate of vineyards, almond trees, and forest, with the divisions of our six wines representing the most representative plots of the inhabited landscape.
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Young vines planted in straight rows in limestone-rich soil under an expansive Mediterranean sky"
          />

          <Paragraph>
            The estate’s soils are rich in clay minerals and limestone, contributing structure and minerality, while a continental climate with Mediterranean influence, marked by strong day-night temperature variation, enhances tannin development and complexity in the grapes.
          </Paragraph>

          <Paragraph>
            Winemaking follows a minimal-intervention philosophy, allowing each plot to express its true character through careful harvesting and ageing practices. The result is a portfolio of “landscape wines” that embody the identity of the vineyard and its natural surroundings.
          </Paragraph>

          <Paragraph>
            LoAlto ultimately represents a balance between nature and cultivation, where tradition, sustainability, and terroir come together to produce wines that reflect both Mediterranean character and deep respect for the land.
          </Paragraph>
        </article>
      </div>
    </div>
  );
}
