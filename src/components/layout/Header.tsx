'use client';

import Link from 'next/link';
import { Search, Heart, Moon, Sun, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavoritesStore } from '@/lib/stores/favorites-store';
import { useUIStore } from '@/lib/stores/ui-store';
import { useThemeStore } from '@/lib/stores/theme-store';
import { useEffect } from 'react';

export function Header() {
  const { favorites } = useFavoritesStore();
  const { setSearchOpen, mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { theme, toggleTheme, setTheme } = useThemeStore();

  useEffect(() => {
    // Set initial theme on mount
    setTheme(theme);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-xl font-bold text-blue-900">
              THE <span className="font-normal">MET</span>
            </div>
          </Link>


          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Link href="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              title="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
