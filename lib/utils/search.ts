import MiniSearch from 'minisearch';
import { Artwork, FilterOptions, SortOption } from '@/types/artwork';

let miniSearch: MiniSearch<Artwork> | null = null;

export function initializeSearch(artworks: Artwork[]): MiniSearch<Artwork> {
  if (miniSearch) return miniSearch;

  miniSearch = new MiniSearch<Artwork>({
    fields: ['title', 'artist', 'year', 'medium', 'section', 'description'],
    storeFields: ['id', 'title', 'artist', 'year', 'medium', 'imageUrl', 'section'],
    searchOptions: {
      boost: { title: 2, artist: 2 },
      fuzzy: 0.2,
      prefix: true,
    }
  });

  miniSearch.addAll(artworks);
  return miniSearch;
}

export function searchArtworks(query: string, artworks: Artwork[]): Artwork[] {
  if (!query.trim()) return artworks;

  const search = initializeSearch(artworks);
  const results = search.search(query);

  const resultIds = new Set(results.map(r => r.id));
  return artworks.filter(artwork => resultIds.has(artwork.id));
}

export function filterArtworks(artworks: Artwork[], filters: FilterOptions): Artwork[] {
  let filtered = [...artworks];

  if (filters.searchQuery) {
    filtered = searchArtworks(filters.searchQuery, filtered);
  }

  if (filters.section) {
    filtered = filtered.filter(a => a.section === filters.section);
  }

  if (filters.artist) {
    filtered = filtered.filter(a => a.artist === filters.artist);
  }

  if (filters.medium) {
    filtered = filtered.filter(a => a.medium.includes(filters.medium!));
  }

  if (filters.yearRange) {
    filtered = filtered.filter(a => {
      const match = a.year.match(/\d{4}/);
      if (!match) return false;
      const year = parseInt(match[0]);
      return year >= filters.yearRange![0] && year <= filters.yearRange![1];
    });
  }

  return filtered;
}

export function sortArtworks(artworks: Artwork[], sortBy: SortOption): Artwork[] {
  const sorted = [...artworks];

  switch (sortBy) {
    case 'chronological':
      return sorted.sort((a, b) => {
        const yearA = parseInt(a.year.match(/\d{4}/)?.[0] || '0');
        const yearB = parseInt(b.year.match(/\d{4}/)?.[0] || '0');
        return yearA - yearB;
      });

    case 'artist':
      return sorted.sort((a, b) => a.artist.localeCompare(b.artist));

    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return sorted;
  }
}
