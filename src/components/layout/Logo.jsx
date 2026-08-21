import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";

export default function Logo({ variant = "dark" }) {
  const isLight = variant === "light";

  return (
    <Link
      to="/"
      className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-90"
      aria-label="Saviour's Kitchen Home"
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full border ${
          isLight
            ? "border-white/20 bg-white/10"
            : "border-[var(--color-primary)] bg-[var(--color-primary-light)]"
        }`}
      >
        <GiKnifeFork
          className={`text-2xl ${
            isLight
              ? "text-[var(--color-primary)]"
              : "text-[var(--color-primary)]"
          }`}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col">
        <span
          className={`text-lg font-bold tracking-tight lg:text-xl ${
            isLight ? "text-white" : "text-gray-900"
          }`}
        >
          Saviour&apos;s Kitchen
        </span>

        <span
          className={`hidden text-xs sm:block ${
            isLight ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Order your foods fresh and delicious.
        </span>
      </div>
    </Link>
  );
}