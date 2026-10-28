import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Utensils,
  Sparkles,
  Users,
  Wallet,
  CalendarOff,
  Search,
  Plus,
  Minus,
  ExternalLink,
  Clock,
} from 'lucide-react';
import { RULE_GROUPS, MESS_OFF_ROWS, MESS_OFF_FORM_URL, FAQS } from '../data/rulesData';

const wrap = 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8';

const icons = {
  dining: Utensils,
  hygiene: Sparkles,
  guests: Users,
  payments: Wallet,
  rebates: CalendarOff,
};

const SectionHeading = ({ id, title, intro }) => (
  <div id={id} className="scroll-mt-24 mb-8">
    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2F4B]">{title}</h2>
    <div className="mt-3 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />
    {intro && <p className="mt-3 text-sm sm:text-base text-[#4B5563] max-w-2xl">{intro}</p>}
  </div>
);

const FaqItem = ({ item, open, onToggle }) => {
  const buttonId = `faq-btn-${item.id}`;
  const panelId = `faq-panel-${item.id}`;

  return (
    <div className="border border-[#DDE5F0] bg-white">
      <h3 className="text-base">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 min-h-[56px] font-sans font-semibold text-[#1B2F4B] hover:bg-[#F5F8FC] transition-colors"
        >
          <span>{item.q}</span>
          {open ? (
            <Minus className="w-5 h-5 text-[#1F4E9C] shrink-0" aria-hidden="true" />
          ) : (
            <Plus className="w-5 h-5 text-[#1F4E9C] shrink-0" aria-hidden="true" />
          )}
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
          <div className="px-5 pb-5 text-[15px] text-[#4B5563] leading-relaxed">
            <p>{item.a}</p>
            {item.link && (
              <Link
                to={item.link.to}
                tabIndex={open ? 0 : -1}
                className="inline-block mt-3 font-semibold text-[#1F4E9C] hover:underline"
              >
                {item.link.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const RulesFaqPage = () => {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      {/* Page header */}
      <section className="bg-[#F5F8FC] border-b border-[#DDE5F0]">
        <div className={`${wrap} py-12 sm:py-16 text-center`}>
          <span className="block text-xs font-semibold uppercase tracking-widest text-[#1F4E9C] mb-2">
            Know before you dine
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B2F4B]">
            Rules & FAQ
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="#rules"
              className="px-5 py-2.5 text-sm font-semibold text-[#1F4E9C] bg-white border border-[#1F4E9C] hover:bg-[#F5F8FC] min-h-[44px] inline-flex items-center"
            >
              Rules
            </a>
            <a
              href="#mess-off"
              className="px-5 py-2.5 text-sm font-semibold text-[#1F4E9C] bg-white border border-[#1F4E9C] hover:bg-[#F5F8FC] min-h-[44px] inline-flex items-center"
            >
              Mess-off and rebates
            </a>
            <a
              href="#faq"
              className="px-5 py-2.5 text-sm font-semibold text-[#1F4E9C] bg-white border border-[#1F4E9C] hover:bg-[#F5F8FC] min-h-[44px] inline-flex items-center"
            >
              FAQ
            </a>
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <SectionHeading
          id="rules"
          title="Mess rules"
          intro="A few simple rules keep the mess fair and pleasant for everyone."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RULE_GROUPS.map((group) => {
            const Icon = icons[group.icon] || Utensils;
            return (
              <article
                key={group.id}
                className="bg-white border border-[#DDE5F0] border-t-[3px] border-t-[#C9A227] p-6 shadow-xs"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#F5F8FC] border border-[#DDE5F0] text-[#1F4E9C] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1B2F4B]">{group.title}</h3>
                </div>

                <ul className="space-y-3">
                  {group.rules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-[15px] text-[#111827] leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 bg-[#C9A227] shrink-0" aria-hidden="true" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      {/* Mess-off and rebate */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <SectionHeading
          id="mess-off"
          title="Mess-off and rebate policy"
          intro="Going away for a while? Here is how to ask for a leave adjustment."
        />

        <div className="overflow-x-auto border border-[#DDE5F0]">
          <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
            <caption className="sr-only">Mess-off and rebate policy</caption>
            <thead>
              <tr className="bg-[#1F4E9C] text-white">
                <th scope="col" className="p-4 font-semibold">Days away</th>
                <th scope="col" className="p-4 font-semibold">Rebate</th>
                <th scope="col" className="p-4 font-semibold">How to apply</th>
              </tr>
            </thead>
            <tbody>
              {MESS_OFF_ROWS.map((row) => (
                <tr key={row.days} className="bg-white border-t border-[#DDE5F0]">
                  <th scope="row" className="p-4 font-semibold text-[#1B2F4B] align-top">
                    {row.days}
                  </th>
                  <td className="p-4 text-[#111827] align-top">{row.rebate}</td>
                  <td className="p-4 text-[#111827] align-top">{row.apply}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          {MESS_OFF_FORM_URL ? (
            <a
              href={MESS_OFF_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 text-base font-semibold text-white bg-[#1F4E9C] hover:bg-[#163b78] transition-colors min-h-[48px]"
            >
              <span>Open the Mess-Off form</span>
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
              <span>Form link coming soon</span>
            </button>
          )}

          <p className="text-sm text-[#4B5563]">
            In the meantime, write to{' '}
            <a href="mailto:mess@sau.int" className="font-semibold text-[#1F4E9C] hover:underline">
              mess@sau.int
            </a>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <SectionHeading
          id="faq"
          title="Frequently asked questions"
          intro="Quick answers in plain language."
        />

        <div className="max-w-3xl">
          <div className="relative mb-6">
            <label htmlFor="faq-search" className="sr-only">
              Search questions
            </label>
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4B5563]"
              aria-hidden="true"
            />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions, for example: card, guest, leave"
              className="w-full min-h-[52px] pl-12 pr-4 py-3 border border-[#DDE5F0] bg-white text-base text-[#111827] placeholder:text-[#4B5563] focus:border-[#1F4E9C]"
            />
          </div>

          <p className="sr-only" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'question' : 'questions'} found
          </p>

          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((item) => (
                <FaqItem
                  key={item.id}
                  item={item}
                  open={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="border border-[#DDE5F0] bg-[#F5F8FC] p-6 text-[15px] text-[#4B5563]">
              No questions match “{query}”. Try a different word, or write to{' '}
              <a href="mailto:mess@sau.int" className="font-semibold text-[#1F4E9C] hover:underline">
                mess@sau.int
              </a>
              .
            </div>
          )}
        </div>
      </section>
    </div>
  );
};