import { Suspense } from 'react';
import Link from 'next/link';
import { getUniqueArtists, getArtworksByArtist } from '@/lib/data/artworks';
import { getArtistSlug, getAllArtistNames, getArtistInfo } from '@/lib/data/artists';
import { ArtistGridMenu } from '@/components/artist/ArtistGridMenu';

export default async function ArtistsPage() {
  const artists = await getUniqueArtists();

  // Get all artist info for the menu
  const allArtistNames = getAllArtistNames();
  const allArtists = allArtistNames
    .map(name => getArtistInfo(name))
    .filter((artist): artist is NonNullable<typeof artist> => artist !== null);

  // Get artwork count for each artist
  const artistsWithCount = await Promise.all(
    artists.map(async (artist) => {
      const artworks = await getArtworksByArtist(artist);
      return {
        name: artist,
        count: artworks.length,
        slug: getArtistSlug(artist),
      };
    })
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            작가
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            전시에 참여한 {artists.length}명의 작가를 만나보세요
          </p>
        </div>

        {/* Artists Grid */}
        <Suspense fallback={
          <div className="flex justify-center py-8">
            <div className="animate-pulse text-gray-500">로딩 중...</div>
          </div>
        }>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artistsWithCount.map((artist) => (
              <Link
                key={artist.name}
                href={`/artists/${artist.slug}`}
                className="group block bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {artist.count}개의 작품
                    </p>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </Suspense>
      </div>
      <ArtistGridMenu artists={allArtists} />
    </div>
  );
}
