// Artist avatar mapping
// Only includes artists with actual photos in /public/avatars/
// Other artists will fall back to UI avatars API
export const artistAvatars: Record<string, string> = {
  "살바도르 달리 (1904–1989)": "/avatars/dali.jpg",
  "에드가 드가 (1834–1917)": "/avatars/degas.jpg",
  "전칭 귀스타브 쿠르베 (1819–1877)": "/avatars/courbet.jpg",
  "피에르 퓌비 드샤반 (1824–1898)": "/avatars/pierrepuvis.jpg",
  "폴 고갱 (1848–1903)": "/avatars/gauguin.jpg",
  "폴 세잔 (1839–1906)": "/avatars/cezanne.jpg",
  "앙리 마티스 (1869–1954)": "/avatars/matisse.jpg",
  "오귀스트 르누아르 (1841–1919)": "/avatars/renoir.jpg",
  "메리 커샛 (1844–1926)": "/avatars/cassatt.jpg",
  "빈센트 반 고흐 (1853–1890)": "/avatars/vangogh.jpg",
  "피에르 보나르 (1867–1947)": "/avatars/bonnard.jpg",
};

// Get avatar URL for an artist, with fallback to generated avatar
export function getArtistAvatar(artistName: string): string {
  const localAvatar = artistAvatars[artistName];

  // Check if local avatar exists (you would need to implement this check client-side)
  // For now, return the UI avatars API as fallback
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(artistName)}&background=random&size=80`;
}

// Generate a consistent color for each artist based on their name
export function getArtistColor(artistName: string): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
    '#E63946', '#457B9D', '#A8DADC', '#E07A5F', '#3D5A80',
  ];

  let hash = 0;
  for (let i = 0; i < artistName.length; i++) {
    hash = artistName.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}
