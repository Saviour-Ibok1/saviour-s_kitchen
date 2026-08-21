import ProductSection from "../home/ProductSection";

export default function RelatedProducts({
  title = "You May Also Like",
  products = [],
  onToggleFavorite,
  onAddToCart,
}) {
  if (products.length === 0) {
    return null;
  }

  return (
    <ProductSection
      title={title}
      subtitle="Discover more freshly prepared meals you might enjoy."
      products={products}
      onToggleFavorite={onToggleFavorite}
      onAddToCart={onAddToCart}
    />
  );
}