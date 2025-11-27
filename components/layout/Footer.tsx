export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              From Impressionism to Early Modernism
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              The Robert Lehman Collection at The Metropolitan Museum of Art
            </p>
            <p className="mt-4 text-sm font-medium text-gray-900">
              November 14, 2025 - March 15, 2026
            </p>
            <p className="text-sm text-gray-600">
              National Museum of Korea
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Explore</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="/artworks"
                  className="text-sm text-gray-600 hover:text-blue-900"
                >
                  All Artworks
                </a>
              </li>
              <li>
                <a
                  href="/sections"
                  className="text-sm text-gray-600 hover:text-blue-900"
                >
                  By Section
                </a>
              </li>
              <li>
                <a
                  href="/favorites"
                  className="text-sm text-gray-600 hover:text-blue-900"
                >
                  My Favorites
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Information</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-sm text-gray-600 hover:text-blue-900"
                >
                  About the Exhibition
                </a>
              </li>
              <li>
                <a
                  href="https://www.metmuseum.org/about-the-met/collection-areas/robert-lehman-collection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-900"
                >
                  Robert Lehman Collection
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} The Metropolitan Museum of Art. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
