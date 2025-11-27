'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Headphones, Heart, Glasses } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  // VR 투어 페이지에서는 BottomNav 숨기기
  if (pathname.includes('/vr')) {
    return null;
  }

  const navItems = [
    {
      name: '홈',
      href: '/',
      icon: Home,
    },
    {
      name: '오디오',
      href: '/audio',
      icon: Headphones,
    },
    {
      name: 'VR',
      href: '/exhibition',
      icon: Glasses,
    },
    {
      name: '좋아요',
      href: '/favorites',
      icon: Heart,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50 safe-bottom">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  active
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" strokeWidth={active ? 2.5 : 2} />
                <span className={`text-xs ${active ? 'font-semibold' : 'font-medium'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .safe-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </nav>
  );
}
