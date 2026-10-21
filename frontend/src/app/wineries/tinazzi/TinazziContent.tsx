import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/hVJQik_sQY-cf280-yNQyQ_2560x1520.jpeg',
  grapes: 'https://vivino.s3.amazonaws.com/misc/sponsorships/Tinazzi-6900/6900-Tinazzi1_1920x1080.jpg',
  valpolicellaHill: 'https://vivino.s3.amazonaws.com/misc/sponsorships/6900_tinazzi/6900_tinazzi_2_NEW_2560x1520.jpg',
  vinesCloseUp: 'https://vivino.s3.amazonaws.com/misc/sponsorships/Tinazzi-6900/6900-Tinazzi3_1920x1080.jpg',
  family: 'https://vivino.s3.amazonaws.com/misc/sponsorships/6900_tinazzi/6900_tinazzi_4_NEW_2560x1520.jpg',
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
      className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"
    />
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function TinazziContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://thumbs.vivino.com/wineries/6900/logos/psXr2DdHQfK5RW1QeSlLDA_500x500.png"
                alt="Tinazzi logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Tinazzi</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>304</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.0</b>
                </span>
                <span className="hidden sm:inline">241,618 total ratings</span>
                <span className="sm:hidden">241,618 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Tinazzi"
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
              <Row label="Winemaker" value="Gian Andrea Tinazzi" icon={<span className="text-base">◉</span>} />
              <Row label="Owned by" value="Tinazzi" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.tinazzi.it"
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
            <a
              href="https://www.instagram.com/cantine.tinazzi/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"
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
              href="https://www.facebook.com/cantinetinazzi"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"
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
              href="https://x.com/cantinetinazzi"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"
            >
              <span className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:+390456470697" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              +39 045 64 70 697
            </a>
            <a href="mailto:info@tinazzi.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Tinazzi estate in Lazise, Lake Garda, Veneto"
          />
          <Paragraph>
            Gian Andrea Tinazzi, son of the founder, at the time still 18 years old, immediately follows his father in running the business and thanks to his strong and enterprising nature he progressively widens the horizons of the company both in terms of production and markets.
          </Paragraph>
          <Paragraph>
            Today the sons of Gian Andrea, Francesca and Giorgio, assist their father in managing what has become an important production group based in Lazise, on Lake Garda. A rapid expansion process has led the company to extend its properties in the areas of Valpolicella and Puglia, a region of great character and growing qualitative potential.
          </Paragraph>
          <StoryImage
            src={images.grapes}
            alt="Clusters of dark red grapes on the vine at Tinazzi"
          />
          <Paragraph>
            Cantine Tinazzi is a historic, family-run company that produces Veneto and Puglia wines. Starting with the unique link to their territories in which their estates are present, the goal is to guarantee the highest quality of wines with a strong attention to tradition combined with a continuous search for innovation.
          </Paragraph>
          <StoryImage
            src={images.valpolicellaHill}
            alt="Panoramic vineyard rows on hillside in Valpolicella"
          />
          <Paragraph>
            At the Lazise site, the vinification of the grapes for the production of white wines takes place including the bottling of the Cantine Tinazzi wines from Veneto: a total production of about 3 million bottles/year. There is also a barrel cellar for the aging of red wines in American and French oak barrels of 5, 20 and 40 hl.
          </Paragraph>
          <Paragraph>
            Furthermore, a new production facility has been in operation since 2015, the Tinazzi winery, located in Sant&apos;Ambrogio in the heart of Valpolicella and equipped with modern wine-making and drying plants for the production of the prestigious Veronese reds, Amarone della Valpolicella and Valpolicella Superiore Ripasso—the flagship of the company.
          </Paragraph>
          <StoryImage
            src={images.vinesCloseUp}
            alt="Vibrant grapevines growing on hillside"
          />
          <Paragraph>
            Cantine Tinazzi would like to welcome you to their estate for an authentic Italian experience. With the aim of bringing wine lovers and not just winemakers together, the place where the people behind Tinazzi live. Tinazzi’s Italian Experience is a Tinazzi family project linked to hospitality. Visitors will be able to experience the Tinazzi winery; and get to discover not only their wines but also the other wonders of Italy, the pleasures of food and cuisine, friendship, and conviviality. Many activities are available and exclusive to the locations, from Veneto to Puglia.
          </Paragraph>
          <StoryImage
            src={images.family}
            alt="Gian Andrea Tinazzi with Francesca and Giorgio Tinazzi in the vineyard"
          />
        </article>
      </div>
    </div>
  );
}
