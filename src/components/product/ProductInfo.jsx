import { FaStar, FaTag } from "react-icons/fa6";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductInfo({ product }) {
  if (!product) return null;

  // Safe field lookups and fallbacks for MongoDB data
  const category = product.category || "General";
  const name = product.name || "Untitled Product";
  const description = product.description || "No description available for this item.";
  const price = typeof product.price === "number" ? product.price : 0;
  
  // Rating & Review checks
  const rating = typeof product.rating === "number" ? product.rating : 0;
  const reviewCount = typeof product.reviewCount === "number" ? product.reviewCount : 0;

  // Availability normalization across schemas
  const isAvailable =
    product.available ??
    product.isAvailable ??
    (typeof product.stock === "number" ? product.stock > 0 : true);

  return (
    <section className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-light)] px-4 py-2 text-sm font-medium text-[var(--color-primary)]">
          <FaTag />
          {category}
        </span>

        <h1 className="mt-5 text-3xl font-bold text-gray-900 lg:text-4xl">
          {name}
        </h1>

        <div className="mt-4 flex items-center gap-3">
          <FaStar className="text-[var(--color-primary)]" />

          <span className="font-semibold">
            {rating.toFixed(1)}
          </span>

          <span className="text-gray-500">
            ({reviewCount} {reviewCount === 1 ? "Review" : "Reviews"})
          </span>
        </div>
      </div>

      <p className="text-2xl font-bold text-[var(--color-primary)]">
        {formatCurrency(price)}
      </p>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          Description
        </h2>

        <p className="leading-8 text-gray-600">
          {description}
        </p>
      </div>

      <div>
        <span
          className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${
            isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>
    </section>
  );
}