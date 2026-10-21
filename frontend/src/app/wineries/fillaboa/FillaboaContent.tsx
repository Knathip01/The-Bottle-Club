import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/11665/logos/-Vzj_dBPR3GlqFfNAOGBBA.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/NEHdXq02RLuGQxlAQwPOKw_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/11665_fillaboa/11665_fillaboa_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/11665_fillaboa/11665_fillaboa_2_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/11665_fillaboa/11665_fillaboa_3_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/11665_fillaboa/11665_fillaboa_4_2560x1520.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/11665_fillaboa/11665_fillaboa_5_2560x1520.jpg',
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

export default function FillaboaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Fillaboa logo"
                width={56}
                height={56}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Fillaboa</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientFillaboa)"></path>
                  <defs>
                    <linearGradient id="badgeGradientFillaboa" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>6</strong> Wines</span>
            </div>

            <Link
              href="/search?q=Fillaboa"
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
                <Link href="/product?country=Spain" className="inline-flex items-center gap-1.5 hover:underline">
                  <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full border border-stone-200">
                    <span className="block h-full w-full bg-[#c60b1e] text-center text-[7px] leading-3 text-yellow-300">🇪🇸</span>
                  </span>
                  Spain
                </Link>
              }
              icon={<Globe className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value="Masaveu Bodegas"
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="http://www.bodegasfillaboa.com"
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

            <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800">
              <Phone className="h-3.5 w-3.5 text-stone-500" />
              <span>34986658132</span>
            </div>

            <a
              href="mailto:info@bodegasfillaboa.com"
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
              alt="Bodegas Fillaboa historic stone estate manor in Salvatierra de Miño"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <StoryImage
            src={images.story1}
            alt="Paved courtyard and driveway leading to the elegant Fillaboa manor"
          />

          <Paragraph>
            Bodegas Fillaboa is located in Salvatierra de Miño, in the province of Pontevedra, and belongs to the Rías Baixas Designation of Origin. It is the only winery in Galicia that is part of the Grandes Pagos de España association. The Fillaboa estate enjoys a privileged location for cultivating Albariño grapes, benefiting from a microclimate with Atlantic influence, mild temperatures, and abundant rainfall.
          </Paragraph>

          <StoryImage
            src={images.story2}
            alt="Aerial view of Fillaboa estate house nestled among lush green vineyard rows"
          />

          <Paragraph>
            Its 74-hectare estate is divided into 12 small plots with mineral-rich soils, featuring a granite subsoil, alluvial sediment, and abundant river stones. This composition provides excellent drainage, while the south-facing orientation ensures optimal airflow—both key factors in keeping the grapes in perfect health.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Morning mist rising gently over sunny Albariño vineyard hills"
          />

          <Paragraph>
            The uniqueness of the terroir, combined with a viticultural philosophy focused on the personalized care of each plot, results in grapes rich in aromas and nuance. Their wines reflect the true character of Albariño grown on the slopes of the Miño River—marked by expressive aromas and Atlantic freshness—that have captivated palates around the world.
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Lush cluster of golden-green Albariño grapes ripening on the vine"
          />

          <Paragraph>
            The winery holds the Sustainable Wineries for Climate Protection (SWfCP) certification, which reflects its commitment to fighting climate change, promoting environmental and social sustainability, ensuring economic efficiency, and upholding ethical practices.
          </Paragraph>

          <StoryImage
            src={images.story5}
            alt="Woman savoring the aroma of Albariño white wine in the Fillaboa vineyard"
          />

          <Paragraph>
            In addition, Fillaboa is certified under ISO 14001, which confirms the winery’s dedication to sustainable environmental management and efficient use of resources.
          </Paragraph>

          {/* Links Section */}
          <div className="space-y-1 pt-1 text-[11px] sm:text-xs">
            <div>
              <a
                href="https://bodegasfillaboa.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#b31412] hover:underline"
              >
                Bodegas Fillaboa
              </a>
            </div>
            <div>
              <a
                href="https://bodegasfillaboa.com/nuestros-vinos/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#b31412] hover:underline"
              >
                Wines
              </a>
            </div>
            <div>
              <a
                href="https://bodegasfillaboa.com/nuestros-licores/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#b31412] hover:underline"
              >
                Orujos &amp; licores
              </a>
            </div>
            <div>
              <a
                href="https://bodegasfillaboa.com/visitas-fillaboa/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#b31412] hover:underline"
              >
                Enoturismo
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
