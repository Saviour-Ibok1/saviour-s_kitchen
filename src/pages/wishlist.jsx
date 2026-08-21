import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

import ProductCard from "../components/home/ProductCard";
import { useWishlist } from "../hooks/useWishlist";
import { PRODUCTS } from "../data/products";

export default function Wishlist() {
  const {
    wishlist,
    wishlistCount,
    toggleFavourite,
    clearWishlist,
  } = useWishlist();

  const wishlistProducts = useMemo(() => {
    return wishlist
      .map((productId) =>
        PRODUCTS.find(
          (product) => product.id === productId
        )
      )
      .filter(Boolean);
  }, [wishlist]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-50">
              <FaHeart className="text-yellow-600" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Your saved foods
              </p>

              <h1 className="text-2xl font-bold text-gray-900">
                Wishlist
              </h1>
            </div>
          </div>
        </div>

        {wishlistCount > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            Clear wishlist
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
            <FaHeart className="text-2xl text-gray-300" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-gray-900">
            Your wishlist is empty
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Save foods you love and come back to them
            whenever you're ready to order.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Browse foods
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-sm text-gray-500">
              {wishlistCount}{" "}
              {wishlistCount === 1
                ? "item"
                : "items"}{" "}
              saved
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="relative"
              >
                <ProductCard {...product} />

                <button
                  type="button"
                  onClick={() =>
                    toggleFavourite(product.id)
                  }
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-red-500 shadow-sm transition hover:bg-gray-50"
                >
                  <FaHeart />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}