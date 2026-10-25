import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from './Header';
import { NoticeStrip } from './NoticeStrip';
import { Footer } from './Footer';

export default function Layout() {
  return (
    <div
      className="min-h-screen flex flex-col bg-white text-[#111827] selection:bg-[#1F4E9C]/20 selection:text-[#1F4E9C]"
      style={{ colorScheme: 'light' }}
    >
      {/* Skip to Content for screen reader accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1F4E9C] focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main dining content
      </a>

      <Header />
      <NoticeStrip />

      <main id="main-content" className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
      <ScrollRestoration />
    </div>
  );
}