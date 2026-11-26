import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenDownloadModal: () => void;
}

const NAV_LINKS = [
  { label: 'Products & Services', href: '#products' },
  { label: 'Travel Tools', href: '#travel-tools' },
  { label: 'SimplyGo App', href: '#simplygo-app' },
  { label: 'Campaigns', href: '#newsroom' },
  { label: 'Support', href: '#support' },
];

export function Navbar({ onOpenDownloadModal }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E40046] rounded"
          aria-label="SimplyGo Home"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="32" height="32" rx="8" fill="#E40046" />
            <path
              d="M9.5 21.5C12.5 18.5 15.5 14 16 9.5C18.5 12.5 21.5 15.5 24.5 16C20.5 17.5 17 20 14 23.5"
              stroke="white"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="21.5" cy="10.5" r="2.2" fill="#38BDF8" />
          </svg>
          <span className="font-display text-xl font-extrabold tracking-tight text-slate-900">
            Simply<span className="text-[#E40046]">Go</span>
          </span>
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600"
          aria-label="Primary Navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-slate-950 transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#E40046] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E40046]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenDownloadModal}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-[#E40046] hover:bg-[#C0003B] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E40046]"
          >
            Get the App
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenDownloadModal();
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#E40046] hover:bg-[#C0003B] rounded-lg transition-colors cursor-pointer"
            >
              Get the App
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
