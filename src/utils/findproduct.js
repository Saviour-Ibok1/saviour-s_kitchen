import { PRODUCTS } from "../data/products";

export function findProduct(identifier) {
  if (!identifier) return null;

  return (
    PRODUCTS.find(
      (product) =>
        product.id === identifier || product.slug === identifier
    ) || null
  );
}