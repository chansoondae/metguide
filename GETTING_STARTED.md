# Getting Started with the Exhibition Website

## Quick Start

### 1. Run Development Server
```bash
npm run dev
```
Then open http://localhost:3000 in your browser.

### 2. Build for Production
```bash
npm run build
npm start
```

## Project Overview

This is a complete Next.js exhibition website with:
- **96 static pages** (Homepage, 81 artworks, sections, timeline, etc.)
- **Full-text search** with filters
- **Grid and list views**
- **Favorites system**
- **Responsive design**
- **All 81 artworks from the exhibition**

## Main Pages

- `/` - Homepage with hero and featured artworks
- `/artworks` - Browse all artworks with search/filter
- `/artworks/[id]` - Individual artwork pages (1-81)
- `/sections` - Exhibition sections overview
- `/sections/[id]` - Artworks by section
- `/timeline` - Chronological timeline view
- `/favorites` - Your saved favorites
- `/about` - Exhibition information

## Key Features

✅ Search artworks by title, artist, medium
✅ Filter by section, artist, medium
✅ Sort by chronological, artist, or title
✅ Toggle between grid and list view
✅ Add artworks to favorites (saved in browser)
✅ Navigate between artworks
✅ Fully responsive (mobile, tablet, desktop)
✅ Static site generation for fast loading

## Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **MiniSearch** - Search functionality
- **Lucide React** - Icons

## Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Deploy Elsewhere
Works with any Next.js hosting:
- Netlify
- Railway
- Docker
- Self-hosted Node.js

## Need Help?

See PROJECT_SUMMARY.md for complete details about the project.

Happy exploring! 🎨
