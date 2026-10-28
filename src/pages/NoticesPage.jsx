import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertTriangle, ChevronDown, Paperclip, ExternalLink } from 'lucide-react';
import { NOTICES, CATEGORIES } from '../data/notices';

const wrap = 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8';

const chips = ['All', ...CATEGORIES.filter((c) => NOTICES.some((n) => n.category === c))];

const NoticeItem = ({ notice, open, onToggle }) => {
  const buttonId = `notice-btn-${notice.id}`;
  const panelId = `notice-panel-${notice.id}`;
  const hasLinks = notice.links.length > 0;

  return (
    <article
      id={`notice-${notice.id}`}
      className={`scroll-mt-28 border ${
        notice.isImportant
          ? 'bg-[#FFF4D6] border-[#F4DB9B] border-l-[5px] border-l-[#C9A227]'
          : 'bg-white border-[#DDE5F0]'
      }`}
    >
      <h3 className="text-base">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-start justify-between gap-4 text-left px-5 py-4 min-h-[64px] font-sans hover:bg-black/[0.03] transition-colors"
        >
          <span className="flex-1 min-w-0">
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs mb-1.5">
              <time
                dateTime={notice.isoDate}
                className={notice.isImportant ? 'font-medium text-[#7A4B00]' : 'font-medium text-[#4B5563]'}
              >
                {notice.date}
              </time>
              <span className="px-2 py-0.5 font-semibold text-[#1B2F4B] bg-[#F5F8FC] border border-[#DDE5F0]">
                {notice.category}
              </span>
              {notice.isImportant && (
                <span className="inline-flex items-center gap-1 font-bold text-[#7A4B00]">
                  <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                  Important
                </span>
              )}
              {hasLinks && (
                <span
                  className={`inline-flex items-center gap-1 font-semibold ${
                    notice.isImportant ? 'text-[#7A4B00]' : 'text-[#1F4E9C]'
                  }`}
                >
                  <Paperclip className="w-3.5 h-3.5" aria-hidden="true" />
                  Attachment
                </span>
              )}
            </span>
            <span className="block text-base font-semibold text-[#111827] leading-snug">
              {notice.title}
            </span>
          </span>

          <ChevronDown
            className={`w-5 h-5 shrink-0 mt-1 transition-transform duration-300 ${
              notice.isImportant ? 'text-[#7A4B00]' : 'text-[#1F4E9C]'
            } ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5">
            <p
              className={`text-[15px] leading-relaxed ${
                notice.isImportant ? 'text-[#7A4B00]' : 'text-[#4B5563]'
              }`}
            >
              {notice.summary}
            </p>

            {hasLinks && (
              <div className="mt-4 flex flex-wrap gap-3">
                {notice.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={open ? 0 : -1}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1F4E9C] hover:bg-[#163b78] transition-colors min-h-[44px]"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export const NoticesPage = () => {
  const [params] = useSearchParams();
  const openParam = params.get('open');

  const [filter, setFilter] = useState('All');
  const [openId, setOpenId] = useState(openParam);

  // Arriving from "Read more" (Home or the notice strip): open that notice and scroll to it
  useEffect(() => {
    if (!openParam) return;
    setFilter('All');
    setOpenId(openParam);
    const t = setTimeout(() => {
      document
        .getElementById(`notice-${openParam}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => clearTimeout(t);
  }, [openParam]);

  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  const visible = filter === 'All' ? NOTICES : NOTICES.filter((n) => n.category === filter);
  const important = visible.filter((n) => n.isImportant);

  // Group the rest by month, newest first (NOTICES is already sorted)
  const months = [];
  visible
    .filter((n) => !n.isImportant)
    .forEach((n) => {
      let group = months.find((g) => g.key === n.monthKey);
      if (!group) {
        group = { key: n.monthKey, label: n.monthLabel, items: [] };
        months.push(group);
      }
      group.items.push(n);
    });

  return (
    <div>
      {/* Page header */}
      <section className="bg-[#F5F8FC] border-b border-[#DDE5F0]">
        <div className={`${wrap} py-12 sm:py-16 text-center`}>
          <span className="block text-xs font-semibold uppercase tracking-widest text-[#1F4E9C] mb-2">
            Official circulars
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B2F4B]">
            Notices
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />
        </div>
      </section>

      <section className={`${wrap} py-10 sm:py-14`}>
        <div className="max-w-4xl mx-auto">
          {/* Filter chips */}
          <div
            role="group"
            aria-label="Filter notices by category"
            className="flex flex-wrap gap-2 mb-10"
          >
            {chips.map((c) => {
              const count = c === 'All' ? NOTICES.length : NOTICES.filter((n) => n.category === c).length;
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

          {visible.length === 0 && (
            <div className="border border-[#DDE5F0] bg-[#F5F8FC] p-6 text-[15px] text-[#4B5563]">
              {NOTICES.length === 0
                ? 'No notices right now.'
                : 'No notices in this category.'}
            </div>
          )}

          {/* Important notices: pinned at the top until they expire */}
          {important.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2F4B] pb-3 mb-5 border-b border-[#DDE5F0]">
                Important
              </h2>
              <div className="space-y-3">
                {important.map((n) => (
                  <NoticeItem
                    key={n.id}
                    notice={n}
                    open={openId === n.id}
                    onToggle={() => toggle(n.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Month groups */}
          {months.map((g) => (
            <div key={g.key} className="mb-10">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2F4B] pb-3 mb-5 border-b border-[#DDE5F0]">
                {g.label}
              </h2>
              <div className="space-y-3">
                {g.items.map((n) => (
                  <NoticeItem
                    key={n.id}
                    notice={n}
                    open={openId === n.id}
                    onToggle={() => toggle(n.id)}
                  />
                ))}
              </div>
            </div>
          ))}

          <p className="text-sm text-[#4B5563] border-t border-[#DDE5F0] pt-5">
            Missed something? Write to{' '}
            <a href="mailto:mess@sau.int" className="font-semibold text-[#1F4E9C] hover:underline">
              mess@sau.int
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};