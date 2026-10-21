import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  MapPin,
  Globe,
  Phone,
  Mail,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Share2,
} from 'lucide-react';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import { WINERIES_DATA, Winery } from '@/data/wineriesData';
import { WineriesShieldIcon } from '@/components/wineries/WineriesShieldIcon';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const winery = WINERIES_DATA.find(
    (w) => w.seo_name.toLowerCase() === slug.toLowerCase() || String(w.id) === slug
  );

  if (!winery) {
    return { title: 'Winery Not Found | The Bottle Club' };
  }

  return {
    title: `${winery.name} | The Bottle Club & Vivino`,
    description: winery.description || `Explore world-class wines from ${winery.name} in ${winery.region_name}.`,
  };
}

// Vivino Partner Badge Component
function VivinoPartnerBadgeLarge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-red-500/15 to-rose-500/15 border border-amber-500/30 text-xs font-black text-amber-200">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <defs>
          <linearGradient id="badgeGradLg" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EE803E" />
            <stop offset="1" stopColor="#BA1628" />
          </linearGradient>
        </defs>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z"
          fill="url(#badgeGradLg)"
        />
      </svg>
      <span>Verified Partner Winery</span>
    </span>
  );
}

export default async function WineryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const winery = WINERIES_DATA.find(
    (w) => w.seo_name.toLowerCase() === slug.toLowerCase() || String(w.id) === slug
  );

  if (!winery) {
    notFound();
  }

  if (winery.seo_name.toLowerCase() === 'm-chapoutier') {
    redirect('/wineries/m-chapoutier');
  }

  if (winery.seo_name.toLowerCase() === 'veuve-clicquot') {
    redirect('/wineries/veuve-clicquot');
  }

  if (winery.seo_name.toLowerCase() === 'moet-chandon') {
    redirect('/wineries/moet-chandon');
  }

  if (winery.seo_name.toLowerCase() === 'dom-perignon') {
    redirect('/wineries/dom-perignon');
  }

  if (winery.seo_name.toLowerCase() === 'catena') {
    redirect('/wineries/catena');
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <MainHeader />

      <div className="flex-grow">
        
        {/* ── Breadcrumb Bar ────────────────────────────────────────────── */}
        <div className="bg-white border-b border-stone-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-stone-500 font-medium">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/wineries" className="hover:text-stone-900 transition-colors">Wineries</Link>
              <span>/</span>
              <span className="font-bold text-stone-900 truncate max-w-[200px] sm:max-w-none">{winery.name}</span>
            </div>

            <Link
              href="/wineries"
              className="inline-flex items-center gap-1.5 font-bold text-[#a11a1a] hover:underline"
            >
              <ArrowLeft size={14} />
              <span>Back to all wineries</span>
            </Link>
          </div>
        </div>

        {/* ── Hero Banner Section matching Vivino ───────────────────────── */}
        <div className="relative bg-stone-900 text-white overflow-hidden">
          {/* Cover photo background */}
          <div className="absolute inset-0 z-0">
            <Image
              src={winery.cover_image || 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=80'}
              alt={winery.name}
              fill
              priority
              className="object-cover opacity-50 filter brightness-90"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-black/30" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              
              {/* Winery Identity */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
                
                {/* Round Logo */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white p-2 shadow-2xl border-2 border-white/90 shrink-0 overflow-hidden">
                  {winery.logo_image ? (
                    <Image
                      src={winery.logo_image}
                      alt={winery.name}
                      width={100}
                      height={100}
                      className="object-contain w-full h-full rounded-2xl"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-stone-100 flex items-center justify-center font-black text-stone-800 text-2xl">
                      {winery.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    {winery.is_claimed && <VivinoPartnerBadgeLarge />}
                    <span className="text-xs text-stone-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin size={13} className="text-amber-400" />
                      {winery.region_name}, {winery.country_name}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
                    {winery.name}
                  </h1>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href={`/search?q=${encodeURIComponent(winery.name)}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1e1e1e] text-white font-black text-xs sm:text-sm hover:bg-black transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  <ShoppingBag size={16} className="text-white" />
                  <span>View wines</span>
                </Link>
                {winery.website && (
                  <a
                    href={winery.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-stone-900 font-black text-xs sm:text-sm hover:bg-stone-100 transition-all shadow-xl hover:scale-105 active:scale-95"
                  >
                    <Globe size={16} className="text-[#a11a1a]" />
                    <span>Visit Winery Website</span>
                    <ExternalLink size={14} className="opacity-60" />
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* ── Key Metrics Bar ───────────────────────────────────────────── */}
        <div className="bg-white border-b border-stone-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 max-w-xl mx-auto gap-6 text-center divide-x divide-stone-100">
              
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#a11a1a]">
                  {winery.wines_count}
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mt-1">
                  Wines in Catalog
                </p>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-stone-900">
                  {winery.labels_count ? winery.labels_count.toLocaleString() : '1,000,000+'}
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mt-1">
                  Labels Scanned
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ── Main Content Container ────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* ── SECTION: Winery Biography & Winemaker ───────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Story (2 cols) */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-stone-200/90 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#a11a1a] bg-red-50 px-3 py-1 rounded-full border border-red-200/50">
                  Estate Biography
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-3">
                  About {winery.name}
                </h2>
              </div>

              <div className="prose prose-stone text-stone-700 leading-relaxed text-sm sm:text-base space-y-4 font-normal">
                <p>
                  {winery.description ||
                    `${winery.name} is one of the premier producers in ${winery.region_name}, crafting exceptional terroir-driven wines with uncompromising dedication to quality and craftsmanship.`}
                </p>
                <p>
                  Nestled in the heart of {winery.region_name}, the estate benefits from ideal microclimates and ancient soils that impart distinctive elegance, depth, and age-worthiness to every vintage. {winery.name} continues to stand among the most respected icons in world viticulture.
                </p>
              </div>

              {/* Winemaker Card */}
              {winery.winemaker && (
                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/70 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-200/80 flex items-center justify-center font-black text-amber-900 text-lg shrink-0">
                    👨‍🍳
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      Lead Winemaker / Cellar Master
                    </span>
                    <h4 className="text-base font-black text-stone-900">
                      {winery.winemaker}
                    </h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Leading craftsmanship, barrel selection, and harvest strategy at {winery.name}.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact & Location Card (1 col) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-stone-900 border-b border-stone-100 pb-3">
                Winery Information
              </h3>

              <div className="space-y-4 text-xs">
                
                {winery.address?.city && (
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#a11a1a] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-bold">Terroir Location</strong>
                      <span className="text-stone-600">
                        {winery.address.city}, {winery.address.state}, {winery.address.country}
                      </span>
                    </div>
                  </div>
                )}

                {winery.phone && (
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-[#a11a1a] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-bold">Contact Phone</strong>
                      <a href={`tel:${winery.phone}`} className="text-stone-600 hover:text-[#a11a1a]">
                        {winery.phone}
                      </a>
                    </div>
                  </div>
                )}

                {winery.email && (
                  <div className="flex items-start gap-3">
                    <Mail size={16} className="text-[#a11a1a] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-bold">Email Inquiries</strong>
                      <a href={`mailto:${winery.email}`} className="text-stone-600 hover:text-[#a11a1a]">
                        {winery.email}
                      </a>
                    </div>
                  </div>
                )}

                {winery.website && (
                  <div className="pt-4 border-t border-stone-100">
                    <a
                      href={winery.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#a11a1a] text-white text-xs font-bold hover:bg-[#851212] transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#a11a1a]/20"
                    >
                      <Globe size={14} />
                      <span>Official Estate Website</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}

              </div>
            </div>

          </section>

        </div>

      </div>

      <Footer />
    </main>
  );
}
