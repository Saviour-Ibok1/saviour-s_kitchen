import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBoxOpen,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

import { getMyOrders } from "../api/orderApi";
import { useAuth } from "../hooks/useAuth";
import { formatCurrency } from "../utils/formatCurrency";

export default function Orders() {
  const { token, isAuthenticated, loading: authLoading } =
    useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated || !token) {
      setLoading(false);
      return;
    }

    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyOrders(token);

        setOrders(response.orders || []);
      } catch (requestError) {
        setError(
          requestError.message ||
            "Failed to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [authLoading, isAuthenticated, token]);

  if (authLoading || loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Loading your orders...
          </p>
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
            <FaBoxOpen className="text-2xl text-gray-300" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Sign in to view your orders
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            Your order history is available after
            signing in to your account.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Sign in
              <FaArrowRight className="text-xs" />
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            <FaArrowLeft className="text-xs" />
            Back to profile
          </Link>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500">
              Account
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              Your orders
            </h1>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
              <FaBoxOpen className="text-2xl text-gray-300" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No orders yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              Your completed orders will appear here
              after you place your first order.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Browse foods
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <article
                key={order._id}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Order
                    </p>

                    <h2 className="mt-1 text-sm font-bold text-gray-900">
                      #{order._id}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-semibold capitalize text-gray-700">
                      {order.orderStatus?.replaceAll(
                        "_",
                        " "
                      )}
                    </span>

                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={`${order._id}-${item.product}-${index}`}
                      className="flex gap-4"
                    >
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-gray-400">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-semibold text-gray-900">
                        {formatCurrency(
                          item.price *
                            item.quantity
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-gray-100 pt-5">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-gray-500">
                      Delivery to
                    </span>

                    <span className="text-right font-medium text-gray-700">
                      {order.deliveryDetails?.city},{" "}
                      {order.deliveryDetails?.state}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-4 text-sm">
                    <span className="text-gray-500">
                      Payment
                    </span>

                    <span className="font-medium capitalize text-gray-700">
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}