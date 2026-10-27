import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const explore = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Mess Menu' },
  { to: '/timings-and-rates', label: 'Timings & Rates' },
  { to: '/mess-card', label: 'Mess Card System' },
];

const engage = [
  { to: '/rules-and-faq', label: 'Rules & Conduct' },
  { to: '/notices', label: 'Notices' },
  { to: '/feedback', label: 'Feedback & Forms' },
  { to: '/committee', label: 'Committee' },
  { to: '/about', label: 'About' },
];

// Image fades into the footer colour at the top and the bottom
const fadeMask =
  'linear-gradient(to bottom, transparent 0%, black 40%, black 80%, transparent 100%)';

const linkClass =
  'inline-block py-1 text-[15px] text-[#4B5563] hover:text-[#1F4E9C] hover:underline transition-colors';

export const Footer = () => {
  return (
    <footer className="mt-16 sm:mt-24 overflow-hidden border-t-[3px] border-t-[#C9A227] bg-[#F5F8FC]">
      {/* Links and info */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-10 sm:pt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <img src="/sau-logo.png" alt="South Asian University" className="h-11 w-auto" />
              <span className="h-8 w-px bg-[#C9A227]" aria-hidden="true" />
              <span className="text-xl font-bold tracking-tight leading-none">
                <span className="text-[#1B2F4B]">SAU</span>{' '}
                <span className="text-[#1F4E9C] font-semibold">Mess</span>
              </span>
            </div>
            <p className="text-sm text-[#4B5563] leading-relaxed max-w-xs">
              Fresh. Flavourful. Bruin Fueled. Serving scholars from the 8 SAARC member states.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-[#1B2F4B] mb-3 font-sans">Explore</h3>
            <ul>
              {explore.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Engage */}
          <div>
            <h3 className="text-sm font-semibold text-[#1B2F4B] mb-3 font-sans">Engage</h3>
            <ul>
              {engage.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-semibold text-[#1B2F4B] mb-3 font-sans">Contact</h3>
            <div className="space-y-3 text-sm text-[#4B5563]">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#1F4E9C] shrink-0" aria-hidden="true" />
                <a
                  href="mailto:mess@sau.int"
                  className="font-medium text-[#1F4E9C] hover:underline"
                >
                  mess@sau.int
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1F4E9C] shrink-0 mt-0.5" aria-hidden="true" />
                <span>South Asian University, New Delhi, India</span>
              </div>
              <p className="leading-relaxed">
                Contact the <strong className="text-[#1B2F4B]">Mess Manager in Mess 1</strong> for subscriptions, card renewals and packing requests.
              </p>
              <p className="text-xs">Card renewal window: 1st and 2nd day of each month.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Building image: full width, fades into the footer colour */}
      <div className="mt-4 sm:mt-6">
        <img
          src="/mess-building.png"
          alt="SAU Mess building"
          loading="lazy"
          className="block w-full h-44 sm:h-auto sm:aspect-[7/2] object-cover object-bottom select-none"
          style={{ WebkitMaskImage: fadeMask, maskImage: fadeMask }}
        />
      </div>

      {/* Bottom line */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pb-6 -mt-2">
        <div className="pt-4 border-t border-[#DDE5F0] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#4B5563]">
          <span>
            Last updated: <span className="font-medium text-[#1B2F4B]">October 2026</span>
          </span>
          <span className="text-center sm:text-right">
            © 2026 South Asian University, New Delhi. An International University established by SAARC.
          </span>
        </div>
      </div>
    </footer>
  );
};