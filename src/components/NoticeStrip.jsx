import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, X, ArrowRight } from 'lucide-react';
import { NOTICES } from '../data/mockData';

export const NoticeStrip = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  // Active important notice
  const urgentNotice = NOTICES.find((n) => n.isImportant);

  if (!urgentNotice || isDismissed) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Urgent Mess Notice"
      className="notice-strip bg-[#FFF4D6] border-b border-[#F4DB9B] text-[#7A4B00] py-2 px-4 transition-all"
    >
      <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#7A4B00]/10 text-[#7A4B00]">
            <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
          <p className="truncate font-medium">
            <strong className="font-semibold mr-1.5">Notice:</strong>
            {urgentNotice.title}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={`/notices?open=${urgentNotice.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#7A4B00] underline hover:text-[#523200] focus-visible:outline-2 focus-visible:outline-[#C9A227] px-1 py-0.5 rounded"
          >
            <span>Read full notice</span>
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss notice bar"
            className="p-1 rounded-md text-[#7A4B00] hover:bg-[#7A4B00]/10 focus-visible:outline-2 focus-visible:outline-[#C9A227]"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};