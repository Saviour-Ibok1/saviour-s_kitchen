import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaHeart,
  FaMinus,
  FaPlus,
  FaBagShopping,
  FaSpinner,
} from "react-icons/fa6";

import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { formatCurrency } from "../utils/formatCurrency";

import ProductReviews from "../components/product/ProductReviews";
import ReviewForm from "../components/product/ReviewForm";

export default function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();
  const { isFavourite, toggleFavourite } = useWishlist();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Adjust API endpoint URL if needed according to your backend environment setup
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || "An error occurred while loading product details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (isLoading) {
    return (
      <section className="mx-auto flex min-h-[400px] max-w-7xl items-center justify-center px-4 py-16">
        <div className="flex items-center gap-3 text-gray-600">
          <FaSpinner className="h-6 w-6 animate-spin text-[var(--color-primary)]" />
          <span className="text-sm font-medium">Loading product details...</span>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center lg:px-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Product not found
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          {error || "The food item you are looking for could not be found."}
        </p>

        <Link
          to="/search"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <FaArrowLeft className="text-xs" />
          Back to menu
        </Link>
      </section>
    );
  }

  // Handle schema normalization for MongoDB (_id vs id, available vs isAvailable)
  const productId = product._id || product.id;
  const isAvailable =
    product.available ??
    product.isAvailable ??
    (typeof product.stock === "number" ? product.stock > 0 : true);

  const favourite = isFavourite(productId);

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const handleAddToCart = () => {
    if (!isAvailable) return;

    addToCart(
      {
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );
  };

  const handleFavourite = () => {
    toggleFavourite(productId);
  };

  const handleWriteReview = () => {
    setIsReviewFormOpen(true);
  };

  const handleCancelReview = () => {
    setIsReviewFormOpen(false);
  };

  const handleReviewSubmit = () => {
    setIsReviewFormOpen(false);
  };

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <Link
          to="/search"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          <FaArrowLeft className="text-xs" />
          Back to menu
        </Link>

        <div className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-2">
          <div className="relative aspect-square bg-gray-100 lg:aspect-auto lg:min-h-[560px]">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name || "Product image"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[400px] items-center justify-center text-sm text-gray-400">
                No image available
              </div>
            )}

            <button
              type="button"
              onClick={handleFavourite}
              aria-label={
                favourite
                  ? `Remove ${product.name} from wishlist`
                  : `Add ${product.name} to wishlist`
              }
              className={`absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border bg-white shadow-sm transition ${
                favourite
                  ? "border-red-100 text-red-500"
                  : "border-gray-200 text-gray-500 hover:text-red-500"
              }`}
            >
              <FaHeart />
            </button>

            {!isAvailable && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-800">
                  Currently unavailable
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:p-12">
            <div>
              <p className="text-sm font-medium text-gray-500">
                {product.category || "General"}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                {product.name}
              </h1>

              <p className="mt-5 text-2xl font-bold text-gray-900">
                {formatCurrency(product.price || 0)}
              </p>

              <p className="mt-6 text-base leading-7 text-gray-600">
                {product.description || "No description provided."}
              </p>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Quantity
                </p>

                <div className="mt-3 inline-flex items-center rounded-full border border-gray-200">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                    aria-label="Decrease quantity"
                    className="flex h-11 w-11 items-center justify-center text-gray-600 transition hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaMinus className="text-xs" />
                  </button>

                  <span
                    aria-live="polite"
                    className="flex h-11 min-w-12 items-center justify-center border-x border-gray-200 px-3 text-sm font-semibold text-gray-900"
                  >
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                    className="flex h-11 w-11 items-center justify-center text-gray-600 transition hover:text-gray-900"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[var(--color-primary)] px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaBagShopping />

                {isAvailable
                  ? "Add to cart"
                  : "Currently unavailable"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <ProductReviews
        reviews={product.reviews || []}
        onWriteReview={handleWriteReview}
      />

      {isReviewFormOpen && (
        <section className="mx-auto max-w-7xl px-4 pb-12 lg:px-6">
          <ReviewForm
            onSubmit={handleReviewSubmit}
            onCancel={handleCancelReview}
          />
        </section>
      )}
    </>
  );
}