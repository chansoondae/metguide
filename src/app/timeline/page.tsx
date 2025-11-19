import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { getAllArtworks } from '@/lib/data/artworks';

export default async function TimelinePage() {
  const artworks = await getAllArtworks();

  // Group artworks by decade
  const artworksByDecade = artworks.reduce((acc, artwork) => {
    const match = artwork.year.match(/\d{4}/);
    if (match) {
      const year = parseInt(match[0]);
      const decade = Math.floor(year / 10) * 10;
      if (!acc[decade]) {
        acc[decade] = [];
      }
      acc[decade].push(artwork);
    }
    return acc;
  }, {} as Record<number, typeof artworks>);

  const decades = Object.keys(artworksByDecade)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Timeline</h1>
        <p className="mt-4 text-lg text-gray-600">
          Explore artworks chronologically from {decades[0]}s to {decades[decades.length - 1]}s
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block" />

        <div className="space-y-16">
          {decades.map((decade) => (
            <div key={decade} className="relative">
              {/* Decade marker */}
              <div className="mb-8 flex items-center gap-4">
                <div className="hidden md:block relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-blue-900 text-white font-bold">
                  {decade}s
                </div>
                <h2 className="text-3xl font-bold text-gray-900 md:hidden">{decade}s</h2>
              </div>

              {/* Artworks grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:ml-24">
                {artworksByDecade[decade].map((artwork) => (
                  <Link
                    key={artwork.id}
                    href={`/artworks/${artwork.id}`}
                    className="group"
                  >
                    <Card className="overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={artwork.imageUrl}
                          alt={artwork.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-900">
                          {artwork.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">{artwork.artist}</p>
                        <p className="text-xs text-gray-500">{artwork.year}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
