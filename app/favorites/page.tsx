'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { ArtworkCard } from '@/components/artwork/ArtworkCard';
import { Button } from '@/components/ui/button';
import { useFavoritesStore } from '@/lib/stores/favorites-store';
import { useUIStore } from '@/lib/stores/ui-store';
import { getAllArtworks } from '@/lib/data/artworks';
import { Artwork } from '@/types/artwork';

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavoritesStore();
  const { viewMode } = useUIStore();
  const [favoriteArtworks, setFavoriteArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    async function loadFavorites() {
      const artworks = await getAllArtworks();
      const filtered = artworks.filter((artwork) => favorites.includes(artwork.id));
      setFavoriteArtworks(filtered);
    }
    loadFavorites();
  }, [favorites]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My Favorites</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            {favorites.length} {favorites.length === 1 ? 'artwork' : 'artworks'} saved
          </p>
        </div>
        {favorites.length > 0 && (
          <Button variant="outline" onClick={clearFavorites}>
            Clear All
          </Button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-6">
            <Heart className="h-12 w-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
            No favorites yet
          </h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
            Start adding artworks to your favorites by clicking the heart icon
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              viewMode={viewMode}
              linkTo={`/?artwork=${artwork.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
