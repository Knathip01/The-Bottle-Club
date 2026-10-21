import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/zREUMLIgTr229ws02SWHzw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/4159_Zonin/4159_zonin_1.2+(1).jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/4159_Zonin/4159_Zonin_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/4159_Zonin/4159_Zonin_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/4159_Zonin/4159_Zonin_4.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/4159_Zonin/4159_Zonin_5.jpg',
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

export default function ZoninContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://thumbs.vivino.com/wineries/4159/logos/o7c5y1yhT9Owd3hh0BkfUQ_500x500.jpeg"
                alt="Zonin logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Zonin</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>178</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Zonin"
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
              <Row label="Owned by" value="Zonin1821" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.zonin.com/"
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
              href="https://www.instagram.com/zoninofficial/"
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
              href="https://www.facebook.com/share/1HcfkHaaKA/"
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
            <a href="tel:+390444640111" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              +39 0444 640111
            </a>
            <a href="mailto:info@zonin1821.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Friends toasting with Zonin sparkling wine"
          />
          <Paragraph>
            Founded in 1821, by one of Italy’s most historic wine families, Zonin is globally recognized, born in Veneto and proudly led today by the seventh generation. Internationally loved, the winery is driven by a clear passion to deliver the most loved Italian wines to the world.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Pouring Zonin Rosé sparkling wine into glasses"
          />
          <Paragraph>
            Zonin Prosecco D.O.C. is the brand’s most iconic wine. Vibrant, fresh and aromatic, it’s made for toasts, rooftop sunsets, brunches, and spontaneous get-togethers. Its lively sparkle and easy-drinking style turn everyday moments into something worth celebrating.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Celebrating with a bottle of Zonin Prosecco outdoors"
          />
          <Paragraph>
            With over 200 years of winemaking heritage, Zonin has long been a trusted name not only in sparkling wines, but also in prestigious Italian still wines. From elegant whites to characterful reds, the winery’s expertise reaches into celebrated appellations, including fine, age-worthy styles such as Amarone - proof of a craft that goes well beyond bubbles.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Dining with Zonin Amarone della Valpolicella"
          />
          <Paragraph>
            Zonin also embraces new drinking occasions with innovative choices made for different lifestyles. Zonin Zero is a non-alcoholic sparkling alternative that brings the same crisp, celebratory feel as a glass of bubbles, ideal when you want a sparkling celebration.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Pouring chilled Zonin Zero non-alcoholic sparkling wine"
          />
          <Paragraph>
            Zonin Limoneto Spritz captures the easy, sunny vibe of the Italian aperitivo in a ready-to-drink serve made with Italian sparkling wine and real Sicilian lemon juice-bright, citrusy, and effortlessly social, come Spritz with us!
          </Paragraph>
          <Paragraph>
            Every bottle of Zonin blends quality with authentic Italian style. From classic Prosecco to fresh new occasions - Make the Moment with Zonin!
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Zonin Limoneto Spritz served with lemons and fresh herbs"
          />
        </article>
      </div>
    </div>
  );
}
