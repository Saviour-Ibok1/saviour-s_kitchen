import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

export default function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
      <div className="rounded-3xl bg-gray-900 px-8 py-14 text-center text-white">
        <h2 className="text-3xl font-bold md:text-4xl">
          Ready to Enjoy Freshly Prepared Meals?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-300">
          Browse our menu and discover delicious meals prepared fresh for every
          order.
        </p>

        <Link
          to="/search"
          className="
            mt-8
            inline-flex
            items-center
            gap-3
            rounded-xl
            bg-[var(--color-primary)]
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:opacity-90
          "
        >
          Explore Menu
          <FaArrowRightLong />
        </Link>
      </div>
    </section>
  );
}