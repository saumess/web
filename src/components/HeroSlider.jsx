import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ---- Adjust the hero here ----
// Hero height on phone / tablet / desktop. Make the numbers bigger or smaller.
const HERO_HEIGHT = 'min-h-[460px] sm:min-h-[540px] lg:min-h-[620px]';
const AUTOPLAY = true; // set to false to stop the automatic sliding
const INTERVAL = 5000; // milliseconds between slides
// ------------------------------

const wrap = 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8';

export const HeroSlider = ({ slides, children }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = (i) => setIndex((i + count) % count);

  useEffect(() => {
    if (!AUTOPLAY || paused || count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearInterval(id);
  }, [paused, count, index]);

  return (
    <section
      className="relative overflow-hidden text-white"
      aria-roledescription="carousel"
      aria-label="SAU Mess photos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Sliding images: one visible at a time */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
        aria-hidden="true"
      >
        {slides.map((s) => (
          <div
            key={s.src}
            className="w-full h-full shrink-0 bg-cover"
            style={{
              backgroundImage: `url(${s.src}), linear-gradient(135deg, #1F4E9C, #1B2F4B)`,
              backgroundPosition: s.position || 'center',
            }}
          />
        ))}
      </div>

      {/* Navy overlay so the text stays readable */}
      <div className="absolute inset-0 bg-[#697991ff]/65" aria-hidden="true" />

      {/* Previous / next */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous image"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-[#1B2F4B]/50 hover:bg-[#1B2F4B]/80 text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next image"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-[#1B2F4B]/50 hover:bg-[#1B2F4B]/80 text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Content */}
      <div
        className={`${wrap} relative ${HERO_HEIGHT} flex flex-col items-center justify-center text-center pt-12 pb-32 sm:pb-40`}
      >
        {children}
      </div>

      {/* Dots: sit above the floating tiles */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-28 sm:bottom-32 z-10 flex justify-center">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className="p-2"
            >
              <span
                className={`block h-2 w-7 transition-colors ${
                  i === index ? 'bg-white' : 'bg-white/45'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};