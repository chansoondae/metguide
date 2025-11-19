import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Heart, Share2, Calendar, Palette, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getArtworkById, getAllArtworks, getNextArtwork, getPreviousArtwork, getRelatedArtworks } from '@/lib/data/artworks';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const artworks = await getAllArtworks();
  return artworks.map((artwork) => ({
    id: artwork.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artwork = await getArtworkById(parseInt(id));

  if (!artwork) {
    return {
      title: 'Artwork Not Found',
    };
  }

  return {
    title: `${artwork.title} - ${artwork.artist}`,
    description: artwork.description || `${artwork.title} by ${artwork.artist}, ${artwork.year}`,
  };
}

export default async function ArtworkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artworkId = parseInt(id);
  const artwork = await getArtworkById(artworkId);

  if (!artwork) {
    notFound();
  }

  const allArtworks = await getAllArtworks();
  const nextArtwork = getNextArtwork(artworkId, allArtworks);
  const previousArtwork = getPreviousArtwork(artworkId, allArtworks);
  const relatedArtworks = getRelatedArtworks(artwork, allArtworks);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/artworks"
              className="flex items-center text-sm text-gray-600 hover:text-blue-900"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Artworks
            </Link>
            <div className="flex gap-2">
              {previousArtwork && (
                <Link href={`/artworks/${previousArtwork.id}`}>
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                </Link>
              )}
              {nextArtwork && (
                <Link href={`/artworks/${nextArtwork.id}`}>
                  <Button variant="outline" size="sm">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-4 inline-block self-start rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-900">
              #{artwork.id} • {artwork.section}
            </div>

            <h1 className="text-4xl font-bold text-gray-900">
              {artwork.title}
            </h1>

            <p className="mt-4 text-2xl text-gray-700">
              {artwork.artist}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Year</div>
                  <div className="text-base text-gray-900">{artwork.year}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Palette className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Medium</div>
                  <div className="text-base text-gray-900">{artwork.medium}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Collection</div>
                  <div className="text-base text-gray-900">{artwork.collection}</div>
                </div>
              </div>
            </div>

            {artwork.description && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900">About This Artwork</h2>
                <p className="mt-2 text-gray-700 leading-relaxed">{artwork.description}</p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex gap-4">
              <Button className="flex-1" size="lg">
                <Heart className="mr-2 h-5 w-5" />
                Add to Favorites
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Related Artworks */}
        {relatedArtworks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">Related Artworks</h2>
            <p className="mt-2 text-gray-600">
              More artworks from {artwork.section} or by {artwork.artist}
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedArtworks.map((relatedArtwork) => (
                <Link
                  key={relatedArtwork.id}
                  href={`/artworks/${relatedArtwork.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={relatedArtwork.imageUrl}
                        alt={relatedArtwork.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-900">
                        {relatedArtwork.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">{relatedArtwork.artist}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
