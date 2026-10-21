import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone, Star, Target, User } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/19731/logos/dUmakiBIQwK48R895gC6gw_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/y6u_wwM6R9-iGE7HvasLmw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/19731_felixsolis_1_2600x1550.jpeg',
  image2: 'https://images.vivino.com/misc/sponsorships/19731_felixsolis_2_2600x1550.jpeg',
  image3: 'https://images.vivino.com/misc/sponsorships/19731_felixsolis_3_2600x1550.jpeg',
  image4: 'https://images.vivino.com/misc/sponsorships/19731_felixsolis_4_2600x1550.jpeg',
  image5: 'https://images.vivino.com/misc/sponsorships/19731_felixsolis_5b_2560x3040.jpeg',
  image6: 'https://images.vivino.com/misc/sponsorships/19731_felixsolis_6_2600x1550.jpeg',
  image7: 'https://images.vivino.com/misc/sponsorships/19731_felixsolis_7_2600x1550.jpeg',
  image8: 'https://images.vivino.com/misc/sponsorships/19731_felixsolis_8_2600x1800.jpeg',
  image9: 'https://images.vivino.com/misc/sponsorships/19731_felixsolis_9_2600x1550.jpeg',
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

export default function FelixSolisContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Félix Solís logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Félix Solís</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>381</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.7</b>
                </span>
                <span className="hidden sm:inline">212,053 total ratings</span>
                <span className="sm:hidden">212,053 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=F%C3%A9lix%20Sol%C3%ADs"
              className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs"
            >
              View wines
            </Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row
                label="Country"
                value={
                  <Link href="/product?country=Spain" className="hover:underline">Spain</Link>
                }
                icon={<span>🇪🇸</span>}
              />
              <Row
                label="Winemaker"
                value="Carlos Villarraso"
                icon={<Target size={14} />}
              />
              <Row
                label="Owned by"
                value={
                  <a
                    href="http://www.felixsolisavantis.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Félix Solís Avantis (Félix Solís & Pagos del Rey)
                  </a>
                }
                icon={<User size={14} />}
              />
            </div>
          </section>

          {/* Contacts Section */}
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white">
            {/* Website */}
            <div className="flex min-w-0 items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <Globe size={14} className="shrink-0 text-[#262626]" />
                <a
                  href="http://www.felixsolis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Website
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Instagram */}
            <div className="flex min-w-0 items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#262626]">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <a
                  href="https://www.instagram.com/felixsolisavantis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Instagram
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Facebook */}
            <div className="flex min-w-0 items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#262626]">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <a
                  href="https://www.facebook.com/felixsolis.avantis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Facebook
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* X */}
            <div className="flex min-w-0 items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#262626]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <a
                  href="https://twitter.com/felixsolisgrupo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  X
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Phone */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Phone size={14} className="shrink-0 text-[#262626]" />
              <a
                href="tel:+34926322400"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                +34 926322400
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:fsa@felixsolisavantis.com"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                Winery Email
              </a>
            </div>
          </section>
        </aside>

        {/* Right Content / Story */}
        <article className="space-y-3 rounded-md border border-stone-200 bg-white p-2.5 sm:p-5">
          {/* Hero Image */}
          <div>
            <StoryImage
              src={images.hero}
              alt="Historic Spanish winery building of Félix Solís"
            />
          </div>

          {/* Paragraph 1 */}
          <div>
            <Paragraph>
              Back in 1952 Félix Solís Fernández and his wife, Leonor Yáñez, founded the winery that bears their name, and which has become an international reference for quality wines.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Félix Solís family members standing in the vineyard"
            />
            <Paragraph>
              Félix Solís is a 100% family-owned company that has remained faithful to its heritage, to its history, and has managed to be at the forefront of innovation.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Cluster of deep blue ripe grapes on the vine"
            />
            <Paragraph>
              Since its beginnings, the aim has been to make good wine available to everyone. This is the fundamental value of this family business focused on producing quality wines with the highest levels of excellence and service.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Harvest buckets full of freshly harvested grapes in vineyard"
            />
            <Paragraph>
              Félix Solís has wineries in Spain&apos;s main D.O.s and has key international expansion projects such as the new production winery in Chile and production agreements in New Zealand and South Africa.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Modern outdoor stainless steel fermentation tanks"
            />
            <Paragraph>
              Félix Solís has wineries in the main appellations of Castilla-La Mancha such as Valdepeñas and La Mancha. The Valdepeñas winery has one of the best and most modern winemaking and bottling plants in the world. It has a new aging cellar with a capacity to store 130,000 oak barrels that guarantee the development of traditional aging methods to produce Crianza, Reserva and Gran Reserva wines.
            </Paragraph>
          </div>

          {/* Story Image 5 & Paragraph 6 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image5}
              alt="Massive automated barrel aging warehouse"
            />
            <Paragraph>
              The second winery is in La Puebla de Almoradiel, one of the most traditional wine-growing areas in the region. Its modern facilities produce young wines from local and international grape varieties.
            </Paragraph>
          </div>

          {/* Story Image 6 & Paragraph 7 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image6}
              alt="Historic clay amphorae and wine vessels in traditional cellar"
            />
            <Paragraph>
              Among the group&apos;s most recognized brands, special mention should be made of Viña Albali, a fundamental piece in the company&apos;s history as the brand most closely linked to the family, with a history dating back to 1962 and an outstanding national and international track record. For decades, Viña Albali has been the best-selling wine brand in Spain in large food stores (Per Nielsen Data), as well as being present in more than 115 countries.
            </Paragraph>
          </div>

          {/* Story Image 7 & Paragraph 8 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image7}
              alt="Viña Albali wine bottle labels on production line"
            />
            <Paragraph>
              Other emblematic brands of the group are Los Molinos, Casa Albali or Viña San Juan, wines that preserve the most traditional essence and that are complemented with new and modern blends such as Mucho Más, The Guv&apos;nor and FYI, with the aim of satisfying the demand of the youngest wine lovers.
            </Paragraph>
          </div>

          {/* Story Image 8 & Paragraph 9 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image8}
              alt="Bottles of wine with gold mesh on automated bottling line"
            />
            <Paragraph>
              One of the most ambitious projects has been unveiled: the new aging wine cellar with a capacity for 130,000 barrels housed in a fully automated and temperature-controlled environment.
            </Paragraph>
          </div>

          {/* Story Image 9 */}
          <div className="pt-1 pb-1">
            <StoryImage
              src={images.image9}
              alt="Modern exterior of Félix Solís winery with large amphora statue"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
