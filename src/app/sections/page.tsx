import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { getExhibitionData } from '@/lib/data/artworks';
import { ArrowRight } from 'lucide-react';

export default async function SectionsPage() {
  const exhibitionData = await getExhibitionData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Exhibition Sections</h1>
        <p className="mt-4 text-lg text-gray-600">
          Explore the exhibition through {exhibitionData.sections.length} thematic sections
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {exhibitionData.sections.map((section, index) => (
          <Link
            key={section.id}
            href={`/sections/${section.id}`}
            className="group"
          >
            <Card className="h-full transition-all hover:shadow-xl">
              <CardContent className="p-8">
                <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-lg font-bold text-blue-900">
                  {section.name}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-900">
                  {section.subtitle}
                </h2>
                <p className="mt-4 text-gray-600">
                  {section.artworks.length} {section.artworks.length === 1 ? 'artwork' : 'artworks'}
                </p>
                <div className="mt-6 flex items-center text-blue-900 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm font-medium">Explore Section</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
