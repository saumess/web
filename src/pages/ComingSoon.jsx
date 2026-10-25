import { Link } from 'react-router-dom';

export default function ComingSoon({ title }) {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B2F4B] mb-3">
        {title}
      </h1>
      <p className="text-[#4B5563] mb-8">Coming soon. We are still building this page.</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 rounded-[10px] text-base font-semibold text-white bg-[#1F4E9C] hover:bg-[#163b78] transition-colors min-h-[48px]"
      >
        Go to Home
      </Link>
    </div>
  );
}