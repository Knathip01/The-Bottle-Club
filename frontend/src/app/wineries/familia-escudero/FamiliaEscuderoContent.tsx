import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/28079/logos/anEH77ylSxWMZcejWBr80g.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/b5l0OcPeR1C7ddYrsQ5rDw_2560x1520.jpeg',
  story1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/28079_Familia+Escudero/28079_Familia+Escudero_1.jpg',
  story2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/28079_Familia+Escudero/28079_Familia+Escudero_2.jpg',
  story3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/28079_Familia+Escudero/28079_Familia+Escudero_3.jpg',
  story4: 'https://vivino.s3.amazonaws.com/misc/sponsorships/28079_Familia+Escudero/28079_Familia+Escudero_4.jpg',
  story5: 'https://vivino.s3.amazonaws.com/misc/sponsorships/28079_Familia+Escudero/28079_Familia+Escudero_5.jpg',
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

export default function FamiliaEscuderoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Familia Escudero logo"
                width={56}
                height={56}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Familia Escudero</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientEscudero)"></path>
                  <defs>
                    <linearGradient id="badgeGradientEscudero" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>26</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                3.9
              </span>
              <span className="text-stone-500">14,609 total ratings</span>
            </div>

            <Link
              href="/search?q=Familia%20Escudero"
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
              value="Familia Escudero"
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://www.familiaescudero.com/en/"
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
              href="https://www.instagram.com/familia.escudero/"
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
              href="https://www.facebook.com/FamiliaEscuderoBodegasEscuderoVinsacro"
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

            <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800">
              <Phone className="h-3.5 w-3.5 text-stone-500" />
              <span>+34 941 14 51 05</span>
            </div>

            <a
              href="mailto:info@familiaescudero.com"
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
              alt="Familia Escudero winemakers in the sunny Rioja vineyard"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <Paragraph>
            Familia Escudero’s story began in 1852, when the family started growing vines and making wine in La Rioja. Five generations later, the same family remains behind every step, from vineyard to cellar, carrying forward a way of life built around wine, the land and generations of experience.
          </Paragraph>

          <StoryImage
            src={images.story1}
            alt="Historic mural of Champaña - Vino Rioja de Cosechero Escudero"
          />

          <Paragraph>
            Benito Escudero was a pioneer of sparkling wine in Rioja, beginning to craft traditional-method sparkling wines in the 1950s and later helping establish Cava in the region. Curious and restless, he also created the family’s own Vermouth recipe. His pioneering spirit lives on in the Cavas and Vermouths that bear his name.
          </Paragraph>

          <StoryImage
            src={images.story2}
            alt="Benito Escudero inspecting bottles resting on traditional riddling racks"
          />

          <Paragraph>
            Today, Jesús Escudero, fourth generation, manages the vineyards alongside his nephew and their team. Together, they care for the family’s own organic vineyards across Rioja and Navarra, from 400 to 900 metres above sea level, including century-old vines and vineyards on the slopes of Monte Yerga in Rioja.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Historical photograph of winemaker in extensive organic Rioja vineyards"
          />

          <Paragraph>
            In the cellar, Amador Escudero, fourth generation and winemaker, leads the winemaking alongside the fifth generation. Working exclusively with grapes from the family’s own vineyards gives them control from vine to bottle, crafting wines that reflect their origin while remaining true to the family’s style.
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Winemakers Amador Escudero and fifth generation assessing red wine in glass"
          />

          <Paragraph>
            The fifth generation grew up working in the vineyards and cellar. After gaining experience at wineries in Bordeaux, Champagne and beyond, the fifth generation returned home to continue learning alongside their parents, bringing new ideas while carrying the family’s winemaking tradition into the future.
          </Paragraph>

          <StoryImage
            src={images.story5}
            alt="Three young fifth-generation Escudero winemakers enjoying wine under brick archway"
          />
        </article>
      </div>
    </div>
  );
}
