import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/KmPn8oRwRCOo4lswb1VYlA_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/284237_inme_2_ocm.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/284237_inme_3_ocm.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/284237_inme_4_ocm.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/284237_inme_ocm5.jpg',
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

export default function InMeContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/284237/logos/u501_nXrRQqfphH3ViN0sQ.png"
                alt="IN ME logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">IN ME</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>8</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=IN%20ME"
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
                label="Owned by"
                value={
                  <a
                    href="https://iviticoltori.it/en/home_en/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    I Viticoltori Felice e Armando Mergè
                  </a>
                }
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13.765 11.585S15 12.554 15 14v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6c0-1.446 1.235-2.415 1.235-2.415.6-.503.578-1.062.578-1.062V7h2.374v3.524s-.021.559.578 1.061Z" />
                    <path d="M3 9.783c0-.288 0-.431.037-.563a1 1 0 0 1 .159-.326c.082-.11.195-.198.422-.374l7.4-5.756c.351-.273.527-.41.72-.462a1 1 0 0 1 .523 0c.194.052.37.189.721.462l7.4 5.756c.227.176.34.264.422.374a1 1 0 0 1 .159.326c.037.132.037.275.037.563V19.4c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437C20.24 21 19.96 21 19.4 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C3 20.24 3 19.96 3 19.4V9.783Z" />
                  </svg>
                }
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://iviticoltori.it/en/home_en/"
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
            <a href="tel:+39069574493" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +39 069574493
            </a>
            <a href="mailto:export@femarvini.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
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
            alt="Close-up of ripe dark blue and purple grapes with natural pruina wax"
          />

          {/* Paragraph 1 */}
          <div className="pt-1">
            <Paragraph>
              IN ME is a contemporary brand created by Poggio Le Volpi with a strong focus on Apulian grapes, particularly Negroamaro and Primitivo. The project was conceived to express a personal interpretation of these traditional varieties, presenting them in a modern and internationally appealing style. IN ME represents the meeting point between heritage and innovation, bringing the soul of Puglia to a global audience.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image1}
              alt="Old bush vines in red clay soil under Apulian sun"
            />
            <Paragraph>
              The range highlights the richness of Apulia’s terroir, characterized by red soils rich in iron and limestone, generous sunshine, and sea breezes that shape the vineyards. Carefully selected grapes are vinified separately to preserve their identity, combining traditional techniques with precise temperature control and, in some cases, short aging in wood to enhance structure and complexity.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image2}
              alt="IN ME Negroamaro Zinfandel bottle with gold medals and accolades"
            />
            <Paragraph>
              The portfolio includes Negroamaro Zinfandel, intense and balsamic with notes of black berries and spice; Primitivo Susumaniello, smooth and persistent with elegant tannins; and Primitivo Appassimento, full-bodied and remarkably balanced, offering depth and long-lasting aromatic intensity. Each wine is crafted to deliver richness, warmth and approachability.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image3}
              alt="IN ME Primitivo Susumaniello bottle with gold medals"
            />
            <Paragraph>
              Completing the range is the Rosso ottenuto da uve leggermente appassite, a blend that combines several regional varieties to create a mouth-filling, harmonious, and persistent wine. The slight appassimento technique enhances concentration while maintaining freshness and balance.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-2 pb-1">
            <StoryImage
              src={images.image4}
              alt="IN ME Primitivo Passimento bottle with gold medals and accolades"
            />
            <Paragraph>
              IN ME is more than a collection of wines — it is a project aimed at the internationalization of tradition. With its bold character, refined style, and strong territorial identity, the range successfully interprets Apulian winemaking through a modern lens while remaining deeply rooted in its origins.
            </Paragraph>
          </div>
        </article>
      </div>
    </div>
  );
}
