import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/299589/logos/hcDE4FZDRbi0Oktve7ApMQ_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/07-VYwxbRB617Rh0JJ0DDg_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/299589_pago_de_marinacea/299589_pago_de_marinacea_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/299589_pago_de_marinacea/299589_pago_de_marinacea_2_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/299589_pago_de_marinacea/299589_pago_de_marinacea_3_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/299589_pago_de_marinacea/299589_pago_de_marinacea_4_2560x1520.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/299589_pago_de_marinacea/299589_pago_de_marinacea_5_2560x1520.jpg',
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

export default function PagoDeMarinaceaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Pago de Marinacea logo"
                width={56}
                height={56}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Pago de Marinacea</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientMarinacea)"></path>
                  <defs>
                    <linearGradient id="badgeGradientMarinacea" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>5</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.0
              </span>
              <span className="text-stone-500">124 total ratings</span>
            </div>

            <Link
              href="/search?q=Pago%20de%20Marinacea"
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
              value="Toro"
              icon={<Mountain className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://marinacea.com/?lang=en"
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
          </section>
        </aside>

        {/* Right Article & Content */}
        <article className="space-y-4 rounded-md border border-stone-200 bg-white p-3 sm:space-y-6 sm:p-5">
          {/* Hero Banner */}
          <div className="overflow-hidden rounded-md">
            <Image
              src={images.hero}
              alt="Ancient bush vines in Pago de Marinacea vineyard in Toro"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <StoryImage
            src={images.story1}
            alt="Hand harvesting dark grapes with clippers in the vineyard"
          />

          <Paragraph>
            In the heart of Zamora and in the Rueda countryside, plots with vines between 20 and 120 years old, such as Marinacea, Las Llamas, Las Erasas, or La Cuerda, are the origin of these elegant and highly expressed wines. Inherited from his great-grandparents and passing through grandparents and parents until reaching José Ballesteros, these old strains in organic cultivation, rooted in very poor sandy loam soils, cultivated without pesticides or chemical fertilizers and subjected to an extreme continental climate, give rise to wines with a high concentration of color and great aromatic richness.
          </Paragraph>

          <StoryImage
            src={images.story2}
            alt="Golden sunset over Toro vineyard rows and rolling hills"
          />

          <Paragraph>
            Their sustainable approach protects biodiversity and cares for our environment for future generations with traditional cultivation and production methods combined with other modern techniques. The combination of both reflects the purity of the land and the legacy of winemakers handed down over several generations. This is how they have conceived their DO Toro red wines, resulting in five different red wines.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Winemaker in cellar inspecting oak barrels during maturation"
          />

          <Paragraph>
            Special mention should be made of their ELEGIDO Pago de Marinacea wine, planted in a &quot;Marco Real&quot; (3 x 3 grid) in 1917, on clean, sandy terrain covered with boulders. A poor soil and an exceptional crop that gives it a natural drainage and a thermal balance, thanks to the stones that act as an accumulator of the Sun&#39;s heat.
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Old Tinta de Toro vine trunk with lush leaves and dark ripe grape bunches"
          />

          <Paragraph>
            After a careful selection in the field, with an important thinning of bunches and a manual harvest in boxes of 15 kg, they proceed to a new selection at the table. Spontaneous fermentation with its native yeasts at a controlled temperature of 25º C and malolactic fermentation in new French oak barrels begin a careful and meticulous process that continues over 24 months on its lees, later refined in the bottle for 2 years to give it an extraordinary balance.
          </Paragraph>

          <StoryImage
            src={images.story5}
            alt="Winter landscape with dormant bush vines in rocky soil under misty skies"
          />

          <Paragraph>
            Intense cherry red color, a powerful aroma with accents of black fruits, cocoa, and tobacco leaves, and an elegant and very long, silky flavor. Complex with highly polished tannins. In short, sublime is the best definition that can be given to this great Toro wine, belonging to a limited and numbered edition.
          </Paragraph>

          <div className="pt-1">
            <a
              href="https://marinacea.com/?lang=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-stone-700 underline hover:text-black sm:text-xs"
            >
              Marinacea.com
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
