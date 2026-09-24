import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PromotionDetailClient from '@/components/PromotionDetailClient';
import { getPromotionById, getPromotions } from '@/lib/promotions.server';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  const promotion = await getPromotionById(id);

  if (!promotion) {
    return {
      title: 'โปรโมชั่นไม่พบ | The Bottle Club',
    };
  }

  return {
    title: `${promotion.title} | โปรโมชั่น The Bottle Club`,
    description: promotion.subtitle || promotion.description.slice(0, 160),
    openGraph: {
      title: promotion.title,
      description: promotion.subtitle || promotion.description.slice(0, 160),
      images: promotion.imageUrl ? [{ url: promotion.imageUrl }] : [],
    },
  };
}

export default async function PromotionDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    notFound();
  }

  const [promotion, allPromotions] = await Promise.all([
    getPromotionById(id),
    getPromotions(),
  ]);

  if (!promotion) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-stone-50">
      <MainHeader />
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
        <PromotionDetailClient
          promotion={promotion}
          otherPromotions={allPromotions}
        />
      </div>
      <Footer />
    </main>
  );
}
