import { Suspense } from 'react';
import { getAllArtworks, getExhibitionData } from '@/lib/data/artworks';
import { FeedContainer } from '@/components/artwork/FeedContainer';

export default async function HomePage() {
  const artworks = await getAllArtworks();
  const exhibitionData = await getExhibitionData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={
        <div className="flex justify-center py-8">
          <div className="animate-pulse text-gray-500">로딩 중...</div>
        </div>
      }>
        <FeedContainer artworks={artworks} sections={exhibitionData.sections} />
      </Suspense>
    </div>
  );
}
