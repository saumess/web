import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// photos: [{ src, alt, place, by }]
export const Lightbox = ({ photos, index, onClose, onChange }) => {
  const count = photos.length;
  const photo = photos[index];
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const touchStartX = useRef(null);
  const [failed, setFailed] = useState(false);

  const prev = () => onChange((index - 1 + count) % count);
  const next = () => onChange((index + 1) % count);

  // Reset the error state when the photo changes
  useEffect(() => {
    setFailed(false);
  }, [index]);

  // On open: lock page scroll and focus the Close button. On close: restore both.
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, []);

  // Keyboard: Esc closes, arrows move, Tab stays inside the viewer
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && count > 1) {
        prev();
      } else if (e.key === 'ArrowRight' && count > 1) {
        next();
      } else if (e.key === 'Tab') {
        const items = dialogRef.current?.querySelectorAll('button');
        if (!items || items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Load the neighbouring photos in advance so Next and Back feel instant
  useEffect(() => {
    if (count < 2) return;
    [(index + 1) % count, (index - 1 + count) % count].forEach((i) => {
      const img = new Image();
      img.src = photos[i].src;
    });
  }, [index, count, photos]);

  // Swipe left or right on phones
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null || count < 2) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx > 50) prev();
    else if (dx < -50) next();
  };

  const navBtn =
    'absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-[#1B2F4B]/80 hover:bg-[#1F4E9C] text-white transition-colors';

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[100] flex flex-col bg-[#0F1B2D]/95 text-white"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 h-14 shrink-0">
        <p className="text-sm font-semibold" aria-live="polite">
          {index + 1} / {count}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="w-11 h-11 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      {/* Photo area: clicking the empty space closes the viewer */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-14 sm:px-20"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {count > 1 && (
          <button
            type="button"
            onClick={prev}
            aria-label="Previous photo"
            className={`${navBtn} left-2 sm:left-4`}
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>
        )}

        {failed ? (
          <p className="text-sm text-white/90">This photo could not be loaded.</p>
        ) : (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            onError={() => setFailed(true)}
            className="max-w-full max-h-full object-contain select-none"
            draggable="false"
          />
        )}

        {count > 1 && (
          <button
            type="button"
            onClick={next}
            aria-label="Next photo"
            className={`${navBtn} right-2 sm:right-4`}
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Caption */}
      <div className="shrink-0 px-4 sm:px-6 py-4 text-center">
        {photo.place && <p className="text-base font-semibold">{photo.place}</p>}
        {photo.by && <p className="text-sm text-white/85">Photo: {photo.by}</p>}
      </div>
    </div>
  );
};