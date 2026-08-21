import { Link } from "react-router-dom";
import { FaArrowRightLong, FaTag } from "react-icons/fa6";

export default function OffersBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div
        className="
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-[var(--color-primary)]
          to-[#d4af37]
          p-8
          text-white
          shadow-xl
          lg:p-12
        "
      >
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
              <FaTag />
              Limited Time Offers
            </div>

            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Discover Today's Special Meals
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-white/90">
              Explore freshly prepared meals, pastries, drinks, and more.
              Promotional offers and discounts will appear here whenever
              they become available.
            </p>
          </div>

          <Link
            to="/search"
            className="
              inline-flex
              items-center
              gap-3
              rounded-xl
              bg-white
              px-6
              py-3
              font-semibold
              text-[var(--color-primary)]
              transition
              hover:opacity-90
            "
          >
            Browse Meals
            <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </section>
  );
}