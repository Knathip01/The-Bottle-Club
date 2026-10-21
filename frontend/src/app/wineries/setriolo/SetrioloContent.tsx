import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/25411/logos/-13zNTDcTlO3cbE-chqNaQ_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/6bY17vASSoe0t5MTq7jAJw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/25411_Setriolo/25411_Setriolo_1.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/25411_Setriolo/25411_Setriolo_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/25411_Setriolo/25411_Setriolo_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/25411_Setriolo/25411_Setriolo_4.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/25411_Setriolo/25411_Setriolo_5.jpg',
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

export default function SetrioloContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Setriolo logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Setriolo</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>7</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.0</b>
                </span>
                <span className="hidden sm:inline">1,605 total ratings</span>
                <span className="sm:hidden">1,605 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Setriolo"
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
                  <a href="https://www.vivino.com/en/explore/regions/chianti" className="hover:underline">
                    Chianti
                  </a>
                }
                icon={<Mountain size={17} />}
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.setriolo.com"
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
            <a href="tel:+390577743079" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              39 0577743079
            </a>
            <a href="mailto:info@setriolo.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
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
            alt="Aerial view of Setriolo estate surrounded by cypress trees and Tuscan forest"
          />

          {/* Paragraphs 1-2 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              Setriolo was recently taken over by Mariana Salas and Juan Pelizzatti, wine producers from Argentina with more than twenty years of experience, who bring together the New and the Old World.
            </Paragraph>
            <Paragraph>
              The project of the “new” Setriolo aims to enhance and let the estate shine with renewed light, without ever renouncing its oenological and cultural heritage, which is inseparably tied to its territory. The goal is to share with everyone who encounters the estate or its wines the same sense of fascination that Juan and Mariana feel for Chianti Classico.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Mariana Salas and Juan Pelizzatti sitting in the sunlit Setriolo vineyard"
            />
            <Paragraph>
              Setriolo wines are produced exclusively with the grapes cultivated on its 5 ha estate following organic and regenerative practices.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Hands harvesting ripe dark grape clusters on the vine"
            />
            <Paragraph>
              Every bottle of Setriolo is a bridge between Tuscany and Argentina, blending harmony, tradition, and passion.
            </Paragraph>
            <Paragraph>
              Among the hills of Chianti Classico, our wines tell the encounter of two worlds with elegance, refinement, and depth.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Winemaker inspecting wine sample with tasting glass from cellar barrel"
            />
            <Paragraph>
              An authentic experience in Chianti Classico: Setriolo agriturismo welcomes up to ten guests in an authentic, simple, and carefully maintained farmhouse, immersed in the vineyards of this extraordinary region.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 6 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Setriolo farmhouse and swimming pool framed by cypresses and lush green hills"
            />
            <Paragraph>
              Here, nature and wine are the true protagonists, between moments of quiet and the opportunity to follow the work in the cellar up close.
            </Paragraph>
          </div>

          {/* Story Image 5 */}
          <div className="pt-1 pb-1">
            <StoryImage
              src={images.image5}
              alt="Bottle of Setriolo Chianti Classico and glass of red wine in a rustic wicker basket"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
