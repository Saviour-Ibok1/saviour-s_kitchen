import SectionTitle from "../common/SectionTitle";
import ProductCard from "./ProductCard";

export default function ProductSection({
  title,
  subtitle,
  products = [],
  viewAllLink,
  viewAllText = "View All",
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <SectionTitle
        title={title}
        description={subtitle}
      />

      {products.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">
            No products available at the moment.
          </p>
        </div>
      ) : (
        <div
          className="
            mt-8
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {products.map((product) => (
            <ProductCard
              key={product._id || product.productId || product.id}
              id={product._id || product.productId || product.id}
              {...product}
            />
          ))}
        </div>
      )}

      {viewAllLink && (
        <div className="mt-8 text-center">
          <a
            href={viewAllLink}
            className="text-sm font-semibold text-[var(--color-primary)] transition hover:opacity-80"
          >
            {viewAllText}
          </a>
        </div>
      )}
    </section>
  );
}