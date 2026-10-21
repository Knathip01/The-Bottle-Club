import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/J9z0IC0pQeaNHPjL_EaE7g_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/225336-epicuro_2_ocm.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/225336-epicuro_3_ocm.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/225336-epicuro_4_ocm.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/225336-epicuro_5_ocm.jpg',
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
      height={1520}
      unoptimized
      className="h-auto w-full rounded-md object-cover"
    />
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function EpicuroContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://thumbs.vivino.com/wineries/225336/logos/VTjFvjYXRtKfB8qFFvMnpw_500x500.jpeg"
                alt="Epicuro logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Epicuro</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>34</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Epicuro"
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
              <Row label="Owned by" value="I Viticoltori Felice e Armando Mergè" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.femarvini.com/en/brand-en/epicuro.html"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"
            >
              <span className="flex items-center gap-2">
                <Globe size={14} />
                Website
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:+39069419491" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              +39 (06) 9419491
            </a>
            <a href="mailto:info@femarvini.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Hand harvesting dark grapes in the Puglia vineyard"
          />
          <Paragraph>
            Epicuro is one of the most representative collections of I Viticoltori Felice e Armando Mergè, created to express the richness and diversity of southern Italian wines. The range includes a wide selection of wines with strong personality, produced from carefully selected grapes grown in some of Italy’s most renowned wine regions. From classic everyday wines to more structured premium labels, Epicuro offers authentic expressions of Italian terroir.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Harvester carrying a basket of ripe grapes in the Puglia sun"
          />
          <Paragraph>
            The philosophy behind Epicuro is rooted in the careful selection of grapes and respect for local winemaking traditions. Each wine is crafted to highlight the identity of its origin. This plays a central role in the collection, allowing the wines to showcase the character of southern Italy.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Bottling and capping line at Epicuro winery"
          />
          <Paragraph>
            Epicuro wines combine traditional methods with modern winemaking techniques. The grapes are vinified with precision to preserve their natural aromas and balance, resulting in wines that are expressive, approachable, and enjoyable. This careful process ensures consistency and quality across the entire range.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Stainless steel fermentation tank tap in cellar"
          />
          <Paragraph>
            The collection includes a variety of styles, from fresh, and aromatic whites such as Chardonnay-Fiano and Vermentino, to elegant reds and structured reds like Primitivo di Manduria, Salice Salentino, and Negroamaro. The premium line further enhances the range with more complex wines, including selections aged in oak or made from slightly dried grapes.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Bottles of Epicuro Appassite, Primitivo di Manduria, and Zinfandel"
          />
          <Paragraph>
            With its broad portfolio and strong identity, Epicuro has become a key brand within the I Viticoltori Felice e Armando Mergè collection. Thanks to its balance between quality, authenticity, and value, the range successfully represents the spirit of modern Italian winemaking while remaining deeply connected to tradition.
          </Paragraph>
        </article>
      </div>
    </div>
  );
}
