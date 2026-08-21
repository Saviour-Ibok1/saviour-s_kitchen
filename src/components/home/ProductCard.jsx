import { Link } from "react-router-dom";
import {
  FaHeart,
  FaPlus,
  FaBagShopping,
} from "react-icons/fa6";

import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductCard({
  _id,
  id: propId,
  productId,
  name,
  category,
  image,
  description,
  price,
  available,
  isAvailable,
  stock,
}) {
  const { addToCart } = useCart();
  const { toggleFavourite, isFavourite } = useWishlist();

  // Resolve MongoDB primary identifier safely
  const productIdValue = _id || productId || propId;

  // Resolve availability status across database variants
  const isItemAvailable =
    available ?? isAvailable ?? (typeof stock === "number" ? stock > 0 : true);

  // Extract valid image URL string if image is passed as an object
  const imageUrl = typeof image === "object" && image !== null ? image.url : image;

  const favourite = isFavourite(productIdValue);

  const handleAddToCart = () => {
    if (!isItemAvailable) return;

    addToCart({
      id: productIdValue,
      name,
      price,
      image: imageUrl,
      quantity: 1,
    });
  };

  const handleFavourite = () => {
    if (productIdValue) {
      toggleFavourite(productIdValue);
    }
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Link to={`/product/${productIdValue}`}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No image available
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={handleFavourite}
          aria-label={
            favourite
              ? `Remove ${name} from wishlist`
              : `Add ${name} to wishlist`
          }
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm transition ${
            favourite
              ? "border-red-100 text-red-500"
              : "border-gray-200 text-gray-500 hover:text-red-500"
          }`}
        >
          <FaHeart />
        </button>

        {!isItemAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-800">
              Currently unavailable
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs font-medium text-gray-500">
          {category}
        </p>

        <Link to={`/product/${productIdValue}`}>
          <h2 className="mt-1 line-clamp-1 text-base font-semibold text-gray-900 transition hover:text-[var(--color-primary)]">
            {name}
          </h2>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(price)}
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isItemAvailable}
            className="
              inline-flex
              h-10
              items-center
              gap-2
              rounded-full
              bg-[var(--color-primary)]
              px-4
              text-sm
              font-semibold
              text-white
              transition
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <FaBagShopping />

            <span className="hidden sm:inline">
              Add
            </span>

            <FaPlus className="text-xs sm:hidden" />
          </button>
        </div>
      </div>
    </article>
  );
}