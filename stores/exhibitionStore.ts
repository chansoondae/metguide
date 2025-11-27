import { create } from 'zustand';
import { Exhibition } from '@/types/exhibition';
import { Hotspot } from '@/types/hotspot';

interface ExhibitionState {
  currentExhibition: Exhibition | null;
  selectedHotspot: Hotspot | null;
  isLoading: boolean;
  error: string | null;

  setCurrentExhibition: (exhibition: Exhibition | null) => void;
  setSelectedHotspot: (hotspot: Hotspot | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useExhibitionStore = create<ExhibitionState>((set) => ({
  currentExhibition: null,
  selectedHotspot: null,
  isLoading: false,
  error: null,

  setCurrentExhibition: (exhibition) => set({ currentExhibition: exhibition }),
  setSelectedHotspot: (hotspot) => set({ selectedHotspot: hotspot }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
