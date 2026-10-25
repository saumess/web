// October 2026 official menu. Dates and "today" follow the real clock.

const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Week starting this Monday shows the FIRST option of alternate items (Idli, Aloo Chokha).
// If this week should show the other one, move this date by one week.
const ALT_REFERENCE_MONDAY = new Date(2026, 9, 19);

const MEAL_INFO = {
  breakfast: { name: 'Breakfast', time: '8:30 – 10:30 AM' },
  lunch: { name: 'Lunch', time: '12:30 – 2:30 PM' },
  dinner: { name: 'Dinner', time: '7:30 – 9:30 PM' },
};

const v = (name) => ({ name, isVeg: true });
const nv = (name) => ({ name, isVeg: false });
// "or" lines: the second and later options start with "or"
const orV = (name) => ({ name: `or ${name}`, isVeg: true });
const orNV = (name) => ({ name: `or ${name}`, isVeg: false });

const startOfWeek = (date) => {
  const offset = (date.getDay() + 6) % 7;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - offset);
};

const weekParity = (date) => {
  const weeks = Math.round((startOfWeek(date) - ALT_REFERENCE_MONDAY) / (7 * 24 * 60 * 60 * 1000));
  return ((weeks % 2) + 2) % 2;
};

const pick = (first, second) => (weekParity(new Date()) === 0 ? first : second);

const breakfastBase = [nv('Boiled Eggs'), v('Banana')];
const drinks = [v('Milk'), orV('Tea')];

const RAW = [
  {
    breakfast: [v(`${pick('Idli', 'Vada')} with Sambar`), orV('Cornflakes'), ...drinks, ...breakfastBase],
    lunch: [v('Kadhai Paneer'), orNV('Sri Lankan Chicken'), v('Chana Dal'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Aloo Soyabean'), v('Mixed Dal'), v('Rice'), v('Roti'), v('Salad')],
  },
  {
    breakfast: [v('Bread Bhaji'), orV('Cornflakes'), ...drinks, ...breakfastBase],
    lunch: [v('Rajma'), v('Aloo Jeera'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Poori Sabzi'), v('Urad Chana Dal'), v('Jeera Rice'), v('Roti'), v('Halwa'), v('Salad')],
  },
  {
    breakfast: [v('Besan Chilla'), orV('Cornflakes'), ...drinks, ...breakfastBase, v('50g Sprouts')],
    lunch: [nv('Fish Curry'), orV('Chilli Paneer'), v('Lal Masoor Dal'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Baingan Bharta'), v('Rice'), v('Moong Sabut Dal'), v('Roti'), v('Salad')],
  },
  {
    breakfast: [v('Poha + Sev'), orV('Cornflakes'), ...drinks, ...breakfastBase],
    lunch: [v('Chhole'), v('Kewa Datshi'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Palak Sweet Corn'), v('Moong Sabut Dal'), v('Roti'), v('Salad')],
  },
  {
    breakfast: [v('Sandwich'), orV('Cornflakes'), ...drinks, ...breakfastBase],
    lunch: [nv('Afghani Black Pepper Chicken'), orV('Matar Paneer'), v('Black Masoor Dal'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Chinese Night: Manchurian'), v('Fried Rice'), v('Noodles')],
  },
  {
    breakfast: [v('Chole Bhature'), v('Cornflakes'), v('Milk'), v('Tea'), ...breakfastBase, v('50g Sprouts')],
    lunch: [v('Khichdi'), v('Aloo Fry'), v('Green Chutney'), v('Raita')],
    dinner: [nv('Egg Curry'), orV('Malai Kofta'), v('Chana Dal Tadka'), v('Rice'), v('Roti'), v('Salad')],
  },
  {
    breakfast: [v('Aloo Paratha'), orV('Cornflakes'), ...drinks, ...breakfastBase, v('50g Sprouts')],
    lunch: [v(pick('Aloo Chokha', 'Aloo Bhujia')), v('Arhar Dal Fry'), v('Rice'), v('Roti'), v('Salad')],
    dinner: [v('Veg Biryani'), orNV('Chicken Biryani'), v('Raita'), v('Mirchi Ka Salan'), v('Dessert: Kheer'), orV('Gulab Jamun'), orV('Seviyan')],
  },
];

const buildWeek = () => {
  const today = new Date();
  const monday = startOfWeek(today);

  return RAW.map((day, i) => {
    const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    return {
      day: DAY_NAMES[i],
      dateStr: `${date.getDate()} ${MONTHS[date.getMonth()]}`,
      isToday: date.toDateString() === today.toDateString(),
      meals: ['breakfast', 'lunch', 'dinner'].map((id) => ({
        id,
        name: MEAL_INFO[id].name,
        time: MEAL_INFO[id].time,
        dishes: day[id],
      })),
    };
  });
};

export const WEEKLY_MENU = buildWeek();

// Sample notices. Replace with real ones. Newest first.
export const NOTICES = [
  {
    id: '1',
    date: '25 Oct 2026',
    category: 'Menu',
    title: 'October menu is now live',
    summary: 'The official October menu approved by the Mess Committee is on the Menu page.',
    isImportant: false,
  },
  {
    id: '2',
    date: '24 Oct 2026',
    category: 'General',
    title: 'New mess card system is in testing',
    summary: 'The QR card is being tested at the counters. Keep using your current process until told otherwise.',
    isImportant: true,
  },
  {
    id: '3',
    date: '22 Oct 2026',
    category: 'Menu',
    title: 'Ghee Roti is optional at dinner',
    summary: 'Ghee Roti is available at dinner on request.',
    isImportant: false,
  },
];