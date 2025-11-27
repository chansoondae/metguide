# Quick Start Guide

This guide will help you get the Exhibition VR app running in minutes.

## Prerequisites

- Node.js 18+ installed
- A modern web browser (Chrome, Firefox, Safari, Edge)

## Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## What You'll See

The app is pre-configured with mock data showing a demo exhibition. You can:

1. **Landing Page** - Overview of the platform
2. **Exhibition List** - Browse available exhibitions
3. **Exhibition Detail** - View information about an exhibition
4. **VR Tour** - Experience the 3D virtual tour

## Current Status

The app is functional with mock data, but you'll need to add your own 3D models to see actual exhibition spaces.

### What's Working

✅ All page routes and navigation
✅ 3D scene with hotspots
✅ Mouse/touch controls (orbit, pan, zoom)
✅ Artwork info panels
✅ Audio guide player integration
✅ VR mode toggle (requires actual VR headset)
✅ Responsive design

### What You Need to Add

⚠️ **3D Models** - Currently using placeholder paths. You need to add actual GLB files:
- Place your model at: `public/models/demo-exhibition/exhibition.glb`

⚠️ **Images** - Add exhibition and artwork images:
- Exhibition thumbnails: `public/images/[name].jpg`
- Artwork images: `public/images/artworks/[name].jpg`

⚠️ **Real Data** - Replace mock data in pages with your own exhibitions

## Adding Your First 3D Model

### Option 1: Use a Sample Model

Download a free 3D model from:
- [Sketchfab](https://sketchfab.com/) (search for "gallery" or "room")
- [Poly Pizza](https://poly.pizza/)
- [cgtrader](https://www.cgtrader.com/free-3d-models)

Convert to GLB if needed and place in `public/models/demo-exhibition/exhibition.glb`

### Option 2: Create Your Own with Blender

1. Model a simple gallery space in Blender
2. Export as GLB (File → Export → glTF 2.0)
3. Enable Draco compression in export settings
4. Save to `public/models/demo-exhibition/exhibition.glb`

### Option 3: Scan with LiDAR

If you have an iPhone/iPad Pro:

1. Download Polycam app
2. Scan a real space
3. Export as GLB
4. Process with provided Python scripts (see below)
5. Place in `public/models/demo-exhibition/exhibition.glb`

## Testing Without a 3D Model

If you don't have a 3D model yet, you can still test the UI:

1. The app will show a loading screen
2. Hotspots will render (you won't see a room, but hotspots will float)
3. You can test clicking hotspots and viewing artwork info
4. All UI features will work

To avoid the loading screen error:

1. Comment out the `<ExhibitionModel>` component in:
   `components/3d/ExhibitionScene.tsx` (line ~53)

2. Or create a simple placeholder box:
   ```tsx
   <mesh>
     <boxGeometry args={[10, 3, 10]} />
     <meshStandardMaterial color="gray" />
   </mesh>
   ```

## Processing 3D Models

If you have a LiDAR scan (PLY format):

### 1. Install Python Dependencies
```bash
cd scripts/process-pointcloud
pip install -r requirements.txt
```

### 2. Convert Point Cloud to Mesh
```bash
python convert_to_mesh.py input.ply output.obj
```

### 3. Optimize Mesh
```bash
python optimize_mesh.py output.obj optimized.obj --target-triangles 100000
```

### 4. Export to GLB
```bash
# Install gltf-pipeline globally
npm install -g gltf-pipeline

# Convert and compress
python export_glb.py optimized.obj ../../public/models/demo-exhibition/exhibition.glb
```

## Customizing the Demo Exhibition

Edit the mock data in:
- `app/exhibition/page.tsx` - Exhibition list
- `app/exhibition/[exhibitionId]/page.tsx` - Exhibition detail
- `app/exhibition/[exhibitionId]/vr/page.tsx` - VR tour with hotspots

Example hotspot positions:
```typescript
{
  id: 'hotspot-1',
  position: [2, 1, -3],  // [x, y, z] in meters
  label: 'My Artwork',
  type: 'artwork',
}
```

To find coordinates:
1. Run dev server
2. Open VR tour page
3. Open browser console
4. Camera position is logged - use as reference

## Next Steps

1. ✅ Get the app running
2. ✅ Add a simple 3D model
3. ✅ Customize exhibition data
4. ✅ Position hotspots correctly
5. Add real artwork images
6. Set up audio guides
7. Deploy to Vercel

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### 3D Model Won't Load
- Check file path is correct
- Verify GLB format (not GLTF, OBJ, etc.)
- Check file size < 20MB
- Look for errors in browser console

## Need Help?

- Check the main `README.md` for detailed documentation
- Review `exhibition-vr-spec.md` for technical specifications
- Open browser DevTools console for error messages

---

Happy building! 🎨
