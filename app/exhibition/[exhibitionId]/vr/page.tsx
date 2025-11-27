'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ExhibitionScene from '@/components/3d/ExhibitionScene';
import AudioGuidePlayer from '@/components/audio/AudioGuidePlayer';
import ArtworkInfoPanel from '@/components/ui/ArtworkInfoPanel';
import { useExhibitionStore } from '@/stores/exhibitionStore';
import { useAudioStore } from '@/stores/audioStore';
import { Exhibition } from '@/types/exhibition';
import { Artwork } from '@/types/artwork';
import { Hotspot } from '@/types/hotspot';

// Mock data
const mockExhibition: Exhibition = {
  id: 'demo-exhibition',
  title: 'Modern Art Showcase',
  titleKo: '현대 미술 전시',
  description: 'A curated collection of contemporary artworks',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  location: 'Virtual Gallery Space',
  modelUrl: '/models/demo-exhibition/exhibition.glb',
  thumbnailUrl: '/images/demo-thumbnail.jpg',
  artworks: [
    {
      id: 'artwork-1',
      exhibitionId: 'demo-exhibition',
      title: 'Abstract Composition',
      titleKo: '추상 구성',
      artist: 'Jane Doe',
      artistKo: '제인 도우',
      year: '2024',
      medium: 'Oil on Canvas',
      dimensions: '120 x 150 cm',
      description: 'A vibrant exploration of color and form through abstract expressionism.',
      descriptionKo: '추상 표현주의를 통한 색채와 형태의 생동감 있는 탐구.',
      imageUrl: '/images/artworks/artwork-1.jpg',
      audioGuideUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      audioGuideId: 'dQw4w9WgXcQ',
      position: [2, 1.5, -3],
      rotation: [0, Math.PI, 0],
    },
    {
      id: 'artwork-2',
      exhibitionId: 'demo-exhibition',
      title: 'Urban Landscape',
      titleKo: '도시 풍경',
      artist: 'John Smith',
      artistKo: '존 스미스',
      year: '2023',
      medium: 'Digital Art',
      dimensions: '100 x 80 cm',
      description: 'A contemporary view of city life through digital manipulation.',
      descriptionKo: '디지털 조작을 통한 도시 생활의 현대적 관점.',
      imageUrl: '/images/artworks/artwork-2.jpg',
      position: [-2, 1.5, -3],
      rotation: [0, Math.PI, 0],
    },
  ],
  hotspots: [
    {
      id: 'hotspot-1',
      exhibitionId: 'demo-exhibition',
      artworkId: 'artwork-1',
      type: 'artwork',
      position: [2, 1, -2.5],
      label: 'Abstract Composition',
      labelKo: '추상 구성',
      description: 'Click to learn more',
    },
    {
      id: 'hotspot-2',
      exhibitionId: 'demo-exhibition',
      artworkId: 'artwork-2',
      type: 'artwork',
      position: [-2, 1, -2.5],
      label: 'Urban Landscape',
      labelKo: '도시 풍경',
      description: 'Click to learn more',
    },
  ],
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
};

export default function VRTourPage() {
  const params = useParams();
  const router = useRouter();
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const { setCurrentExhibition, selectedHotspot, setSelectedHotspot } = useExhibitionStore();
  const { currentArtwork, play } = useAudioStore();

  useEffect(() => {
    // Load exhibition data
    // In production, this would be an API call
    const exhibitionId = params.exhibitionId as string;

    // Extract exhibition number from ID (e.g., "exhibition-01" -> "01")
    const exhibitionNumber = exhibitionId.replace('exhibition-', '');

    // Create exhibition data based on ID
    const dynamicExhibition: Exhibition = {
      ...mockExhibition,
      id: exhibitionId,
      title: `Exhibition ${exhibitionNumber}`,
      titleKo: `전시관 ${exhibitionNumber}`,
      modelUrl: `/models/demo-exhibition/exhibition${exhibitionNumber}.glb`,
    };

    setExhibition(dynamicExhibition);
    setCurrentExhibition(dynamicExhibition);
  }, [params.exhibitionId, setCurrentExhibition]);

  const handleHotspotClick = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);

    // Find the related artwork
    if (hotspot.artworkId && exhibition) {
      const artwork = exhibition.artworks.find(a => a.id === hotspot.artworkId);
      if (artwork) {
        setSelectedArtwork(artwork);
        setShowInfo(true);
      }
    }
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
    setSelectedHotspot(null);
  };

  const handlePlayAudio = () => {
    if (selectedArtwork) {
      play(selectedArtwork);
    }
  };

  const handleExit = () => {
    router.push(`/exhibition`);
  };

  if (!exhibition) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading exhibition...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* 3D Scene */}
      <ExhibitionScene
        exhibitionId={exhibition.id}
        modelUrl={exhibition.modelUrl}
        hotspots={exhibition.hotspots}
        onHotspotClick={handleHotspotClick}
        enableVR={true}
        selectedHotspotId={selectedHotspot?.id}
      />

      {/* Top Controls */}
      {showControls && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent z-30">
          <div className="flex items-center justify-end">
            <button
              onClick={handleExit}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-colors"
            >
              Exit Tour
            </button>
          </div>
        </div>
      )}

      {/* Controls Help */}
      {showControls && (
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white p-4 rounded-lg z-30 max-w-xs">
          <h3 className="font-semibold mb-2">Controls</h3>
          <ul className="text-sm space-y-1 opacity-80">
            <li>🖱️ Left Click + Drag: Rotate View</li>
            <li>🖱️ Right Click + Drag: Pan</li>
            <li>🖱️ Scroll: Zoom In/Out</li>
            <li>👆 Click Hotspots: View Artwork Info</li>
          </ul>
          <button
            onClick={() => setShowControls(false)}
            className="mt-2 text-xs underline opacity-60 hover:opacity-100"
          >
            Hide controls
          </button>
        </div>
      )}

      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="absolute bottom-4 left-4 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white p-3 rounded-full z-30 transition-colors"
          aria-label="Show controls"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}

      {/* Artwork Info Panel */}
      {showInfo && selectedArtwork && (
        <ArtworkInfoPanel
          artwork={selectedArtwork}
          onClose={handleCloseInfo}
          onPlayAudio={handlePlayAudio}
        />
      )}

      {/* Audio Guide Player */}
      {currentArtwork && (
        <AudioGuidePlayer
          artwork={currentArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  );
}
