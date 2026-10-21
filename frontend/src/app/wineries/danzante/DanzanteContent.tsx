import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/jKaH-NHSRKmihr33taOTqA_2560x1520.jpeg',
  image1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/10863_danzante_2560x1520_2.jpg',
  image2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/10863_danzante_2560x1520_3.jpg',
  image3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/10863_danzante_2560x1520_4.jpg',
  image4: 'https://vivino.s3.amazonaws.com/misc/sponsorships/10863_danzante_2560x1520_5.jpg',
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
  return <p className={`px-0.5 py-0.5 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px] ${className}`}>{children}</p>;
}

export default function DanzanteContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/10863/logos/ANvEij1qQp-1tiIqLv3CaA.jpeg"
                alt="Danzante logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Danzante</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>10</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.8</b>
                </span>
                <span className="hidden sm:inline">10,220 total ratings</span>
                <span className="sm:hidden">10,220 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Danzante"
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
                label="Winemaker"
                value="Danzante"
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                }
              />
              <Row
                label="Owned by"
                value={
                  <Link href="/wineries/frescobaldi" className="hover:underline">
                    Marchesi Frescobaldi
                  </Link>
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
              href="https://www.danzantewines.com"
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
              href="https://www.instagram.com/danzante_wines/"
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
              href="https://www.facebook.com/danzantewines"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </span>
              <ExternalLink size={11} />
            </a>
            <a
              href="https://twitter.com/danzantewines"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:3905527141" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              39 055 27 141
            </a>
            <a href="mailto:info@danzantewines.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1.5 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Danzante wine bottles on bar display"
          />

          {/* Recipe 1: Red Splash */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Red Splash cocktail with ice and lime in glasses"
            />
            <Paragraph className="font-bold text-[#1e1e1e]">
              Red Splash (10 min. 4 serves)
            </Paragraph>
            <Paragraph>
              Difficulty: **
            </Paragraph>
            <Paragraph>
              400 ml red wine, 400 ml tequila, 10 ml fresh lime juice, 10 ml agave nectar, 60 ml club soda.
            </Paragraph>
            <Paragraph>
              Mix all the ingredients except the club soda in a cocktail shaker with ice. Shake. Strain into a glass and add the club soda. Add ice and serve.
            </Paragraph>
            <Paragraph>
              Make it with{' '}
              <a
                href="https://www.danzantewines.com/our-wines/chianti/"
                target="_blank"
                rel="noreferrer"
                className="text-[#a11a1a] hover:underline"
              >
                Danzante Chianti
              </a>
            </Paragraph>
          </div>

          {/* Recipe 2: Strawberry Cup */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image2}
              alt="Strawberry Cup wine punch with fresh strawberries and lemon"
            />
            <Paragraph className="font-bold text-[#1e1e1e]">
              Strawberry Cup (40 min. 20 serves)
            </Paragraph>
            <Paragraph>
              Difficulty: **
            </Paragraph>
            <Paragraph>
              500 g fresh strawberries, 100 ml strawberry vodka, 750 ml white wine Pinot Grigio, 750 ml Prosecco, ice as needed.
            </Paragraph>
            <Paragraph>
              Place the well-washed and dried strawberries in a punch bowl. Pour in the vodka and leave it to infuse for 30 minutes in the fridge. After thirty minutes in the fridge, add the Pinot Grigio white wine and mix. Add ice and Danzante Prosecco before serving.
            </Paragraph>
            <Paragraph>
              Make it with{' '}
              <a
                href="https://www.danzantewines.com/our-wines/pinot-grigio/"
                target="_blank"
                rel="noreferrer"
                className="text-[#a11a1a] hover:underline"
              >
                Danzante Pinot Grigio
              </a>
            </Paragraph>
          </div>

          {/* Recipe 3: Bellini Cocktail */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image3}
              alt="Bellini cocktails garnished with fresh peach slices"
            />
            <Paragraph className="font-bold text-[#1e1e1e]">
              Bellini Cocktail (10 min. 3 serves)
            </Paragraph>
            <Paragraph>
              Difficulty: ***
            </Paragraph>
            <Paragraph>
              30 g Prosecco Brut, 125 g white peaches.
            </Paragraph>
            <Paragraph>
              Blend the peaches in a food processor to make a purée. Pour the filtered purée into a shaker and add the very cold Prosecco. Mix the ingredients briefly, put a strainer over the shaker, and strain the cocktail directly into champagne glasses. Serve your Bellinis.
            </Paragraph>
            <Paragraph>
              Make it with{' '}
              <a
                href="https://www.danzantewines.com/our-wines/prosecco/"
                target="_blank"
                rel="noreferrer"
                className="text-[#a11a1a] hover:underline"
              >
                Danzante Prosecco
              </a>
            </Paragraph>
          </div>

          {/* Recipe 4: Bordji */}
          <div className="space-y-1 pt-2 pb-1">
            <StoryImage
              src={images.image4}
              alt="Bordji wine cocktail with orange slices on a silver tray"
            />
            <Paragraph className="font-bold text-[#1e1e1e]">
              Bordji (5 min. 4 serves)
            </Paragraph>
            <Paragraph>
              Difficulty: *
            </Paragraph>
            <Paragraph>
              60 ml red wine, 1 ml cognac, 90 ml crème de cassis.
            </Paragraph>
            <Paragraph>
              Mix all the ingredients with ice using a shaker. Pour into a wine glass with more ice.
            </Paragraph>
            <Paragraph>
              Make it with{' '}
              <a
                href="https://www.danzantewines.com/our-wines/toscana-rosso/"
                target="_blank"
                rel="noreferrer"
                className="text-[#a11a1a] hover:underline"
              >
                Danzante Toscana Red
              </a>
            </Paragraph>
          </div>
        </article>
      </div>
    </div>
  );
}
