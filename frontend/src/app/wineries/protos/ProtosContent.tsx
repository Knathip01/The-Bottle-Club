import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Phone, Star, Target } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/4848/logos/j9jG9DAbSZylcbSYQKVsQA_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/lX9HJtExTlC-LBCqtoKAdQ_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/4848_NEW_Protos/4848_protos_NEW_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/4848_NEW_Protos/4848_protos_NEW_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/4848_NEW_Protos/4848_protos_NEW_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/4848_NEW_Protos/4848_protos_NEW_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/4848_NEW_Protos/4848_protos_NEW_5_2560x1520.jpg',
  image6: 'https://images.vivino.com/misc/sponsorships/4848_NEW_Protos/4848_protos_NEW_6_2560x1520.jpg',
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

export default function ProtosContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Protos logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Protos</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>25</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.0</b>
                </span>
                <span className="hidden sm:inline">201,343 total ratings</span>
                <span className="sm:hidden">201,343 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Protos"
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
                value="Bodegas Protos"
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
                  href="http://www.bodegasprotos.com"
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
                  href="https://www.instagram.com/bodegasprotosoficial/"
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
                  href="https://www.facebook.com/BodegasProtos"
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
                  href="https://twitter.com/Bodegas_Protos"
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
                href="tel:+34983878011"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                (+34) 983 878011
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
              alt="Protos winery contemporary vaulted roof design beneath Peñafiel Castle"
            />
          </div>

          {/* Story Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              The history of this winery begins in Peñafiel (Valladolid), when 11 winegrowers from the area decided to join together to realize their dream of elaborating great wines that demonstrated the character of the region and its people, this is how in 1927 the Bodega Ribera Duero was established, the first in the Ribera.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Original Bodega Ribera Duero winery in 1927 with vintage automobile"
            />
            <Paragraph>
              In 1929 during the world exhibition in Barcelona, Protos registered 2 wines for the wine competition, in which they won Gold and Great Gold. It is here that the company gets its first big recognition and begins its ascension towards one of the most beloved brands internationally.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Modern Protos winery building architecture with Peñafiel Castle in the background"
            />
            <Paragraph>
              50 years later Protos altruistically ceded the use of its Ribera Duero brand for the creation of the regulatory council (DOP Ribera del Duero), although it continues to own it.
            </Paragraph>
            <Paragraph>
              Protos currently produces wines in 3 denominations of origin with wineries highly specialized in the production of unique wines. Wineries specialized in reds from the DOP Ribera del Duero, whites in DOP Rueda and rosés in DOP Cigales.
            </Paragraph>
          </div>

          {/* Story Image 3, Heading & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Map of Spain highlighting D.O. Rueda, D.O. Ribera del Duero, and D.O. Cigales"
            />
            <h2 className="px-0.5 pt-2 text-xs font-bold text-[#1e1e1e] sm:text-sm">
              DOP Ribera de Duero
            </h2>
            <Paragraph>
              Protos vineyards are distributed throughout the orography of the banks of the Duero River, especially in the provinces of Valladolid and Burgos, so they have great typicity. The average vineyards are less than 1ha each so the terroir is an integral part of each of them; especially the change of soil where there are calcareous lands and other more clay that give different aromas, textures and flavors to the wines.
            </Paragraph>
          </div>

          {/* Story Image 4, Heading & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Harvesting workers sorting freshly picked red wine grapes"
            />
            <h2 className="px-0.5 pt-2 text-xs font-bold text-[#1e1e1e] sm:text-sm">
              DOP Rueda
            </h2>
            <Paragraph>
              Since 2006 Protos produces its white wines in the DOP Rueda, since it is the best terroir to produce high quality white wines. The winery is designed for the production of white wines, which are aged for a long time in oak foudres, cement eggs and stainless-steel tanks. In addition, the Verdejo Reserva, the first wine of category &quot;Reserva&quot; in the Denomination of Origin, remains 7 months in 225lt barriques.
            </Paragraph>
          </div>

          {/* Story Image 5, Heading & Paragraph 6 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image5}
              alt="Pouring a glass of Protos white wine in the vineyard"
            />
            <h2 className="px-0.5 pt-2 text-xs font-bold text-[#1e1e1e] sm:text-sm">
              DOP Cigales
            </h2>
            <Paragraph>
              Protos last winery is located in the DOP Cigales and was inaugurated in 2020. It is designed for rosé wines. Cigales was chosen for its wide range of red and white grape varieties, its soils, climate and altitude. Protos incorporated the best technology for the production of rosé wines in this winery.
            </Paragraph>
          </div>

          {/* Story Image 6 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image6}
              alt="Winemakers toasting with glasses of rosé wine overlooking the vineyards"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
