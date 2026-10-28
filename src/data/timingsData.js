// All wording for the Timings & Rates page lives here. Edit freely.
// A value of null shows "To be announced" on the page.

export const MEAL_TIMINGS = [
  { id: 'breakfast', name: 'Breakfast', start: '8:30 AM', end: '10:30 AM' },
  { id: 'lunch', name: 'Lunch', start: '12:30 PM', end: '2:30 PM' },
  { id: 'dinner', name: 'Dinner', start: '7:30 PM', end: '9:30 PM' },
];

// TODO: confirm whether weekends and holidays follow the same timings.
export const WEEKEND_TIMINGS = 'Timings are the same every day, including weekends and holidays.';

// TODO: put the real monthly fee here, for example '₹3,500'.
export const MONTHLY_FEE = null;
// DRAFT: confirm what the fee covers.
export const MONTHLY_COVERS = 'Breakfast, lunch and dinner every day of the month.';
export const PAYMENT_DUE = 'Pay on the 1st or 2nd day of every month.';

// Guest meal rates per meal.
export const GUEST_RATES = [
  { meal: 'Breakfast', rate: '₹50', note: 'Fixed rate' },
  { meal: 'Lunch', rate: '₹70 or ₹80', note: 'Depends on the menu of the day' },
  { meal: 'Dinner', rate: '₹70 or ₹80', note: 'Depends on the menu of the day' },
];

export const PAY_STEPS = [
  {
    title: 'Register',
    text: 'New students fill in the mess registration form.',
    link: { to: '/feedback', label: 'Go to Feedback & Requests' },
  },
  {
    title: 'Pay the Mess Manager',
    text: 'Pay the monthly fee to the Mess Manager in Mess 1 on the 1st or 2nd day of the month.',
  },
  {
    title: 'Collect or renew your card',
    text: 'New students collect their card. For everyone else, the card updates automatically after payment.',
  },
];

// TODO: office hours and accepted payment modes.
export const OFFICE_HOURS = null;
export const PAYMENT_MODES = null;

// TODO: your design document says a 5-day grace period, but the Home page says 2 to 3 days.
// Pick one. The Rules & FAQ page (rulesData.js) uses the same wording.
export const GRACE_PERIOD = {
  length: '2 to 3 days',
  text: 'If you miss the 1st and 2nd, you have a buffer of 2 to 3 days after the renewal dates to pay.',
};