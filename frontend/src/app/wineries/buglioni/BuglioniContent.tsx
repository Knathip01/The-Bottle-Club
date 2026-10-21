import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/6lsO543RTB24a7HS_EGaZg_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/14832_BUGLIONI/14832_BUGLIONI_2.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/14832_BUGLIONI/14832_BUGLIONI_3.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/14832_BUGLIONI/14832_BUGLIONI_4.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/14832_BUGLIONI/14832_BUGLIONI_5.jpg',
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

export default function BuglioniContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/14832/logos/U6edc-2dT0uZUZCLPNqdVg.jpeg"
                alt="Buglioni logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Buglioni</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>31</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Buglioni"
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
              <Row label="Winemaker" value="Diego Bertoni" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.buglioni.it/"
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
              href="https://www.instagram.com/cantinabuglioni/"
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
              href="https://www.facebook.com/cantinabuglionivalpolicella/"
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
            <a href="tel:+390456760681" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              39 045 676 0681
            </a>
            <a href="mailto:buglioni@buglioni.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Farmhouse of Buglioni nestled in Valpolicella Classica vineyard rows"
          />
          <Paragraph>
            Alfredo and Mariano Buglioni never planned to become winegrowers. Then came an old farmhouse in Valpolicella Classica, four hectares of vines, and grapes too ripe to wait. Their first harvest began with tailor’s scissors, untrained hands, and a question that still makes them smile: “Are we really bringing the grapes home with these?”
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Harvesting grapes between vineyard rows with tractor in Valpolicella"
          />
          <Paragraph>
            For seven years, they entrusted the fruit to more experienced producers, learning the craft one vintage at a time. Then came the 2000 harvest: the first cellar under the house, 12,000 bottles, and Diego Bertoni, still Buglioni’s winemaker today. In 2004, their first Amarone was ready. Mariano took it to restaurants. The answer was often the same: “Nice wine, but this is just a hobby. Will you still be here in three years?”
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Guests enjoying Buglioni wine with charcuterie spread"
          />
          <Paragraph>
            So Buglioni stopped waiting for doors to open and opened one of their own. In 2005, Osteria del Bugiardo was born in the heart of Verona. Not a tasting room. Not a showroom. A real place, open to everyone, where wine met food, voices, laughter, and the beautiful disorder of a table worth remembering. Today we would call it a Live Experience. Back then, it was simply the most honest way to put Buglioni wines in people’s hands.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Nighttime outdoor wine celebration with crowd and glowing neon sign"
          />
          <Paragraph>
            Today, Buglioni means estate-grown grapes, wines from Valpolicella and Lake Garda, a relais among the vines, a restaurant, and two wine bars in Verona. Different places, one idea: wine should not stay trapped inside a bottle, a score, or a technical sheet. It should be lived.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Long banquet dinner table under cypress trees and string lights at sunset"
          />
          <Paragraph>
            Then came another question: why should wine speak only to those who already know how to listen? That question became Atto, the festivals, the music, the late nights, the young crowd with a glass in hand and no fear of wine. Because tradition is not fragile. It can dance, sweat, stay up late, and still remain tradition.
          </Paragraph>
          <Paragraph>
            Open a bottle. Then come and see where the story refuses to sit still.
          </Paragraph>
        </article>
      </div>
    </div>
  );
}
