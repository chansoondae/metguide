'use client';

import { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Hotspot } from '@/types/hotspot';
import { HOTSPOT_CONFIG } from '@/lib/constants';
import * as THREE from 'three';

interface ArtworkHotspotProps {
  hotspot: Hotspot;
  isSelected: boolean;
  onClick: () => void;
}

export default function ArtworkHotspot({
  hotspot,
  isSelected,
  onClick,
}: ArtworkHotspotProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Pulse animation
      const pulse = Math.sin(clock.getElapsedTime() * HOTSPOT_CONFIG.PULSE_SPEED) * 0.1 + 1;
      const targetScale = hovered
        ? HOTSPOT_CONFIG.HOVER_SCALE
        : isSelected
        ? HOTSPOT_CONFIG.DEFAULT_SCALE * 1.2
        : HOTSPOT_CONFIG.DEFAULT_SCALE;

      meshRef.current.scale.setScalar(targetScale * pulse);

      // Gentle rotation
      meshRef.current.rotation.y += 0.01;
    }
  });

  const getColor = () => {
    if (isSelected) return HOTSPOT_CONFIG.SELECTED_COLOR;
    if (hovered) return HOTSPOT_CONFIG.HOVER_COLOR;
    return HOTSPOT_CONFIG.DEFAULT_COLOR;
  };

  return (
    <group position={hotspot.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={getColor()}
          emissive={getColor()}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Label */}
      {(hovered || isSelected) && (
        <Html center distanceFactor={10}>
          <div className="pointer-events-none bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap backdrop-blur-sm">
            <p className="font-semibold">{hotspot.label}</p>
            {hotspot.labelKo && (
              <p className="text-xs text-gray-300">{hotspot.labelKo}</p>
            )}
          </div>
        </Html>
      )}

      {/* Outer ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <ringGeometry args={[1.2, 1.5, 32]} />
        <meshBasicMaterial
          color={getColor()}
          transparent
          opacity={hovered ? 0.4 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
