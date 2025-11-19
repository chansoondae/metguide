export interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: string;
  medium: string;
  collection: string;
  description: string;
  imageUrl: string;
  section: string;
  url: string;
}

export interface Section {
  id: string;
  name: string;
  subtitle: string;
  description?: string;
  artworks: number[];
}

export interface ExhibitionData {
  title: string;
  englishTitle: string;
  subtitle: string;
  dates: string;
  venue: string;
  totalArtworks: number;
  sections: Section[];
  artworks: Artwork[];
}

export type ViewMode = 'grid' | 'list';

export type SortOption = 'chronological' | 'artist' | 'title';

export interface FilterOptions {
  section?: string;
  artist?: string;
  yearRange?: [number, number];
  medium?: string;
  searchQuery?: string;
}
