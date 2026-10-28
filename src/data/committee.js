// Student members of the Mess Committee.
// Source: Dean of Students notification, 21 September 2026 (list of nominations received).
// To add or remove a member, edit the list below. The page sorts it alphabetically.

const NAMES = [
  'Amit Kumar',
  'Jatin Vohra',
  'Anuj Kumar',
  'Arnav Sood',
  'Md Imran Alam',
  'Ayush Raj',
  'Saksham Prabhakar',
  'Deep Yadav',
  'Syed Hasan Abbas',
  'Nikhil Malik',
  'Harkeerat Singh',
  'Saurabh Singh',
  'Asif Ahamad',
  'Madhav Kathuria',
  'Gaurav Kumar',
  'Anjali Sharma',
  'Naina Sharma',
  'Tonmoy Kumar Biswas',
  'Abdullah Al Mohit',
  'Amit Sarder',
  'Sayanta Chowdhury',
  'Md Abdullah Al Mamun Mohumder',
  'Sagar Sarkar',
  'Md Shihab Uddin',
  'Kamal Hossen',
  'Quazi Arunim Rahman',
  'Rushnan Islam',
  'Sanjida Tamanna Oishee',
  'Saurabh Chaudhary',
  'Anu Gupta',
];

export const COMMITTEE_MEMBERS = [...NAMES].sort((a, b) =>
  a.localeCompare(b, 'en', { sensitivity: 'base' })
);