import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-secondary-200 py-6">
      <div className="content-container flex h-0 items-center justify-center">
        <div className="text-body-sm text-secondary-500">
          Powered by <Link href="https://www.orderhop.com" className="text-secondary-900 dark:text-secondary-50">OrderHop</Link>
        </div>
      </div>
    </footer>
  );
} 