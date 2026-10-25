import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Mess Menu' },
  { to: '/timings-and-rates', label: 'Timings & Rates' },
  { to: '/mess-card', label: 'Mess Card System' },
  { to: '/rules-and-faq', label: 'Rules & Conduct' },
  { to: '/notices', label: 'Notices' },
  { to: '/feedback', label: 'Feedback & Forms' },
  { to: '/committee', label: 'Committee' },
  { to: '/about', label: 'About' },
];

export const Footer = () => {
  return (
    <footer className="mt-16 sm:mt-24 bg-[#1B2F4B] text-white">
      <div className="h-[3px] bg-[#C9A227] w-full" aria-hidden="true" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Column 1: About the Mess */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#1F4E9C] flex items-center justify-center text-white border border-[#C9A227]">
                <span className="font-bold text-xs tracking-wider">SAU</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                SAU Student Mess
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Providing wholesome, diverse dining for scholars from the 8 SAARC
              member states. Breakfast 8:30–10:30 AM · Lunch 12:30–2:30 PM · Dinner 7:30–9:30 PM.
            </p>
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" aria-hidden="true" />
              <span>South Asian University, New Delhi, India</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 font-sans">
              Quick Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-300">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-block py-0.5 rounded hover:text-white hover:underline transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A227]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 font-sans">
              Mess Contact & Support
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A227] shrink-0" aria-hidden="true" />
                <a
                  href="mailto:mess@sau.int"
                  className="hover:underline hover:text-white transition-colors font-medium text-white"
                >
                  mess@sau.int
                </a>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                Contact the <strong>Mess Manager in Mess 1</strong> for all subscriptions, card renewals, and packing requests.
              </div>
              <div className="text-xs text-slate-400 pt-1">
                Card renewal window: 1st and 2nd day of each month.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>
            Last updated: <span className="text-slate-200">October 2026</span>
          </div>
          <div className="text-center sm:text-right">
            © 2026 South Asian University, New Delhi. An International University established by SAARC.
          </div>
        </div>
      </div>
    </footer>
  );
};