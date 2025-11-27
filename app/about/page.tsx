import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getExhibitionData } from '@/lib/data/artworks';

export default async function AboutPage() {
  const exhibitionData = await getExhibitionData();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900">About the Exhibition</h1>

      <div className="mt-8 space-y-8">
        {/* Exhibition Info */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {exhibitionData.title}
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              {exhibitionData.englishTitle}
            </p>
            <p className="mt-2 text-gray-600">{exhibitionData.subtitle}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-blue-900 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Exhibition Dates</div>
                  <div className="mt-1 text-base text-gray-900">{exhibitionData.dates}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-900 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Location</div>
                  <div className="mt-1 text-base text-gray-900">{exhibitionData.venue}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-blue-900 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Total Artworks</div>
                  <div className="mt-1 text-base text-gray-900">{exhibitionData.totalArtworks} pieces</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About the Collection */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            The Robert Lehman Collection
          </h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              The Robert Lehman Collection is one of the most distinguished private art collections ever assembled in the United States. Donated to The Metropolitan Museum of Art in 1969 by the philanthropist Robert Lehman, the collection comprises more than 2,600 works of art.
            </p>
            <p>
              This exhibition showcases masterpieces from the Impressionist and early Modernist periods, featuring works by renowned artists such as Claude Monet, Pierre-Auguste Renoir, Edgar Degas, Vincent van Gogh, Paul Cézanne, and many others.
            </p>
            <p>
              The collection offers a unique journey through the evolution of Western art from Impressionism to early Modernism, highlighting the innovative techniques and artistic visions that transformed the art world in the late 19th and early 20th centuries.
            </p>
          </div>
        </div>

        {/* Exhibition Sections */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Exhibition Sections</h2>
          <div className="mt-4 space-y-4">
            {exhibitionData.sections.map((section, index) => (
              <Card key={section.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {section.name}: {section.subtitle}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {section.artworks.length} artworks
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Visiting Information */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Visiting Information</h2>
          <Card className="mt-4">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Hours</h3>
                  <p className="mt-1 text-gray-700">
                    Tuesday - Sunday: 10:00 AM - 6:00 PM<br />
                    Wednesday & Saturday: Extended hours until 9:00 PM<br />
                    Closed on Mondays
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Admission</h3>
                  <p className="mt-1 text-gray-700">
                    Free admission with museum entry ticket
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Contact</h3>
                  <p className="mt-1 text-gray-700">
                    National Museum of Korea<br />
                    137 Seobinggo-ro, Yongsan-gu, Seoul<br />
                    Tel: +82-2-2077-9000
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
