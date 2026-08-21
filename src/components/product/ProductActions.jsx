import { useState } from "react";
import {
  FaMinus,
  FaPlus,
  FaCartPlus,
} from "react-icons/fa6";

import { useCart } from "../../hooks/useCart";

export default function ProductActions({
  product,
}) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1)
    );
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={decreaseQuantity}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-gray-200
            transition
            hover:border-[var(--color-primary)]
          "
        >
          <FaMinus />
        </button>

        <span className="w-10 text-center text-lg font-semibold">
          {quantity}
        </span>

        <button
          type="button"
          aria-label="Increase quantity"
          onClick={increaseQuantity}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-gray-200
            transition
            hover:border-[var(--color-primary)]
          "
        >
          <FaPlus />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="
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
        "
      >
        <FaCartPlus />

        Add to Cart
      </button>
    </div>
  );
}