'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { InfiniteScrollFeed } from './InfiniteScrollFeed';
import { VerticalTimeline } from './VerticalTimeline';
import { Artwork } from '@/types/artwork';

interface FeedContainerProps {
  artworks: Artwork[];
}

export function FeedContainer({ artworks }: FeedContainerProps) {
  const [currentArtworkId, setCurrentArtworkId] = useState<number | undefined>();
  const searchParams = useSearchParams();
  const targetArtworkId = searchParams.get('artwork');

  return (
    <div className="mx-auto max-w-7xl px-0 sm:px-4 py-0 sm:py-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-8">
          <InfiniteScrollFeed
            artworks={artworks}
            onCurrentArtworkChange={setCurrentArtworkId}
            targetArtworkId={targetArtworkId ? parseInt(targetArtworkId) : undefined}
          />
        </div>

        {/* Timeline Sidebar - hidden on mobile */}
        <div className="lg:col-span-4">
          <VerticalTimeline
            artworks={artworks}
            currentArtworkId={currentArtworkId}
          />
        </div>
      </div>
    </div>
  );
}
