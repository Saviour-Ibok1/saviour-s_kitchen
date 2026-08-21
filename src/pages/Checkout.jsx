import {
  useMemo,
  useState,
} from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import {
  FaArrowLeft,
  FaBagShopping,
  FaLock,
} from "react-icons/fa6";

import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

import { createOrder } from "../api/orderApi";

import { formatCurrency } from "../utils/formatCurrency";
import { calculateCartTotals } from "../utils/calculateCartTotals";

import CheckoutForm from "../components/checkout/CheckoutForm";
import CouponForm from "../components/cart/CouponForm";
import OrderReview from "../components/checkout/OrderReview";

const INITIAL_FORM_DATA = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  deliveryNote: "",
};

export default function Checkout() {
  const navigate = useNavigate();

  const {
    items,
    totals: cartTotals,
    clearCart,
  } = useCart();

  const {
    token,
    isAuthenticated,
  } = useAuth();

  const [formData, setFormData] = useState(
    INITIAL_FORM_DATA
  );

  const [appliedCoupon, setAppliedCoupon] =
    useState(null);

  const [couponError, setCouponError] =
    useState("");

  const [submitError, setSubmitError] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setSubmitError("");
  };

  const handleApplyCoupon = (
    coupon,
    validationError
  ) => {
    setCouponError(
      validationError || ""
    );

    if (!coupon) {
      setAppliedCoupon(null);
      return;
    }

    if (
      coupon.minimumOrder &&
      cartTotals.subtotal < coupon.minimumOrder
    ) {
      setCouponError(
        `This coupon requires a minimum order of ${formatCurrency(
          coupon.minimumOrder
        )}.`
      );

      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon(coupon);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
  };

  const discount = useMemo(() => {
    if (!appliedCoupon) {
      return 0;
    }

    if (
      appliedCoupon.type ===
      "percentage"
    ) {
      return (
        cartTotals.subtotal *
        (appliedCoupon.value / 100)
      );
    }

    if (
      appliedCoupon.type === "fixed"
    ) {
      return Math.min(
        appliedCoupon.value,
        cartTotals.subtotal
      );
    }

    return 0;
  }, [
    appliedCoupon,
    cartTotals.subtotal,
  ]);

  const deliveryFee = useMemo(() => {
    if (
      appliedCoupon?.type ===
      "free_delivery"
    ) {
      return 0;
    }

    return cartTotals.deliveryFee;
  }, [
    appliedCoupon,
    cartTotals.deliveryFee,
  ]);

  const totals = useMemo(
    () =>
      calculateCartTotals(
        items,
        discount,
        deliveryFee
      ),
    [
      items,
      discount,
      deliveryFee,
    ]
  );

  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "phone",
      "address",
      "city",
      "state",
    ];

    const hasMissingField =
      requiredFields.some(
        (field) =>
          !formData[field]?.trim()
      );

    if (hasMissingField) {
      setSubmitError(
        "Please complete all required delivery information."
      );

      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    setSubmitError("");

    if (!isAuthenticated || !token) {
      navigate("/login", {
        state: {
          from: "/checkout",
        },
      });

      return;
    }

    if (!validateForm()) {
      return;
    }

    if (items.length === 0) {
      setSubmitError(
        "Your cart is empty."
      );

      return;
    }

    try {
      setSubmitting(true);

      const orderItems = items.map(
        (item) => ({
          product: item.id,
          quantity: item.quantity,
        })
      );

      const response = await createOrder(
        token,
        {
          items: orderItems,
          deliveryDetails: formData,
          coupon:
            appliedCoupon?.code || "",
        }
      );

      clearCart();

      navigate("/order-success", {
        replace: true,
        state: {
          order: response.order,
        },
      });
    } catch (error) {
      setSubmitError(
        error.message ||
          "Failed to place your order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
            <FaBagShopping className="text-2xl text-gray-300" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            Add some foods to your cart before
            continuing to checkout.
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
      <div className="mb-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          <FaArrowLeft className="text-xs" />
          Back to cart
        </Link>

        <div className="mt-6">
          <p className="text-sm font-medium text-gray-500">
            Complete your order
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            Checkout
          </h1>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50">
                <FaLock className="text-sm text-gray-500" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Delivery information
                </h2>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Enter your details so your order can
                  be prepared for delivery.
                </p>
              </div>
            </div>

            <CheckoutForm
              formData={formData}
              onChange={handleFormChange}
            />
          </div>

          <CouponForm
            appliedCoupon={appliedCoupon}
            onApply={handleApplyCoupon}
            onRemove={handleRemoveCoupon}
            error={couponError}
          />

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Payment
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Payment will be connected after the
              order creation flow is verified.
            </p>

            <div className="mt-5 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-5 py-6 text-center">
              <p className="text-sm font-medium text-gray-700">
                Payment integration coming later
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
          <OrderReview
            items={items}
            totals={totals}
            formData={formData}
          />

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            {submitError && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600"
              >
                {submitError}
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-gray-900">
                Total
              </span>

              <span className="text-xl font-bold text-gray-900">
                {formatCurrency(totals.total)}
              </span>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={submitting}
              className="mt-6 w-full rounded-full bg-[var(--color-primary)] px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Placing order..."
                : "Place order"}
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-gray-400">
              Your order will be created securely
              using your account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}