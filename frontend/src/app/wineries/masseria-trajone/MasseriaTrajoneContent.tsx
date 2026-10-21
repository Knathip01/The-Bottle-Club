import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/l_FUiuWeT3-QfOBQ29VxTQ_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/225337-trajone-2ocm.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/225337-trajone-3ocm.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/225337-trajone-4ocm.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/225337-trajone-5ocm.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/225337-trajone-6ocm.jpg',
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

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function MasseriaTrajoneContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/225337/logos/PZa3PHDRRv6FEGGZURyA-A.png"
                alt="Masseria Trajone logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Masseria Trajone</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>24</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Masseria%20Trajone"
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
                value="I Viticoltori Felice e Armando Mergè"
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
              href="https://www.femarvini.com/en/brand-en/masseria-trajone.html"
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
            <a href="tel:+39069419491" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +39(06)9419491
            </a>
            <a href="mailto:info@femarvini.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Hands holding abundant clusters of harvested black grapes"
          />
          <Paragraph>
            Masseria Trajone is a wine collection inspired by the deep-rooted winemaking traditions of southern Italy, particularly those of the Apulia region. The brand reflects the historic rural estates, known as “masserie,” that have shaped the agricultural and cultural identity of the region for centuries. Through Masseria Trajone, these traditions are reinterpreted with a contemporary approach while preserving the authentic character of the territory.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Pruning shears harvesting ripe grape cluster on the vine"
          />
          <Paragraph>
            The wines are produced from carefully selected grapes grown in Apulia, a region renowned for its sun-drenched vineyards, fertile soils, and centuries of viticultural heritage. Native grape varieties play a central role in the collection, allowing each wine to reflect the richness and diversity of southern Italian terroirs. The warm climate and Mediterranean influence create ideal conditions for producing expressive, full-bodied wines with remarkable aromatic intensity.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Masseria Trajone Negroamaro Primitivo bottles"
          />
          <Paragraph>
            Winemaking combines traditional knowledge with modern techniques to ensure both quality and consistency. The grapes are harvested at optimal ripeness and vinified with attention to detail in order to preserve their natural aromas and structure. In some cases, aging in wood enhances complexity, giving the wines additional depth and balance.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Lush clusters of purple grapes hanging from the vine under sunny sky"
          />
          <Paragraph>
            The Masseria Trajone range includes wines that highlight the identity of Apulian grape varieties, delivering rich fruit profiles, smooth tannins, and elegant structure. These wines are designed to be both approachable and distinctive, offering a harmonious balance between power and drinkability.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Masseria Trajone Primitivo bottle against rustic stone wall"
          />
          <Paragraph>
            Masseria Trajone represents the spirit of southern Italy: generous, authentic, and deeply connected to its land. Through this collection, traditional Apulian varieties are presented in a modern style that appeals to international wine lovers while maintaining a strong sense of place and heritage.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Lineup of Masseria Trajone wine bottles including Primitivo di Manduria"
          />
        </article>
      </div>
    </div>
  );
}
