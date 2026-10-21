import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/DFykfsxLTsaA1qP0sY1SIQ_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/217805_lapruina/217805_lapruina_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/217805_lapruina/217805_lapruina_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/217805_lapruina/217805_lapruina_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/217805_lapruina/217805_lapruina_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/217805_lapruina/217805_lapruina_5_2560x1520.jpg',
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
    <Image
      src={src}
      alt={alt}
      width={1280}
      height={760}
      unoptimized
      className="h-auto w-full rounded-md object-cover"
    />
  );
}

function Paragraph({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px] ${className}`}>{children}</p>;
}

export default function LaPruinaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/217805/logos/zyB5o7GSRBmhaIT17iuFQg.jpeg"
                alt="La Pruina logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">La Pruina</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>27</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.2</b>
                </span>
                <span className="hidden sm:inline">8,006 total ratings</span>
                <span className="sm:hidden">8,006 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=La%20Pruina"
              className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs"
            >
              View wines
            </Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row
                label="Country"
                value={
                  <a href="https://www.vivino.com/en/explore/countries/italy" className="hover:underline">
                    Italy
                  </a>
                }
                icon={<span>🇮🇹</span>}
              />
              <Row
                label="Region"
                value={
                  <a href="https://www.vivino.com/en/explore/regions/puglia" className="hover:underline">
                    Puglia
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row
                label="Winemaker"
                value="La Pruina"
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                }
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.lapruinavini.com/it/home.html"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <Globe size={14} />
                Website
              </span>
              <ExternalLink size={11} />
            </a>
            <a
              href="https://www.instagram.com/lapruinavini/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                Instagram
              </span>
              <ExternalLink size={11} />
            </a>
            <a
              href="https://www.facebook.com/lapruinavini"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:+393483630005" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +39 348 363 0005
            </a>
            <a href="mailto:valentina@lapruinavini.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1.5 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          {/* Hero Banner Image */}
          <StoryImage
            src={images.hero}
            alt="La Pruina family celebrating harvest in the vineyard"
          />

          {/* Section 1: Story Image 1 & Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="La Pruina family members raising hands together in Puglia vineyard"
            />
            <Paragraph>
              La Pruina Vini was born in Torre Santa Susanna, in the heart of Salento, Puglia. Since the 1980s, Grandpa Pietro has passionately cultivated grapes from native vines, and his love for the land has been passed down to us, his children. Inspired by this legacy, the winery set out to give their land’s fruits a distinctive identity, ultimately transforming our grapes into wine and bottling under the name &quot;La Pruina.&quot; Over the years, the team has grown, dedicating itself to a variety of projects, expanding its range of wines, and reaching international markets. Today, La Pruina is proud to have received prestigious accolades from renowned wine critics and international guides.
            </Paragraph>
          </div>

          {/* Section 2: Story Image 2 & Paragraphs 2 & 3 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image2}
              alt="Traditional alberello pugliese bush vines with ripe dark grapes"
            />
            <Paragraph>
              Their vision of wine is captured in the word PRUINA, the natural waxy coating that protects our grape berries from the scorching summer sun. This symbolic layer represents the winery’s production philosophy rooted in manual care, environmental respect, and the preservation of the heritage. Their oldest vineyards are cultivated using the traditional alberello pugliese method, an ancient practice that yields small quantities but results in exceptional grape concentration and flavor.
            </Paragraph>
            <Paragraph>
              Harvest season is a celebration, a time when family and friends come together to carefully handpick the finest grapes. This collective dedication drives our winemaking journey, ensuring the highest quality and elegance in every bottle.
            </Paragraph>
          </div>

          {/* Section 3: Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image3}
              alt="Bottles of La Pruina wine with presentation gift box on stone"
            />
            <Paragraph>
              From these intensely concentrated grapes, the winery crafts wines that are the essence of the Apulian winemaking tradition. The &quot;Classics&quot; line includes rich, full-bodied wines such as Primitivo di Manduria, Negroamaro, and Malvasia Bianca. Each bottle is a testament to our commitment to quality, from the meticulous care in the vineyard to the refined elegance of the packaging.
            </Paragraph>
          </div>

          {/* Section 4: Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image4}
              alt="Woman holding a bottle of La Pruina wine and a glass of red wine"
            />
            <Paragraph>
              For those seeking a touch of exclusivity, the &quot;Luxury&quot; line offers premium wines made from grapes sourced from single vineyards and produced in limited quantities, embodying sophistication in every sip.
            </Paragraph>
          </div>

          {/* Section 5: Story Image 5 & Paragraph 6 & Bottom Link */}
          <div className="space-y-1 pt-2 pb-1">
            <StoryImage
              src={images.image5}
              alt="Three bottles of La Pruina wine displayed with fresh grapefruit"
            />
            <Paragraph>
              Always pushing the boundaries, La Pruina has also introduced its “Innovative&quot; line, created to meet the evolving needs of today’s wine enthusiasts. This range includes vegan wines, sulfite-free options, and sparkling wines crafted using the ancestral method, reflecting their ongoing passion for research and innovation.
            </Paragraph>
            <div className="pt-2">
              <a
                href="https://www.lapruinavini.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[#a11a1a] hover:underline font-semibold text-[11px] sm:text-[14px]"
              >
                La Pruina
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
