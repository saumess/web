// The mess spaces shown on the About page. Edit freely.
// photo:      put the image in public/about/ and keep the name below (or change the name here).
// status:     'open' | 'temporary' | 'building'
// diet:       'veg' (fully vegetarian), 'nonveg' (fully non-vegetarian) or null (both)
// closedDays: optional list of days the mess is closed, e.g. ['Saturday', 'Sunday']

export const MESS_SPACES = [
  {
    id: 'mess-1',
    name: 'Mess 1',
    place: 'ES building (or Academic Block 3)',
    status: 'open',
    diet: null,
    closedDays: [],
    photo: '/about/mess-1.png',
    note: 'The Mess Manager is based here. Come here for subscriptions, card renewals and packing requests.',
  },
  {
    id: 'mess-2',
    name: 'Mess 2',
    place: 'PCM building (or Academic Block 2)',
    status: 'open',
    diet: 'veg',
    closedDays: [],
    photo: '/about/mess-2.jpg',
    note: 'A fully vegetarian mess.',
  },
  {
    id: 'mess-3',
    name: 'Mess 3',
    place: 'Law building / Academic Block 7',
    status: 'open',
    diet: null,
    closedDays: [],
    photo: '/about/mess-3.jpg',
    note: 'A dining area in the Law building.',
  },
  {
    id: 'mess-4',
    name: 'Mess 4',
    place: 'ES building (or Academic Block 3)',
    status: 'temporary',
    diet: 'nonveg',
    closedDays: ['Saturday', 'Sunday'],
    photo: '/about/mess-4.jpg',
    note: 'A temporary dining area. A fully non-vegetarian mess.',
  },
  {
    id: 'library',
    name: 'Library dining area',
    place: 'Library',
    status: 'building',
    diet: null,
    closedDays: [],
    photo: '/about/library.jpg',
    note: 'A new dining area is being built. We will announce it here and in Notices once it opens.',
  },
];