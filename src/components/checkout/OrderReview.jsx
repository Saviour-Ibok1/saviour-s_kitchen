import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa6";

import { formatCurrency } from "../../utils/formatCurrency";

export default function OrderReview({
  items = [],
  totals,
  formData,
}) {
  const {
    subtotal = 0,
    deliveryFee = 0,
    discount = 0,
    tax = 0,
    total = 0,
  } = totals || {};

  const hasCustomerDetails =
    formData?.fullName ||
    formData?.phone ||
    formData?.address ||
    formData?.city ||
    formData?.state ||
    formData?.deliveryNote;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Review
          </p>

          <h2 className="mt-1 text-lg font-bold text-gray-900">
            Your order
          </h2>
        </div>

        <Link
          to="/cart"
          aria-label="Edit cart"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
        >
          <FaPen className="text-xs" />
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
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
                item.price * item.quantity
              )}
            </p>
          </div>
        ))}
      </div>

      {hasCustomerDetails && (
        <>
          <div className="my-6 border-t border-gray-100" />

          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Delivery details
            </h3>

            <div className="mt-3 space-y-1 text-sm text-gray-500">
              {formData.fullName && (
                <p>{formData.fullName}</p>
              )}

              {formData.phone && (
                <p>{formData.phone}</p>
              )}

              {formData.address && (
                <p>{formData.address}</p>
              )}

              {(formData.city || formData.state) && (
                <p>
                  {[formData.city, formData.state]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}

              {formData.deliveryNote && (
                <p className="pt-2">
                  Note: {formData.deliveryNote}
                </p>
              )}
            </div>
          </div>
        </>
      )}

      <div className="my-6 border-t border-gray-100" />

      <div className="space-y-3 text-sm">
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

        {discount > 0 && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-500">
              Discount
            </span>

            <span className="font-medium text-[var(--color-primary)]">
              -{formatCurrency(discount)}
            </span>
          </div>
        )}

        {tax > 0 && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-500">
              Tax
            </span>

            <span className="font-medium text-gray-900">
              {formatCurrency(tax)}
            </span>
          </div>
        )}
      </div>

      <div className="my-5 border-t border-gray-100" />

      <div className="flex items-center justify-between gap-4">
        <span className="font-semibold text-gray-900">
          Total
        </span>

        <span className="text-xl font-bold text-gray-900">
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  );
}