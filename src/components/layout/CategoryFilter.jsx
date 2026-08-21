import { FaChevronDown } from "react-icons/fa";

const DEFAULT_CATEGORIES = [
  "All",
  "Pastries",
  "Local Dishes",
  "Intercontinental",
  "Vegetables",
  "Meat",
  "Drinks",
];

export default function CategoryFilter({
  value,
  onChange,
  categories = DEFAULT_CATEGORIES,
}) {
  return (
    <div className="relative w-full sm:w-56">
      <select
        value={value}
        onChange={onChange}
        aria-label="Filter products by category"
        className="
          h-12
          w-full
          appearance-none
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          pr-10
          text-sm
          font-medium
          text-gray-700
          outline-none
          transition-all
          duration-200
          focus:border-[var(--color-primary)]
          focus:ring-2
          focus:ring-[var(--color-primary-light)]
        "
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <FaChevronDown
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-xs
          text-gray-500
        "
      />
    </div>
  );
}