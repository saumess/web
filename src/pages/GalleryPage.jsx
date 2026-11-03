import { useMemo, useState } from 'react';
import { ExternalLink, Clock, Mail } from 'lucide-react';
import { GALLERY_PHOTOS, GALLERY_CATEGORIES, GALLERY_FORM_URL } from '../data/gallery';
import { Lightbox } from '../components/Lightbox';

const wrap = 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8';

// Newest first (photos without a date go last)
const ALL = [...GALLERY_PHOTOS].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

const chips = ['All', ...GALLERY_CATEGORIES.filter((c) => ALL.some((p) => p.category === c))];

const GUIDELINES = [
  'Send the original file, not a copy from WhatsApp or Instagram, so the photo stays sharp.',
  'Send only photos you took yourself.',
  'Avoid photos where students can be recognised, unless they have agreed.',
  'Tell us how you would like to be credited.',
];

// One photo in the grid. If the file is missing, the tile is hidden.
const Tile = ({ photo, onOpen }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <li className="mb-4 break-inside-avoid">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Enlarge photo: ${photo.title}`}
        className="group relative block w-full overflow-hidden border border-[#DDE5F0] bg-[#F5F8FC]"
      >
        <img
          src={photo.src}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="block w-full h-auto transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-0 left-0 right-0 px-3 py-2 text-left bg-[#1B2F4B]/85 text-white">
          <span className="block text-[13px] font-semibold leading-tight">{photo.title}</span>
          {photo.by && <span className="block text-[11px] text-white/85">Photo: {photo.by}</span>}
        </span>
      </button>
    </li>
  );
};

export const GalleryPage = () => {
  const [filter, setFilter] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const visible = useMemo(
    () => (filter === 'All' ? ALL : ALL.filter((p) => p.category === filter)),
    [filter]
  );

  // What the viewer needs for each photo
  const viewerPhotos = useMemo(
    () => visible.map((p) => ({ src: p.src, alt: p.title, place: p.title, by: p.by })),
    [visible]
  );

  return (
    <div>
      {/* Page header */}
      {/* <section className="bg-[#F5F8FC] border-b border-[#DDE5F0]">
        <div className={`${wrap} py-12 sm:py-16 text-center`}>
          <span className="block text-xs font-semibold uppercase tracking-widest text-[#1F4E9C] mb-2">
            From our community
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B2F4B]">
            Gallery
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#4B5563] leading-relaxed">
            Photos of the mess, the food and our events, taken by students.
          </p>
        </div>
      </section> */}

      <section className={`${wrap} py-10 sm:py-14`}>
        {ALL.length > 0 ? (
          <>
            {/* Filter chips */}
            <div
              role="group"
              aria-label="Filter photos by category"
              className="flex flex-wrap gap-2 mb-8"
            >
              {chips.map((c) => {
                const count = c === 'All' ? ALL.length : ALL.filter((p) => p.category === c).length;
                const active = filter === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFilter(c)}
                    aria-pressed={active}
                    className={`px-4 py-2 min-h-[44px] text-sm font-semibold border transition-colors ${
                      active
                        ? 'bg-[#1F4E9C] border-[#1F4E9C] text-white'
                        : 'bg-white border-[#DDE5F0] text-[#1B2F4B] hover:border-[#1F4E9C]'
                    }`}
                  >
                    {c} ({count})
                  </button>
                );
              })}
            </div>

            {/* Masonry grid */}
            <ul className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {visible.map((p, i) => (
                <Tile key={p.src} photo={p} onOpen={() => setOpenIndex(i)} />
              ))}
            </ul>
          </>
        ) : (
          <div className="border border-[#DDE5F0] bg-[#F5F8FC] p-6 text-[15px] text-[#4B5563]">
            Photos will be added soon. You can be the first to share yours below.
          </div>
        )}
      </section>

      {/* Share your photos */}
      <section className={`${wrap} pb-12 sm:pb-16`}>
        <div className="border border-[#DDE5F0] border-l-[5px] border-l-[#1F4E9C] bg-white p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2F4B] mb-2">
              Share your photos
            </h2>
            <p className="text-[15px] text-[#4B5563] leading-relaxed mb-5">
              Have a good photo of the mess, the food or a campus event? Send it to the
              committee. We check every photo before it goes up, and we credit you by name.
            </p>

            {GALLERY_FORM_URL ? (
              <a
                href={GALLERY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-base font-semibold text-white bg-[#1F4E9C] hover:bg-[#163b78] transition-colors min-h-[48px]"
              >
                <span>Send your photos</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-base font-semibold text-[#4B5563] bg-[#F5F8FC] border border-[#DDE5F0] cursor-not-allowed min-h-[48px]"
              >
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>Upload form coming soon</span>
              </button>
            )}

            <p className="mt-4 flex items-center gap-2 text-sm text-[#4B5563]">
              <Mail className="w-4 h-4 text-[#1F4E9C] shrink-0" aria-hidden="true" />
              <span>
                Or write to{' '}
                <a href="mailto:mess@sau.int" className="font-semibold text-[#1F4E9C] hover:underline">
                  mess@sau.int
                </a>
                .
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1B2F4B] mb-3 font-sans">Before you send</h3>
            <ul className="space-y-3">
              {GUIDELINES.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[15px] text-[#111827] leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 bg-[#C9A227] shrink-0" aria-hidden="true" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {openIndex !== null && (
        <Lightbox
          photos={viewerPhotos}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onChange={setOpenIndex}
        />
      )}
    </div>
  );
};