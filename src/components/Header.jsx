import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/timings-and-rates', label: 'Timings & Rates' },
  { to: '/mess-card', label: 'Mess Card' },
  { to: '/rules-and-faq', label: 'Rules & FAQ' },
  { to: '/notices', label: 'Notices' },
  { to: '/feedback', label: 'Feedback' },
  { to: '/committee', label: 'Committee' },
  { to: '/gallery', label: 'Gallery' },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#DDE5F0] shadow-xs">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Wordmark */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-[#C9A227] rounded-lg p-1 -ml-1 transition-opacity hover:opacity-95"
            aria-label="SAU Mess Home"
          >
            

            <div className="flex flex-col leading-tight">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1B2F4B]">
                  SAU
                </span>
                <span className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1F4E9C]">
                  Mess
                </span>
              </div>
              <span className="text-[11px] text-[#4B5563] hidden sm:block tracking-wide">
                South Asian University · New Delhi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-[15px] font-medium"
          >
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#C9A227] ${
                    isActive
                      ? 'text-[#1F4E9C] font-semibold bg-[#F5F8FC] shadow-[inset_0_-2px_0_#1F4E9C]'
                      : 'text-[#4B5563] hover:text-[#1F4E9C] hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Quick link / Mobile trigger */}
          <div className="flex items-center gap-2">
            <Link
              to="/mess-card"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#F5F8FC] border border-[#DDE5F0] text-[#1F4E9C] hover:bg-[#EBF2FC] transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A227]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#1F4E9C]" aria-hidden="true" />
              <span>Digital Card</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-[#1B2F4B] hover:bg-[#F5F8FC] focus-visible:outline-2 focus-visible:outline-[#C9A227]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1B2F4B]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1B2F4B]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Signature 3px Gold Line beneath main header */}
      <div className="h-[3px] bg-[#C9A227] w-full" aria-hidden="true" />

      {/* Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DDE5F0] shadow-lg">
          <div className="px-4 pt-3 pb-6 space-y-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `w-full px-4 py-3.5 rounded-xl text-base font-medium flex items-center justify-between min-h-[48px] focus-visible:outline-2 focus-visible:outline-[#C9A227] ${
                    isActive
                      ? 'bg-[#F5F8FC] text-[#1F4E9C] font-semibold border border-[#DDE5F0]'
                      : 'text-[#111827] hover:bg-[#F5F8FC]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#1F4E9C]" />}
                  </>
                )}
              </NavLink>
            ))}

            <div className="pt-3 border-t border-[#DDE5F0] mt-3">
              <Link
                to="/about"
                onClick={closeMenu}
                className="w-full px-4 py-3 rounded-xl text-sm text-[#4B5563] hover:text-[#1F4E9C] hover:bg-[#F5F8FC] min-h-[48px] flex items-center"
              >
                About the Student Mess
              </Link>
              <div className="px-4 py-2 text-xs text-[#4B5563] flex items-center gap-2">
                <span>Contact: mess@sau.int · Mess Manager in Mess 1</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};