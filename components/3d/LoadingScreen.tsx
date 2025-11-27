'use client';

import { Html, useProgress } from '@react-three/drei';

export default function LoadingScreen() {
  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-8 bg-black/80 rounded-lg backdrop-blur-sm">
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-lg font-medium">
          Loading Exhibition... {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
}
