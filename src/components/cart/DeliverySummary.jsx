import {
  FaLocationDot,
  FaTruckFast,
  FaStore,
  FaClock,
} from "react-icons/fa6";

import { formatCurrency } from "../../utils/formatCurrency";

export default function DeliverySummary({
  delivery = {},
}) {
  const {
    method = "Delivery",
    address = "",
    estimatedTime = "",
    fee = 0,
  } = delivery;

  const isPickup = method === "Pickup";

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">
        Delivery Information
      </h2>

      <div className="mt-6 space-y-5">
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
            {isPickup ? (
              <FaStore className="text-[var(--color-primary)]" />
            ) : (
              <FaTruckFast className="text-[var(--color-primary)]" />
            )}
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              Delivery Method
            </p>

            <p className="mt-1 text-gray-600">
              {method}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
            <FaLocationDot className="text-[var(--color-primary)]" />
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              Delivery Address
            </p>

            {address ? (
              <p className="mt-1 leading-7 text-gray-600">
                {address}
              </p>
            ) : (
              <p className="mt-1 text-gray-500">
                Your delivery address will appear here during checkout.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
            <FaClock className="text-[var(--color-primary)]" />
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              Estimated Delivery Time
            </p>

            <p className="mt-1 text-gray-600">
              {estimatedTime || "Calculated after checkout."}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">
              Delivery Fee
            </span>

            <span className="font-bold text-[var(--color-primary)]">
              {formatCurrency(fee)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}