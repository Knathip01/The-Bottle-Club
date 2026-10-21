import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/320412/logos/7U40Q4rDRE-cdnqkvt0h6w_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/8eC9UzobRvebiaiGl03B2g_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/320412_ImperialeWinery/320412_ImperialeWinery_1.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/320412_ImperialeWinery/320412_ImperialeWinery_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/320412_ImperialeWinery/320412_ImperialeWinery_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/320412_ImperialeWinery/320412_ImperialeWinery_4.jpg',
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

export default function ImperialeWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Imperiale Winery logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Imperiale Winery</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>5</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.3</b>
                </span>
                <span className="hidden sm:inline">415 total ratings</span>
                <span className="sm:hidden">415 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Imperiale%20Winery"
              className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs"
            >
              View wines
            </Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row
                label="Country"
                value={
                  <Link href="/product?country=Italy" className="hover:underline">Italy</Link>
                }
                icon={<span>🇮🇹</span>}
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://imperialewinery.com/"
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
              href="https://www.instagram.com/imperialewinery/"
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
            <a href="tel:+50769817887" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +507 69817887
            </a>
            <a href="mailto:info@imperialewinery.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
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
            alt="Sunset over Imperiale Winery vineyard rows in Veneto"
          />

          {/* Paragraph 1 */}
          <div className="pt-1">
            <Paragraph>
              Imperiale represents the crystallization of a bold and refined vision within the contemporary wine world. Shaped by extensive experience in international distribution, the brand reflects a profound understanding of what modern consumers seek: diversity, quality, and memorable sensory experiences. Created to blend modern tastes with the soul of winemaking tradition, Imperiale embodies a balance between heritage and innovation. Each wine is crafted to express character, elegance, and consistency, appealing to both curious enthusiasts and seasoned experts. The project extends beyond producing high-quality wines; it aims to deliver a complete experience in which every element—from the vineyard to the bottle design—reflects an unwavering commitment to excellence. Imperiale stands for sophistication, modernity, and refined craftsmanship, positioning itself as an aspiring icon within the premium segment. The brand carries a fearless spirit, driven by innovation and deep respect for winemaking heritage, creating wines that form a dialogue between millennia-old tradition and a forward-looking vision. Each bottle invites wine lovers to explore new heights and discoveries.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Vineyard rows bathed in golden evening light"
            />
            <Paragraph>
              Imperiale is founded on the belief that exceptional wines are born from perfect balance: honoring history while embracing the possibilities offered by modern technology and innovative winemaking practices. The journey begins in privileged lands where vineyards flourish under the sun, rooted in soils rich with centuries of tradition. Positioned within the premium market segment, Imperiale is crafted for those who seek more than a wine—those who value an experience defined by quality, precision, and authenticity. Each bottle reflects a philosophy centered on merging the strengths of the past with a bold vision for the future, resulting in wines designed not only to be enjoyed, but to be remembered. Imperiale invites wine lovers to enter a world where every glass becomes a work of art, every sip tells a story, and every bottle serves as a bridge between heritage and innovation. Welcome to Imperiale, where tradition and modernity come together to create something truly exceptional.
            </Paragraph>
          </div>

          {/* Story Image 2 & Fundamental Factors */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Glasses of red wine on barrel head with ripe purple grapes"
            />
            <Paragraph className="font-bold">
              Choosing Italy as a production origin is supported by several fundamental factors:
            </Paragraph>
            <Paragraph>
              <b>Climate and Terroir</b>: Italy offers an exceptional variety of microclimates and soil types, resulting in a remarkable diversity of wine styles. From the cooler northern regions ideal for varieties such as Pinot Grigio, to the warmer and sun-rich southern areas suited for grapes like Primitivo and Negroamaro, Italy provides near-perfect conditions for a wide spectrum of wines.
            </Paragraph>
            <Paragraph>
              History and Tradition: Viticulture in Italy dates back to Ancient Rome and even earlier. This extensive heritage has allowed winemaking techniques and knowledge to evolve across generations, leading to wines of notable quality, complexity, and identity.
            </Paragraph>
            <Paragraph>
              <b>Diversity of Grape Varieties</b>: With more than 350 officially recognized native grape varieties—plus many yet to be cataloged—Italy stands as one of the richest genetic reservoirs in the wine world. This diversity encourages exploration, experimentation, and adaptability across different regions and climates.
            </Paragraph>
            <Paragraph>
              <b>International Recognition</b>: Italian wines hold strong global prestige, supported by protected designations of origin and recognized geographical indications. Names such as Chianti, Barolo, Prosecco, and Brunello di Montalcino are internationally associated with excellence.
            </Paragraph>
            <Paragraph>
              <b>Innovation and Sustainability</b>: Despite its deep historical roots, Italy remains a leader in modern and sustainable winemaking. Producers increasingly adopt advanced technologies and environmentally responsible agricultural practices, ensuring both high quality and long-term ecological balance.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Harvest bins filled with freshly harvested green grapes in vineyard"
            />
            <Paragraph>
              The phrase “Veni, vidi, vici” encapsulates not only a historical moment of military triumph but also a broader reflection on the nature of conquest—both external and internal. Attributed to Julius Caesar, it has evolved into a timeless symbol of determination, clarity, and achievement. Caesar’s swift victory at the Battle of Zela demonstrated not only strategic brilliance, but also the power of decisive action. Beyond its historical context, the expression conveys a universal truth about the human journey: life itself functions as a battlefield where challenges must be confronted, choices made, and progress pursued. The metaphor of arriving, observing, and conquering invites contemplation of one’s own path. “Arrival” marks the beginning of new experiences; “observation” represents the capacity to understand, adapt, and interpret circumstances; “conquest” embodies the ability to overcome obstacles and reach goals. The brevity of the phrase, contrasted with its depth, highlights the value of clarity and purpose. In a world often overwhelmed by complexity, “I came, I saw, I conquered” stands as a reminder that triumph stems from facing challenges directly, adapting wisely, and advancing with intention. As such, it endures as a source of inspiration—affirming the human capacity to transcend adversity and actively shape one’s destiny.
            </Paragraph>
          </div>

          {/* Story Image 4 */}
          <div className="pt-1 pb-1">
            <StoryImage
              src={images.image4}
              alt="Sculpture of Julius Caesar with bronze banner Veni Vidi Vici"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
