export interface Hotspot {
  id: string;
  exhibitionId: string;
  artworkId?: string;
  type: 'artwork' | 'info' | 'navigation';
  position: [number, number, number];
  label: string;
  labelKo: string;
  description?: string;
  targetPosition?: [number, number, number];
}
