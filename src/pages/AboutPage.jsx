import { Link } from 'react-router-dom';
import {
  MapPin,
  ChefHat,
  Sparkles,
  Wallet,
  Users,
  Mail,
  HardHat,
  Clock,
  CalendarX,
  ArrowRight,
} from 'lucide-react';
import { Photo } from '../components/Photo';
import { DietBadge } from '../components/DietBadge';
import { MESS_SPACES } from '../data/messSpaces';

const wrap = 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8';

const OPEN_COUNT = MESS_SPACES.filter((s) => s.status !== 'building').length;

const VALUES = [
  {
    icon: Sparkles,
    title: 'Hygiene first',
    text: 'Found a problem? Report it through the Complaint form and the committee will look into it.',
    link: { to: '/feedback', label: 'Go to Feedback & Requests' },
  },
  {
    icon: Wallet,
    title: 'Fair pricing',
    text: 'Fees and guest meal rates are published openly, so everyone knows what to expect.',
    link: { to: '/timings-and-rates', label: 'See Timings & Rates' },
  },
  {
    icon: Users,
    title: 'Student-run',
    text: 'Students on the Mess Committee help run the mess and listen to your feedback.',
    link: { to: '/committee', label: 'Meet the committee' },
  },
];

const SectionHeading = ({ id, title, intro }) => (
  <div id={id} className="scroll-mt-24 mb-8">
    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2F4B]">{title}</h2>
    <div className="mt-3 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />
    {intro && <p className="mt-3 text-sm sm:text-base text-[#4B5563] max-w-2xl">{intro}</p>}
  </div>
);

const StatusTag = ({ status }) => {
  if (status === 'temporary') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-[#FFF4D6] text-[#7A4B00] border border-[#F4DB9B]">
        <Clock className="w-3 h-3" aria-hidden="true" />
        Temporary
      </span>
    );
  }
  if (status === 'building') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-[#FFF4D6] text-[#7A4B00] border border-[#C9A227]">
        <HardHat className="w-3 h-3" aria-hidden="true" />
        Under construction
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-[#F5F8FC] text-[#1B2F4B] border border-[#DDE5F0]">
      Dining area
    </span>
  );
};

// Joins days for reading: "Saturday and Sunday" / "Monday, Tuesday and Friday"
const joinDays = (days) =>
  days.length <= 1
    ? days.join('')
    : `${days.slice(0, -1).join(', ')} and ${days[days.length - 1]}`;

export const AboutPage = () => {
  return (
    <div>
      {/* Page header */}
      <section className="bg-[#F5F8FC] border-b border-[#DDE5F0]">
        <div className={`${wrap} py-12 sm:py-16 text-center`}>
          <span className="block text-xs font-semibold uppercase tracking-widest text-[#1F4E9C] mb-2">
            Our story
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B2F4B]">
            About the SAU Mess
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />
          <p className="mt-4 text-lg sm:text-xl font-serif text-[#1B2F4B]">
            Good food. Fair prices. Run by students.
          </p>
        </div>
      </section>

      {/* Story + photo */}
      <section className={`${wrap} py-12 sm:py-16`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2F4B]">
              A mess run by students, for students
            </h2>
            <div className="mt-3 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />

            <div className="mt-5 space-y-4 text-[16px] text-[#111827] leading-relaxed">
              <p>
                The SAU Mess serves breakfast, lunch and dinner to the students of South
                Asian University. It is run by a Mess Committee made up of student
                members, working with the Mess Manager.
              </p>
              <p>
                The committee looks after the weekly menu, listens to feedback and
                complaints, and keeps the mess fair and clean for everyone. Today the
                mess serves across {OPEN_COUNT} dining areas on campus, with most of the
                food prepared in one central kitchen.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/committee"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-base font-semibold text-white bg-[#1F4E9C] hover:bg-[#163b78] transition-colors min-h-[48px]"
              >
                <span>Meet the committee</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center px-7 py-3 text-base font-semibold text-[#1F4E9C] bg-white border-2 border-[#1F4E9C] hover:bg-[#F5F8FC] transition-colors min-h-[48px]"
              >
                See the menu
              </Link>
            </div>
          </div>

          <Photo
            src="/about/dining-hall.jpg"
            alt="The SAU Mess dining hall"
            className="w-full aspect-[4/3] border border-[#DDE5F0]"
          />
        </div>
      </section>

      {/* Numbers at a glance */}
      <section className="bg-[#1F4E9C] border-y-[3px] border-[#C9A227] text-white">
        <div className={`${wrap} py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center`}>
          <div>
            <p className="text-4xl font-serif font-bold">{OPEN_COUNT}</p>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Dining areas
            </p>
          </div>
          <div>
            <p className="text-4xl font-serif font-bold">1</p>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Central kitchen
            </p>
          </div>
          <div>
            <p className="text-4xl font-serif font-bold">+1</p>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Library dining area coming
            </p>
          </div>
        </div>
      </section>

      {/* Mess spaces */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <SectionHeading
          id="spaces"
          title="Our mess spaces"
          intro="Mess 1 to Mess 4 are the dining areas where you eat. A fifth dining area, in the library, is being built."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MESS_SPACES.map((space) => (
            <article
              key={space.id}
              className={`flex flex-col bg-white border shadow-xs ${
                space.status === 'building'
                  ? 'border-[#C9A227] border-dashed'
                  : 'border-[#DDE5F0] border-t-[3px] border-t-[#C9A227]'
              }`}
            >
              <Photo
                src={space.photo}
                alt={`${space.name}, ${space.place}`}
                className="w-full aspect-[4/3] border-b border-[#DDE5F0]"
              />

              <div className="flex flex-col flex-1 p-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <StatusTag status={space.status} />
                  {space.diet === 'veg' && <DietBadge isVeg size="sm" />}
                  {space.diet === 'nonveg' && <DietBadge isVeg={false} size="sm" />}
                </div>

                <h3 className="text-xl font-bold text-[#1B2F4B]">{space.name}</h3>

                <p className="mt-1 flex items-start gap-2 text-sm font-semibold text-[#1F4E9C]">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{space.place}</span>
                </p>

                {space.diet === 'veg' && (
                  <p className="mt-1 text-sm font-semibold text-[#0A7A2F]">Fully vegetarian</p>
                )}
                {space.diet === 'nonveg' && (
                  <p className="mt-1 text-sm font-semibold text-[#B3261E]">fully non-vegetarian when non-vegetarian options are available</p>
                )}

                {space.note && (
                  <p className="mt-3 text-[15px] text-[#4B5563] leading-relaxed">{space.note}</p>
                )}

                {space.closedDays && space.closedDays.length > 0 && (
                  <p className="mt-4 flex items-start gap-2 border border-[#F4DB9B] bg-[#FFF4D6] px-3 py-2 text-sm font-semibold text-[#7A4B00]">
                    <CalendarX className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Closed on {joinDays(space.closedDays)}</span>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Central kitchen */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <Photo
            src="/about/central-kitchen.jpg"
            alt="The central kitchen"
            className="w-full aspect-[4/3] border border-[#DDE5F0] order-2 lg:order-1"
          />

          <div className="order-1 lg:order-2">
            <div className="w-12 h-12 bg-[#F5F8FC] border border-[#DDE5F0] text-[#1F4E9C] flex items-center justify-center mb-4">
              <ChefHat className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B2F4B]">
              The central kitchen
            </h2>
            <div className="mt-3 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />

            <p className="mt-5 text-[16px] text-[#111827] leading-relaxed">
              Most of our food is prepared in one central kitchen. From there it goes to
              the dining areas, so Mess 1 to Mess 4 are the places where you sit and eat.
            </p>

            <ul className="mt-5 space-y-3">
              <li className="flex items-start gap-3 text-[15px] text-[#111827] leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 bg-[#C9A227] shrink-0" aria-hidden="true" />
                <span>
                  <strong className="text-[#1B2F4B]">Prepared</strong> in the central kitchen.
                </span>
              </li>
              <li className="flex items-start gap-3 text-[15px] text-[#111827] leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 bg-[#C9A227] shrink-0" aria-hidden="true" />
                <span>
                  <strong className="text-[#1B2F4B]">Served</strong> in the dining areas, Mess 1 to Mess 4.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`${wrap} pt-12 sm:pt-16`}>
        <SectionHeading id="values" title="What we stand for" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map(({ icon: Icon, title, text, link }) => (
            <article
              key={title}
              className="flex flex-col bg-white border border-[#DDE5F0] border-t-[3px] border-t-[#C9A227] p-6 shadow-xs"
            >
              <div className="w-12 h-12 bg-[#F5F8FC] border border-[#DDE5F0] text-[#1F4E9C] flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#1B2F4B] mb-2">{title}</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed flex-1">{text}</p>
              <Link
                to={link.to}
                className="inline-block mt-4 text-sm font-semibold text-[#1F4E9C] hover:underline"
              >
                {link.label}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Reach the committee */}
      <section className={`${wrap} py-12 sm:py-16`}>
        <div className="border border-[#DDE5F0] border-l-[5px] border-l-[#1F4E9C] bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2F4B] mb-2">
              How to reach the committee
            </h2>
            <p className="text-[15px] text-[#4B5563] leading-relaxed">
              Write to{' '}
              <a href="mailto:mess@sau.int" className="font-semibold text-[#1F4E9C] hover:underline">
                mess@sau.int
              </a>
              , use one of our forms, or speak to the Mess Manager in Mess 1.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              to="/committee"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-[#1F4E9C] hover:bg-[#163b78] transition-colors text-center min-h-[48px] flex items-center justify-center"
            >
              Committee page
            </Link>
            <Link
              to="/feedback"
              className="px-6 py-2.5 text-sm font-semibold text-[#1F4E9C] bg-[#F5F8FC] border border-[#1F4E9C] hover:bg-[#EBF2FC] transition-colors text-center min-h-[48px] flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Forms and feedback</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};