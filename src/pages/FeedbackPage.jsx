import { useSearchParams } from 'react-router-dom';
import {
  MessageSquare,
  Lightbulb,
  MessageSquareWarning,
  UserPlus,
  ExternalLink,
  Clock,
} from 'lucide-react';

const wrap = 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8';

// To switch on a form later, replace null with its Google Form link.
const forms = {
  subscription: {
    icon: UserPlus,
    title: 'New Mess Subscription',
    desc: 'Register for the mess for the first time.',
    url: null,
  },
  menu_suggestion: {
    icon: Lightbulb,
    title: 'Menu Suggestion',
    desc: 'Suggest a dish or a change to the weekly menu.',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScL10SsWfdNIjdAuOwMExL0eCCtW3fJ94rwYdh9VAlkle5Qaw/viewform?usp=dialog',
  },
  feedback: {
    icon: MessageSquare,
    title: 'Mess Feedback',
    desc: 'Tell us how the food and service are going.',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSeokTteqJkefm2O-T4bEvciWyXkeAwgYWDkjJE0H1joOOVpmQ/viewform?usp=dialog',
  },
  complaint: {
    icon: MessageSquareWarning,
    title: 'Complaint',
    desc: 'Report a problem with the mess, the canteen or the tea shop.',
    url: null,
  },
};

const groups = [
  { title: 'Share your thoughts', ids: ['feedback', 'menu_suggestion'] },
  { title: 'Report a problem', ids: ['complaint'] },
  { title: 'Card and registration', ids: ['subscription'] },
];

const FormCard = ({ form, highlighted }) => {
  const { icon: Icon, title, desc, url } = form;

  return (
    <div
      className={`flex flex-col bg-white border p-6 shadow-xs transition-colors ${
        highlighted
          ? 'border-[#1F4E9C] ring-2 ring-[#1F4E9C]/20'
          : 'border-[#DDE5F0] hover:border-[#1F4E9C]'
      }`}
    >
      <div className="w-12 h-12 bg-[#F5F8FC] border border-[#DDE5F0] text-[#1F4E9C] flex items-center justify-center mb-4">
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>

      <h3 className="text-lg font-bold text-[#1B2F4B] mb-1.5">{title}</h3>
      <p className="text-sm text-[#4B5563] leading-relaxed flex-1 mb-5">{desc}</p>

      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white bg-[#1F4E9C] hover:bg-[#163b78] transition-colors min-h-[48px]"
        >
          <span>Open form</span>
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : (
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-[#4B5563] bg-[#F5F8FC] border border-[#DDE5F0] cursor-not-allowed min-h-[48px]"
        >
          <Clock className="w-4 h-4" aria-hidden="true" />
          <span>Link coming soon</span>
        </button>
      )}
    </div>
  );
};

export const FeedbackPage = () => {
  const [params] = useSearchParams();
  const selected = params.get('form');

  return (
    <div>
      {/* Page header */}
      <section className="bg-[#F5F8FC] border-b border-[#DDE5F0]">
        <div className={`${wrap} py-12 sm:py-16 text-center`}>
          <span className="block text-xs font-semibold uppercase tracking-widest text-[#1F4E9C] mb-2">
            Forms
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B2F4B]">
            Feedback & Requests
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-14 bg-[#C9A227]" aria-hidden="true" />
          <p className="mt-4 text-base sm:text-lg text-[#4B5563]">
            Responses go only to the mess committee. We read every one.
          </p>
        </div>
      </section>

      {/* Form groups */}
      <section className={`${wrap} py-12 sm:py-16 space-y-12`}>
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1B2F4B] pb-3 mb-6 border-b border-[#DDE5F0]">
              {group.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.ids.map((id) => (
                <FormCard key={id} form={forms[id]} highlighted={selected === id} />
              ))}
            </div>
          </div>
        ))}

        <p className="text-sm text-[#4B5563]">
          Forms open in a new tab. For anything urgent, write to{' '}
          <a href="mailto:mess@sau.int" className="font-semibold text-[#1F4E9C] hover:underline">
            mess@sau.int
          </a>{' '}
          or speak to the Mess Manager in Mess 1.
        </p>
      </section>
    </div>
  );
};