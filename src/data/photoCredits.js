// Photo credits. One entry per photo file used on the site.
//
// src    the file path exactly as it appears in the code, e.g. '/about/mess-1.jpg'
// by     the photographer's name. Add batch or department if they like,
//        e.g. 'Anuj Kumar, CS 2024'
// where  short description shown on the Photo Credits page, e.g. 'Mess 1'
// link   optional: the photographer's Instagram or website
//
// Example:
// { src: '/about/mess-1.jpg', by: 'Anuj Kumar', where: 'Mess 1', link: 'https://instagram.com/...' },

import { Link } from "react-router-dom";

export const PHOTO_CREDITS = [
  // Hero
    { src: '/hero/1.jpeg', by: 'Anuj', where: 'Slide 1(Home page)' },
    { src: '/hero/2.jpg', by: 'Anuj', where: 'Slide 2(Home page)' },
    { src: '/hero/3.jpg', by: 'SAU', where: 'Slide 3(Home page)' },

  // About page
  { src: '/about/mess-1.png', by: 'Anuj', where: 'Mess 1(about page)' },
  { src: '/gallery/mess2.jpeg', by: 'Altamash', where: 'Mess 2(about page)' },
  // { src: '/about/mess-2.jpg', by: '', where: 'Mess 2' },
  // { src: '/about/mess-3.jpg', by: '', where: 'Mess 3' },
  // { src: '/about/mess-4.jpg', by: '', where: 'Mess 4' },
  // { src: '/about/library.jpg', by: '', where: 'Library dining area' },
  // { src: '/about/central-kitchen.jpg', by: '', where: 'Central kitchen' },

  // Home tiles and footer (shown on the credits page only)
  // { src: '/tiles/menu.jpg', by: '', where: 'Home page tile: Full Menu' },
  // { src: '/mess-building.png', by: '', where: 'Footer: mess building' },
];

// Returns the photographer's name for a photo, or null if there is no credit
export const getCredit = (src) => PHOTO_CREDITS.find((c) => c.src === src)?.by || null;