import {
  FaArrowRight,
  FaTrashCan,
} from "react-icons/fa6";

import { formatCurrency } from "../../utils/formatCurrency";

export default function CartSummary({
  totals = {},
  itemCount = 0,
  onCheckout,
  onClearCart,
}) {
  const {
    subtotal = 0,
    deliveryFee = 0,
    discount = 0,
    tax = 0,
    total = 0,
  } = totals;

  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Order Summary
      </h2>

      <p className="mt-2 text-sm text-gray-600">
        {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
      </p>

      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            Subtotal
          </span>

          <span className="font-semibold">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            Delivery Fee
          </span>

          <span className="font-semibold">
            {formatCurrency(deliveryFee)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            Discount
          </span>

          <span
            className={
              discount > 0
                ? "font-semibold text-green-600"
                : "font-semibold text-gray-500"
            }
          >
            {discount > 0
              ? `−${formatCurrency(discount)}`
              : formatCurrency(0)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            Tax
          </span>

          <span className="font-semibold">
            {formatCurrency(tax)}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-5">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">
              Total
            </span>

            <span className="text-2xl font-bold text-[var(--color-primary)]">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={itemCount === 0}
        onClick={onCheckout}
        className="
          mt-8
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          bg-[var(--color-primary)]
          px-6
          py-4
          font-semibold
          text-white
          transition
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:bg-gray-300
        "
      >
        Proceed to Checkout

        <FaArrowRight />
      </button>

      <button
        type="button"
        disabled={itemCount === 0}
        onClick={onClearCart}
        className="
          mt-4
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          border
          border-red-200
          px-6
          py-4
          font-medium
          text-red-600
          transition
          hover:bg-red-50
          disabled:cursor-not-allowed
          disabled:border-gray-200
          disabled:text-gray-400
        "
      >
        <FaTrashCan />

        Clear Cart
      </button>
    </aside>
  );
}