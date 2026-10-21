import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mountain, Phone } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/311078/logos/TLMNZbVQSeandXK-INViyA_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/6i5YRdklRb-RF9K020iN2A_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/311078_Levitation/311078_Levitation_1.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/311078_Levitation/311078_Levitation_2.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/311078_Levitation/311078_Levitation_3.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/311078_Levitation/311078_Levitation_4.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/311078_Levitation/311078_Levitation_5.jpg',
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

export default function LevitationContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Levitation logo"
                width={56}
                height={56}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Levitation</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientLevitation)"></path>
                  <defs>
                    <linearGradient id="badgeGradientLevitation" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>16</strong> Wines</span>
            </div>

            <Link
              href="/search?q=Levitation"
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
              value="Bodegas Villa Amalia"
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://levitationwine.com/"
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

            <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800">
              <Phone className="h-3.5 w-3.5 text-stone-500" />
              <span>+34 966 07 86 86</span>
            </div>
          </section>
        </aside>

        {/* Right Article & Content */}
        <article className="space-y-4 rounded-md border border-stone-200 bg-white p-3 sm:space-y-6 sm:p-5">
          {/* Hero Banner */}
          <div className="overflow-hidden rounded-md">
            <Image
              src={images.hero}
              alt="Bodegas Villa Amalia estate and cypress trees in golden sunlight"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <Paragraph>
            The story of Villa Amalia begins long before the brand itself existed. In 1992, Vilash Wine was founded in Saint Petersburg by Mashkyur Gasymov, originally from Azerbaijan. Coming from a background in professional sport and later business, he entered the wine world with his brother through importing and distribution. What started as a small family activity gradually grew into a developing wine company shaped by one belief: the future of wine would belong to quality, not volume.
          </Paragraph>

          <StoryImage
            src={images.story1}
            alt="Hilltop estate villa with cypress trees and winding driveway across rolling vineyard landscape"
          />

          <Paragraph>
            As the business grew, so did its ambition. Early on, the company began to shift its focus from trading wine to building a long-term vision around production and quality. This transformation was not sudden, it was a natural evolution driven by passion, dedication, and a desire to create something lasting in the world of wine.
          </Paragraph>

          <StoryImage
            src={images.story2}
            alt="Wine picnic setup in the vineyard with a bottle of chilled wine, glasses, candles, and artisan cheese board"
          />

          <Paragraph>
            In 2012, a new chapter began in Spain. Villa Amalia was founded as the premium expression of the family’s international wine journey. Spain became more than a place of production, it became the emotional home of the family and the brand. Here, experience, identity, and passion for wine came together to create something personal, authentic, and deeply connected to its environment.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Harvest hands gently inspecting clusters of ripe dark grapes on the vine"
          />

          <Paragraph>
            From Spain, the vision expanded internationally. Over time, the family wine group grew across Europe, developing production partnerships in multiple countries across Europe, Asia, Africa, South America, and Oceania, while building a distribution network that reaches far beyond its origins.
          </Paragraph>

          <Paragraph>
            Each step reinforced the same philosophy: respect for quality, consistency, and authenticity in every bottle
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Two bottles of Levitation wine nestled among lush green vineyard vines"
          />

          <Paragraph>
            Today, Villa Amalia is a third-generation family wine project that continues to evolve while staying true to its roots. It is defined not only by its history, but by its people, its journey, and its belief that wine is a universal language. Every bottle reflects this path, from family beginnings, to Spain, to the world, created to be shared, remembered, and felt.
          </Paragraph>

          <StoryImage
            src={images.story5}
            alt="Close-up of rich ripening purple grape clusters hanging on the vine in sunlit vineyard"
          />
        </article>
      </div>
    </div>
  );
}
