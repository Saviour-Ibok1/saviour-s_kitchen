import { Link } from "react-router-dom";
import { FaArrowRight, FaUtensils } from "react-icons/fa";
import heroFood from "../../assets/images/hero-food.jpg";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-light)] px-4 py-2 text-sm font-medium text-[var(--color-primary)]">
            <FaUtensils />
            Freshly Prepared Daily
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
            Delicious Meals
            <span className="block text-[var(--color-primary)]">
              Delivered Fresh
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 md:text-lg">
            Discover freshly prepared pastries, local delicacies,
            intercontinental dishes, refreshing drinks, and much more.
            Order your favorite meals anytime and enjoy premium quality
            delivered to your doorstep.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Order Now
              <FaArrowRight />
            </Link>

            <Link
              to="/about"
              className="rounded-xl border border-[var(--color-primary)] px-6 py-3 font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-primary-light)]"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[var(--color-primary-light)] blur-3xl" />

          <img
            src={heroFood}
            alt="Freshly prepared meals"
            className="relative mx-auto w-full max-w-lg drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}