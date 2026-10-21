import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/253887/logos/quCzAyV2RAuDoyz1DRD3hQ_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/HXMZCfF0SSCVLD2ueECxZA_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/14374_argeles_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/14374_argeles_2_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/14374_argeles_3_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/14374_argeles_4_2560x1520.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/14374_argeles_5_2560x1520.jpg',
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
    <div className="overflow-hidden rounded-md">
      <Image
        src={src}
        alt={alt}
        width={1280}
        height={760}
        unoptimized
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

function Paragraph({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px] ${className}`}>{children}</p>;
}

export default function ArgelesWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Argeles Winery logo"
                width={56}
                height={56}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Argeles Winery</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientArgeles)"></path>
                  <defs>
                    <linearGradient id="badgeGradientArgeles" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>10</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.1
              </span>
              <span className="text-stone-500">61 total ratings</span>
            </div>

            <Link
              href="/search?q=Argeles%20Winery"
              className="inline-flex h-8 w-full items-center justify-center rounded-full bg-[#1e1e1e] text-xs font-semibold text-white transition hover:bg-black sm:h-9"
            >
              View wines
            </Link>
          </section>

          {/* Details Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <Row
              label="Country"
              value={
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full border border-stone-200">
                    <span className="block h-full w-full bg-[#c60b1e] text-center text-[7px] leading-3 text-yellow-300">🇪🇸</span>
                  </span>
                  Spain
                </span>
              }
              icon={<Globe className="h-4 w-4" />}
            />
            <Row
              label="Region"
              value="Priorat"
              icon={<Mountain className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value="Argeles Winery"
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://www.argeles.es/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-stone-500" />
                Website
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <a
              href="https://www.instagram.com/argeleswinery/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-[8px] font-bold text-white">IG</span>
                Instagram
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61581711882776"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-stone-900 text-[9px] font-bold text-white">f</span>
                Facebook
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800">
              <Phone className="h-3.5 w-3.5 text-stone-500" />
              <span>937 819 499</span>
            </div>

            <a
              href="mailto:mireia@argeles.es"
              className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <Mail className="h-3.5 w-3.5 text-stone-500" />
              <span>Winery Email</span>
            </a>
          </section>
        </aside>

        {/* Right Article & Content */}
        <article className="space-y-4 rounded-md border border-stone-200 bg-white p-3 sm:space-y-6 sm:p-5">
          {/* Hero Banner */}
          <div className="overflow-hidden rounded-md">
            <Image
              src={images.hero}
              alt="Sloping hillside vineyard path with grapes in Argeles, Priorat"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <Paragraph>
            In a hidden corner of the Priorat, between Torroja and Porrera, lies Argeles — known as the Land of Clay. Long before vineyards arrived, travelers and pilgrims would stay at its ancient springs, drawn by the pure water emerging from the earth. Later, Carthusian monks walked these slopes seeking silence and calm, discovering a landscape that seemed to speak through its colors and the blend of clay and llicorella.
          </Paragraph>

          <StoryImage
            src={images.story1}
            alt="Ancient stone spring and arched fountain hidden among stone walls and vegetation in Argeles"
          />

          <Paragraph>
            After decades of silence, the vineyards were replanted in 2007 — not to reinvent history, but to continue it with respect and purpose.
          </Paragraph>

          <Paragraph>
            Today, Argeles covers more than 66 hectares of rugged terrain, with steep slopes and elevated peaks, within a protected natural environment. It now occupies almost the entirety of its historic “Paratge,” a unique site within the DOQ Priorat, the appellation that guarantees the quality of the region’s wines. Its geology, orientation, sunlight, and Mediterranean mists create a microclimate ideal for grapes with remarkable character.
          </Paragraph>

          <StoryImage
            src={images.story2}
            alt="Clusters of deep purple grapes hanging on the vine under bright Priorat sunlight"
          />

          <Paragraph>
            On this challenging terrain, the vines struggle for every nutrient and drop of water, rooting deeply through layers of stone and clay. This effort yields little fruit, but what it produces is extraordinary: expressive, textured wines, deeply connected to their terroir.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Close-up of mineral-rich Priorat slate and llicorella stone strata"
          />

          <Paragraph>
            Argeles produces exclusively limited-production, single-estate wines, crafted from unique plots and grape varieties, aiming to convey the authenticity of the place in every bottle. Each sip is a journey through history, the power of nature, and the legacy of generations who understood that greatness arises from silence, patience, and respect for the land.
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Priorat hillside vineyard slopes with winding dirt track and bush vines"
          />

          <Paragraph>
            The release of the inaugural 2020 vintage represents not just a beginning, but the culmination of years of work.
          </Paragraph>

          <Paragraph>
            Argeles: where the spirit of the Priorat is not remembered — it is lived...
          </Paragraph>

          <StoryImage
            src={images.story5}
            alt="Bottles of Argeles wines set on rough Priorat stone blocks in warm studio light"
          />
        </article>
      </div>
    </div>
  );
}
