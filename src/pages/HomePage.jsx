import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Utensils,
  Clock,
  CreditCard,
  CalendarOff,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  Mail,
  AlertCircle,
  FileText,
  Star,
} from 'lucide-react';
import { WEEKLY_MENU, NOTICES } from '../data/mockData';
import { DietBadge } from '../components/DietBadge';
import { HeroSlider } from '../components/HeroSlider';

const wrap = 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8';

// Special Dinner button in the hero. It is hidden automatically after the date below.
// To reuse it next month: change the label and the date.
const SPECIAL_DINNER = {
  label: 'Special Dinner · 31 Oct',
  to: '/special-dinner',
  showUntil: new Date(2026, 9, 31, 23, 59, 59),
};

// Hero slides. The file names must match the files in public/hero/ exactly.
// position moves the focus of the photo, e.g. 'center top', 'center 30%', 'left center'.
const heroSlides = [
  { src: '/hero/1.jpeg', position: 'center' },
  { src: '/hero/2.jpg', position: 'center' },
  
];

// Photo tiles on the card that overlaps the hero.
// Optional photos go in public/tiles/. If a photo is missing, the blue gradient shows instead.
const tiles = [
  { to: '/menu', icon: Utensils, title: 'Full Menu', sub: 'Mon to Sun', img: '/tiles/menu.jpg' },
  { to: '/timings-and-rates', icon: Clock, title: 'Timings & Rates', sub: 'Plans & timings', img: '/tiles/timings.jpg' },
  { to: '/mess-card', icon: CreditCard, title: 'Mess Card', sub: 'Testing & renewal', img: '/tiles/card.jpg' },
  { to: '/rules-and-faq', icon: FileText, title: 'Rules & Conduct', sub: 'Code & policies', img: '/tiles/rules.jpg' },
  { to: '/rules-and-faq#mess-off', icon: CalendarOff, title: 'Leave Adjustment', sub: '5+ days absence', img: '/tiles/leave.jpg' },
  { to: '/timings-and-rates#guest-meals', icon: UserPlus, title: 'Guest Meal', sub: 'Breakfast ₹50, others ₹70/₹80', img: '/tiles/guest.jpg' },
];

const SectionTitle = ({ eyebrow, title, intro }) => (
  <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
    {eyebrow && (
      <span className="block text-xs font-semibold uppercase tracking-widest text-[#1F4E9C] mb-2">
        {eyebrow}
      </span>
    )}
    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2F4B]">{title}</h2>
    <div className="mx-auto mt-3 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />
    {intro && <p className="mt-3 text-sm sm:text-base text-[#4B5563]">{intro}</p>}
  </div>
);

export const HomePage = () => {
  const todayMenu = useMemo(() => {
    return WEEKLY_MENU.find((d) => d.isToday) || WEEKLY_MENU[6];
  }, []);

  // Breakfast 8:30-10:30 AM (510-630), Lunch 12:30-2:30 PM (750-870), Dinner 7:30-9:30 PM (1170-1290)
  const currentMealStatus = useMemo(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (currentMinutes < 630) {
      return { activeId: 'breakfast', tag: currentMinutes >= 510 ? 'Now serving' : 'Next' };
    } else if (currentMinutes < 870) {
      return { activeId: 'lunch', tag: currentMinutes >= 750 ? 'Now serving' : 'Next' };
    } else if (currentMinutes < 1290) {
      return { activeId: 'dinner', tag: currentMinutes >= 1170 ? 'Now serving' : 'Next' };
    } else {
      return { activeId: 'breakfast', tag: 'Next' };
    }
  }, []);

  const showSpecialDinner = useMemo(() => new Date() <= SPECIAL_DINNER.showUntil, []);

  const latestNotices = NOTICES.slice(0, 3);

  return (
    <div>
      {/* 1. Hero slider */}
      <HeroSlider slides={heroSlides}>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight tracking-tight">
          SAU Mess
        </h1>

        <p className="mt-4 mb-9 text-xl sm:text-2xl lg:text-3xl font-serif text-white leading-snug">
          Fresh. Flavourful. Bruin Fueled.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#today"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-[#1F4E9C] bg-white hover:bg-[#F5F8FC] transition-colors min-h-[48px]"
          >
            See today's menu
          </a>

          {showSpecialDinner && (
            <Link
              to={SPECIAL_DINNER.to}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold text-white border-2 border-white hover:bg-white/10 transition-colors min-h-[48px]"
            >
              <Star className="w-4 h-4 text-[#C9A227]" aria-hidden="true" />
              <span>{SPECIAL_DINNER.label}</span>
            </Link>
          )}
        </div>
      </HeroSlider>

      {/* 2. Floating photo tiles overlapping the hero */}
      <section className={`${wrap} relative z-10 -mt-20 sm:-mt-24`} aria-label="Quick links">
        <div className="bg-white border border-[#DDE5F0] shadow-xl p-3 sm:p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {tiles.map(({ to, icon: Icon, title, sub, img }) => (
              <Link
                key={title}
                to={to}
                className="group relative block h-32 sm:h-40 overflow-hidden text-white"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(27,47,75,0.88), rgba(27,47,75,0.35)), url(${img}), linear-gradient(135deg, #1F4E9C, #1B2F4B)`,
                  }}
                  aria-hidden="true"
                />
                <div className="relative h-full flex flex-col items-center justify-center text-center px-2 gap-1.5">
                  <Icon className="w-6 h-6 text-[#C9A227]" aria-hidden="true" />
                  <span className="text-sm sm:text-[15px] font-semibold uppercase tracking-wide leading-tight">
                    {title}
                  </span>
                  <span className="text-[11px] sm:text-xs text-white/90">{sub}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Today's Menu */}
      <section id="today" className={`${wrap} scroll-mt-24 py-12 sm:py-16`}>
        <SectionTitle
          eyebrow="Today's Menu"
          title={`${todayMenu.day}, ${todayMenu.dateStr}`}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {todayMenu.meals.map((meal) => {
            const isHighlight = currentMealStatus.activeId === meal.id;

            return (
              <div
                key={meal.id}
                className={`flex flex-col border bg-white p-5 transition-all shadow-xs relative ${
                  isHighlight
                    ? 'border-[#1F4E9C] ring-2 ring-[#1F4E9C]/10 bg-gradient-to-b from-[#F5F8FC] to-white'
                    : 'border-[#DDE5F0] hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3 pb-3 border-b border-[#DDE5F0]">
                  <div>
                    <h3 className="text-xl font-bold text-[#1B2F4B]">{meal.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#1F4E9C] font-semibold mt-1">
                      <Clock className="w-3.5 h-3.5 text-[#1F4E9C]" aria-hidden="true" />
                      <span>{meal.time}</span>
                    </div>
                  </div>

                  {isHighlight && (
                    <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#1F4E9C] text-white">
                      {currentMealStatus.tag}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 flex-1">
                  {meal.dishes.map((dish, idx) => (
                    <li
                      key={idx}
                      className="flex items-start justify-between gap-2 text-sm leading-snug"
                    >
                      <span className="text-[#111827] font-medium">{dish.name}</span>
                      <DietBadge isVeg={dish.isVeg} size="sm" />
                    </li>
                  ))}
                </ul>

                {meal.id === 'dinner' && (
                  <div className="mt-4 pt-2.5 border-t border-[#DDE5F0] text-xs text-[#4B5563]">
                    Note: Ghee Roti (Optional) – Dinner
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 text-base font-semibold text-[#1F4E9C] bg-white border-2 border-[#1F4E9C] hover:bg-[#F5F8FC] transition-colors min-h-[48px]"
          >
            <span>See the full weekly menu</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 4. Latest Notices */}
      <section className="bg-[#F5F8FC] border-y border-[#DDE5F0] py-12 sm:py-16">
        <div className={wrap}>
          <SectionTitle eyebrow="Official Circulars" title="Latest Notices" />

          <div className="max-w-4xl mx-auto divide-y divide-[#DDE5F0] border border-[#DDE5F0] bg-white overflow-hidden shadow-xs">
            {latestNotices.map((notice) => (
              <div
                key={notice.id}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-[#F5F8FC] ${
                  notice.isImportant ? 'bg-[#FFF9EA]' : ''
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs text-[#4B5563] mb-1">
                    <span className="font-medium text-[#111827]">{notice.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-[#1F4E9C]">{notice.category}</span>
                    {notice.isImportant && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#7A4B00] font-bold">Important</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-[#111827] truncate">
                    {notice.title}
                  </h3>
                  <p className="text-sm text-[#4B5563] line-clamp-1 mt-0.5">
                    {notice.summary}
                  </p>
                </div>

                <Link
                  to={`/notices?open=${notice.id}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#1F4E9C] hover:text-[#163b78] hover:underline whitespace-nowrap self-start sm:self-center px-2 py-1"
                >
                  <span>Read more</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/notices"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 text-base font-semibold text-white bg-[#1F4E9C] hover:bg-[#163b78] transition-colors min-h-[48px]"
            >
              <span>View all notices</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. New Mess Card in 3 Steps
      <section className={`${wrap} py-12 sm:py-16`}>
        <div className="text-center mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[#FFF4D6] text-[#7A4B00] border border-[#F4DB9B]">
            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
            Currently in Testing
          </span>
        </div>
        <SectionTitle
          title="Your NEW Mess Card System in 3 Simple Steps"
          intro="The new optical verification system is currently in testing across the mess counters to streamline meal access and verify subscriptions."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              n: 1,
              title: 'Obtain Your Card',
              body: 'Fill in the mess registration Google Form, pay the monthly subscription fee to the Mess Manager in Mess 1, and collect your mess card.',
            },
            {
              n: 2,
              title: 'Scan at the Counter',
              body: (
                <>
                  <em>Currently in testing:</em> Present your mess card at the counter
                  reader prior to collecting your meal tray.
                </>
              ),
            },
            {
              n: 3,
              title: 'Monthly Renewal',
              body: 'Renew your subscription between the 1st and 2nd day of every month with the Mess Manager (a buffer period of 2 to 3 days is allowed).',
            },
          ].map((step) => (
            <div
              key={step.n}
              className="bg-white border border-[#DDE5F0] border-t-[3px] border-t-[#C9A227] p-6 shadow-xs"
            >
              <div className="w-10 h-10 bg-[#1F4E9C] text-white flex items-center justify-center font-bold text-base mb-4">
                {step.n}
              </div>
              <h3 className="text-lg font-bold text-[#1B2F4B] mb-2">{step.title}</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/mess-card"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 text-base font-semibold text-[#1F4E9C] bg-white border-2 border-[#1F4E9C] hover:bg-[#F5F8FC] transition-colors min-h-[48px]"
          >
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Learn all mess card rules and renewal details</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section> */}

      {/* 6. From the Committee */}
      <section className={`${wrap} pb-4`}>
        <div className="border border-[#DDE5F0] border-l-[5px] border-l-[#1F4E9C] bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F4E9C]">
              Student Welfare & Administration
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2F4B] mt-1 mb-2">
              From the Mess Committee
            </h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              All mess-related queries, concerns, and leave adjustment requests
              must be directed to <strong>mess@sau.int</strong> or to the Mess Manager in Mess 1.
            </p>

            <div className="flex items-center gap-2 text-sm font-medium text-[#111827] mt-3">
              <Mail className="w-4 h-4 text-[#1F4E9C]" aria-hidden="true" />
              <a href="mailto:mess@sau.int" className="text-[#1F4E9C] hover:underline">
                mess@sau.int
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              to="/committee"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-[#1F4E9C] hover:bg-[#163b78] transition-colors text-center min-h-[48px] flex items-center justify-center"
            >
              View Committee & Team
            </Link>

            <Link
              to="/notices"
              className="px-6 py-2.5 text-sm font-semibold text-[#1F4E9C] bg-[#F5F8FC] border border-[#1F4E9C] hover:bg-[#EBF2FC] transition-colors text-center min-h-[48px] flex items-center justify-center"
            >
              Committee Notifications
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};