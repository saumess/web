import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Printer, CalendarDays, Table, Sparkles, Star, ArrowRight } from 'lucide-react';
import { WEEKLY_MENU } from '../data/mockData';
import { DietBadge } from '../components/DietBadge';
import { SpecialDinnerTag, SpecialDinnerNote } from '../components/SpecialDinnerBits';

const wrap = 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8';

// Items that change every other week get an "Alternates weekly" tag
const ALT = /^(Idli with Sambar|Vada with Sambar|Aloo Chokha|Aloo Bhujia)$/;

// Turns "or Sri Lankan Chicken" into { isOr: true, name: "Sri Lankan Chicken" }
// and "Chinese Night: Manchurian" into { name: "Manchurian" }
const parseDish = (d) => {
  let name = d.name;
  let isOr = false;
  if (name.startsWith('or ')) {
    isOr = true;
    name = name.slice(3);
  }
  name = name.replace(/^Chinese Night: /, '');
  return { isVeg: d.isVeg, name, isOr, alternates: ALT.test(name) };
};

// Small marker for the weekly table. Veg = dot, Non-Veg = triangle,
// so it still reads correctly in black-and-white print.
const Mark = ({ isVeg }) => (
  <span
    className={`inline-flex items-center justify-center w-3.5 h-3.5 shrink-0 border-[1.5px] bg-white mt-[3px] print:border-black ${
      isVeg ? 'border-[#0A7A2F]' : 'border-[#B3261E]'
    }`}
  >
    <span
      className={`w-2 h-2 print:bg-black ${
        isVeg
          ? 'rounded-full bg-[#0A7A2F]'
          : 'bg-[#B3261E] [clip-path:polygon(50%_0,100%_100%,0_100%)]'
      }`}
    />
    <span className="sr-only">{isVeg ? 'Veg' : 'Non-Veg'}</span>
  </span>
);

export const MenuPage = () => {
  const todayIndex = Math.max(0, WEEKLY_MENU.findIndex((d) => d.isToday));
  const [selected, setSelected] = useState(todayIndex);
  const [view, setView] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
      ? 'week'
      : 'day'
  );

  const weekRange = `${WEEKLY_MENU[0].dateStr} to ${WEEKLY_MENU[6].dateStr} ${new Date().getFullYear()}`;
  const day = WEEKLY_MENU[selected];

  // Special menu (for example Chinese Night) on the chosen day
  const specialMeal = day.meals.find((m) =>
    m.dishes.some((d) => d.name.startsWith('Chinese Night'))
  );

  // Monthly Special Dinner on the chosen day
  const specialDinner = day.meals.find((m) => m.special);

  return (
    <div>
      {/* Page header */}
      <section className="bg-[#F5F8FC] border-b border-[#DDE5F0]">
        <div className={`${wrap} py-12 sm:py-16 text-center`}>
          <span className="block text-xs font-semibold uppercase tracking-widest text-[#1F4E9C] mb-2">
            Week of {weekRange}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B2F4B]">
            Weekly Menu
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />
          <p className="mt-4 text-sm text-[#4B5563]">Last updated: November 2026</p>
        </div>
      </section>

      <section className={`${wrap} py-10 sm:py-14`}>
        {/* View switch and print: desktop only */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <div className="inline-flex border border-[#1F4E9C]" role="group" aria-label="Menu view">
            <button
              type="button"
              onClick={() => setView('day')}
              aria-pressed={view === 'day'}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold min-h-[44px] transition-colors ${
                view === 'day' ? 'bg-[#1F4E9C] text-white' : 'bg-white text-[#1F4E9C] hover:bg-[#F5F8FC]'
              }`}
            >
              <CalendarDays className="w-4 h-4" aria-hidden="true" />
              Day view
            </button>
            <button
              type="button"
              onClick={() => setView('week')}
              aria-pressed={view === 'week'}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold min-h-[44px] transition-colors ${
                view === 'week' ? 'bg-[#1F4E9C] text-white' : 'bg-white text-[#1F4E9C] hover:bg-[#F5F8FC]'
              }`}
            >
              <Table className="w-4 h-4" aria-hidden="true" />
              Week table
            </button>
          </div>

          {view === 'week' && (
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1F4E9C] hover:bg-[#163b78] min-h-[44px] transition-colors"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              Print this week
            </button>
          )}
        </div>

        {/* DAY VIEW */}
        <div className={view === 'week' ? 'lg:hidden' : ''}>
          {/* Day selector: swipeable on mobile */}
          <div
            role="group"
            aria-label="Choose a day"
            className="-mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto sm:overflow-visible sm:flex-wrap snap-x pb-2 mb-8"
          >
            {WEEKLY_MENU.map((d, i) => {
              const active = i === selected;
              const hasSpecial = d.meals.some((m) => m.special);
              return (
                <button
                  key={d.day}
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-pressed={active}
                  className={`snap-start shrink-0 min-w-[88px] min-h-[68px] px-3 py-2 border text-center transition-colors ${
                    active
                      ? 'bg-[#1F4E9C] border-[#1F4E9C] text-white'
                      : 'bg-white border-[#DDE5F0] text-[#1B2F4B] hover:border-[#1F4E9C]'
                  }`}
                >
                  <span className="block text-sm font-bold">{d.day.slice(0, 3)}</span>
                  <span className="block text-xs">{d.dateStr}</span>
                  {d.isToday && (
                    <span
                      className={`block text-[10px] font-bold uppercase tracking-wider ${
                        active ? 'text-white' : 'text-[#1F4E9C]'
                      }`}
                    >
                      Today
                    </span>
                  )}
                  {hasSpecial && !d.isToday && (
                    <span
                      className={`inline-flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        active ? 'text-white' : 'text-[#7A4B00]'
                      }`}
                    >
                      <Star className="w-2.5 h-2.5" aria-hidden="true" />
                      Special
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2F4B] mb-6">
            {day.day}, {day.dateStr}
          </h2>

          {specialDinner && (
            <div className="flex flex-wrap items-center justify-between gap-3 border border-[#C9A227] border-l-[5px] bg-white px-5 py-4 mb-6">
              <p className="flex items-center gap-3 text-sm sm:text-base font-semibold text-[#1B2F4B]">
                <Star className="w-5 h-5 text-[#7A4B00] shrink-0" aria-hidden="true" />
                <span>Special Dinner on {day.dateStr}</span>
              </p>
              <Link
                to="/special-dinner"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#1F4E9C] hover:underline"
              >
                <span>Details, pricing and registration</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          )}

          {specialMeal && (
            <div className="flex items-center gap-3 border border-[#C9A227] border-l-[5px] bg-white px-5 py-4 mb-6">
              <Sparkles className="w-5 h-5 text-[#7A4B00] shrink-0" aria-hidden="true" />
              <p className="text-sm sm:text-base font-semibold text-[#1B2F4B]">
                Special menu: Chinese Night at {specialMeal.name}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {day.meals.map((meal) => (
              <article key={meal.id} className="flex flex-col border border-[#DDE5F0] bg-white p-5 shadow-xs">
                <div className="mb-3 pb-3 border-b border-[#DDE5F0]">
                  <h3 className="text-xl font-bold text-[#1B2F4B]">{meal.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#1F4E9C] font-semibold mt-1">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{meal.time}</span>
                  </div>
                  {meal.special && (
                    <div className="mt-2">
                      <SpecialDinnerTag />
                    </div>
                  )}
                </div>

                <ul className="space-y-3 flex-1">
                  {meal.dishes.map((raw, idx) => {
                    const dish = parseDish(raw);
                    return (
                      <li
                        key={idx}
                        className={`flex items-start justify-between gap-2 text-sm leading-snug ${
                          dish.isOr ? 'pl-3 border-l-2 border-[#DDE5F0]' : ''
                        }`}
                      >
                        <span className="text-[#111827] font-medium">
                          {dish.isOr && (
                            <span className="text-xs italic text-[#4B5563] mr-1.5">or</span>
                          )}
                          {dish.name}
                          {dish.alternates && (
                            <span className="ml-2 inline-block px-2 py-0.5 text-[11px] font-semibold text-[#1B2F4B] bg-[#F5F8FC] border border-[#DDE5F0] align-middle">
                              Alternates weekly
                            </span>
                          )}
                        </span>
                        <DietBadge isVeg={dish.isVeg} size="sm" />
                      </li>
                    );
                  })}
                </ul>

                {meal.special && <SpecialDinnerNote empty={meal.dishes.length === 0} />}

                {meal.id === 'dinner' && (
                  <div className="mt-4 pt-2.5 border-t border-[#DDE5F0] text-xs text-[#4B5563]">
                    Ghee Roti (optional) at dinner
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* WEEK TABLE: desktop view, and what gets printed */}
        <div className={`print-area ${view === 'week' ? 'hidden lg:block' : 'hidden'} print:block`}>
          <h2 className="hidden print:block text-xl font-bold text-black mb-3">
            SAU Mess weekly menu · {weekRange}
          </h2>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#4B5563] print:text-black mb-4">
            <span className="inline-flex items-center gap-2">
              <Mark isVeg /> Veg
            </span>
            <span className="inline-flex items-center gap-2">
              <Mark isVeg={false} /> Non-Veg
            </span>
            <span className="italic">“or” means you choose one</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px] print:text-[11px] print:text-black">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="border border-[#DDE5F0] print:border-black bg-[#F5F8FC] print:bg-white p-3 text-left w-28"
                  >
                    <span className="sr-only">Meal</span>
                  </th>
                  {WEEKLY_MENU.map((d) => (
                    <th
                      key={d.day}
                      scope="col"
                      className={`border border-[#DDE5F0] print:border-black p-3 text-left align-bottom print:bg-white print:text-black ${
                        d.isToday ? 'bg-[#1F4E9C] text-white' : 'bg-[#F5F8FC] text-[#1B2F4B]'
                      }`}
                    >
                      <span className="block text-sm font-bold">{d.day}</span>
                      <span className="block text-xs font-normal">
                        {d.dateStr}
                        {d.isToday ? ' · Today' : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WEEKLY_MENU[0].meals.map((mealRow, mealIdx) => (
                  <tr key={mealRow.id}>
                    <th
                      scope="row"
                      className="border border-[#DDE5F0] print:border-black bg-[#F5F8FC] print:bg-white p-3 text-left align-top"
                    >
                      <span className="block text-sm font-bold text-[#1B2F4B] print:text-black">
                        {mealRow.name}
                      </span>
                      <span className="block text-xs font-normal text-[#4B5563] print:text-black">
                        {mealRow.time}
                      </span>
                    </th>

                    {WEEKLY_MENU.map((d) => {
                      const cellMeal = d.meals[mealIdx];
                      return (
                        <td
                          key={d.day}
                          className="border border-[#DDE5F0] print:border-black p-3 align-top"
                        >
                          {cellMeal.special && (
                            <p className="mb-1.5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#7A4B00] print:text-black">
                              <Star className="w-3 h-3" aria-hidden="true" />
                              Special Dinner
                            </p>
                          )}
                          {cellMeal.special && cellMeal.dishes.length === 0 && (
                            <p className="text-[#4B5563] print:text-black">Menu to be announced</p>
                          )}
                          <ul className="space-y-1.5">
                            {cellMeal.dishes.map((raw, idx) => {
                              const dish = parseDish(raw);
                              return (
                                <li key={idx} className="flex items-start gap-1.5 leading-snug">
                                  <Mark isVeg={dish.isVeg} />
                                  <span>
                                    {dish.isOr && <span className="italic text-[#4B5563] print:text-black mr-1">or</span>}
                                    {dish.name}
                                    {dish.alternates && (
                                      <span className="block text-[11px] text-[#4B5563] print:text-black">
                                        (alternates weekly)
                                      </span>
                                    )}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="hidden print:block mt-3 text-[11px] text-black">
            Approved by the Mess Committee. Ghee Roti is optional at dinner.
          </p>
        </div>

        <p className="mt-10 text-sm text-[#4B5563] border-t border-[#DDE5F0] pt-5">
          Approved by the Mess Committee. Ghee Roti is optional at dinner.
        </p>
      </section>
    </div>
  );
};