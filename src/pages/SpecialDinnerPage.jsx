import { useState } from 'react';
import {
  Ghost,
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
const FORM_URL = https://docs.google.com/forms/d/e/1FAIpQLScffB0p8-FiQTyQxSmiqMqLLpek4MhCCHboDY2Ryvpa_c3Q7w/viewform?usp=dialog;

// Dates (year, month 0-11, day, hour, minute). Month 9 = October.
const FORM_DEADLINE = new Date(2026, 9, 29, 23, 59, 59); // 29 Oct, 11:59 PM
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
    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1B3D]">{title}</h2>
    <div className="mt-3 h-[3px] w-14 bg-[#E8590C]" aria-hidden="true" />
    {intro && <p className="mt-3 text-sm sm:text-base text-[#4B5563] max-w-2xl">{intro}</p>}
  </div>
);

export const SpecialDinnerPage = () => {
  const [now] = useState(() => new Date());

  const status =
    now <= FORM_DEADLINE ? 'open' : now <= DINNER_END ? 'closed' : 'ended';

  const statusLabel = {
    open: 'Registration open until 29 October, 11:59 PM',
    closed: 'Registration is closed',
    ended: 'This event has ended',
  }[status];

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(42,27,61,0.80), rgba(42,27,61,0.92)), url(/special/halloween.jpg), linear-gradient(135deg, #2A1B3D 0%, #1B2F4B 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <span
          className="absolute -left-2 top-4 text-6xl sm:text-8xl opacity-20 select-none"
          aria-hidden="true"
        >
          🎃
        </span>
        <span
          className="absolute -right-2 bottom-2 text-6xl sm:text-8xl opacity-20 select-none"
          aria-hidden="true"
        >
          👻
        </span>

        <div className={`${wrap} relative py-14 sm:py-20 text-center`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest bg-[#E8590C] text-white mb-5">
            <Ghost className="w-4 h-4" aria-hidden="true" />
            Monthly Special Dinner
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
            Halloween Special Dinner
          </h1>

          <p className="mt-4 text-lg sm:text-2xl font-serif text-white/95">
            Saturday, 31 October 2026
          </p>

          <div className="mx-auto my-6 h-[3px] w-20 bg-[#E8590C]" aria-hidden="true" />

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/90 leading-relaxed">
            Dear Campus Janta! The spookiest night of the year is here, and so is our
            monthly Special Dinner. Halloween meets our favourite campus tradition.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {status === 'open' && (
              <a
                href="#register"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-[#E8590C] hover:bg-[#C2410C] border-2 border-[#E8590C] hover:border-[#C2410C] transition-colors min-h-[48px]"
              >
                Fill in the form
              </a>
            )}
            <a
              href="#rules"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white border-2 border-white hover:bg-white/10 transition-colors min-h-[48px]"
            >
              Read the instructions
            </a>
          </div>

          <p className="mt-6 text-sm font-semibold text-white" role="status">
            {statusLabel}
          </p>
        </div>
      </section>

      {/* Key dates */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <SectionHeading
          id="dates"
          title="Important dates"
          intro="Please read the instructions below carefully before you fill in the form."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white border border-[#DDE5F0] border-t-[3px] border-t-[#E8590C] p-6 shadow-xs">
            <div className="w-12 h-12 bg-[#FFF1E8] border border-[#F7D4BC] text-[#C2410C] flex items-center justify-center mb-4">
              <CalendarClock className="w-6 h-6" aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C2410C] mb-1">
              29 October
            </p>
            <h3 className="text-lg font-bold text-[#2A1B3D] mb-1">Form closes</h3>
            <p className="text-sm text-[#4B5563]">
              Last date to submit the Google Form: 29 October, 11:59 PM.
            </p>
          </article>

          <article className="bg-white border border-[#DDE5F0] border-t-[3px] border-t-[#E8590C] p-6 shadow-xs">
            <div className="w-12 h-12 bg-[#FFF1E8] border border-[#F7D4BC] text-[#C2410C] flex items-center justify-center mb-4">
              <CalendarX className="w-6 h-6" aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C2410C] mb-1">
              30 October
            </p>
            <h3 className="text-lg font-bold text-[#2A1B3D] mb-1">Last day to cancel</h3>
            <p className="text-sm text-[#4B5563]">
              Changed your plans? Tell the Mess Manager or email mess@sau.int by this date.
            </p>
          </article>

          <article className="bg-white border border-[#DDE5F0] border-t-[3px] border-t-[#E8590C] p-6 shadow-xs">
            <div className="w-12 h-12 bg-[#FFF1E8] border border-[#F7D4BC] text-[#C2410C] flex items-center justify-center mb-4">
              <Utensils className="w-6 h-6" aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C2410C] mb-1">
              31 October
            </p>
            <h3 className="text-lg font-bold text-[#2A1B3D] mb-1">Dinner and payment</h3>
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
              <tr className="bg-[#2A1B3D] text-white">
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

          <div className="border border-[#DDE5F0] border-t-[3px] border-t-[#E8590C] bg-white p-5 sm:p-6 shadow-xs">
            <h3 className="text-lg font-bold text-[#2A1B3D] mb-2">Changed your plans?</h3>
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
                title="Halloween Special Dinner registration form"
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
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-base font-semibold text-white bg-[#E8590C] hover:bg-[#C2410C] transition-colors min-h-[48px]"
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
        <div className="bg-[#2A1B3D] text-white border-b-[3px] border-[#E8590C] p-6 sm:p-10 text-center">
          <p className="text-3xl mb-3" aria-hidden="true">🎃 👻 🎃</p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
            So, Campus Janta, are you ready?
          </h2>
          <p className="max-w-2xl mx-auto text-base text-white/90 leading-relaxed">
            Spooky season, special dinner and campus vibes. Let’s make this Halloween dinner
            memorable while keeping fair practices and cooperation from everyone.
          </p>
          <a
            href="mailto:mess@sau.int"
            className="mt-6 inline-flex items-center justify-center gap-2 px-7 py-3 text-base font-semibold text-white border-2 border-white hover:bg-white/10 transition-colors min-h-[48px]"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>mess@sau.int</span>
          </a>
        </div>
      </section>
    </div>
  );
};