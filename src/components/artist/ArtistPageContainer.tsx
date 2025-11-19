'use client';

import { Artwork } from '@/types/artwork';
import { ArtistInfo } from '@/lib/data/artists';
import { ArtistProfile } from './ArtistProfile';
import { ArtistGridMenu } from './ArtistGridMenu';

interface ArtistPageContainerProps {
  artistInfo: ArtistInfo;
  artworks: Artwork[];
  allArtists: (ArtistInfo | null)[];
}

export function ArtistPageContainer({ artistInfo, artworks, allArtists }: ArtistPageContainerProps) {
  // Filter out null values
  const validArtists = allArtists.filter((artist): artist is ArtistInfo => artist !== null);

  return (
    <>
      <ArtistProfile artistInfo={artistInfo} artworks={artworks} />
      <ArtistGridMenu artists={validArtists} currentArtistName={artistInfo.name} />
    </>
  );
}
