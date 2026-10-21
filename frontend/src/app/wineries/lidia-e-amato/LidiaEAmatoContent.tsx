import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/43087/logos/VJkRdY2JTtaCe2xE7IRSpQ_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/Fup76nJARi-iZ7NId0fznA_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/43087_lidiaeamato/43087_lidiaeamato_2.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/43087_lidiaeamato/43087_lidiaeamato_3.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/43087_lidiaeamato/43087_lidiaeamato_4.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/43087_lidiaeamato/43087_lidiaeamato_5.jpg',
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

export default function LidiaEAmatoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Lidia e Amato logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Lidia e Amato</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>13</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Lidia%20e%20Amato"
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
              <Row
                label="Winemaker"
                value="Giorgio Ficerai"
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm2 7h-4a1 1 0 0 0-.8.4 5.5 5.5 0 0 0-.7 2.6c0 1.7.9 3.2 2 4.1V18h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2v-1.9c1.1-.9 2-2.4 2-4.1 0-.9-.3-1.8-.7-2.6A1 1 0 0 0 14 9Z" />
                  </svg>
                }
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.lidiaeamato.com/"
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
              href="https://www.instagram.com/lidiaeamato_vini/"
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
              href="https://www.facebook.com/pg/lidiaeamato/posts/"
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
            <a href="tel:+390861817041" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +39 0861 817041
            </a>
            <a href="mailto:info@lidiaeamato.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
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
            alt="Lidia e Amato estate nestled in the rolling hills of Controguerra, Abruzzo"
          />

          {/* Paragraph 1 */}
          <div className="pt-1">
            <Paragraph>
              On the soils of the Controguerra area, in the village of San Biago, nine generations of the Tavoletti family have handed down the family’s ancient grape varieties. From father to son, they have passed on their knowledge and passion for their work.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Modern oak barrel aging room with illuminated Lidia e Amato sign"
            />
            <Paragraph>
              The Controguerra area lends its name to a unique appellation. On the gentle slopes of the Teramo hills, the breeze rises from the sea and blends with cold currents from the mountains near the vineyards. This land gives rise to extraordinary wines which directly convey this interaction, creating multifaceted nuances and distinctive flavors.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Winemaking team smiling in the cellar staircase next to wooden barrels"
            />
            <Paragraph>
              The territory is influenced by its closeness to the Adriatic Sea and the presence of the Gran Sasso massif. The unqiue microclimate of this environment encourages the slow ripening of grapes and the formation of an ideal sugar balance. The clayey-calcareous soil nourishes the flavors and aromas that experienced winemakers at Lidia&amp;Amato transform, thanks to their years of expertise in the vineyards and wine cellar.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Golden sunset glow over the modern architectural wooden roof of the winery"
            />
            <Paragraph>
              In 2003, Lidia Tavoletti decided to continue the family tradition independently and launch a new project. Together with her husband, Amato, she started artisan production bearing their names with the dream of launching the still intact roots of their history into the future. Lidia&amp;Amato was founded.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Lineup of Lidia e Amato wine bottles and custom wooden box with mountain backdrop"
            />
            <Paragraph>
              Now, the Di Florio Family is taking a new step forward. Taking over directly from Lidia, the Di Florio family and their friend, Yannis Kyriazis, is ready to take the history of their Controguerra wines beyond the natural boundaries of the Teramo hills. They decided to keep the family name for this new adventure in order to highlight the importance of Lidia and Amato’s legacy.
            </Paragraph>
          </div>

          {/* Bottom Website Link */}
          <div className="pt-1 pb-1">
            <a
              href="https://www.lidiaeamato.com/en/"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-bold text-[#ba1628] hover:underline sm:text-xs"
            >
              Lidia&amp;Amato
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
