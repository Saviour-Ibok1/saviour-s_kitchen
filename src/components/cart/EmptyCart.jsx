import { Link } from "react-router-dom";
import { FaBasketShopping } from "react-icons/fa6";

export default function EmptyCart() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
          <FaBasketShopping className="text-3xl text-[var(--color-primary)]" />
        </div>

        <h1 className="mt-8 text-3xl font-bold text-gray-900">
          Your Cart is Empty
        </h1>

        <p className="mt-4 leading-8 text-gray-600">
          Looks like you haven't added any meals yet. Browse our menu and
          discover freshly prepared dishes waiting for you.
        </p>

        <Link
          to="/"
          className="
            mt-8
            inline-flex
            items-center
            justify-center
            rounded-xl
            bg-[var(--color-primary)]
            px-8
            py-3
            font-semibold
            text-white
            transition
            hover:opacity-90
          "
        >
          Browse Menu
        </Link>
      </div>
    </section>
  );
}