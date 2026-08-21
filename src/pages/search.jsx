import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaFilter,
  FaMagnifyingGlass,
  FaXmark,
} from "react-icons/fa6";

import ProductCard from "../components/home/ProductCard";
import { PRODUCTS } from "../data/products";
import { formatCurrency } from "../utils/formatCurrency";

const ALL_CATEGORIES = "All categories";

export default function Search() {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("q")?.trim() || "";
  const categoryQuery =
    searchParams.get("category")?.trim() || "";

  const categories = useMemo(() => {
    return [
      ALL_CATEGORIES,
      ...new Set(
        PRODUCTS.map((product) => product.category)
      ),
    ];
  }, []);

  const maxProductPrice = useMemo(() => {
    return Math.max(
      ...PRODUCTS.map((product) => product.price)
    );
  }, []);

  const initialCategory = categories.includes(
    categoryQuery
  )
    ? categoryQuery
    : ALL_CATEGORIES;

  const [selectedCategory, setSelectedCategory] =
    useState(initialCategory);

  const [availability, setAvailability] =
    useState("all");

  const [maxPrice, setMaxPrice] =
    useState(maxProductPrice);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return PRODUCTS.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const category =
        product.category?.toLowerCase() || "";
      const description =
        product.description?.toLowerCase() || "";

      const matchesSearch =
        !query ||
        name.includes(query) ||
        category.includes(query) ||
        description.includes(query);

      const matchesCategory =
        selectedCategory === ALL_CATEGORIES ||
        product.category === selectedCategory;

      const matchesAvailability =
        availability === "all" ||
        (availability === "available" &&
          product.available) ||
        (availability === "unavailable" &&
          !product.available);

      const matchesPrice =
        product.price <= maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability &&
        matchesPrice
      );
    });
  }, [
    searchQuery,
    selectedCategory,
    availability,
    maxPrice,
  ]);

  const hasActiveFilters =
    selectedCategory !== ALL_CATEGORIES ||
    availability !== "all" ||
    maxPrice < maxProductPrice;

  const clearFilters = () => {
    setSelectedCategory(ALL_CATEGORIES);
    setAvailability("all");
    setMaxPrice(maxProductPrice);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-50">
            <FaMagnifyingGlass className="text-yellow-600" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Search results
            </p>

            <h1 className="text-2xl font-bold text-gray-900">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : selectedCategory !== ALL_CATEGORIES
                  ? selectedCategory
                  : "Browse foods"}
            </h1>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() =>
              setFiltersOpen((open) => !open)
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-gray-200
              px-5
              py-3
              text-sm
              font-semibold
              text-gray-700
              transition
              hover:border-yellow-300
              hover:bg-yellow-50
            "
          >
            <FaFilter />

            <span>Filters</span>

            {hasActiveFilters && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-xs text-white">
                !
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
              <FaXmark />
              Clear filters
            </button>
          )}
        </div>

        {filtersOpen && (
          <div className="mt-6 grid gap-6 border-t border-gray-100 pt-6 md:grid-cols-3">
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Category
              </label>

              <select
                id="category"
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(
                    event.target.value
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-[var(--color-primary)]
                "
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="availability"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Availability
              </label>

              <select
                id="availability"
                value={availability}
                onChange={(event) =>
                  setAvailability(event.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-[var(--color-primary)]
                "
              >
                <option value="all">
                  All products
                </option>

                <option value="available">
                  Available
                </option>

                <option value="unavailable">
                  Currently unavailable
                </option>
              </select>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="max-price"
                  className="text-sm font-semibold text-gray-800"
                >
                  Maximum price
                </label>

                <span className="text-sm font-medium text-gray-600">
                  {formatCurrency(maxPrice)}
                </span>
              </div>

              <input
                id="max-price"
                type="range"
                min="0"
                max={maxProductPrice}
                step="100"
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(
                    Number(event.target.value)
                  )
                }
                className="w-full accent-yellow-600"
              />

              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>{formatCurrency(0)}</span>
                <span>
                  {formatCurrency(maxProductPrice)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {!searchQuery && !hasActiveFilters ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
          <FaMagnifyingGlass className="mx-auto text-3xl text-gray-300" />

          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            Search or browse our foods
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Search for a food by name, category, or
            description, or use the filters to narrow your
            choices.
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            No matching foods found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Try changing your search or adjusting your
            filters.
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "food"
                : "foods"}{" "}
              found
            </p>

            {searchQuery && (
              <Link
                to="/search"
                className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
              >
                Clear search
              </Link>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}