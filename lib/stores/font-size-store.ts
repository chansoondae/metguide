import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontSize = 'small' | 'medium' | 'large';

interface FontSizeState {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

export const useFontSizeStore = create<FontSizeState>()(
  persist(
    (set) => ({
      fontSize: 'medium',
      setFontSize: (size: FontSize) => set({ fontSize: size }),
    }),
    {
      name: 'font-size-storage',
    }
  )
);

// Helper function to get font size classes
export const getFontSizeClasses = (fontSize: FontSize) => {
  switch (fontSize) {
    case 'small':
      return {
        text: 'text-sm',
        heading1: 'text-2xl',
        heading2: 'text-xl',
        heading3: 'text-lg',
        body: 'text-sm',
      };
    case 'large':
      return {
        text: 'text-lg',
        heading1: 'text-5xl',
        heading2: 'text-3xl',
        heading3: 'text-2xl',
        body: 'text-lg',
      };
    default: // medium
      return {
        text: 'text-base',
        heading1: 'text-4xl',
        heading2: 'text-2xl',
        heading3: 'text-xl',
        body: 'text-base',
      };
  }
};
