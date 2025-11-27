'use client';

import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

interface ExhibitionModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function ExhibitionModel({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: ExhibitionModelProps) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    // Enable shadows for all meshes
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = true;

        // Ensure materials have proper properties
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              mat.side = THREE.FrontSide;
            });
          } else {
            child.material.side = THREE.FrontSide;
          }
        }
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

// Preload the model
export function preloadModel(url: string) {
  useGLTF.preload(url);
}
