'use client';

import { useState, useEffect } from 'react';
import { Artwork } from '@/types/artwork';
import { useAudioStore } from '@/stores/audioStore';

interface AudioGuidePlayerProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export default function AudioGuidePlayer({ artwork, onClose }: AudioGuidePlayerProps) {
  const { isPlaying, isMinimized, setPlaying, setMinimized, stop } = useAudioStore();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });

  useEffect(() => {
    // Auto-play when artwork changes
    if (artwork?.audioGuideUrl) {
      setPlaying(true);
    }
  }, [artwork, setPlaying]);

  if (!artwork) return null;

  const handleClose = () => {
    stop();
    onClose();
  };

  const toggleMinimize = () => {
    setMinimized(!isMinimized);
  };

  const togglePlayPause = () => {
    setPlaying(!isPlaying);
  };

  // YouTube embed
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = artwork.audioGuideId || url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}`;
  };

  return (
    <div
      className={`fixed ${isMinimized ? 'bottom-4 right-4' : 'bottom-4 right-4'} z-50 bg-black/90 rounded-lg shadow-2xl backdrop-blur-md border border-white/10 transition-all duration-300`}
      style={{
        width: isMinimized ? '300px' : '450px',
        maxWidth: '90vw',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold truncate">{artwork.title}</h3>
          <p className="text-gray-400 text-sm truncate">{artwork.artist}</p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={toggleMinimize}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            )}
          </button>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="p-4">
          {artwork.audioGuideUrl ? (
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
              <iframe
                src={getYouTubeEmbedUrl(artwork.audioGuideUrl)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video rounded-lg bg-gray-800 flex items-center justify-center">
              <p className="text-gray-400">No audio guide available</p>
            </div>
          )}

          {/* Artwork Info */}
          <div className="mt-4 space-y-2">
            <div>
              <p className="text-xs text-gray-400">Year</p>
              <p className="text-white">{artwork.year}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Medium</p>
              <p className="text-white">{artwork.medium}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
