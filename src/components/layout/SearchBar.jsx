import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = "Search foods...",
}) {
  return (
    <div className="relative w-full">
      <FaSearch
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />

      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label="Search foods"
        className="
          h-12
          w-full
          rounded-xl
          border
          border-gray-200
          bg-white
          py-3
          pl-11
          pr-11
          text-sm
          text-gray-900
          outline-none
          transition-all
          duration-200
          placeholder:text-gray-400
          focus:border-[var(--color-primary)]
          focus:ring-2
          focus:ring-[var(--color-primary-light)]
        "
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="
            absolute
            right-3
            top-1/2
            flex
            h-8
            w-8
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            transition-colors
            hover:bg-gray-100
          "
        >
          <FaTimes className="text-sm text-gray-500" />
        </button>
      )}
    </div>
  );
}