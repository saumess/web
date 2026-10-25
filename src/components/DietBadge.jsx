export const DietBadge = ({ isVeg, size = 'sm' }) => {
  const tone = isVeg
    ? {
        wrap: 'bg-[#DDF3DF] text-[#0A7A2F] border-[#B9E6BC]',
        box: 'border-[#0A7A2F]',
        dot: 'bg-[#0A7A2F]',
        label: 'Veg',
        aria: 'Vegetarian Dish',
      }
    : {
        wrap: 'bg-[#FBE0DD] text-[#B3261E] border-[#F4BDB7]',
        box: 'border-[#B3261E]',
        dot: 'bg-[#B3261E]',
        label: 'Non-Veg',
        aria: 'Non-Vegetarian Dish',
      };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-md border shrink-0 ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
      } ${tone.wrap}`}
      aria-label={tone.aria}
    >
      {/* Standard square with inner dot symbol */}
      <span
        className={`inline-flex items-center justify-center w-3 h-3 border rounded-sm bg-white shrink-0 ${tone.box}`}
        aria-hidden="true"
      >
        <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
      </span>
      <span>{tone.label}</span>
    </span>
  );
};