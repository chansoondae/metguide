import type { Metadata } from 'next';
import { Inter, Playfair_Display, Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: 'From Impressionism to Early Modernism: Collectors of Light',
  description:
    'The Robert Lehman Collection at The Metropolitan Museum of Art. November 14, 2025 - March 15, 2026 at the National Museum of Korea.',
  keywords: [
    'impressionism',
    'modernism',
    'art exhibition',
    'Metropolitan Museum',
    'Robert Lehman Collection',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable} ${notoSansKR.variable}`}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
