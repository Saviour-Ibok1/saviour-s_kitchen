import { FaTag } from "react-icons/fa6";

import SectionTitle from "../components/common/SectionTitle";
import ProductCard from "../components/product/ProductCard";
import { PRODUCTS } from "../data/products";
import { OFFERS } from "../data/offers";

export default function Offers() {
  const offerProducts = OFFERS.filter(
    (offer) => offer.active
  )
    .map((offer) => {
      const product = PRODUCTS.find(
        (item) => item.id === offer.productId
      );

      if (!product) {
        return null;
      }

      return {
        ...product,
        price: offer.offerPrice,
        originalPrice: offer.originalPrice,
      };
    })
    .filter(Boolean);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-12">
      <div className="mb-10 rounded-3xl bg-[var(--color-primary-light)] p-8 sm:p-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
              <FaTag />
              Special Offers
            </div>

            <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
              Fresh Meals, Special Prices
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              Enjoy selected meals at special prices while the offers last.
            </p>
          </div>
        </div>
      </div>

      <SectionTitle
        title="Available Offers"
        subtitle="Explore meals currently available at promotional prices."
      />

      {offerProducts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
            <FaTag className="text-2xl text-[var(--color-primary)]" />
          </div>

          <h2 className="mt-6 text-xl font-bold text-gray-900">
            No Offers Available
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-gray-500">
            There are no special offers available right now. Check back later
            for new promotions.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {offerProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>
      )}
    </section>
  );
}