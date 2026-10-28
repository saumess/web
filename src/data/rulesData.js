// All wording for the Rules & FAQ page lives here. Edit freely.

// TODO: paste the Mess-Off / leave adjustment Google Form link here when you have it.
export const MESS_OFF_FORM_URL = null;

export const RULE_GROUPS = [
  {
    id: 'dining',
    title: 'Dining hall',
    icon: 'dining',
    rules: [
      'Meal times: Breakfast 8:30 to 10:30 AM, Lunch 12:30 to 2:30 PM, Dinner 7:30 to 9:30 PM.',
      'Carry your mess card to every meal and show it at the counter.',
      'Do not share your mess card, and do not post photos of its QR code online.',
      'Where the menu says "or", choose one of the options.',
      'Ghee Roti is optional at dinner.',
    ],
  },
  {
    id: 'hygiene',
    title: 'Hygiene',
    icon: 'hygiene',
    rules: [
      // DRAFT: confirm or replace with the committee's real hygiene rules.
      'Return your tray and leave your table clean.',
      'Report any hygiene problem through the Complaint form so the committee can act on it.',
    ],
  },
  {
    id: 'guests',
    title: 'Guests',
    icon: 'guests',
    rules: [
      'Guest meal rates: breakfast ₹50. Lunch and dinner are ₹70 or ₹80, depending on the menu.',
      'For guest meals, contact the Mess Manager in Mess 1.',
    ],
  },
  {
    id: 'payments',
    title: 'Payments',
    icon: 'payments',
    rules: [
      'Pay the monthly mess fee to the Mess Manager in Mess 1.',
      'Renew your subscription on the 1st and 2nd day of every month.',
      // TODO: your design document says 5 days, the Home page says 2 to 3 days. Pick one.
      'A buffer period of 2 to 3 days is allowed after the renewal dates.',
    ],
  },
  {
    id: 'rebates',
    title: 'Rebates and mess-off',
    icon: 'rebates',
    rules: [
      'If you are away for 5 or more days, you can ask for a leave adjustment.',
      'Send your request to mess@sau.int or to the Mess Manager in Mess 1.',
    ],
  },
];

export const MESS_OFF_ROWS = [
  {
    days: '5 or more days',
    rebate: 'To be announced', // TODO: write the real rebate rule
    apply:
      'Fill in the Mess-Off form, or write to mess@sau.int, or contact the Mess Manager in Mess 1.',
  },
];

// Optional link: { to: '/feedback', label: 'Open the Feedback page' }
export const FAQS = [
  {
    id: 'timings',
    q: 'What are the mess timings?',
    a: 'Breakfast is from 8:30 to 10:30 AM, lunch from 12:30 to 2:30 PM and dinner from 7:30 to 9:30 PM.',
  },
  {
    id: 'get-card',
    q: 'How do I get a mess card?',
    a: 'Fill in the mess registration Google Form, pay the monthly subscription fee to the Mess Manager in Mess 1, and collect your card.',
  },
  {
    id: 'renew',
    q: 'When do I renew my subscription?',
    a: 'Renew on the 1st or 2nd day of every month with the Mess Manager. A buffer period of 2 to 3 days is allowed.',
  },
  {
    id: 'qr',
    q: 'How does the QR card work?',
    a: 'Show your card at the counter and the staff scan the QR code. This system is currently in testing, so keep following the counter staff’s instructions.',
  },
  {
    id: 'lost-card',
    q: 'I lost my card. What should I do?',
    a: 'Tell the Mess Manager in Mess 1 or write to mess@sau.int as soon as you can. Your old card is blocked automatically, so no one else can use it.',
  },
  {
    id: 'share-card',
    q: 'Can I lend my card to a friend?',
    a: 'No. Your card is for you only. Please also do not post photos of the QR code online.',
  },
  {
    id: 'leave',
    q: 'I will be away for a few days. Can I get an adjustment?',
    a: 'Yes, if you are away for 5 or more days. Send your request to mess@sau.int or the Mess Manager in Mess 1.',
  },
  {
    id: 'guest',
    q: 'Can I bring a guest for a meal?',
    a: 'Yes. A guest breakfast is ₹50. Guest lunch and dinner are ₹70 or ₹80, depending on the menu. Contact the Mess Manager in Mess 1 for guest meals.',
    link: { to: '/timings-and-rates#guest-meals', label: 'See guest meal rates' },
  },
  {
    id: 'packing',
    q: 'How do I ask for a packed meal?',
    a: 'Contact the Mess Manager in Mess 1 for packing requests.',
  },
  {
    id: 'ghee-roti',
    q: 'Is Ghee Roti included?',
    a: 'Ghee Roti is optional at dinner.',
  },
  {
    id: 'menu-changes',
    q: 'Does the menu change every week?',
    a: 'The weekly menu is approved by the Mess Committee. A few items alternate from week to week, such as Idli or Vada on Monday breakfast and Aloo Chokha or Aloo Bhujia on Sunday lunch.',
  },
  {
    id: 'suggest',
    q: 'How can I suggest a dish or give feedback?',
    a: 'Use the Menu Suggestion or Mess Feedback form. Responses go only to the mess committee.',
    link: { to: '/feedback', label: 'Go to Feedback & Requests' },
  },
  {
    id: 'complaint',
    q: 'How do I make a complaint?',
    a: 'You can complain about the mess, the canteen or the tea shop using the Complaint form.',
    link: { to: '/feedback', label: 'Go to Feedback & Requests' },
  },
  {
    id: 'contact',
    q: 'Who do I contact for anything else?',
    a: 'Write to mess@sau.int or speak to the Mess Manager in Mess 1.',
  },
];


// links: [
//   { label: 'Circular (PDF)', url: 'https://drive.google.com/file/d/AAAA/view?usp=sharing' },
//   { label: 'Fee table (Sheet)', url: 'https://docs.google.com/spreadsheets/d/BBBB/view' },
// ],