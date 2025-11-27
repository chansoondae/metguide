import Link from 'next/link';
import ExhibitionCard from '@/components/ui/ExhibitionCard';
import { Exhibition } from '@/types/exhibition';

// Mock data - will be replaced with API call
const mockExhibitions: Exhibition[] = [
  {
    id: 'exhibition-01',
    title: 'Exhibition 01',
    titleKo: '전시관 01',
    description: 'Virtual exhibition space 01',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    location: 'Virtual Gallery Space 01',
    modelUrl: '/models/demo-exhibition/exhibition01.glb',
    thumbnailUrl: '/images/demo-exhibition/exhibition01.jpg',
    artworks: [],
    hotspots: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 'exhibition-02',
    title: 'Exhibition 02',
    titleKo: '전시관 02',
    description: 'Virtual exhibition space 02',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    location: 'Virtual Gallery Space 02',
    modelUrl: '/models/demo-exhibition/exhibition02.glb',
    thumbnailUrl: '/images/demo-exhibition/exhibition02.jpg',
    artworks: [],
    hotspots: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 'exhibition-03',
    title: 'Exhibition 03',
    titleKo: '전시관 03',
    description: 'Virtual exhibition space 03',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    location: 'Virtual Gallery Space 03',
    modelUrl: '/models/demo-exhibition/exhibition03.glb',
    thumbnailUrl: '/images/demo-exhibition/exhibition03.jpg',
    artworks: [],
    hotspots: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 'exhibition-04',
    title: 'Exhibition 04',
    titleKo: '전시관 04',
    description: 'Virtual exhibition space 04',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    location: 'Virtual Gallery Space 04',
    modelUrl: '/models/demo-exhibition/exhibition04.glb',
    thumbnailUrl: '/images/demo-exhibition/exhibition04.jpg',
    artworks: [],
    hotspots: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 'exhibition-05',
    title: 'Exhibition 05',
    titleKo: '전시관 05',
    description: 'Virtual exhibition space 05',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    location: 'Virtual Gallery Space 05',
    modelUrl: '/models/demo-exhibition/exhibition05.glb',
    thumbnailUrl: '/images/demo-exhibition/exhibition05.jpg',
    artworks: [],
    hotspots: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 'exhibition-06',
    title: 'Exhibition 06',
    titleKo: '전시관 06',
    description: 'Virtual exhibition space 06',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    location: 'Virtual Gallery Space 06',
    modelUrl: '/models/demo-exhibition/exhibition06.glb',
    thumbnailUrl: '/images/demo-exhibition/exhibition06.jpg',
    artworks: [],
    hotspots: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 'exhibition-07',
    title: 'Exhibition 07',
    titleKo: '전시관 07',
    description: 'Virtual exhibition space 07',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    location: 'Virtual Gallery Space 07',
    modelUrl: '/models/demo-exhibition/exhibition07.glb',
    thumbnailUrl: '/images/demo-exhibition/exhibition07.jpg',
    artworks: [],
    hotspots: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 'exhibition-08',
    title: 'Exhibition 08',
    titleKo: '전시관 08',
    description: 'Virtual exhibition space 08',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    location: 'Virtual Gallery Space 08',
    modelUrl: '/models/demo-exhibition/exhibition08.glb',
    thumbnailUrl: '/images/demo-exhibition/exhibition08.jpg',
    artworks: [],
    hotspots: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 'exhibition-09',
    title: 'Exhibition 09',
    titleKo: '전시관 09',
    description: 'Virtual exhibition space 09',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    location: 'Virtual Gallery Space 09',
    modelUrl: '/models/demo-exhibition/exhibition09.glb',
    thumbnailUrl: '/images/demo-exhibition/exhibition09.jpg',
    artworks: [],
    hotspots: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 'exhibition-10',
    title: 'Exhibition 10',
    titleKo: '전시관 10',
    description: 'Virtual exhibition space 10',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    location: 'Virtual Gallery Space 10',
    modelUrl: '/models/demo-exhibition/exhibition10.glb',
    thumbnailUrl: '/images/demo-exhibition/exhibition10.jpg',
    artworks: [],
    hotspots: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 'exhibition-11',
    title: 'Exhibition 11',
    titleKo: '전시관 11',
    description: 'Virtual exhibition space 11',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    location: 'Virtual Gallery Space 11',
    modelUrl: '/models/demo-exhibition/exhibition11.glb',
    thumbnailUrl: '/images/demo-exhibition/exhibition11.jpg',
    artworks: [],
    hotspots: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 'exhibition-12',
    title: 'Exhibition 12',
    titleKo: '전시관 12',
    description: 'Virtual exhibition space 12',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    location: 'Virtual Gallery Space 12',
    modelUrl: '/models/demo-exhibition/exhibition12.glb',
    thumbnailUrl: '/images/demo-exhibition/exhibition12.jpg',
    artworks: [],
    hotspots: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
];

export default function ExhibitionListPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Virtual Exhibitions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore immersive 3D art galleries from anywhere in the world
          </p>
        </div>

        {/* Exhibition Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockExhibitions.map((exhibition) => (
            <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
          ))}
        </div>

        {/* Empty State */}
        {mockExhibitions.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No exhibitions available at the moment
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
