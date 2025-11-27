# Exhibition VR - Digital Twin Virtual Tours

A Next.js web application for creating immersive VR art exhibition experiences using digital twin technology, LiDAR scanning, and WebXR.

## Features

- **Digital Twin Technology**: View precise 3D recreations of real exhibition spaces
- **VR Support**: Compatible with VR headsets via WebXR
- **Audio Guides**: Integrated YouTube audio guides for each artwork
- **Cross-Platform**: Works on desktop, mobile, and VR headsets
- **Interactive Hotspots**: Click on artworks to learn more
- **Real-time 3D Rendering**: Powered by React Three Fiber

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **3D Rendering**: React Three Fiber (@react-three/fiber)
- **3D Helpers**: @react-three/drei
- **VR Support**: @react-three/xr
- **State Management**: Zustand
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- (Optional) Python 3.8+ for 3D model processing

### Installation

1. Clone the repository:
```bash
cd exhibition-vr
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
exhibition-vr/
├── app/                      # Next.js App Router pages
│   ├── exhibition/          # Exhibition pages
│   └── api/                 # API routes
├── components/
│   ├── 3d/                  # 3D scene components
│   ├── audio/               # Audio player components
│   ├── ui/                  # UI components
│   └── layout/              # Layout components
├── stores/                   # Zustand state management
├── types/                    # TypeScript type definitions
├── lib/                      # Utility functions and constants
├── public/
│   ├── models/              # 3D GLB models
│   └── images/              # Images and thumbnails
└── scripts/                  # 3D processing scripts
```

## Adding Your Own Exhibition

### 1. Prepare Your 3D Model

You need a GLB file of your exhibition space. You can:

- **Option A**: Scan with LiDAR (iPhone/iPad Pro + Polycam app)
- **Option B**: Use an existing 3D model
- **Option C**: Create a model in Blender

Place your GLB file in: `public/models/[your-exhibition-id]/exhibition.glb`

### 2. Process LiDAR Scans (Optional)

If you have a point cloud from LiDAR scanning:

```bash
# Install Python dependencies
pip install open3d numpy trimesh

# Convert point cloud to mesh
python scripts/process-pointcloud/convert_to_mesh.py input.ply output.obj

# Optimize mesh
python scripts/process-pointcloud/optimize_mesh.py output.obj optimized.obj

# Convert to GLB with Draco compression
npm install -g gltf-pipeline
python scripts/process-pointcloud/export_glb.py optimized.obj final.glb
```

### 3. Create Exhibition Data

Update the mock data in your pages or create API endpoints:

```typescript
const myExhibition: Exhibition = {
  id: 'my-exhibition',
  title: 'My Amazing Exhibition',
  titleKo: '나의 멋진 전시',
  description: 'Description of your exhibition',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  location: 'Gallery Name',
  modelUrl: '/models/my-exhibition/exhibition.glb',
  thumbnailUrl: '/images/my-exhibition-thumb.jpg',
  artworks: [...],
  hotspots: [...],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
```

### 4. Position Hotspots

To find 3D coordinates for hotspots:

1. Open your VR tour page
2. Open browser DevTools console
3. Use the camera position to find coordinates
4. Add hotspots in your exhibition data:

```typescript
hotspots: [
  {
    id: 'hotspot-1',
    exhibitionId: 'my-exhibition',
    artworkId: 'artwork-1',
    type: 'artwork',
    position: [2, 1, -3],  // [x, y, z] coordinates
    label: 'Artwork Title',
    labelKo: '작품 제목',
  },
]
```

## VR Mode

### Desktop Browser
1. Navigate to an exhibition
2. Click "Enter VR Tour"
3. Use mouse to navigate:
   - Left click + drag: Rotate view
   - Right click + drag: Pan
   - Scroll: Zoom

### VR Headset (Meta Quest, etc.)
1. Open the site in your VR browser
2. Click "Enter VR" button in the top-right
3. Use controllers to navigate and interact

## Performance Optimization

### 3D Model Guidelines
- **File size**: Under 5MB recommended (max 20MB)
- **Polygon count**: 100,000-500,000 triangles
- **Format**: GLB with Draco compression
- **Textures**: 2048x2048 or smaller

### Optimization Tips
- Use `useGLTF.preload()` for faster loading
- Enable Draco compression on GLB files
- Optimize textures (WebP format)
- Use frustum culling (enabled by default)

## Customization

### Styling
Edit Tailwind classes in components or modify `tailwind.config.ts` for global theme changes.

### 3D Scene
Modify lighting, camera, and environment in `components/3d/ExhibitionScene.tsx`:

```tsx
<ambientLight intensity={0.5} />
<directionalLight position={[10, 10, 5]} intensity={1} />
<Environment preset="apartment" />
```

### Hotspot Appearance
Customize hotspot colors and animations in `lib/constants.ts`:

```typescript
export const HOTSPOT_CONFIG = {
  DEFAULT_COLOR: '#4A90E2',
  HOVER_COLOR: '#FFA500',
  SELECTED_COLOR: '#FF6B6B',
  // ...
};
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

Build the production bundle:

```bash
npm run build
npm start
```

## Development Roadmap

### Phase 1: MVP ✅
- [x] Basic 3D scene
- [x] GLB model loading
- [x] OrbitControls
- [x] Static hotspots

### Phase 2: Interaction (Next Steps)
- [ ] Database integration (Supabase)
- [ ] Admin panel for managing exhibitions
- [ ] User authentication
- [ ] Analytics

### Phase 3: VR Enhancement
- [ ] Teleport navigation in VR mode
- [ ] Hand tracking support
- [ ] Spatial audio

### Phase 4: Advanced Features
- [ ] Multi-room exhibitions
- [ ] Live guided tours
- [ ] Social features (comments, sharing)
- [ ] AR mode for mobile

## Troubleshooting

### 3D Model Not Loading
- Check that the GLB file exists at the correct path
- Verify file size is reasonable (<20MB)
- Check browser console for errors
- Try a simple test model first

### Performance Issues
- Reduce polygon count of 3D model
- Enable Draco compression
- Lower texture resolutions
- Check browser performance settings

### VR Mode Not Working
- Ensure using HTTPS (required for WebXR)
- Check browser VR support
- Update VR headset firmware
- Try a different browser

## Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Docs](https://threejs.org/docs/)
- [WebXR Specs](https://immersiveweb.dev/)
- [Polycam (LiDAR Scanning)](https://poly.cam/)
- [glTF Pipeline](https://github.com/CesiumGS/gltf-pipeline)

## License

This project is built for educational and exhibition purposes.

## Support

For issues and questions, please refer to the specification document: `exhibition-vr-spec.md`

---

Built with React Three Fiber and Next.js
