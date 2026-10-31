import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Clock, Mail } from 'lucide-react';

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

const wrap = 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-[#1B2F4B] text-slate-200 text-xs">
        <div className={`${wrap} h-9 flex items-center justify-between gap-4`}>
          <span className="truncate">South Asian University · New Delhi</span>
          <div className="flex items-center gap-5 shrink-0">
            <span className="hidden md:inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C9A227]" aria-hidden="true" />
              Breakfast 8:30 · Lunch 12:30 · Dinner 7:30
            </span>
            <a
              href="mailto:mess@sau.int"
              className="inline-flex items-center gap-1.5 hover:text-white hover:underline"
            >
              <Mail className="w-3.5 h-3.5 text-[#C9A227]" aria-hidden="true" />
              mess@sau.int
            </a>
          </div>
        </div>
      </div>

      {/* Brand row: sticky on mobile, scrolls away on desktop */}
      <div className="sticky top-0 z-50 lg:static bg-white border-b-[3px] border-[#C9A227] lg:border-b-0">
        <div className={wrap}>
          <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-4 h-16 lg:h-[80px]">
            {/* Left: SAU logo | SAU Mess */}
            <Link
              to="/"
              onClick={closeMenu}
              className="justify-self-start flex items-center gap-3 sm:gap-4 transition-opacity hover:opacity-95"
              aria-label="SAU Mess Home"
            >
              <img
                src="/sau-logo.png"
                alt="South Asian University"
                className="h-10 sm:h-12 lg:h-14 w-auto"
              />
              <span className="h-8 sm:h-10 w-px bg-[#C9A227]" aria-hidden="true" />
              <span className="text-xl sm:text-2xl font-bold tracking-tight leading-none">
                <span className="text-[#1B2F4B]">SAU</span>{' '}
                <span className="text-[#1F4E9C] font-semibold">Mess</span>
              </span>
            </Link>

            {/* Middle: university name (desktop only) */}
            <div className="hidden lg:block text-center">
              <p className="font-head text-xl xl:text-2xl font-bold uppercase tracking-wide text-[#1B2F4B] leading-tight">
                South Asian University
              </p>
              <p className="mt-1 text-[13px] text-[#4B5563] leading-snug">
                A University Established by SAARC Nations
              </p>
            </div>

            {/* Right: SAARC logo + mobile menu button */}
            <div className="justify-self-end flex items-center gap-3">
              <img
                src="/saarc-logo.png"
                alt="SAARC"
                className="h-9 sm:h-11 lg:h-14 w-auto"
              />

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2.5 text-[#1B2F4B] hover:bg-[#F5F8FC]"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#DDE5F0] shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 pt-3 pb-6 space-y-1">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `w-full px-4 py-3.5 text-base font-medium flex items-center justify-between min-h-[48px] ${
                      isActive
                        ? 'bg-[#F5F8FC] text-[#1F4E9C] font-semibold border border-[#DDE5F0]'
                        : 'text-[#111827] hover:bg-[#F5F8FC]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {isActive && <span className="w-2 h-2 bg-[#1F4E9C]" />}
                    </>
                  )}
                </NavLink>
              ))}

              <div className="pt-3 border-t border-[#DDE5F0] mt-3">
                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="w-full px-4 py-3 text-sm text-[#4B5563] hover:text-[#1F4E9C] hover:bg-[#F5F8FC] min-h-[48px] flex items-center"
                >
                  About the Student Mess
                </Link>
                <div className="px-4 py-2 text-xs text-[#4B5563]">
                  Contact: mess@sau.int · Mess Manager in Mess 1
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop navigation bar: stays pinned while scrolling */}
      <nav
        aria-label="Main Navigation"
        className="hidden lg:block sticky top-0 z-50 bg-[#1F4E9C] border-b-[3px] border-[#C9A227] shadow-sm"
      >
        <div className={`${wrap} flex items-center justify-between`}>
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `px-3 xl:px-4 py-3.5 text-[13px] font-semibold uppercase tracking-wide text-white transition-colors whitespace-nowrap ${
                  isActive ? 'bg-[#163b78]' : 'hover:bg-white/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};