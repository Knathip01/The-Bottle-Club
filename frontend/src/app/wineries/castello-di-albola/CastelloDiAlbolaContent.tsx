import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/sJOgyUf9SUSpo_lvcOg88Q_2560x1520.jpeg',
  image1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/3897_castellodialbola/3897_castellodialbola_2024_1.jpg',
  image2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/3897_castellodialbola/3897_castellodialbola_2024_2.jpg',
  image3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/3897_castellodialbola/3897_castellodialbola_2024_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/3897_castellodialbola/3897_castellodialbola_2024_4.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/3897_castellodialbola/3897_castellodialbola_2024_5.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/3897_castellodialbola/3897_OCM_logo+CastellodiAlbola.png',
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

export default function CastelloDiAlbolaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/3897/logos/cvO-bu_bTKm-V1K5NPkVZw.jpeg"
                alt="Castello di Albola logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Castello di Albola</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>19</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.8</b>
                </span>
                <span className="hidden sm:inline">46,859 total ratings</span>
                <span className="sm:hidden">46,859 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Castello+di+Albola"
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
                  <a href="https://www.vivino.com/en/wineries/zonin" className="hover:underline">
                    Zonin1821
                  </a>
                }
                icon={<span className="text-base">◉</span>}
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.albola.it"
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
              href="https://www.instagram.com/castellodialbola/"
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
              href="https://www.facebook.com/castellodialbola/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </span>
              <ExternalLink size={11} />
            </a>
            <a
              href="https://x.com/CastellodAlbola"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:+390577738019" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              39 0577 738 019
            </a>
            <a href="mailto:info@albola.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Historic Castello di Albola villa facade with towers and pines in Radda in Chianti"
          />
          <StoryImage
            src={images.image1}
            alt="Aerial view of the historic medieval village of Castello di Albola in Chianti"
          />
          <Paragraph>
            Castello di Albola, originally a medieval village, has been home to some of the most noble Tuscan families throughout history, including the Acciaiuoli, Samminiati, Pazzi, and Ginori Conti. Located in the heart of the Chianti hills, the estate offers a unique blend of rich history, artistic ties, and the distinct &apos;high-hill&apos; landscape typical of the Radda in Chianti commune.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Winemaker Alessandro Gallo tasting red wine from a glass in the oak cask cellar"
          />
          <Paragraph>
            The estate&apos;s primary grape variety is Sangiovese, specifically the Sangioveto clone, an ancient version of Sangiovese Grosso di Toscana, the flagship grape of Chianti Classico. Winemaker Alessandro Gallo crafts elevated #WinesOfAltitude using grapes from vineyards situated between 350 and 650 meters above sea level. These vineyards—Selvole, Capaccia, Madonnino, Ellere, Marangole, Mondeggi, Sant&apos;Ilario, Acciaiolo, and Il Solatìo—are exposed to exceptional sunlight, giving the wines their distinctive character.The iconic Santa Caterina vineyard, located at about 550 meters a.s.l. , covers five hectares of a south-facing slope. It produces a special Sangiovese parcel, benefiting from a combination of meticulous viticulture, favorable climate conditions, and a unique terroir. The soil, rich in Galestro (a rocky, schistous clay), provides excellent drainage and imparts a mineral character to the wine.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Sunlit green vineyard terraces spreading through high Chianti hills"
          />
          <StoryImage
            src={images.image4}
            alt="Extreme macro close-up of dark purple Sangiovese grape cluster"
          />
          <Paragraph>
            Castello di Albola follows the principles of sustainable development. The estate&apos;s Sustainability Report outlines the activities, achievements, and future plans related to sustainability. Equalitas, an Italian certification body founded in 2015, has awarded the estate for its commitment to sustainability in the agrifood and winemaking sectors through a systemic approach that balances business, societal, and market needs. The estate also participates in scientific projects promoting sustainable development, such as LIFE VitiCaSe, an innovative European initiative focused on Carbon Farming in viticulture. This project incorporates agricultural practices and soil management techniques designed to enhance the ability of the vineyard ecosystem to capture and store atmospheric carbon, contributing to environmental sustainability.
          </Paragraph>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-stone-600 sm:text-[13px]">
            <a href="https://www.linkedin.com/company/castello-di-albola/" target="_blank" rel="noreferrer" className="text-[#1e1e1e] hover:underline">
              LinkedIn
            </a>{' '}
            |{' '}
            <a href="https://www.instagram.com/castellodialbola/" target="_blank" rel="noreferrer" className="text-[#1e1e1e] hover:underline">
              Instagram
            </a>{' '}
            |{' '}
            <a href="https://www.facebook.com/castellodialbola/" target="_blank" rel="noreferrer" className="text-[#1e1e1e] hover:underline">
              Facebook
            </a>
          </p>
          <StoryImage
            src={images.image5}
            alt="Historic barrel cellar hallway lined with glowing large oak casks"
          />
          <div className="flex justify-center py-2">
            <Image
              src={images.banner}
              alt="Campaign financed according to EU Reg. N. 2021/2115 - Ministero dell'Agricoltura"
              width={1280}
              height={760}
              unoptimized
              className="h-auto w-full max-w-[420px] object-contain"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
