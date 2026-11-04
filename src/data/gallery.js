// Gallery photos. Add one line per photo, newest anywhere (the page sorts by date).
//
// src       the file in public/gallery/, e.g. '/gallery/halloween-1.jpg'
// title     short caption shown on the photo and in the viewer
// category  one of GALLERY_CATEGORIES below
// by        the photographer's name (shown as "Photo: name"). Always fill this in.
// date      optional 'YYYY-MM-DD', newest photos show first
//
// Example:
// { src: '/gallery/mess-1-lunch.jpg', title: 'Lunch at Mess 1', category: 'Dining hall', by: 'Anuj Kumar', date: '2026-11-02' },

export const GALLERY_CATEGORIES = ['Dining hall', 'Food', 'Festivals', 'Kitchen'];

export const GALLERY_PHOTOS = [
{ src: '/about/mess-1.png', title: 'Dinner at Mess 1', category: 'Dining hall', by: 'Anuj', date: '2026-11-02' },
{ src: '/gallery/mess2.jpeg', title: 'Mess 2', category: 'Dining hall', by: 'Altamash', date: '2026-11-02' },
{ src: '/hero/1.jpeg', title: 'LS ES', category: 'Dining hall', by: 'SAU', date: '2026-11-02' },
{ src: '/hero/2.jpg', title: 'HOSTEL', category: 'Dining hall', by: 'SAU', date: '2026-11-02' },
{ src: '/hero/3.jpg', title: 'Mess 1', category: 'Dining hall', by: 'SAU', date: '2026-11-02' },
{ src: '/gallery/mess1-Md_Shihab_Uddin.jpg', title: ' Mess 1', category: 'Dining hall', by: 'Shihab, LLM 27', date: '2026-11-02' },
{ src: '/gallery/mess1-outside-Md_Shihab_Uddin.jpg', title: 'LSES ', category: 'Dining hall', by: 'Shihab, LLM 27', date: '2026-11-02' },
{ src: '/gallery/mess1-Md_Shihab_Uddin-2.jpg', title: 'Mess 1', category: 'Dining hall', by: 'Shihab, LLM 27', date: '2026-11-02' },
{ src: '/gallery/mess2-Md_hihab_Uddin.jpg', title: 'Mess 2', category: 'Dining hall', by: 'Shihab, LLM 27', date: '2026-11-02' },

];

// Paste the Google Form link for photo submissions here (a form with a file upload question).
export const GALLERY_FORM_URL ="https://docs.google.com/forms/d/e/1FAIpQLScfz7sjFsxm7vcIY2waz4svVABMSV-QcBXmJ6nEEJP2tcqviw/viewform?usp=dialog ";