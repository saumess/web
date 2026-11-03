import { useState } from 'react';
import { PHOTO_CREDITS } from '../data/photoCredits';
import { Lightbox } from '../components/Lightbox';

const wrap = 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8';

// One row per photo, sorted by photographer name, then by place
const rows = PHOTO_CREDITS.filter((c) => c.by).sort(
  (a, b) =>
    a.by.localeCompare(b.by, 'en', { sensitivity: 'base' }) ||
    (a.where || '').localeCompare(b.where || '', 'en', { sensitivity: 'base' })
);

// What the viewer needs for each photo
const photos = rows.map((c) => ({
  src: c.src,
  alt: c.where || `Photo by ${c.by}`,
  place: c.where,
  by: c.by,
}));

// Small thumbnail that opens the viewer. Shows a dash if the file is missing.
const Thumb = ({ src, alt, onOpen }) => {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <span className="text-[#4B5563]">–</span>;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Enlarge photo: ${alt}`}
      className="block border border-[#DDE5F0] hover:border-[#1F4E9C] transition-colors"
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className="block w-16 h-12 object-cover"
      />
    </button>
  );
};

export const PhotoCreditsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      {/* Page header */}
      <section className="bg-[#F5F8FC] border-b border-[#DDE5F0]">
        <div className={`${wrap} py-10 sm:py-12 text-center`}>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B2F4B]">
            Photo Credits
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />
        </div>
      </section>

      <section className={`${wrap} py-10 sm:py-12`}>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
            Thank you to the students who shared their photos. Each photo is used with
            the photographer’s permission. Click a photo to enlarge it. To change a
            credit or remove a photo, write to{' '}
            <a href="mailto:mess@sau.int" className="font-semibold text-[#1F4E9C] hover:underline">
              mess@sau.int
            </a>
            .
          </p>

          {rows.length > 0 ? (
            <div className="overflow-x-auto border border-[#DDE5F0]">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">Photo credits</caption>
                <thead>
                  <tr className="bg-[#F5F8FC] text-xs uppercase tracking-wide text-[#1B2F4B]">
                    <th scope="col" className="p-3 font-semibold">Name</th>
                    <th scope="col" className="p-3 font-semibold">Place</th>
                    <th scope="col" className="p-3 font-semibold w-24">Photo</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((c, i) => (
                    <tr key={c.src} className="border-t border-[#DDE5F0] bg-white">
                      <td className="p-3 align-middle font-semibold text-[#1B2F4B]">
                        {c.link ? (
                          <a
                            href={c.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1F4E9C] hover:underline"
                          >
                            {c.by}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        ) : (
                          c.by
                        )}
                      </td>
                      <td className="p-3 align-middle text-[#4B5563]">{c.where || '–'}</td>
                      <td className="p-3 align-middle">
                        <Thumb
                          src={c.src}
                          alt={photos[i].alt}
                          onOpen={() => setOpenIndex(i)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-[#4B5563]">Photo credits will be added soon.</p>
          )}
        </div>
      </section>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onChange={setOpenIndex}
        />
      )}
    </div>
  );
};