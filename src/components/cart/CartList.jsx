import CartItem from "./CartItem";

export default function CartList({
  title = "Your Cart",
  items = [],
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {title}
          </h1>

          <p className="mt-2 text-gray-600">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
}