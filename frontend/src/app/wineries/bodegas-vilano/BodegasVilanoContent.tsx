import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mail, Mountain, Phone, Target } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/16294/logos/eQD6oAdJTymzPrvu7NVJjw_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/S7M07FV6S9CIjlwsQn6kDQ_2560x1520.jpeg',
  image1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/16294_BodegasVilano/Vilano1_2560x1520.jpg',
  image2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/16294_BodegasVilano/Vilano2_2660x1592.jpg',
  image3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/16294_BodegasVilano/Vilano3_2535x1520.jpg',
  image4: 'https://vivino.s3.amazonaws.com/misc/sponsorships/16294_BodegasVilano/Vilano4_2560x1520.jpg',
  image5: 'https://vivino.s3.amazonaws.com/misc/sponsorships/16294_BodegasVilano/16294_bodegasvilano_NEW_5_2560x1520.jpg',
  image6: 'https://vivino.s3.amazonaws.com/misc/sponsorships/16294_BodegasVilano/16294_bodegasvilano_NEW_8_2560x1520.jpg',
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

export default function BodegasVilanoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Bodegas Vilano logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Bodegas Vilano</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>23</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Bodegas%20Vilano"
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
                value="Familia Pérez Pascuas"
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
                  href="https://vilano.com/"
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
                  href="https://www.instagram.com/bodegasvilano/"
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
                  href="https://www.facebook.com/BodegasVilano/"
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
                  href="https://x.com/BodegasVilano"
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
                href="tel:+34947530029"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                34 947 530 029
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:info@vilano.com"
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
              alt="Bodegas Vilano illuminated winery building at twilight"
            />
          </div>

          {/* Story Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              Vine, landscape and people are the starting point for Vilano’s wines. The fruit is harvested and selected by hand by families that have nurtured the vines for three, and even, four generations. This sense of community is the basis of Vilano’s core identity. Founded as a cooperative in 1957 by the parents and grandparents of the current members, Vilano has grown while remaining faithful to two fundamental priorities: continuous improvement and the preservation of the centennial vineyards that shape its wines and heritage.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Rolling vineyard rows under soft sunset skies in Ribera del Duero"
            />
            <Paragraph>
              Having started with a processing capacity of 300,000 kg of grapes, it now processes up to 2.6 million kg, and is planning further expansion, with the belief that the wines of Ribera del Duero have an ever-growing potential among the world’s best. This belief has marked the evolution of the company throughout its more than half-century of history.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Close-up of ancient gnarled vine trunk with fresh green leaves"
            />
            <Paragraph>
              The winery is one of the most historic in Ribera del Duero, founded before it was granted DO status. It has always been committed to both tradition and excellence, as a result of effort, work, and, above all, knowledge and passion for the grapes, wines, and terroirs of Ribera del Duero. Desiderio Sastre, Vilano’s general manager, has developed the company’s vision and applied overarching innovations which led Vilano to receive excellent ratings from the world’s best critics, as well as numerous international awards.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Cellar barrels stacked on metal racks receding into illuminated corridor"
            />
            <Paragraph>
              Vilano’s international presence has grown significantly and its wines can be found in some of the best restaurants the world over. Truth and essence are found inside the bottles; aromas and flavours that leave an indelible mark. Each of Vilano’s wines encapsulate the history of Ribera del Duero, the stories of each grower, and a step towards a modern vision of the region. With Tempranillo (Tinto Fino) as the queen variety and inspiration for the whole range, Vilano produces a diverse range that includes a sparkling, a rosado, and seven different reds. These are all fermented in stainless steel, unstemmed and under controlled temperature.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Cellar tasting room archway with backlight display of wine bottles"
            />
            <Paragraph>
              After malolactic fermentation has taken place over winter, a preliminary tasting and evaluation of aromatic profile, structure and ageing potential determines which wines will become Crianzas, Reservas or Signature blends. Each wine will then be aged in selected French, American, central and/or Eastern European oak, with the different origins of the wood contributing with specific aromas and tannins. This is the alchemical process through which the fruit from the 300 hectares of vineyards tended to by Vilano’s members become wines that stand for Ribera del Duero’s tradition and future potential.
            </Paragraph>
          </div>

          {/* Story Image 5 & Paragraph 6 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image5}
              alt="Panoramic view of sloping vineyards under evening sunset clouds"
            />
            <Paragraph>
              Are you looking for a different, fun and surprising wine? Then you have to try Full Flap Red Blend, a red wine that combines three grape varieties: Tempranillo, Cabernet and Merlot. This wine is the result of the innovation and creativity of Bodegas Vilano in the Ribera del Duero. Full Flap Red Blend has an intense cherry red color with purple reflections. To the nose, it displays aromas of red fruits, liquorice and spices. On the palate, it is smooth, fresh and balanced, with well-integrated acidity and a long and pleasant finish. It is an ideal wine to accompany a good appetizer, tapas, cheeses, sausages, white meats and pasta. If you want to enjoy a wine, do not hesitate and order your bottle of Full Flap Red Blend now. You&apos;ll love it.
            </Paragraph>
          </div>

          {/* Story Image 6 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image6}
              alt="Single bottle of Bodegas Vilano Full Flap Red Blend lying on white surface"
            />
          </div>

          {/* Bottom Website Link */}
          <div className="pt-2 pb-1">
            <a
              href="https://vilano.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-[#b82e2e] hover:underline sm:text-xs"
            >
              www.vilano.com
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
