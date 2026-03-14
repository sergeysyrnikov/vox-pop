import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'UGC Service',
  description: 'Service for user generated content',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <header className="fixed top-0 left-0 right-0 z-50 p-4 border-b border-gray-200 bg-gray-100">
          <nav className="container flex items-center justify-left gap-4">
            <Link href="/" className="text-2xl font-bold hover:text-blue-500">
              Главная
            </Link>
          </nav>
        </header>
        <main className="container mx-auto flex-1 p-4 pt-20">{children}</main>
        <footer className="p-4 border-t bg-gray-100">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} UGC Service. Все права защищены.
          </p>
        </footer>
      </body>
    </html>
  );
}
