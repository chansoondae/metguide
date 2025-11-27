import { getAllArtworks } from '@/lib/data/artworks';
import { getArtistInfo, getArtistFromSlug, getArtistSlug, getAllArtistNames } from '@/lib/data/artists';
import { ArtistProfile } from '@/components/artist/ArtistProfile';
import { ArtistPageContainer } from '@/components/artist/ArtistPageContainer';
import { notFound } from 'next/navigation';

// Force static generation for all artist pages
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const artists = getAllArtistNames();
  return artists.map((artist) => ({
    slug: getArtistSlug(artist)
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArtistPage({ params }: PageProps) {
  const resolvedParams = await params;
  const artistName = getArtistFromSlug(resolvedParams.slug);
  const artistInfo = getArtistInfo(artistName);

  if (!artistInfo) {
    notFound();
  }

  // Get all artworks by this artist
  const allArtworks = await getAllArtworks();
  const artistArtworks = allArtworks.filter(artwork => artwork.artist === artistName);

  // Get all artists for the menu
  const allArtistNames = getAllArtistNames();
  const allArtists = allArtistNames.map(name => getArtistInfo(name)).filter(Boolean);

  return (
    <ArtistPageContainer
      artistInfo={artistInfo}
      artworks={artistArtworks}
      allArtists={allArtists}
    />
  );
}
