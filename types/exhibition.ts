import { Artwork } from './artwork';
import { Hotspot } from './hotspot';

export interface Exhibition {
  id: string;
  title: string;
  titleKo: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  modelUrl: string;
  thumbnailUrl: string;
  artworks: Artwork[];
  hotspots: Hotspot[];
  createdAt: string;
  updatedAt: string;
}
