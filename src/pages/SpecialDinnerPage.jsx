import { useState } from 'react';
import {
  CalendarClock,
  CalendarX,
  Utensils,
  ShieldAlert,
  ExternalLink,
  Receipt,
  Mail,
  Clock,
} from 'lucide-react';
import { DietBadge } from '../components/DietBadge';

const wrap = 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8';

// ---- Edit these ----
// Paste the Google Form link here (the normal "viewform" link from the Send button).
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScffB0p8-FiQTyQxSmiqMqLLpek4MhCCHboDY2Ryvpa_c3Q7w/viewform?usp=dialog;";

// Dates (year, month 0-11, day, hour, minute). Month 9 = October.
const FORM_DEADLINE = new Date(2026, 9, 30, 23, 59, 59); // 29 Oct, 11:59 PM
const DINNER_END = new Date(2026, 9, 31, 23, 59, 59); // 31 Oct

const PRICING = [
  {
    isVeg: true,
    withCard: 'No extra charges',
    withCardNote: null,
    withoutCard: '₹90',
  },
  {
    isVeg: false,
    withCard: '₹50',
    withCardNote: 'This amount is adjusted in next month’s mess bill.',
    withoutCard: '₹150',
  },
];

const FRAUD_RULES = [
  'Submitting fake payment receipts or taking part in fraudulent payment practices will be taken seriously.',
  'Tampering with or editing mess cards to bypass payment rules is strictly prohibited.',
  'The Committee may ask students for payment receipts for verification, even after the dinner.',
  'Any such fraudulent activity may result in strict disciplinary action.',
];
// --------------------

// Turns the normal form link into the link that works inside an iframe
const toEmbedUrl = (url) => `${url.split('?')[0]}?embedded=true`;

const SectionHeading = ({ id, title, intro }) => (
  <div id={id} className="scroll-mt-24 mb-8">
    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2F4B]">{title}</h2>
    <div className="mt-3 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />
    {intro && <p className="mt-3 text-sm sm:text-base text-[#4B5563] max-w-2xl">{intro}</p>}
  </div>
);

export const SpecialDinnerPage = () => {
  const [now] = useState(() => new Date());

  const status = now <= FORM_DEADLINE ? 'open' : now <= DINNER_END ? 'closed' : 'ended';

  const statusLabel = {
    open: 'Registration open until 29 October, 11:59 PM',
    closed: 'Registration is closed',
    ended: 'This event has ended',
  }[status];

  return (
    <div>
      {/* Page header */}
      <section className="bg-[#F5F8FC] border-b border-[#DDE5F0]">
        <div className={`${wrap} py-12 sm:py-16 text-center`}>
          <span className="block text-xs font-semibold uppercase tracking-widest text-[#1F4E9C] mb-2">
            Monthly Special Dinner
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B2F4B]">
            Special Dinner
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />

          <p className="mt-4 text-lg sm:text-xl font-serif text-[#1B2F4B]">
            Saturday, 31 October 2026
          </p>

          <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-[#4B5563] leading-relaxed">
            Dear Campus Janta! Our monthly Special Dinner is here. Please read the
            instructions below carefully before you fill in the form.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {status === 'open' && (
              <a
                href="#register"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-[#1F4E9C] hover:bg-[#163b78] transition-colors min-h-[48px]"
              >
                Fill in the form
              </a>
            )}
            <a
              href="#rules"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-[#1F4E9C] bg-white border-2 border-[#1F4E9C] hover:bg-[#F5F8FC] transition-colors min-h-[48px]"
            >
              Read the instructions
            </a>
          </div>

          <p
            className="mt-6 inline-block px-4 py-2 text-sm font-semibold text-[#1B2F4B] bg-white border border-[#DDE5F0]"
            role="status"
          >
            {statusLabel}
          </p>
        </div>
      </section>

      {/* Key dates */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <SectionHeading id="dates" title="Important dates" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white border border-[#DDE5F0] border-t-[3px] border-t-[#C9A227] p-6 shadow-xs">
            <div className="w-12 h-12 bg-[#F5F8FC] border border-[#DDE5F0] text-[#1F4E9C] flex items-center justify-center mb-4">
              <CalendarClock className="w-6 h-6" aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1F4E9C] mb-1">
              29 October
            </p>
            <h3 className="text-lg font-bold text-[#1B2F4B] mb-1">Form closes</h3>
            <p className="text-sm text-[#4B5563]">
              Last date to submit the Google Form: 29 October, 11:59 PM.
            </p>
          </article>

          <article className="bg-white border border-[#DDE5F0] border-t-[3px] border-t-[#C9A227] p-6 shadow-xs">
            <div className="w-12 h-12 bg-[#F5F8FC] border border-[#DDE5F0] text-[#1F4E9C] flex items-center justify-center mb-4">
              <CalendarX className="w-6 h-6" aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1F4E9C] mb-1">
              30 October
            </p>
            <h3 className="text-lg font-bold text-[#1B2F4B] mb-1">Last day to cancel</h3>
            <p className="text-sm text-[#4B5563]">
              Changed your plans? Tell the Mess Manager or email mess@sau.int by this date.
            </p>
          </article>

          <article className="bg-white border border-[#DDE5F0] border-t-[3px] border-t-[#C9A227] p-6 shadow-xs">
            <div className="w-12 h-12 bg-[#F5F8FC] border border-[#DDE5F0] text-[#1F4E9C] flex items-center justify-center mb-4">
              <Utensils className="w-6 h-6" aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1F4E9C] mb-1">
              31 October
            </p>
            <h3 className="text-lg font-bold text-[#1B2F4B] mb-1">Dinner and payment</h3>
            <p className="text-sm text-[#4B5563]">
              Payment must be made on the day of the special dinner.
            </p>
          </article>
        </div>
      </section>

      {/* Pricing */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <SectionHeading id="pricing" title="Special dinner pricing" />

        <div className="max-w-3xl overflow-x-auto border border-[#DDE5F0]">
          <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
            <caption className="sr-only">Special dinner pricing</caption>
            <thead>
              <tr className="bg-[#1F4E9C] text-white">
                <th scope="col" className="p-4 font-semibold">Food</th>
                <th scope="col" className="p-4 font-semibold">With a valid mess card</th>
                <th scope="col" className="p-4 font-semibold">Without a mess card</th>
              </tr>
            </thead>
            <tbody>
              {PRICING.map((row) => (
                <tr key={row.isVeg ? 'veg' : 'nonveg'} className="bg-white border-t border-[#DDE5F0]">
                  <th scope="row" className="p-4 align-top">
                    <DietBadge isVeg={row.isVeg} size="md" />
                  </th>
                  <td className="p-4 align-top">
                    <span className="font-semibold text-[#111827]">{row.withCard}</span>
                    {row.withCardNote && (
                      <span className="block text-sm text-[#4B5563] mt-1">{row.withCardNote}</span>
                    )}
                  </td>
                  <td className="p-4 align-top font-semibold text-[#111827]">{row.withoutCard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rules */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <SectionHeading id="rules" title="Please read: payment and mess card rules" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            role="note"
            className="lg:col-span-2 border border-[#F4DB9B] border-l-[5px] border-l-[#C9A227] bg-[#FFF4D6] text-[#7A4B00] p-5 sm:p-6"
          >
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-bold text-[#7A4B00] mb-2">Important</h3>
                <p className="text-[15px] leading-relaxed mb-3">
                  The Mess Committee has observed instances of fake payments and other
                  payment-related irregularities. Please note:
                </p>
                <ul className="space-y-2.5">
                  {FRAUD_RULES.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-[15px] leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 bg-[#7A4B00] shrink-0" aria-hidden="true" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-start gap-2 text-[15px] font-semibold">
                  <Receipt className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>
                    Keep your payment proof safe and cooperate with the Committee during
                    verification.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="border border-[#DDE5F0] border-t-[3px] border-t-[#C9A227] bg-white p-5 sm:p-6 shadow-xs">
            <h3 className="text-lg font-bold text-[#1B2F4B] mb-2">Changed your plans?</h3>
            <p className="text-[15px] text-[#4B5563] leading-relaxed mb-3">
              If you filled in the form but decide not to come, tell the Mess Manager in
              person or email{' '}
              <a href="mailto:mess@sau.int" className="font-semibold text-[#1F4E9C] hover:underline">
                mess@sau.int
              </a>{' '}
              no later than 30 October.
            </p>
            <p className="text-[15px] text-[#111827] font-semibold leading-relaxed">
              Please do not submit the form unless you genuinely intend to attend.
            </p>
          </div>
        </div>
      </section>

      {/* Register */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <SectionHeading
          id="register"
          title="Register for the dinner"
          intro="The Google Form is mandatory for everyone who wants to attend."
        />

        {status === 'open' && FORM_URL && (
          <>
            <div className="border border-[#DDE5F0] bg-white">
              <iframe
                src={toEmbedUrl(FORM_URL)}
                title="Special Dinner registration form"
                className="block w-full h-[1400px] sm:h-[1200px] border-0"
                loading="lazy"
              >
                Loading the form…
              </iframe>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-base font-semibold text-white bg-[#1F4E9C] hover:bg-[#163b78] transition-colors min-h-[48px]"
              >
                <span>Open the form in a new tab</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <p className="text-sm text-[#4B5563]">
                Form not showing properly on your phone? Use this button.
              </p>
            </div>
          </>
        )}

        {status === 'open' && !FORM_URL && (
          <div className="flex items-start gap-3 border border-[#DDE5F0] bg-[#F5F8FC] p-6">
            <Clock className="w-5 h-5 text-[#1F4E9C] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold text-[#1B2F4B]">The form link is coming soon</p>
              <p className="text-[15px] text-[#4B5563]">
                Please check back shortly. Registration closes on 29 October at 11:59 PM.
              </p>
            </div>
          </div>
        )}

        {status !== 'open' && (
          <div className="flex items-start gap-3 border border-[#DDE5F0] bg-[#F5F8FC] p-6">
            <CalendarX className="w-5 h-5 text-[#1F4E9C] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold text-[#1B2F4B]">{statusLabel}</p>
              <p className="text-[15px] text-[#4B5563]">
                Questions? Write to{' '}
                <a href="mailto:mess@sau.int" className="font-semibold text-[#1F4E9C] hover:underline">
                  mess@sau.int
                </a>{' '}
                or speak to the Mess Manager in Mess 1.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Closing */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <div className="border border-[#DDE5F0] border-l-[5px] border-l-[#1F4E9C] bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2F4B] mb-2">
              So, Campus Janta, are you ready?
            </h2>
            <p className="text-[15px] text-[#4B5563] leading-relaxed">
              Let’s make this dinner memorable while keeping fair practices and
              cooperation from everyone.
            </p>
          </div>

          <a
            href="mailto:mess@sau.int"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-[#1F4E9C] bg-[#F5F8FC] border border-[#1F4E9C] hover:bg-[#EBF2FC] transition-colors min-h-[48px] shrink-0"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>mess@sau.int</span>
          </a>
        </div>
      </section>
    </div>
  );
};
