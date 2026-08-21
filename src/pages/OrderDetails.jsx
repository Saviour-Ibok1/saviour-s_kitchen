import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBoxOpen,
} from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

import { getOrderById } from "../api/orderApi";
import { useAuth } from "../hooks/useAuth";
import { formatCurrency } from "../utils/formatCurrency";

export default function OrderDetails() {
  const { id } = useParams();
  const { token, isAuthenticated, loading: authLoading } =
    useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated || !token || !id) {
      setLoading(false);
      return;
    }

    const loadOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getOrderById(
          token,
          id
        );

        setOrder(response.order);
      } catch (requestError) {
        setError(
          requestError.message ||
            "Failed to load the order."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [authLoading, id, isAuthenticated, token]);

  if (authLoading || loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Loading order...
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
            Sign in to view this order
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            Sign in to access your order details.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex items-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
            <FaBoxOpen className="text-2xl text-gray-300" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Order not found
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            {error ||
              "We could not find this order."}
          </p>

          <Link
            to="/orders"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <FaArrowLeft className="text-xs" />
            Back to orders
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          <FaArrowLeft className="text-xs" />
          Back to orders
        </Link>

        <div className="mt-6">
          <p className="text-sm font-medium text-gray-500">
            Order details
          </p>

          <h1 className="mt-1 break-all text-2xl font-bold text-gray-900 sm:text-3xl">
            Order #{order._id}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {new Date(
              order.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Order status
                </p>

                <p className="mt-1 text-lg font-bold capitalize text-gray-900">
                  {order.orderStatus?.replaceAll(
                    "_",
                    " "
                  )}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-sm font-medium text-gray-500">
                  Total
                </p>

                <p className="mt-1 text-xl font-bold text-gray-900">
                  {formatCurrency(order.total)}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={`${item.product}-${index}`}
                  className="flex gap-4"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
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
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-gray-900">
              Delivery details
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Full name
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {order.deliveryDetails?.fullName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Phone
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {order.deliveryDetails?.phone}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Address
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {order.deliveryDetails?.address}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Location
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {order.deliveryDetails?.city},{" "}
                  {order.deliveryDetails?.state}
                </p>
              </div>

              {order.deliveryDetails?.deliveryNote && (
                <div className="sm:col-span-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Delivery note
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {
                      order.deliveryDetails
                        .deliveryNote
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-gray-900">
              Payment summary
            </h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-medium text-gray-900">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-500">
                  Delivery
                </span>

                <span className="font-medium text-gray-900">
                  {formatCurrency(
                    order.deliveryFee
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-500">
                  Discount
                </span>

                <span className="font-medium text-gray-900">
                  -{formatCurrency(order.discount)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-500">
                  Tax
                </span>

                <span className="font-medium text-gray-900">
                  {formatCurrency(order.tax)}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-gray-900">
                    Total
                  </span>

                  <span className="text-xl font-bold text-gray-900">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-5">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-gray-500">
                  Payment status
                </span>

                <span className="font-medium capitalize text-gray-700">
                  {order.paymentStatus}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-4 text-sm">
                <span className="text-gray-500">
                  Payment method
                </span>

                <span className="font-medium capitalize text-gray-700">
                  {order.paymentMethod}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}