import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArtworkCard } from '@/components/artwork/ArtworkCard';
import { getExhibitionData, getArtworksBySection } from '@/lib/data/artworks';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const exhibitionData = await getExhibitionData();
  return exhibitionData.sections.map((section) => ({
    id: section.id,
  }));
}

export default async function SectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exhibitionData = await getExhibitionData();
  const section = exhibitionData.sections.find((s) => s.id === id);

  if (!section) {
    notFound();
  }

  const artworks = await getArtworksBySection(section.name);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/sections">
        <Button variant="ghost" className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Sections
        </Button>
      </Link>

      <div className="mb-8">
        <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-lg font-bold text-blue-900">
          {section.name}
        </div>
        <h1 className="text-4xl font-bold text-gray-900">{section.subtitle}</h1>
        <p className="mt-4 text-lg text-gray-600">
          {artworks.length} {artworks.length === 1 ? 'artwork' : 'artworks'} in this section
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} viewMode="grid" />
        ))}
      </div>
    </div>
  );
}
