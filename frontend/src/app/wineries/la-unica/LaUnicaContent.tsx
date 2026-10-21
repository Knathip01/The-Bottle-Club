import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/285871/logos/s0LM1hCNQRKlgKhKVqlNmg.png',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/BE5oMAypQ5ShRRbYYXATyg_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/285871_2_launica.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/285871_1_launica.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/285871_4_launica.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/285871_5_launica.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/285871_4_11_launica.jpg',
  story6: 'https://images.vivino.com/misc/sponsorships/285871_6_launica.jpg',
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

export default function LaUnicaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="La Unica logo"
                width={56}
                height={56}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">La Unica</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientLaUnica)"></path>
                  <defs>
                    <linearGradient id="badgeGradientLaUnica" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>9</strong> Wines</span>
            </div>

            <Link
              href="/search?q=La%20Unica"
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
              value="Félix Solís Avantis (Félix Solís & Pagos del Rey)"
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://www.pagosdelrey.com/launica/"
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
              href="https://www.instagram.com/pagosdelreywines"
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
              href="https://www.facebook.com/PagosdelRey/#"
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
              <span>+(34) 926 322 400</span>
            </div>

            <a
              href="mailto:pdr@pagosdelreycom.com"
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
              alt="Artist creating La Única label artwork with fine brush and wine glasses"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="pt-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 sm:text-sm">THE STORY</h2>
          </div>

          <Paragraph>
            La Única is the result of a collaboration between the Félix Solís family and the renowned Argentine artist Mariano Rinaldi Goñi. Based in Berlin and enjoying widespread international acclaim, the artist brings his artistic vision to this limited edition, which is celebrating its fifth anniversary. His creative vision is reflected in the design of each label, transforming every bottle into a collector’s item where winemaking tradition and contemporary art converge with power and elegance.
          </Paragraph>

          <StoryImage
            src={images.story1}
            alt="Mariano Rinaldi Goñi sitting at a cellar table hand-painting each La Única label canvas"
          />

          <StoryImage
            src={images.story2}
            alt="Close-up of a completed La Única artist-edition label card"
          />

          <Paragraph>
            Wine experts from around the world gathered at the Pagos del Rey Museum with a single aim: to determine the final blend for this wine. An exceptional blend crafted from a selection of wines from the family’s Pagos del Rey wineries based in Fuenmayor, Olmedillo de Roa, and Morales de Toro.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Grand barrel cellar at Pagos del Rey with classical chandeliers and aging oak casks"
          />

          <Paragraph>
            To enjoy a glass of La Única is to uncover the character of the Tempranillo grape: the personality shaped by the terroir and the ageing process dictated by the barrel. This is a wine of mature expression and impeccable structure, where black fruit comes through with clarity before giving way to the complexity of ageing: hints of dried leaves, balsamic notes, and delicate herbs. The ageing process adds elegance, creating a structured wine that culminates in a magnificent finish.
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Pagos del Rey Museum building illuminated at dusk in Morales de Toro"
          />

          <Paragraph>
            Now in its fifth year, this project has established itself as Pagos del Rey’s most unique gem. To this end, Mariano Rinaldi Goñi has created over 100 original canvases. These works are reproduced on the labels using traditional printing techniques, making each bottle part of an exclusive series. As a guarantee of their authenticity and artistic value, each label bears its own certification stamp and serial number, ensuring that every bottle is a unique collector’s item.
          </Paragraph>

          <StoryImage
            src={images.story5}
            alt="Exhibition of original painted canvas label art for La Única"
          />

          <StoryImage
            src={images.story6}
            alt="Historic vaulted barrel room with illuminated arches at Pagos del Rey"
          />
        </article>
      </div>
    </div>
  );
}
