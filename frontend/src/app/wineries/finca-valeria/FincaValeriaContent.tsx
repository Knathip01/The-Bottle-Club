import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/322432/logos/CbQvctRqSE-SfU3zuVnvzw_500x500.png',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/tEUBHZw_ToqfqupZogGT0g_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/322432_FINCA_VALERIA_1.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/322432_FINCA_VALERIA_2.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/322432_FINCA_VALERIA__6.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/322432_FINCA_VALERIA_4.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/322432_FINCA_VALERIA_5.jpg',
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

export default function FincaValeriaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Finca Valeria logo"
                width={56}
                height={56}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Finca Valeria</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientFincaValeria)"></path>
                  <defs>
                    <linearGradient id="badgeGradientFincaValeria" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>2</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.1
              </span>
              <span className="text-stone-500">119 total ratings</span>
            </div>

            <Link
              href="/search?q=Finca%20Valeria"
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
              value="Vino de España"
              icon={<Mountain className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value={
                <a
                  href="http://www.felixsolisavantis.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Félix Solís Avantis (Félix Solís & Pagos del Rey)
                </a>
              }
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://fincavaleriawines.com/"
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
              href="https://www.instagram.com/fincavaleriawines/"
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
              href="https://www.facebook.com/FincaValeriaWines"
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
              href="mailto:fincavaleriawines@felixsolis.com"
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
              alt="Finca Valeria by Valeria Mazza and Félix Solís banner with Rosé and Blanco bottles"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="pt-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 sm:text-sm">GREAT TASTE IS ALWAYS IN FASHION</h2>
          </div>

          <Paragraph>
            These wines are born from the union of two captivating worlds: wine and fashion. The first, led by Félix Solís, one of the world&#39;s leading figures in wine, and the second by Valeria Mazza, one of the most iconic and admired figures on the world&#39;s haute couture catwalks. Its name, Finca Valeria, reflects the model&#39;s two great passions: her philosophy of life and her retreat, Finca Valeria — a spectacular setting located in Punta del Este.
          </Paragraph>

          <StoryImage
            src={images.story1}
            alt="Valeria Mazza smiling with wine glasses on a sunny terrace table"
          />

          <div className="pt-1">
            <h3 className="text-xs font-bold text-stone-900 sm:text-sm">The Art of Blending</h3>
          </div>

          <Paragraph>
            Blending is the art of combining different grape varieties to achieve perfect harmony and balance. Félix Solís has perfected this technique through a meticulous selection of vineyards and cutting-edge winemaking. A modern approach that prioritises flavour and expressiveness over traditional rules.
          </Paragraph>

          <StoryImage
            src={images.story2}
            alt="Finca Valeria Rosé and Blanco bottles displayed together on stone steps"
          />

          <div className="pt-1">
            <h3 className="text-xs font-bold text-stone-900 sm:text-sm">Finca Valeria Rosé</h3>
          </div>

          <Paragraph>
            This rosé is born under the sun and character of the southern coast of France, where the Mediterranean sets the rhythm of the vineyard. An exceptional blend of three grape varieties — Grenache, Cinsault and Syrah — from two outstanding regions: one caressed by the Mistral wind, evoking the sea breeze and fields of lavender; the other, a land of contrasts between the sea and the Pyrenees. The result is an elegant and harmonious wine. On the nose, it reveals aromas of fresh berries and citrus notes with a hint of wildflowers. On the palate, it surprises with its balanced texture and natural freshness, culminating in a silky finish.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Finca Valeria Rosé bottle and glass on an outdoor pedestal against classic villa architecture"
          />

          <div className="pt-1">
            <h3 className="text-xs font-bold text-stone-900 sm:text-sm">Finca Valeria Blanco</h3>
          </div>

          <Paragraph>
            A white wine with character, made from grapes grown in central and northern Spain. This wine brings together the sophistication of Chardonnay and Sauvignon Blanc with the essence of the Verdejo grape. A precise blend where each variety contributes its own personality. The result is a white wine of great elegance and expressiveness, where aromas of white fruit and citrus intertwine with delicate floral nuances. On the palate, it is harmonious and enveloping, culminating in a long, persistent finish that invites you to keep savouring it.
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Close-up of Finca Valeria Chardonnay Sauvignon Blanc bottle with glowing wine glass"
          />

          <Paragraph>
            Some things will never go out of fashion. Treating yourself to moments with your loved ones by opening a fine wine — to enjoy life without haste and without a watch — is one of them. With Finca Valeria, pleasure is the only measure of time, and every moment becomes memorable. Let&#39;s raise a glass to true affection and the joy of sharing.
          </Paragraph>

          <StoryImage
            src={images.story5}
            alt="Overhead flat lay of Finca Valeria Rosé and Blanco bottles surrounded by cheese board, olives, and appetizers"
          />
        </article>
      </div>
    </div>
  );
}
