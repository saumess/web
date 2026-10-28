import { Link } from 'react-router-dom';
import { Coffee, Sun, Moon, Clock, AlertCircle, Wallet, MapPin, CreditCard } from 'lucide-react';
import {
  MEAL_TIMINGS,
  WEEKEND_TIMINGS,
  MONTHLY_FEE,
  MONTHLY_COVERS,
  PAYMENT_DUE,
  GUEST_RATES,
  PAY_STEPS,
  OFFICE_HOURS,
  PAYMENT_MODES,
  GRACE_PERIOD,
} from '../data/timingsData';

const wrap = 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8';
const TBA = 'To be announced';

const mealIcons = { breakfast: Coffee, lunch: Sun, dinner: Moon };

const SectionHeading = ({ id, title, intro }) => (
  <div id={id} className="scroll-mt-24 mb-8">
    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2F4B]">{title}</h2>
    <div className="mt-3 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />
    {intro && <p className="mt-3 text-sm sm:text-base text-[#4B5563] max-w-2xl">{intro}</p>}
  </div>
);

export const TimingsRatesPage = () => {
  return (
    <div>
      {/* Page header */}
      <section className="bg-[#F5F8FC] border-b border-[#DDE5F0]">
        <div className={`${wrap} py-12 sm:py-16 text-center`}>
          <span className="block text-xs font-semibold uppercase tracking-widest text-[#1F4E9C] mb-2">
            Plan your month
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B2F4B]">
            Timings & Rates
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />
        </div>
      </section>

      {/* Meal timings */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <SectionHeading id="timings" title="Meal timings" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEAL_TIMINGS.map((meal) => {
            const Icon = mealIcons[meal.id] || Clock;
            return (
              <article
                key={meal.id}
                className="bg-white border border-[#DDE5F0] border-t-[3px] border-t-[#C9A227] p-6 shadow-xs"
              >
                <div className="w-12 h-12 bg-[#F5F8FC] border border-[#DDE5F0] text-[#1F4E9C] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-[#1B2F4B] mb-1">{meal.name}</h3>
                <p className="text-lg font-semibold text-[#1F4E9C]">
                  {meal.start} to {meal.end}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex items-start gap-3 border border-[#DDE5F0] bg-[#F5F8FC] px-5 py-4">
          <Clock className="w-5 h-5 text-[#1F4E9C] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold text-[#1B2F4B]">Weekends and holidays</p>
            <p className="text-[15px] text-[#4B5563]">{WEEKEND_TIMINGS}</p>
          </div>
        </div>
      </section>

      {/* Monthly charges */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <SectionHeading id="fees" title="Monthly charges" />

        <div className="bg-[#1F4E9C] text-white border-b-[3px] border-[#C9A227] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/85 mb-1">
              Monthly mess fee
            </p>
            {MONTHLY_FEE ? (
              <p className="text-4xl sm:text-5xl font-serif font-bold text-white">{MONTHLY_FEE}</p>
            ) : (
              <p className="text-2xl sm:text-3xl font-serif font-bold text-white">{TBA}</p>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/85 mb-1">
              What it covers
            </p>
            <p className="text-base text-white">{MONTHLY_COVERS}</p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/85 mb-1">
              Payment due
            </p>
            <p className="text-base text-white">{PAYMENT_DUE}</p>
          </div>
        </div>
      </section>

      {/* Guest meals */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <SectionHeading
          id="guest-meals"
          title="Guest meals"
          intro="Guests are welcome. Rates are per meal."
        />

        <div className="max-w-3xl overflow-x-auto border border-[#DDE5F0]">
          <table className="w-full min-w-[460px] border-collapse text-left text-[15px]">
            <caption className="sr-only">Guest meal rates</caption>
            <thead>
              <tr className="bg-[#1F4E9C] text-white">
                <th scope="col" className="p-4 font-semibold">Meal</th>
                <th scope="col" className="p-4 font-semibold">Guest rate</th>
                <th scope="col" className="p-4 font-semibold">Depends on</th>
              </tr>
            </thead>
            <tbody>
              {GUEST_RATES.map((row) => (
                <tr key={row.meal} className="bg-white border-t border-[#DDE5F0]">
                  <th scope="row" className="p-4 font-semibold text-[#1B2F4B]">{row.meal}</th>
                  <td className="p-4 text-[#111827] font-semibold whitespace-nowrap">{row.rate}</td>
                  <td className="p-4 text-[#4B5563]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-[#4B5563]">
          To arrange a guest meal, contact the Mess Manager in Mess 1.
        </p>
      </section>

      {/* How to pay */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <SectionHeading id="how-to-pay" title="How to pay" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAY_STEPS.map((step, i) => (
            <div
              key={step.title}
              className="bg-white border border-[#DDE5F0] border-t-[3px] border-t-[#C9A227] p-6 shadow-xs"
            >
              <div className="w-10 h-10 bg-[#1F4E9C] text-white flex items-center justify-center font-bold text-base mb-4">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-[#1B2F4B] mb-2">{step.title}</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">{step.text}</p>
              {step.link && (
                <Link
                  to={step.link.to}
                  className="inline-block mt-3 text-sm font-semibold text-[#1F4E9C] hover:underline"
                >
                  {step.link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3 border border-[#DDE5F0] bg-white px-5 py-4">
            <MapPin className="w-5 h-5 text-[#1F4E9C] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold text-[#1B2F4B]">Office hours</p>
              <p className="text-[15px] text-[#4B5563]">
                {OFFICE_HOURS || TBA}
                <span className="block text-sm mt-0.5">Mess Manager, Mess 1</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 border border-[#DDE5F0] bg-white px-5 py-4">
            <CreditCard className="w-5 h-5 text-[#1F4E9C] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold text-[#1B2F4B]">Accepted payment modes</p>
              <p className="text-[15px] text-[#4B5563]">{PAYMENT_MODES || TBA}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grace period */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <div
          id="grace"
          role="note"
          className="scroll-mt-24 flex items-start gap-4 border border-[#F4DB9B] border-l-[5px] border-l-[#C9A227] bg-[#FFF4D6] text-[#7A4B00] p-5 sm:p-6"
        >
          <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-bold text-[#7A4B00] mb-1">
              Grace period: {GRACE_PERIOD.length}
            </h2>
            <p className="text-[15px] leading-relaxed">{GRACE_PERIOD.text}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/rules-and-faq"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 text-base font-semibold text-[#1F4E9C] bg-white border-2 border-[#1F4E9C] hover:bg-[#F5F8FC] transition-colors min-h-[48px]"
          >
            <Wallet className="w-4 h-4" aria-hidden="true" />
            <span>Read the rules and FAQ</span>
          </Link>
        </div>
      </section>
    </div>
  );
};