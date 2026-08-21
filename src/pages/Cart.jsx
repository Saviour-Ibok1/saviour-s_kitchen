import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaMinus,
  FaPlus,
  FaBagShopping,
  FaTrash,
} from "react-icons/fa6";

import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/formatCurrency";

export default function Cart() {
  const {
    items,
    itemCount,
    totals,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const {
    subtotal,
    deliveryFee,
    total,
  } = totals;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500">
            Your order
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            Cart
          </h1>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
            <FaBagShopping className="text-2xl text-gray-300" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            Your cart is empty
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Add some of your favourite foods to your
            cart and they'll appear here.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <FaArrowLeft className="text-xs" />
            Browse foods
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Your order
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            Cart
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {itemCount}{" "}
            {itemCount === 1
              ? "item"
              : "items"}{" "}
            in your cart
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-red-500"
        >
          <FaTrash className="text-xs" />
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="flex gap-4">
                <Link
                  to={`/product/${item.id}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}
                </Link>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-base font-semibold text-gray-900 transition hover:text-[var(--color-primary)]"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-1 text-sm text-gray-500">
                        {formatCurrency(item.price)} each
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      aria-label={`Remove ${item.name} from cart`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="inline-flex items-center rounded-full border border-gray-200">
                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        disabled={item.quantity === 1}
                        aria-label={`Decrease ${item.name} quantity`}
                        className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <FaMinus className="text-xs" />
                      </button>

                      <span
                        aria-live="polite"
                        className="flex h-9 min-w-10 items-center justify-center border-x border-gray-200 px-2 text-sm font-semibold text-gray-900"
                      >
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        aria-label={`Increase ${item.name} quantity`}
                        className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:text-gray-900"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>

                    <p className="text-base font-bold text-gray-900">
                      {formatCurrency(
                        item.price * item.quantity
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
          <h2 className="text-lg font-bold text-gray-900">
            Order summary
          </h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-500">
                Subtotal
              </span>

              <span className="font-medium text-gray-900">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-500">
                Delivery
              </span>

              <span className="font-medium text-gray-900">
                {formatCurrency(deliveryFee)}
              </span>
            </div>
          </div>

          <div className="my-6 border-t border-gray-100" />

          <div className="flex items-center justify-between gap-4">
            <span className="font-semibold text-gray-900">
              Total
            </span>

            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(total)}
            </span>
          </div>

          <Link
          to="/checkout"
          className="mt-6 flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Checkout
        </Link>

          <Link
            to="/"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <FaArrowLeft className="text-xs" />
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}