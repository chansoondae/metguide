import { Artwork, ExhibitionData } from '@/types/artwork';
import exhibitionCompleteData from './exhibition-complete.json';

export async function getExhibitionData(): Promise<ExhibitionData> {
  return exhibitionCompleteData as ExhibitionData;
}

export async function getAllArtworks(): Promise<Artwork[]> {
  const data = await getExhibitionData();
  return data.artworks;
}

export async function getArtworkById(id: number): Promise<Artwork | undefined> {
  const artworks = await getAllArtworks();
  return artworks.find(artwork => artwork.id === id);
}

export async function getArtworksBySection(section: string): Promise<Artwork[]> {
  const artworks = await getAllArtworks();
  return artworks.filter(artwork => artwork.section === section);
}

export async function getArtworksByArtist(artist: string): Promise<Artwork[]> {
  const artworks = await getAllArtworks();
  return artworks.filter(artwork => artwork.artist === artist);
}

export async function getUniqueArtists(): Promise<string[]> {
  const artworks = await getAllArtworks();
  const artists = new Set(artworks.map(a => a.artist));
  return Array.from(artists).sort();
}

export async function getUniqueMediums(): Promise<string[]> {
  const artworks = await getAllArtworks();
  const mediums = new Set(artworks.map(a => a.medium));
  return Array.from(mediums).sort();
}

export async function getYearRange(): Promise<[number, number]> {
  const artworks = await getAllArtworks();
  const years = artworks
    .map(a => {
      const match = a.year.match(/\d{4}/);
      return match ? parseInt(match[0]) : 0;
    })
    .filter(y => y > 0);

  return [Math.min(...years), Math.max(...years)];
}

export function getNextArtwork(currentId: number, artworks: Artwork[]): Artwork | null {
  const currentIndex = artworks.findIndex(a => a.id === currentId);
  if (currentIndex === -1 || currentIndex === artworks.length - 1) return null;
  return artworks[currentIndex + 1];
}

export function getPreviousArtwork(currentId: number, artworks: Artwork[]): Artwork | null {
  const currentIndex = artworks.findIndex(a => a.id === currentId);
  if (currentIndex <= 0) return null;
  return artworks[currentIndex - 1];
}

export function getRelatedArtworks(artwork: Artwork, allArtworks: Artwork[], limit = 4): Artwork[] {
  return allArtworks
    .filter(a =>
      a.id !== artwork.id &&
      (a.section === artwork.section || a.artist === artwork.artist)
    )
    .slice(0, limit);
}
