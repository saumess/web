import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { getCredit } from '../data/photoCredits';

export const Photo = ({ src, alt, className = '', label = 'Photo coming soon' }) => {
  const [failed, setFailed] = useState(false);
  const credit = getCredit(src);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} (photo coming soon)`}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#F5F8FC] to-[#E3EBF7] text-[#4B5563] ${className}`}
      >
        <ImageIcon className="w-8 h-8 text-[#1F4E9C]" aria-hidden="true" />
        <span className="text-xs font-medium">{label}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {credit && (
        <span className="absolute bottom-0 left-0 max-w-full px-2.5 py-1 text-[11px] leading-tight text-white bg-[#1B2F4B]/85">
          Photo: {credit}
        </span>
      )}
    </div>
  );
};