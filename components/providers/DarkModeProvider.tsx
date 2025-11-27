'use client';

import { useEffect } from 'react';
import { useDarkModeStore } from '@/lib/stores/dark-mode-store';

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useDarkModeStore();

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return <>{children}</>;
}
