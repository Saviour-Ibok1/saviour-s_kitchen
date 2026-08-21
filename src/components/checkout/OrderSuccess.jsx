import {
  FaArrowRight,
  FaCircleCheck,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

import { formatCurrency } from "../../utils/formatCurrency";

export default function OrderSuccess() {
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Order not found
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            We could not find the order details for this
            page.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Continue shopping
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <FaCircleCheck className="text-3xl text-green-500" />
          </div>

          <p className="mt-6 text-sm font-medium text-gray-500">
            Order confirmed
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            Thank you for your order
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            Your order has been received and is now
            being processed.
          </p>

          <div className="mt-8 rounded-2xl bg-gray-50 p-5 text-left">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500">
                Order number
              </span>

              <span className="break-all text-right text-sm font-semibold text-gray-900">
                #{order._id}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500">
                Total
              </span>

              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(order.total)}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500">
                Status
              </span>

              <span className="text-sm font-semibold capitalize text-gray-900">
                {order.orderStatus?.replaceAll(
                  "_",
                  " "
                )}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to={`/orders/${order._id}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              View order
              <FaArrowRight className="text-xs" />
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

