// Artist avatar mapping
// Only includes artists with actual photos in /public/avatars/
// Other artists will fall back to UI avatars API
export const artistAvatars: Record<string, string> = {
  // Currently available
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

  // Add images for these artists (see AVATAR_FILES_NEEDED.md)
  "카미유 피사로 (1830–1903)": "/avatars/pissarro.jpg",
  "알프레드 시슬레 (1839–1899)": "/avatars/sisley.jpg",
  "오딜롱 르동 (1840–1916)": "/avatars/redon.jpg",
  "오귀스트 로댕 (1840–1917)": "/avatars/rodin.jpg",
  "베르트 모리조 (1841–1895)": "/avatars/morisot.jpg",
  "아르망 기요맹 (1841–1927)": "/avatars/guillaumin.jpg",
  "조르주 쇠라 (1859–1891)": "/avatars/seurat.jpg",
  "아리스티드 마욜 (1861–1944)": "/avatars/maillol.jpg",
  "폴 시냐크 (1863–1935)": "/avatars/signac.jpg",
  "쉬잔 발라동 (1865–1938)": "/avatars/valadon.jpg",
  "에두아르 뷔야르 (1868–1940)": "/avatars/vuillard.jpg",
  "조르주 루오 (1871–1958)": "/avatars/rouault.jpg",
  "알베르 마르케 (1875–1947)": "/avatars/marquet.jpg",
  "모리스 드 블라맹크 (1876–1958)": "/avatars/vlaminck.jpg",
  "키스 반 동겐 (1877–1968)": "/avatars/dongen.jpg",
  "모리스 위트릴로 (1883–1955)": "/avatars/utrillo.jpg",
  "마리 로랑생 (1883–1956)": "/avatars/laurencin.jpg",
  "오노레 도미에 (1808–1879)": "/avatars/daumier.jpg",
  "전칭 오노레 도미에 (1808–1879)": "/avatars/daumier.jpg",
  "쥘 뒤프레 (1811–1889)": "/avatars/dupre.jpg",
  "테오도르 루소 (1812–1867)": "/avatars/rousseau.jpg",
  "아돌프 멘첼 (1815–1905)": "/avatars/menzel.jpg",
  "샤를 프랑수아 도비니 (1817–1878)": "/avatars/daubigny.jpg",
  "앙리 조제프 아르피니 (1819–1916)": "/avatars/harpignies.jpg",
  "전칭 외젠 부댕 (1824–1898)": "/avatars/boudin.jpg",
  "귀스타브 모로 이후 (1826–1898)": "/avatars/moreau.jpg",
  "피에르 오귀스트 코 (1837–1883)": "/avatars/cot.jpg",
  "장 프레데리크 바지유 (1841–1870)": "/avatars/bazille.jpg",
  "라이문도 데 마드라소 이 가레타 (1841–1920)": "/avatars/madrazo.jpg",
  "앙리 에드몽 크로스 (1856–1910)": "/avatars/cross.jpg",
};

// Get avatar URL for an artist, with fallback to generated avatar
export function getArtistAvatar(artistName: string, size: number = 80): string {
  const localAvatar = artistAvatars[artistName];

  // Use local avatar if available
  if (localAvatar) {
    return localAvatar;
  }

  // Fallback to UI avatars API with consistent color for caching
  const color = getArtistColor(artistName).replace('#', '');
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(artistName)}&background=${color}&color=fff&size=${size}`;
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
