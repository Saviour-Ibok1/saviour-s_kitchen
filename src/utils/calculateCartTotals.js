export function calculateCartTotals(
  items = [],
  discount = 0,
  deliveryFeeOverride = null
) {
  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryFee =
    deliveryFeeOverride !== null
      ? Math.max(0, deliveryFeeOverride)
      : 0;

  const safeDiscount = Math.min(
    Math.max(0, discount),
    subtotal
  );

  const tax = 0;

  const total =
    subtotal +
    deliveryFee +
    tax -
    safeDiscount;

  return {
    subtotal,
    deliveryFee,
    discount: safeDiscount,
    tax,
    total,
  };
}