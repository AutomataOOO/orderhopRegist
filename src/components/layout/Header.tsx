'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-secondary-200 bg-white dark:bg-secondary-900 dark:border-secondary-700 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-secondary-900/60">
      <div className="content-container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-body-lg font-bold text-secondary-900 dark:text-secondary-50">OrderHop</span>
        </Link>
      </div>
    </header>
  );
} 