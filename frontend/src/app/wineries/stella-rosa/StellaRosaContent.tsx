import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/-3V9wM5GQ7uvODN_nVsKOw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/172372_stellarosa_2025/172372_stellarosa_1_NEW_2560x1520.png',
  image2: 'https://images.vivino.com/misc/sponsorships/172372_stellarosa_2025/172372_stellarosa_2_NEW_2560x1520.png',
  image3: 'https://images.vivino.com/misc/sponsorships/172372_stellarosa_2025/172372_stellarosa_3_NEW_2560x1520.png',
  image4: 'https://images.vivino.com/misc/sponsorships/172372_stellarosa_2025/172372_stellarosa_4_NEW_2560x1520.png',
  image5: 'https://images.vivino.com/misc/sponsorships/172372_stellarosa_2025/172372_stellarosa_5_NEW_2560x1520.png',
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

export default function StellaRosaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/172372/logos/4wJ1rLoOR5mh-XSX71KqWQ.png"
                alt="Stella Rosa logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Stella Rosa</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>61</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.0</b>
                </span>
                <span className="hidden sm:inline">48,689 total ratings</span>
                <span className="sm:hidden">48,689 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Stella+Rosa"
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
                  <a href="https://www.vivino.com/en/explore/regions/piedmont" className="hover:underline">
                    Piemonte
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row
                label="Owned by"
                value={
                  <a href="http://www.sanantoniowinery.com/" target="_blank" rel="noreferrer" className="hover:underline">
                    San Antonio Winery
                  </a>
                }
                icon={<span className="text-base">◉</span>}
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://stellarosa.com/"
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
              href="https://www.instagram.com/stellarosa/"
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
              href="https://www.facebook.com/stellarosawines"
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
              href="https://x.com/stellarosawine"
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
            <a href="tel:8882231401" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              888 223 1401
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Piedmont hillside vineyards with estate houses in Asti, Italy"
          />
          <Paragraph>
            Stella Rosa’s story begins in Asti, Italy, where the Riboli Family set out to create a wine that honored their roots and brought people together. It all began with the fresh, semi-sweet sparkle of Moscato d’Asti, followed by the rich, juicy flavor of Stella Rosa Rosso. Today, each wine brings a taste of Italy’s charm to every moment worth sipping.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Aerial view of winding terraced vineyards across lush Piedmont hills"
          />
          <Paragraph>
            With 35+ delicious options, there’s a Stella Rosa for every taste: smooth reds, refreshing whites, and vibrant blends full of real fruit flavor. Made from Italian-grown grapes, each semi-sweet wine is easy to love and made for every moment. Whether you’re sharing with friends or pairing with food, there’s one just for you.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Collection of Stella Rosa wine bottles with fruits on marble background"
          />
          <Paragraph>
            Meet the fan favorite: Stella Rosa Black. Bursting with ripe blackberry, blueberry, and raspberry flavors, this semi-sweet red is smooth, vibrant, and perfectly balanced. Low in alcohol and rich in character, it’s the kind of wine you’ll want to share—or keep all to yourself. No wonder it’s our #1 bestseller!
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Stella Rosa Black bottle on yellow outdoor table with pizza and fruits"
          />
          <Paragraph>
            Turn up the heat with the newest from Stella Rosa: the Spicy Series. These refreshing white wines blend juicy fruit flavors like Mango, Pineapple, and Watermelon with a kick of Calabrian chili. It’s a sweet-spicy twist that’s bold, fun, and made for those who like a kick in every sip.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Stella Rosa Spicy Series bottles with mango, pineapple, and watermelon"
          />
          <Paragraph>
            There’s a Stella Rosa for every taste. Pop open a full sparkling wine, go easy with a non-alcoholic blend, or unwind with a smooth brandy. Each bottle is crafted with care and full of fruit-forward flavor—no fuss, just good wine and good moments, however you like to enjoy them!
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Stella Rosa sparkling Rosé bottle with champagne flutes and holiday cake"
          />
        </article>
      </div>
    </div>
  );
}
