'use client';

import { useEffect, useState, useRef } from 'react';
import { Artwork } from '@/types/artwork';

interface VerticalTimelineProps {
  artworks: Artwork[];
  currentArtworkId?: number;
}

export function VerticalTimeline({ artworks, currentArtworkId }: VerticalTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timelineItemRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  useEffect(() => {
    if (currentArtworkId) {
      const index = artworks.findIndex(a => a.id === currentArtworkId);
      if (index !== -1) {
        setActiveIndex(index);

        // Auto-scroll timeline to show the active item
        const activeButton = timelineItemRefs.current.get(currentArtworkId);
        const scrollContainer = scrollContainerRef.current;

        if (activeButton && scrollContainer) {
          const buttonTop = activeButton.offsetTop;
          const buttonHeight = activeButton.offsetHeight;
          const containerHeight = scrollContainer.clientHeight;
          const containerScrollTop = scrollContainer.scrollTop;

          // Calculate if button is out of view
          const isAboveView = buttonTop < containerScrollTop;
          const isBelowView = buttonTop + buttonHeight > containerScrollTop + containerHeight;

          if (isAboveView || isBelowView) {
            // Scroll to center the active item
            const scrollTo = buttonTop - containerHeight / 2 + buttonHeight / 2;
            scrollContainer.scrollTo({
              top: scrollTo,
              behavior: 'smooth'
            });
          }
        }
      }
    }
  }, [currentArtworkId, artworks]);

  const scrollToArtwork = (index: number) => {
    const artworkElement = document.getElementById(`artwork-${artworks[index].id}`);
    if (artworkElement) {
      // Get header height to offset scroll position
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 64;

      // Calculate position to scroll to (top of element minus header height)
      const elementPosition = artworkElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 8; // 8px extra padding

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={scrollContainerRef} className="hidden lg:block sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">작품 타임라인</h3>
        <div className="text-xs text-gray-600 mb-4">
          {artworks.length}개의 작품
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {/* Timeline items */}
          <div className="space-y-3">
            {artworks.map((artwork, index) => (
              <button
                key={artwork.id}
                ref={(el) => {
                  if (el) {
                    timelineItemRefs.current.set(artwork.id, el);
                  }
                }}
                onClick={() => scrollToArtwork(index)}
                className={`relative flex items-start gap-3 w-full text-left transition-all ${
                  index === activeIndex ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                }`}
              >
                {/* Dot */}
                <div
                  className={`relative z-10 flex-shrink-0 w-4 h-4 rounded-full border-2 transition-all ${
                    index === activeIndex
                      ? 'bg-blue-500 border-blue-500 scale-125'
                      : 'bg-white border-gray-300'
                  }`}
                ></div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-2">
                  <div className={`text-xs font-medium truncate ${
                    index === activeIndex ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    #{artwork.id} {artwork.title}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {artwork.artist}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
