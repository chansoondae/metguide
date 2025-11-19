'use client';

import { useState, useMemo, useEffect } from 'react';
import { Grid, List, Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { ArtworkCard } from '@/components/artwork/ArtworkCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUIStore } from '@/lib/stores/ui-store';
import { getAllArtworks } from '@/lib/data/artworks';
import { filterArtworks, sortArtworks } from '@/lib/utils/search';
import { FilterOptions, SortOption, Artwork } from '@/types/artwork';
import { cn } from '@/lib/utils/cn';

export default function ArtworksPage() {
  const { viewMode, setViewMode } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('chronological');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(false);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    async function loadArtworks() {
      const data = await getAllArtworks();
      setArtworks(data);
    }
    loadArtworks();
  }, []);

  const filteredAndSortedArtworks = useMemo(() => {
    const filtered = filterArtworks(artworks, {
      ...filters,
      searchQuery: searchQuery || undefined,
    });
    return sortArtworks(filtered, sortBy);
  }, [artworks, filters, searchQuery, sortBy]);

  // Get unique values for filters
  const sections = useMemo(
    () => Array.from(new Set(artworks.map((a) => a.section))),
    [artworks]
  );
  const artists = useMemo(
    () => Array.from(new Set(artworks.map((a) => a.artist))).sort(),
    [artworks]
  );
  const mediums = useMemo(
    () => Array.from(new Set(artworks.map((a) => a.medium))).sort(),
    [artworks]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">All Artworks</h1>
        <p className="mt-2 text-lg text-gray-600">
          Explore all {artworks.length} artworks from the exhibition
        </p>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search artworks, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm"
          >
            <option value="chronological">Chronological</option>
            <option value="artist">Artist Name</option>
            <option value="title">Title</option>
          </select>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            size="default"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>

          {/* View Mode Toggle */}
          <div className="flex rounded-md border border-gray-300">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 transition-colors',
                viewMode === 'grid'
                  ? 'bg-blue-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              )}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 transition-colors',
                viewMode === 'list'
                  ? 'bg-blue-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              )}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Section Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Section
              </label>
              <select
                value={filters.section || ''}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    section: e.target.value || undefined,
                  })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">All Sections</option>
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>

            {/* Artist Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Artist
              </label>
              <select
                value={filters.artist || ''}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    artist: e.target.value || undefined,
                  })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">All Artists</option>
                {artists.map((artist) => (
                  <option key={artist} value={artist}>
                    {artist}
                  </option>
                ))}
              </select>
            </div>

            {/* Medium Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Medium
              </label>
              <select
                value={filters.medium || ''}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    medium: e.target.value || undefined,
                  })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">All Mediums</option>
                {mediums.map((medium) => (
                  <option key={medium} value={medium}>
                    {medium}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(filters.section || filters.artist || filters.medium) && (
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({})}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredAndSortedArtworks.length} of {artworks.length} artworks
      </div>

      {/* Artworks Grid/List */}
      <div
        className={cn(
          viewMode === 'grid'
            ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
            : 'flex flex-col gap-4'
        )}
      >
        {filteredAndSortedArtworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} viewMode={viewMode} />
        ))}
      </div>

      {filteredAndSortedArtworks.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">No artworks found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
