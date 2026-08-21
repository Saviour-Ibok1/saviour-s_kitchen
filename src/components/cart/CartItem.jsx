import { Link } from "react-router-dom";
import {
  FaMinus,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";

import { formatCurrency } from "../../utils/formatCurrency";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const {
    id,
    slug,
    image,
    name,
    category,
    price,
    quantity,
    available = true,
  } = item;

  const itemTotal = price * quantity;

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row">
        <Link
          to={`/product/${slug}`}
          className="mx-auto w-full max-w-[180px] shrink-0 sm:mx-0"
        >
          <img
            src={image || "/images/placeholder-food.jpg"}
            alt={name}
            className="h-40 w-full rounded-xl object-cover"
            loading="lazy"
          />
        </Link>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <span className="inline-block rounded-full bg-[var(--color-primary-light)] px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
              {category}
            </span>

            <Link
              to={`/product/${slug}`}
              className="mt-3 block hover:text-[var(--color-primary)]"
            >
              <h2 className="text-xl font-semibold">
                {name}
              </h2>
            </Link>

            <p className="mt-3 text-lg font-bold text-[var(--color-primary)]">
              {formatCurrency(price)}
            </p>

            {!available && (
              <p className="mt-2 text-sm font-medium text-red-600">
                Currently unavailable
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => onDecrease?.(id)}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-200
                  transition
                  hover:border-[var(--color-primary)]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <FaMinus />
              </button>

              <span className="w-8 text-center font-semibold">
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                disabled={!available}
                onClick={() => onIncrease?.(id)}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-200
                  transition
                  hover:border-[var(--color-primary)]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <FaPlus />
              </button>
            </div>

            <div className="flex items-center justify-between gap-6">
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(itemTotal)}
              </span>

              <button
                type="button"
                aria-label={`Remove ${name} from cart`}
                onClick={() => onRemove?.(id)}
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-red-200
                  text-red-600
                  transition
                  hover:bg-red-50
                "
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}