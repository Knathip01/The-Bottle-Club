import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star, Target } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/13774/logos/dt7T_3ncSda1vLtwDuWf0g_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/PwNwPlsqTCicOEcZuw3YiA_2560x1520.jpeg',
  image1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/13774_jaumeserra_1.jpg',
  image2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/13774_jaumeserra_2.jpg',
  image3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/13774_jaumeserra_3.jpg',
  image4: 'https://vivino.s3.amazonaws.com/misc/sponsorships/13774_jaumeserra_4.jpg',
  image5: 'https://vivino.s3.amazonaws.com/misc/sponsorships/13774_jaumeserra_5.jpg',
  banner: 'https://vivino.s3.amazonaws.com/misc/sponsorships/Jaume_en.jpg',
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

export default function JaumeSerraContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Jaume Serra logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Jaume Serra</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>31</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.8</b>
                </span>
                <span className="hidden sm:inline">50,006 total ratings</span>
                <span className="sm:hidden">50,006 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Jaume%20Serra"
              className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs"
            >
              View wines
            </Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row
                label="Country"
                value={
                  <a href="https://www.vivino.com/en/explore/countries/spain" className="hover:underline">
                    Spain
                  </a>
                }
                icon={<span>🇪🇸</span>}
              />
              <Row
                label="Region"
                value={
                  <a href="https://www.vivino.com/en/explore/regions/catalunya" className="hover:underline">
                    Catalunya
                  </a>
                }
                icon={<Mountain size={14} />}
              />
              <Row
                label="Winemaker"
                value="Laurent Delaunay"
                icon={<Target size={14} />}
              />
              <Row
                label="Owned by"
                value="J. García Carrión"
                icon={<Landmark size={14} />}
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
                  href="https://www.jaumeserra.com"
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
                  href="https://www.instagram.com/jaumeserraesp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Instagram
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Phone */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Phone size={14} className="shrink-0 text-[#262626]" />
              <a
                href="tel:+34938936404"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                +34 93 893 64 04
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:info@jaumeserra.com"
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
              alt="Stone archway overlooking Mediterranean fortified farmhouse estate of Jaume Serra"
            />
          </div>

          {/* Story Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              High on a hill that gently slopes toward the Mediterranean, Jaume Serra holds a story that began in 1647. What was once a fortified farmhouse called El Padruell slowly evolved into one of Spain’s most unique cava wineries—the closest to the sea, where the vines feel the salty breeze and the landscape speaks for itself.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Historical stone watchtower and fortress walls of Jaume Serra under blue sky"
            />
            <Paragraph>
              When the García-Carrión family acquired the winery in 1997, a project was born that blended centuries of expertise with a modern, family-driven vision of wine. Since then, Jaume Serra has grown without losing its essence: crafting cavas that celebrate life, with a quality-to-price ratio that wins the hearts of consumers around the world.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Mediterranean courtyard building with glass facade and flowering purple bougainvillea"
            />
            <Paragraph>
              Ten meters below the surface, the cavas rest in silence for one to five years. There, laser-guided robots move each bottle with precision, while a dedicated team of winemakers oversees every detail. This blend of innovation and human commitment is part of what makes Jaume Serra so special.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Green vineyard rows with path stretching through Mediterranean coastal hills"
            />
            <Paragraph>
              From the creation of the iconic Cava Pata Negra to the international success of labels like Jaume Serra Cristalino and Bouquet, the winery has earned a prominent place in Europe, the United States, and Asia. Its cavas—from Brut to Gran Reserva—are celebrated for their fine bubbles, freshness, and unmistakable Mediterranean character.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Two bottles of Jaume Serra Cava (Rosé and Brut) resting in sunshine on rustic stone"
            />
            <Paragraph>
              With its solar plant facing the sea and an energy model in which 100% comes from renewable sources, Jaume Serra is driving responsible growth. Reducing emissions, protecting the environment, and embracing innovation are all part of the winery&apos;s commitment to a future-facing vision that never forgets its roots.
            </Paragraph>
          </div>

          {/* Story Image 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image5}
              alt="Panoramic view of coastal vineyards sloping towards the blue Mediterranean horizon"
            />
          </div>

          {/* Bottom EU Banner */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="max-w-[280px]">
              <Image
                src={images.banner}
                alt="Funded by the European Union"
                width={280}
                height={60}
                unoptimized
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
