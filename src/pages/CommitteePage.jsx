import { Users } from 'lucide-react';
import { COMMITTEE_MEMBERS } from '../data/committee';

const wrap = 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8';

// First letter of the first and last word, e.g. "Anuj Kumar" -> "AK"
const initials = (name) => {
  const parts = name.split(' ').filter(Boolean);
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
};

export const CommitteePage = () => {
  return (
    <div>
      {/* Page header */}
      <section className="bg-[#F5F8FC] border-b border-[#DDE5F0]">
        <div className={`${wrap} py-12 sm:py-16 text-center`}>
          <span className="block text-xs font-semibold uppercase tracking-widest text-[#1F4E9C] mb-2">
            Run by students
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B2F4B]">
            Mess Committee
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />
        </div>
      </section>

      {/* Members */}
      <section className={`${wrap} py-12 sm:py-16`}>
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-8 border-b border-[#DDE5F0]">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2F4B]">
            Student members
          </h2>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F4E9C]">
            <Users className="w-4 h-4" aria-hidden="true" />
            {COMMITTEE_MEMBERS.length} members, in alphabetical order
          </span>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMMITTEE_MEMBERS.map((name) => (
            <li
              key={name}
              className="flex items-center gap-4 bg-white border border-[#DDE5F0] border-l-[3px] border-l-[#C9A227] px-4 py-3.5 min-h-[64px] shadow-xs"
            >
              <span
                className="w-10 h-10 shrink-0 bg-[#1F4E9C] text-white flex items-center justify-center text-sm font-semibold"
                aria-hidden="true"
              >
                {initials(name)}
              </span>
              <span className="font-semibold text-[#1B2F4B] leading-snug">{name}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-[#4B5563] border-t border-[#DDE5F0] pt-5">
          To reach the committee, write to{' '}
          <a href="mailto:mess@sau.int" className="font-semibold text-[#1F4E9C] hover:underline">
            mess@sau.int
          </a>{' '}
          or speak to the Mess Manager in Mess 1.
        </p>
      </section>
    </div>
  );
};