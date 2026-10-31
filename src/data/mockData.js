// Official menus by month. Dates and "today" follow the real clock.
// To add a new month: copy the NOVEMBER block, rename it, edit the dishes,
// then add it to MENUS below (for example '2026-12': DECEMBER).
// If a month has no menu yet, the site shows the latest earlier month.

const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// October only: the week starting this Monday shows the FIRST option of alternate items
// (Idli, Aloo Chokha). If this week should show the other one, move this date by one week.
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

/* ---------------------------------------------------------------------------
   SPECIAL DINNER
   On this day of every month, the dinner shows as a Special Dinner.
--------------------------------------------------------------------------- */
const SPECIAL_DINNER_DAY = 31;

// Months that have fewer than 31 days (Nov, Apr, Jun, Sep, Feb): true = use the last
// day of that month instead; false = no special dinner in those months.
const LAST_DAY_IF_SHORT_MONTH = true;

const isSpecialDinnerDay = (date) => {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const target =
    SPECIAL_DINNER_DAY > lastDay && LAST_DAY_IF_SHORT_MONTH ? lastDay : SPECIAL_DINNER_DAY;
  return date.getDate() === target;
};

// Special dinner menu (from the poster). The same dishes show on every special
// dinner day, so update this list when the menu changes.
// Dishes starting with "Dessert: " are shown under Dessert on the Special Dinner page.
export const SPECIAL_DINNER_MENU = [
  nv('Mutton'),
  v('Afghani Paneer'),
  v('Dal'),
  v('Matar Pulao'),
  v('Roti'),
  v('Papad'),
  v('Fresh Salad'),
  v('Dessert: Gajar ka Halwa'),
];

/* ------------------------------------------------------------------------- */

const startOfWeek = (date) => {
  const offset = (date.getDay() + 6) % 7;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - offset);
};

const weekParity = (date) => {
  const weeks = Math.round((startOfWeek(date) - ALT_REFERENCE_MONDAY) / (7 * 24 * 60 * 60 * 1000));
  return ((weeks % 2) + 2) % 2;
};

const pick = (first, second) => (weekParity(new Date()) === 0 ? first : second);

/* ---------------------------------------------------------------------------
   OCTOBER 2026 (Monday to Sunday)
--------------------------------------------------------------------------- */
const octEggBanana = [nv('Boiled Eggs'), v('Banana')];
const octDrinks = [v('Milk'), orV('Tea')];

const OCTOBER = [
  {
    breakfast: [v(`${pick('Idli', 'Vada')} with Sambar`), orV('Cornflakes'), ...octDrinks, ...octEggBanana],
    lunch: [v('Kadhai Paneer'), orNV('Sri Lankan Chicken'), v('Chana Dal'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Aloo Soyabean'), v('Mixed Dal'), v('Rice'), v('Roti'), v('Salad')],
  },
  {
    breakfast: [v('Bread Bhaji'), orV('Cornflakes'), ...octDrinks, ...octEggBanana],
    lunch: [v('Rajma'), v('Aloo Jeera'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Poori Sabzi'), v('Urad Chana Dal'), v('Jeera Rice'), v('Roti'), v('Halwa'), v('Salad')],
  },
  {
    breakfast: [v('Besan Chilla'), orV('Cornflakes'), ...octDrinks, ...octEggBanana, v('50g Sprouts')],
    lunch: [nv('Fish Curry'), orV('Chilli Paneer'), v('Lal Masoor Dal'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Baingan Bharta'), v('Rice'), v('Moong Sabut Dal'), v('Roti'), v('Salad')],
  },
  {
    breakfast: [v('Poha + Sev'), orV('Cornflakes'), ...octDrinks, ...octEggBanana],
    lunch: [v('Chhole'), v('Kewa Datshi'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Palak Sweet Corn'), v('Moong Sabut Dal'), v('Roti'), v('Salad')],
  },
  {
    breakfast: [v('Sandwich'), orV('Cornflakes'), ...octDrinks, ...octEggBanana],
    lunch: [nv('Afghani Black Pepper Chicken'), orV('Matar Paneer'), v('Black Masoor Dal'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Chinese Night: Manchurian'), v('Fried Rice'), v('Noodles')],
  },
  {
    breakfast: [v('Chole Bhature'), v('Cornflakes'), v('Milk'), v('Tea'), ...octEggBanana, v('50g Sprouts')],
    lunch: [v('Khichdi'), v('Aloo Fry'), v('Green Chutney'), v('Raita')],
    dinner: [nv('Egg Curry'), orV('Malai Kofta'), v('Chana Dal Tadka'), v('Rice'), v('Roti'), v('Salad')],
  },
  {
    breakfast: [v('Aloo Paratha'), orV('Cornflakes'), ...octDrinks, ...octEggBanana, v('50g Sprouts')],
    lunch: [v(pick('Aloo Chokha', 'Aloo Bhujia')), v('Arhar Dal Fry'), v('Rice'), v('Roti'), v('Salad')],
    dinner: [v('Veg Biryani'), orNV('Chicken Biryani'), v('Raita'), v('Mirchi Ka Salan'), v('Dessert: Kheer'), orV('Gulab Jamun'), orV('Seviyan')],
  },
];

/* ---------------------------------------------------------------------------
   NOVEMBER 2026 (Monday to Sunday)
   Source: printed "Mess Menu – November 2026".
   A slash in the printed menu is shown as a choice ("or").
--------------------------------------------------------------------------- */
const novDrinks = [v('Milk'), orV('Tea')];
const novEggBanana = [nv('Boiled Eggs'), orV('Banana')];
const novEggOrange = [nv('2 Boiled Eggs'), orV('1 Orange')];

const NOVEMBER = [
  // Monday
  {
    breakfast: [v('Idli Sambhar'), orV('Vada'), orV('Cornflakes'), ...novDrinks, nv('Boiled Egg'), orV('Banana'), v('50g Sprouts'), v('Jaggery')],
    lunch: [nv('Sri Lankan Chicken'), orV('Kadhai Paneer'), v('Dal Tadka'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Palak Sweet Corn'), v('Chana Dal'), v('Rice'), v('Roti'), v('Salad')],
  },
  // Tuesday
  {
    breakfast: [v('Bread Bhaji'), orV('Bread Jam'), orV('Cornflakes'), ...novDrinks, ...novEggBanana],
    lunch: [v('Rajma'), v('Cabbage (Aloo, Matar & Gajar)'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Poori'), v('Aloo Gobhi Sabzi'), v('Urad Chana Dal'), v('Jeera Rice'), v('Halwa'), orV('Kheer'), v('Salad')],
  },
  // Wednesday
  {
    breakfast: [v('Chilla'), orV('Cornflakes'), ...novDrinks, ...novEggBanana, v('50g Sprouts'), v('Jaggery')],
    lunch: [nv('Fish Curry'), orV('Tofu'), v('Lal Masoor Dal'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Baingan Bharta'), v('Rice'), v('Arhar Dal'), v('Roti'), v('Salad')],
  },
  // Thursday
  {
    breakfast: [v('Poha + Sev'), orV('Cornflakes'), ...novDrinks, ...novEggBanana, v('50g Sprouts'), v('Jaggery')],
    lunch: [v('Chhole'), v('Kewa Datshi'), orV('Shamu Datshi'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Aloo Soyabean'), orV('Dum Aloo'), v('Mixed Dal'), v('Rice'), v('Roti'), v('Salad')],
  },
  // Friday
  {
    breakfast: [v('Uttapam Sambhar'), orV('Cornflakes'), ...novDrinks, ...novEggOrange],
    lunch: [nv('Afghani Black Pepper Chicken'), orV('Matar Paneer'), v('Black Masoor Dal'), v('Rice'), v('Roti'), v('Raita')],
    dinner: [v('Fried Rice'), v('Manchurian'), v('Arhar Dal'), v('Rice'), v('Roti'), v('Salad')],
  },
  // Saturday
  {
    breakfast: [v('Chole Bhature'), orV('Bread Jam'), orV('Cornflakes'), ...novDrinks, ...novEggOrange],
    lunch: [v('Khichdi'), v('Aloo Fry'), v('Green Chutney'), v('Raita')],
    dinner: [nv('Egg Curry'), orV('Lauki Chana'), v('Dal Makhani'), v('Rice'), v('Roti'), v('Salad')],
  },
  // Sunday
  {
    breakfast: [v('Aloo Paratha'), orV('Cornflakes'), ...novDrinks, ...novEggOrange],
    lunch: [v('Moong Dhuli Palak Sabji'), v('Arhar Dal'), v('Rice'), v('Roti'), v('Salad')],
    dinner: [v('Veg Biryani'), orNV('Chicken Biryani'), v('Raita'), v('Dessert: Sweet Sewai'), orV('Gulab Jamun'), orV('Shahi Tukda')],
  },
];

/* ---------------------------------------------------------------------------
   Which menu applies to which month
--------------------------------------------------------------------------- */
const MENUS = {
  '2026-10': OCTOBER,
  '2026-11': NOVEMBER,
};

const pad = (n) => String(n).padStart(2, '0');
const monthKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;

// Menu for a given date's month; falls back to the latest earlier month
const menuFor = (date) => {
  const key = monthKey(date);
  if (MENUS[key]) return MENUS[key];
  const keys = Object.keys(MENUS).sort();
  const earlier = keys.filter((k) => k < key);
  return MENUS[earlier.length ? earlier[earlier.length - 1] : keys[0]];
};

const buildWeek = () => {
  const today = new Date();
  const monday = startOfWeek(today);

  return DAY_NAMES.map((dayName, i) => {
    const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    const day = menuFor(date)[i];
    const specialDay = isSpecialDinnerDay(date);

    return {
      day: dayName,
      dateStr: `${date.getDate()} ${MONTHS[date.getMonth()]}`,
      isToday: date.toDateString() === today.toDateString(),
      meals: ['breakfast', 'lunch', 'dinner'].map((id) => {
        const isSpecial = specialDay && id === 'dinner';
        return {
          id,
          name: MEAL_INFO[id].name,
          time: MEAL_INFO[id].time,
          special: isSpecial,
          dishes: isSpecial ? SPECIAL_DINNER_MENU : day[id],
        };
      }),
    };
  });
};

export const WEEKLY_MENU = buildWeek();

// Notices live in notices.js
export { NOTICES } from './notices';