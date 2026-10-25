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
  Calendar,
  Mail,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { WEEKLY_MENU, NOTICES } from '../data/mockData';
import { DietBadge } from '../components/DietBadge';

const quickLinks = [
  { to: '/timings-and-rates', icon: Clock, title: 'Timings & Rates', sub: 'Plans & timings' },
  { to: '/mess-card', icon: CreditCard, title: 'Mess Card', sub: 'Testing & renewal' },
  { to: '/rules-and-faq', icon: FileText, title: 'Rules & Conduct', sub: 'Code & policies' },
  { to: '/feedback?form=mess_off', icon: CalendarOff, title: 'Leave Adjustment', sub: '5+ days absence' },
  { to: '/feedback?form=guest_meal', icon: UserPlus, title: 'Guest Meal', sub: '₹50/₹70/₹80 rates' },
  { to: '/menu', icon: Utensils, title: 'Full Menu', sub: 'Mon to Sun table' },
];

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

  const latestNotices = NOTICES.slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F8FC] to-white border-b border-[#DDE5F0] pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="inline-block text-xs uppercase tracking-widest text-[#1F4E9C] font-semibold mb-2">
              South Asian University · Student Mess Management
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B2F4B] leading-tight tracking-tight mb-3">
              Good food. Fair prices. Run by students.
            </h1>

            <p className="text-base sm:text-lg text-[#4B5563] mb-6 font-normal leading-relaxed">
              Welcome to the SAU Mess. Check today’s official menu, dining hours,
              subscription renewal guidelines, and download circulars.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center px-6 py-3 rounded-[10px] text-base font-semibold text-white bg-[#1F4E9C] hover:bg-[#163b78] shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A227] min-h-[48px]"
              >
                <Utensils className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>See today's menu</span>
              </Link>

              <Link
                to="/feedback"
                className="inline-flex items-center justify-center px-6 py-3 rounded-[10px] text-base font-semibold text-[#1F4E9C] bg-white border border-[#1F4E9C] hover:bg-[#F5F8FC] transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A227] min-h-[48px]"
              >
                <span>Send feedback</span>
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Today's Menu */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-[#DDE5F0] gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1F4E9C] mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#1F4E9C]" aria-hidden="true" />
              <span>Today's Menu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2F4B]">
              {todayMenu.day}, {todayMenu.dateStr}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/menu"
              className="text-sm font-semibold text-[#1F4E9C] hover:underline inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[#C9A227] py-1"
            >
              <span>Full weekly menu</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {todayMenu.meals.map((meal) => {
            const isHighlight = currentMealStatus.activeId === meal.id;

            return (
              <div
                key={meal.id}
                className={`flex flex-col rounded-xl border bg-white p-5 transition-all shadow-xs relative ${
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
                    <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-[#1F4E9C] text-white">
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
      </section>

      {/* 3. Quick Links */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2F4B] mb-5">
          Quick Links
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map(({ to, icon: Icon, title, sub }) => (
            <Link
              key={title}
              to={to}
              className="flex flex-col items-center text-center p-5 rounded-xl border border-[#DDE5F0] bg-white hover:bg-[#F5F8FC] hover:border-[#1F4E9C] transition-all focus-visible:outline-2 focus-visible:outline-[#C9A227] group min-h-[120px]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F5F8FC] group-hover:bg-[#EBF2FC] text-[#1F4E9C] flex items-center justify-center mb-3 transition-colors">
                <Icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold text-[#111827] group-hover:text-[#1F4E9C]">
                {title}
              </span>
              <span className="text-xs text-[#4B5563] mt-0.5">{sub}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Latest Notices */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#DDE5F0]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F4E9C]">
              Official Circulars
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2F4B]">
              Latest Notices
            </h2>
          </div>
          <Link
            to="/notices"
            className="text-sm font-semibold text-[#1F4E9C] hover:underline inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[#C9A227]"
          >
            <span>View all notices</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="divide-y divide-[#DDE5F0] rounded-xl border border-[#DDE5F0] bg-white overflow-hidden shadow-xs">
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
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#1F4E9C] hover:text-[#163b78] hover:underline whitespace-nowrap self-start sm:self-center focus-visible:outline-2 focus-visible:outline-[#C9A227] px-2 py-1 rounded"
              >
                <span>Read more</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. New Mess Card in 3 Steps */}
      <section className="bg-[#F5F8FC] border-y border-[#DDE5F0] py-12 sm:py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF4D6] text-[#7A4B00] border border-[#F4DB9B] mb-2">
              <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
              Currently in Testing
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2F4B] mt-1 mb-2">
              Your NEW Mess Card System in 3 Simple Steps
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563]">
              The new optical verification system is currently in testing across
              the mess counters to streamline meal access and verify subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-[#DDE5F0] p-6 shadow-xs relative">
              <div className="w-10 h-10 rounded-full bg-[#1F4E9C] text-white flex items-center justify-center font-bold text-base mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-[#1B2F4B] mb-2">Obtain Your Card</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Fill in the mess registration Google Form, pay the monthly subscription
                fee to the Mess Manager in Mess 1, and collect your mess card.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#DDE5F0] p-6 shadow-xs relative">
              <div className="w-10 h-10 rounded-full bg-[#1F4E9C] text-white flex items-center justify-center font-bold text-base mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-[#1B2F4B] mb-2">Scan at the Counter</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                <em>Currently in testing:</em> Present your mess card at the counter
                reader prior to collecting your meal tray.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#DDE5F0] p-6 shadow-xs relative">
              <div className="w-10 h-10 rounded-full bg-[#1F4E9C] text-white flex items-center justify-center font-bold text-base mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-[#1B2F4B] mb-2">Monthly Renewal</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Renew your subscription between the 1st and 2nd day of every month with
                the Mess Manager (a buffer period of 2 to 3 days is allowed).
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/mess-card"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F4E9C] hover:underline focus-visible:outline-2 focus-visible:outline-[#C9A227]"
            >
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>Learn all mess card rules and renewal details</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. From the Committee */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#DDE5F0] bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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
              className="px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-[#1F4E9C] hover:bg-[#163b78] transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A227] text-center min-h-[48px] flex items-center justify-center"
            >
              View Committee & Team
            </Link>

            <Link
              to="/notices"
              className="px-5 py-2.5 rounded-[10px] text-sm font-semibold text-[#1F4E9C] bg-[#F5F8FC] border border-[#DDE5F0] hover:bg-[#EBF2FC] transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A227] text-center min-h-[48px] flex items-center justify-center"
            >
              Committee Notifications
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};