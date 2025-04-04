import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative min-h-screen bg-secondary-50 dark:bg-secondary-900">
      {children}
    </div>
  );
} 