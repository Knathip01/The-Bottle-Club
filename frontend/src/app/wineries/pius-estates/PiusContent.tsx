'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mail, Mountain, Phone, Star } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/317893/logos/2Y45WHjdQfGrioYe_MzTOA.jpeg',
  hero: 'https://thumbs.vivino.com/winery_backgrounds/jmzfvdj9RZSqfoIyKJWRIQ_2560x1520.jpeg',
  story1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/317893_pius/317893_pius_1.jpg',
  story2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/317893_pius/pius_2+(1).jpg',
  story3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/317893_pius/317893_pius_3.jpg',
  story4: 'https://vivino.s3.amazonaws.com/misc/sponsorships/317893_pius/317893_pius_4.jpg',
  story5: 'https://vivino.s3.amazonaws.com/misc/sponsorships/317893_pius/317893_pius_5.jpg',
  story6: 'https://vivino.s3.amazonaws.com/misc/sponsorships/317893_pius/317893_pius_6.jpg',
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
  return <p className={`px-0.5 py-1 text-[11px] leading-[1.6] text-[#242424] sm:text-[13.5px] ${className}`}>{children}</p>;
}

export default function PiusContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          {/* Main Card */}
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white sm:mx-0 sm:h-16 sm:w-16">
              <Image
                src={images.logo}
                alt="Pius Estates logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Pius Estates</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientPius)"></path>
                  <defs>
                    <linearGradient id="badgeGradientPius" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>11</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.5
              </span>
              <span className="text-stone-500">307 total ratings</span>
            </div>

            <Link
              href="/search?q=Pius+Estates"
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
                <Link href="/product?country=United%20States" className="inline-flex items-center gap-1.5 hover:underline">
                  <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full border border-stone-200">
                    <span className="block h-full w-full bg-[#3c3b6e] text-center text-[7px] leading-3 text-white">🇺🇸</span>
                  </span>
                  United States
                </Link>
              }
              icon={<Globe className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://piuswines.com"
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
              href="https://www.instagram.com/piuswines"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <svg className="h-3.5 w-3.5 fill-stone-500" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <a
              href="https://www.facebook.com/piuswines"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <svg className="h-3.5 w-3.5 fill-stone-500" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <a
              href="tel:+18052270382"
              className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <Phone className="h-3.5 w-3.5 text-stone-500" />
              <span>+1 805 227 0382</span>
            </a>

            <a
              href="mailto:depth@piuswines.com"
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
              alt="Sun shining through oak trees over the gentle slopes of Pius Estates vineyard in Paso Robles"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <Paragraph>
            Alongside the gentle slopes of Paso Robles, California, Pius is set on a 30-acre estate, with 20 acres thoughtfully planted to reflect the character of the land. The vineyards are dedicated primarily to Bordeaux varietals, with a particular focus on Cabernet Sauvignon. A unique configuration of Syrah is also planted on the property, designed to pay homage to the famed slopes of Côte-Rôtie in France, an intentional nod to the traditions that inspire the estate’s philosophy.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story1}
            alt="Morning golden sunlight shimmering across estate vineyard rows"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            The vineyard is cared for with a regenerative organic approach, where consideration for the vines is guided by a deep respect for the natural rhythms of the land. The estate sits on soils rich in calcareous limestone clay, layered with nutrient-dense earth that naturally supports balanced vine growth and complex fruit development. The guiding belief is simple yet profound: if it grows together, it goes together. This philosophy reflects the deeper meaning of terroir, the interconnected relationship between soil, vine, climate, and time.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story2}
            alt="Vineyard avenue framed by ancient California oaks and hills"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            While the estate itself is central to the identity of Pius, the winery also embraces a single-vineyard ideology, collaborating with select vineyard sites that showcase premium fruit in distinct and expressive ways. Each site is treated as its own voice, contributing nuance and character to the wines.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story3}
            alt="Pius Estates modern moody tasting room with illuminated wine library display and sculptural chandelier"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            The property reflects a thoughtful blend of California openness, Old World winemaking traditions, and Japanese design principles. Elements such as Shou Sugi Ban wood, sculptural vineyard rows, and a restrained architectural approach create harmony between the built environment and the surrounding landscape. The estate is constructed with a bio-construction philosophy, incorporating natural materials such as stone, wood, metal, and concrete to minimize environmental impact while creating a cohesive sensory experience.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story4}
            alt="Fine bottles of Pius wine lying in dark cellar racks"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            Inside the winery, tradition meets innovation. Fermentation and aging occur across a range of vessels, steel, concrete, ceramic, and wood, supported by modern optical sorting technology to ensure only the finest fruit is selected. Even the barrels are chosen with extraordinary care, sourced from specific forests in France where the tight grain of the oak lends refined structure and subtle complexity.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story5}
            alt="Charred Shou Sugi Ban architectural winery barn featuring round window and stone chimney"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            The tasting room continues this dialogue between tradition and modernity, infused with art and imagination under the vision of Winemaker Anthony Versochi. Beyond the glass, Pius hosts immersive experiences, from sensory tastings to seasonal gatherings, inviting guests to explore wine as a deeper connection to nature, craft, and time.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story6}
            alt="Curving vineyard contours undulating along the Paso Robles slopes"
          />
        </article>
      </div>
    </div>
  );
}
