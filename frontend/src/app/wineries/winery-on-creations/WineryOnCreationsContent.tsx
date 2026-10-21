import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Target } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/216203/logos/503kONjwSj6-RpiGTH5fIw_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/ktf_WoBeTZqb-abnSeUwuQ_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/216203_WIneryOn/216203_wineryoncreations_1.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/216203_WIneryOn/216203_wineryoncreations_2.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/216203_WIneryOn/216203_wineryoncreations_3.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/216203_WIneryOn/216203_wineryoncreations_4.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/216203_WIneryOn/216203_wineryoncreations_5.jpg',
  story6: 'https://images.vivino.com/misc/sponsorships/216203_WIneryOn/216203_wineryoncreations_6.jpg',
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

export default function WineryOnCreationsContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Winery On Creations logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Winery On Creations</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>20</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Winery%20On%20Creations"
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
                value="Winery On Creations"
                icon={<Target size={14} />}
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
                  href="http://www.wineryon.com"
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
                  href="https://www.instagram.com/demuerte"
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#262626]">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                <a
                  href="https://www.facebook.com/wineryon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Facebook
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>
          </section>
        </aside>

        {/* Right Content / Story Article */}
        <article className="space-y-3 rounded-md border border-stone-200 bg-white p-2.5 sm:p-5">
          {/* Hero Image */}
          <div>
            <StoryImage
              src={images.hero}
              alt="DEMUERTE wine bottle with ornate gold skull label on black background"
            />
          </div>

          {/* Paragraph 1 */}
          <div className="space-y-1">
            <Paragraph>
              &ldquo;These wines are DEMUERTE!...&rdquo; someone said (Yecla, Murcia 2012). And that&apos;s how it all began… ( DEMUERTE is a Spanish expression that means &ldquo;They&apos;re so good they&apos;re to die for!&rdquo;)
            </Paragraph>
          </div>

          {/* Story Image 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story1}
              alt="High-contrast black and white perspective shot of vineyard rows in Yecla at night"
            />
          </div>

          {/* Paragraph 2 */}
          <div className="space-y-1">
            <Paragraph>
              In this emerging region in eastern Spain, our grapes acquire their unmistakable character. The vineyards extend at an altitude of 300 to 600 meters, in a unique setting with deep, fertile, calcareous soils. The vines thrive in an extreme climate and grow without irrigation: cold winters and intensely hot summers. This combination forges the personality of our wines, giving them a distinct Mediterranean profile.
            </Paragraph>
          </div>

          {/* Story Image 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story2}
              alt="Bottling line conveyor belt with DEMUERTE bottles"
            />
          </div>

          {/* Paragraph 3 */}
          <div className="space-y-1">
            <Paragraph>
              Our philosophy is based on respect: we work the vines with care and without harsh chemicals, with balanced and sustainable production, ensuring that every step, from the vine to the bottle, is carried out with the utmost dedication. The harvest is done manually in small crates, selecting only the best grapes for production, which follows cutting-edge processes. This care is applied to our original collection of 8 wines and a Valencian cava.
            </Paragraph>
          </div>

          {/* Story Image 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story3}
              alt="Lineup of DEMUERTE wine bottles with diverse colorful skull labels"
            />
          </div>

          {/* Paragraph 4 */}
          <div className="space-y-1">
            <Paragraph>
              The undisputed star is Monastrell, a native grape of Yecla, perfectly adapted to this land since ancient times. We use old vines, some over 80 years old, which are true jewels of nature, accompanied by varieties such as Syrah, Cabernet Sauvignon, Sauvignon Blanc, Garnacha Tintorera, Petit Verdot, and Verdejo.
            </Paragraph>
          </div>

          {/* Story Image 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story4}
              alt="Dramatic lighting of hand crushing fresh grape cluster with juice dripping"
            />
          </div>

          {/* Paragraph 5 */}
          <div className="space-y-1">
            <Paragraph>
              At DEMUERTE, we believe that wine is art. It&apos;s not just science; it&apos;s an experience that should awaken the senses. Our project was born from the vision of Pablo Cortés, co-founder and winemaker, and Karel Eissner, co-founder and creative director, who wanted to create wines that were as bold and memorable on the nose and palate as their design. The DEMUERTE style is powerful, structured, smooth, intensely fruity, and with a delicious complexity that unfolds gradually.
            </Paragraph>
          </div>

          {/* Story Image 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story5}
              alt="Founders Pablo Cortés and Karel Eissner sitting on wine barrels in cellar"
            />
          </div>

          {/* Paragraph 6 */}
          <div className="space-y-1">
            <Paragraph>
              With this same philosophy, the latest DEMUERTE creation explores new horizons: CAVA from Requena, in Valencia. This wonderful creation by Pablo is a playful and original CAVA made from Chardonnay and Macabeo.
            </Paragraph>
          </div>

          {/* Story Image 6 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story6}
              alt="Hands holding bottle of DEMUERTE Black with floral gold skull label"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
