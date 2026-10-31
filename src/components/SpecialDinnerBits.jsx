import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

export const SpecialDinnerTag = () => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-[#FFF4D6] text-[#7A4B00] border border-[#C9A227]">
    <Star className="w-3 h-3" aria-hidden="true" />
    Special Dinner
  </span>
);

export const SpecialDinnerNote = ({ empty }) => (
  <div className="mt-4 pt-3 border-t border-[#DDE5F0]">
    {empty && (
      <p className="text-sm text-[#4B5563] mb-2">Special menu to be announced.</p>
    )}
    <Link
      to="/special-dinner"
      className="inline-flex items-center gap-1 text-sm font-semibold text-[#1F4E9C] hover:underline"
    >
      <span>Details, pricing and registration</span>
      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
    </Link>
  </div>
);