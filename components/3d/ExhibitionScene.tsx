'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import ExhibitionModel from './ExhibitionModel';
import ArtworkHotspot from './ArtworkHotspot';
import LoadingScreen from './LoadingScreen';
import { Hotspot } from '@/types/hotspot';
import { CAMERA_CONFIG, CONTROLS_CONFIG, PERFORMANCE_CONFIG } from '@/lib/constants';

interface ExhibitionSceneProps {
  exhibitionId: string;
  modelUrl: string;
  hotspots: Hotspot[];
  onHotspotClick: (hotspot: Hotspot) => void;
  enableVR?: boolean;
  selectedHotspotId?: string | null;
}

export default function ExhibitionScene({
  exhibitionId,
  modelUrl,
  hotspots,
  onHotspotClick,
  enableVR = false,
  selectedHotspotId = null,
}: ExhibitionSceneProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{
          position: CAMERA_CONFIG.DEFAULT_POSITION,
          fov: CAMERA_CONFIG.FOV,
          near: CAMERA_CONFIG.NEAR,
          far: CAMERA_CONFIG.FAR,
        }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.5 }}
        dpr={PERFORMANCE_CONFIG.PIXEL_RATIO}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={PERFORMANCE_CONFIG.SHADOW_MAP_SIZE}
          shadow-mapSize-height={PERFORMANCE_CONFIG.SHADOW_MAP_SIZE}
        />
        <pointLight position={[-10, 10, -5]} intensity={0.5} />

        {/* Environment */}
        <Environment preset="apartment" />

        {/* 3D Model */}
        <Suspense fallback={<LoadingScreen />}>
          <ExhibitionModel url={modelUrl} />
        </Suspense>

        {/* Hotspots */}
        {hotspots.map((hotspot) => (
          <ArtworkHotspot
            key={hotspot.id}
            hotspot={hotspot}
            isSelected={hotspot.id === selectedHotspotId}
            onClick={() => onHotspotClick(hotspot)}
          />
        ))}

        {/* Ground plane for shadows */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.1, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.3} />
        </mesh>

        {/* Controls */}
        <OrbitControls
          minDistance={CONTROLS_CONFIG.MIN_DISTANCE}
          maxDistance={CONTROLS_CONFIG.MAX_DISTANCE}
          enableDamping={CONTROLS_CONFIG.ENABLE_DAMPING}
          dampingFactor={CONTROLS_CONFIG.DAMPING_FACTOR}
          enablePan={CONTROLS_CONFIG.ENABLE_PAN}
          panSpeed={CONTROLS_CONFIG.PAN_SPEED}
          rotateSpeed={CONTROLS_CONFIG.ROTATION_SPEED}
          target={[0, 1, 0]}
        />
      </Canvas>
    </div>
  );
}
