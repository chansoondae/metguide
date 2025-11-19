import { getAllArtworks } from '@/lib/data/artworks';
import { getArtistInfo, getArtistFromSlug, getArtistSlug, getAllArtistNames } from '@/lib/data/artists';
import { ArtistProfile } from '@/components/artist/ArtistProfile';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const artists = getAllArtistNames();
  return artists.map((artist) => ({
    slug: getArtistSlug(artist),
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

  return <ArtistProfile artistInfo={artistInfo} artworks={artistArtworks} />;
}
