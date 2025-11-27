import { create } from 'zustand';
import { ViewMode } from '@/types/artwork';

interface UIStore {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  viewMode: 'grid',
  setViewMode: (mode) => set({ viewMode: mode }),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
