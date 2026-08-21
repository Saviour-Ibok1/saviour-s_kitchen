import { useState } from "react";

import { getCouponByCode } from "../../api/couponApi";

export default function CouponForm({
  appliedCoupon,
  onApply,
  onRemove,
  error,
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedCode = code.trim();

    if (!trimmedCode || loading) {
      return;
    }

    try {
      setLoading(true);

      const response =
        await getCouponByCode(trimmedCode);

      onApply(response.coupon);
      setCode("");
    } catch (requestError) {
      onApply(null, requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setCode("");
    onRemove();
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">
        Coupon code
      </h2>

      {appliedCoupon ? (
        <div className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-gray-50 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {appliedCoupon.code}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Coupon applied successfully.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="text-sm font-semibold text-gray-600 transition hover:text-gray-900"
          >
            Remove
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={code}
              onChange={(event) =>
                setCode(event.target.value)
              }
              placeholder="Enter coupon code"
              disabled={loading}
              className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50"
            />

            <button
              type="submit"
              disabled={
                loading || !code.trim()
              }
              className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Checking..."
                : "Apply"}
            </button>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}