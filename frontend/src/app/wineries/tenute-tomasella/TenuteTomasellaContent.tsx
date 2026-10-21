import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/82051/logos/AHeGszimSu-jXCaBmWZi9A_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/9WSYQ4XSQBGXyylcdAlxWw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/82051_Tomasella/82051_Tomasella_1.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/82051_Tomasella/82051_Tomasella_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/82051_Tomasella/82051_Tomasella_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/82051_Tomasella/82051_Tomasella_4.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/82051_Tomasella/82051_Tomasella_5.jpg',
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

export default function TenuteTomasellaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Tenute Tomasella logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Tenute Tomasella</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>25</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Tenute%20Tomasella"
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
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.tenutetomasella.it/"
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
              href="https://www.instagram.com/tenutetomasella/"
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
              href="https://www.facebook.com/tenute.tomasella"
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
            <a href="tel:+390422850043" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +39 0422 850043
            </a>
            <a href="mailto:cantina@tomasella.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1.5 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          {/* Hero Banner Image */}
          <StoryImage
            src={images.hero}
            alt="Tenute Tomasella estate and vineyards illuminated by golden sunset"
          />

          {/* Paragraph 1 */}
          <div className="pt-1">
            <Paragraph>
              It is essential for us that each bottle constitutes a symphony composed in the vineyard. Just as music has no boundaries, neither does the earth, whose boundaries are drawn only by man. Looking at the sky and the earth teaches us to be part of a whole, and not above everything. We produce wine in order to learn respect for the immensity that surrounds us.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraphs 2-3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Vast green vineyard rows stretching into morning mist with solitary trees"
            />
            <Paragraph>
              Simplicity, respect, tradition and the future.
            </Paragraph>
            <Paragraph>
              We live in a healthy environment, with people for whom it is important to pass on values, and, therefore, where habits and traditions are renewed from generation to generation.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Macro close-up of tender young grape flower clusters on sunlit vine shoot"
            />
            <Paragraph>
              The most complex part of our work is that which leads us to produce the grapes. Only healthy grapes, fruit of a land that is cared for, respecting the cycles and times of nature, will be able to generate special wines.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Purple wildflowers growing between vine rows at Tenute Tomasella"
            />
            <Paragraph>
              Tasting our wine is an invitation to our table. Opening our doors means sharing the deep connection we have with the land. We welcome you to step into our world, slow down, and find the harmony of time and our profound respect for nature distilled into a single, shared glass.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 6 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Guests enjoying wine tasting and toasting by the warm fireplace"
            />
            <Paragraph>
              Every special moment deserves a place where time slows down. Discover our spaces for private events: from our intimate enoteca and spacious hall to the open courtyard. An authentic backdrop to gather, share stories, and celebrate what truly matters.
            </Paragraph>
          </div>

          {/* Story Image 5 */}
          <div className="pt-1 pb-1">
            <StoryImage
              src={images.image5}
              alt="Historic Venetian palace with battlement tower and event courtyard at Tenute Tomasella"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
