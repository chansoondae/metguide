import { Suspense } from 'react';
import { getAllArtworks } from '@/lib/data/artworks';
import { FeedContainer } from '@/components/artwork/FeedContainer';

export default async function HomePage() {
  const artworks = await getAllArtworks();

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="flex justify-center py-8"><div className="animate-pulse text-gray-500">로딩 중...</div></div>}>
        <FeedContainer artworks={artworks} />
      </Suspense>
    </div>
  );
}
