import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

export const Photo = ({ src, alt, className = '', label = 'Photo coming soon' }) => {
  const [failed, setFailed] = useState(false);

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
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
};