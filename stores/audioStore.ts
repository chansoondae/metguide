import { create } from 'zustand';
import { Artwork } from '@/types/artwork';

interface AudioState {
  currentArtwork: Artwork | null;
  isPlaying: boolean;
  isMinimized: boolean;
  volume: number;

  setCurrentArtwork: (artwork: Artwork | null) => void;
  setPlaying: (isPlaying: boolean) => void;
  setMinimized: (isMinimized: boolean) => void;
  setVolume: (volume: number) => void;
  play: (artwork: Artwork) => void;
  pause: () => void;
  stop: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  currentArtwork: null,
  isPlaying: false,
  isMinimized: false,
  volume: 1,

  setCurrentArtwork: (artwork) => set({ currentArtwork: artwork }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setMinimized: (isMinimized) => set({ isMinimized }),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

  play: (artwork) => set({ currentArtwork: artwork, isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  stop: () => set({ currentArtwork: null, isPlaying: false }),
}));
