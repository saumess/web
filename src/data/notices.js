// All notices live here. Add new ones at the top of RAW (order doesn't matter, the page sorts them).
//
// id        unique text, e.g. '4'
// isoDate   'YYYY-MM-DD'
// category  one of: Menu, Payment, Closure, Event, General
// title     short headline
// summary   the text shown when the notice is expanded
// important true = amber styling, pinned at the top and shown in the strip under the header
// expires   optional 'YYYY-MM-DD'. After this date the notice is no longer treated as important.
// links     optional list of links, e.g. Google Drive files:
//           links: [{ label: 'Download circular (PDF)', url: 'https://drive.google.com/...' }]

export const CATEGORIES = ['Menu', 'Payment', 'Closure', 'Event', 'General'];

// SAMPLE notices: replace these with real ones.
const RAW = [
  {
    id: '1',
    isoDate: '2026-10-28',
    category: 'Menu',
    title: 'November menu is now live',
    summary: 'The official November menu approved by the Mess Committee is on the Menu page.',
    important: false,
    // Example of a notice with a link. Replace the url with your real Google Drive link.
    // links: [{ label: 'Download the menu (PDF)', url: 'https://drive.google.com/...' }],
  },
  
  {
    id: '3',
    isoDate: '2026-10-22',
    category: 'Menu',
    title: 'Ghee Roti is optional at dinner',
    summary: 'Ghee Roti is available at dinner.',
    important: false,
  },
];

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const pad = (n) => String(n).padStart(2, '0');
const now = new Date();
const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

export const NOTICES = RAW.map((n) => {
  const [y, m, d] = n.isoDate.split('-').map(Number);
  return {
    ...n,
    date: `${d} ${MONTHS_SHORT[m - 1]} ${y}`,
    monthKey: n.isoDate.slice(0, 7),
    monthLabel: `${MONTHS_FULL[m - 1]} ${y}`,
    // Only keep links that have a url; a missing label becomes "Open document"
    links: (n.links || [])
      .filter((l) => l && l.url)
      .map((l) => ({ url: l.url, label: l.label || 'Open document' })),
    // Important only until it expires
    isImportant: Boolean(n.important) && !(n.expires && today > n.expires),
  };
}).sort(
  (a, b) =>
    b.isoDate.localeCompare(a.isoDate) ||
    b.id.localeCompare(a.id, undefined, { numeric: true })
);