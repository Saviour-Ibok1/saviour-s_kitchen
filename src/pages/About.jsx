import {
  FaArrowRight,
  FaCheck,
  FaHeart,
  FaUtensils,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const VALUES = [
  {
    title: "Freshly prepared",
    description:
      "We focus on preparing every meal fresh so you can enjoy food at its best.",
  },
  {
    title: "Quality ingredients",
    description:
      "We choose ingredients with care to deliver meals that are satisfying and delicious.",
  },
  {
    title: "Simple ordering",
    description:
      "Our goal is to make finding your favourite meals and placing an order straightforward.",
  },
  {
    title: "Customer focused",
    description:
      "Every part of the experience is designed around making your meal ordering easier.",
  },
];

export default function About() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-[var(--color-primary)] px-6 py-14 text-center sm:px-10 lg:px-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <FaUtensils className="text-2xl text-white" />
          </div>

          <p className="mt-6 text-sm font-medium text-white/70">
            About Saviour's Kitchen
          </p>

          <h1 className="mx-auto mt-2 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Good food, made simple.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
            Saviour's Kitchen brings delicious meals
            together in one simple food ordering
            experience. Browse the menu, choose what
            you love, and get your order ready for the
            next step.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            Explore our menu
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50">
              <FaHeart className="text-lg text-[var(--color-primary)]" />
            </div>

            <h2 className="mt-6 text-xl font-bold text-gray-900">
              Made with care
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              Food should be something you look
              forward to. Saviour's Kitchen is built
              around bringing familiar favourites and
              enjoyable meals into one convenient
              ordering experience.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50">
              <FaUtensils className="text-lg text-[var(--color-primary)]" />
            </div>

            <h2 className="mt-6 text-xl font-bold text-gray-900">
              Something for everyone
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              From Nigerian favourites to
              intercontinental dishes, pastries, meats,
              vegetables, and drinks, our menu is built
              to give you different options whenever
              you're ready for a meal.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-gray-500">
              What we value
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Built around a better food experience
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              We're keeping the experience focused:
              good food, clear information, and an
              ordering process that is easy to understand.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="flex gap-4 rounded-2xl bg-gray-50 p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                  <FaCheck className="text-xs text-[var(--color-primary)]" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-gray-200 bg-gray-50 px-6 py-12 text-center sm:px-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to find something delicious?
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
            Browse the menu and find something you
            would like to have today.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Browse menu
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
}