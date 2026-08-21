import { useState } from "react";
import {
  FaCheck,
  FaCopy,
  FaTicket,
} from "react-icons/fa6";

import SectionTitle from "../components/common/SectionTitle";
import { COUPONS } from "../data/coupons";
import { formatCurrency } from "../utils/formatCurrency";

export default function Coupons() {
  const [copiedCode, setCopiedCode] = useState("");

  const activeCoupons = COUPONS.filter(
    (coupon) => coupon.active
  );

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);

      window.setTimeout(() => {
        setCopiedCode("");
      }, 2000);
    } catch {
      setCopiedCode("");
    }
  };

  const getCouponValue = (coupon) => {
    if (coupon.type === "percentage") {
      return `${coupon.value}% OFF`;
    }

    if (coupon.type === "fixed") {
      return `${formatCurrency(coupon.value)} OFF`;
    }

    return "FREE DELIVERY";
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-12">
      <div className="mb-10 rounded-3xl bg-[var(--color-primary-light)] p-8 sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
          <FaTicket />
          Coupons
        </div>

        <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
          Save More on Your Orders
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          Copy an available coupon code and apply it during checkout to enjoy
          special savings.
        </p>
      </div>

      <SectionTitle
        title="Available Coupons"
        subtitle="Choose a coupon that matches your order and copy its code."
      />

      {activeCoupons.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
            <FaTicket className="text-2xl text-[var(--color-primary)]" />
          </div>

          <h2 className="mt-6 text-xl font-bold text-gray-900">
            No Coupons Available
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-gray-500">
            There are no active coupons available right now. Check back later
            for new discounts.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {activeCoupons.map((coupon) => {
            const copied = copiedCode === coupon.code;

            return (
              <article
                key={coupon.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="border-b border-dashed border-gray-200 bg-gray-50 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {coupon.title}
                      </p>

                      <p className="mt-2 text-2xl font-bold text-[var(--color-primary)]">
                        {getCouponValue(coupon)}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
                      <FaTicket className="text-lg text-[var(--color-primary)]" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-6 text-gray-600">
                    {coupon.description}
                  </p>

                  <p className="mt-4 text-xs text-gray-500">
                    Minimum order:{" "}
                    <span className="font-semibold text-gray-700">
                      {formatCurrency(coupon.minimumOrder)}
                    </span>
                  </p>

                  <div className="mt-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-2">
                    <span className="flex-1 px-3 text-sm font-bold tracking-wider text-gray-900">
                      {coupon.code}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopy(coupon.code)}
                      className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      {copied ? (
                        <>
                          <FaCheck />
                          Copied
                        </>
                      ) : (
                        <>
                          <FaCopy />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}