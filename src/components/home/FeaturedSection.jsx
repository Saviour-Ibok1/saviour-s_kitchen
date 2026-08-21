import ProductSection from "./ProductSection";

export default function FeaturedSection({
  title = "Featured Meals",
  subtitle = "Freshly prepared meals selected by our chefs and loved by our customers.",
  products = [],
  viewAllLink,
  viewAllText = "View All",
}) {
  return (
    <ProductSection
      title={title}
      subtitle={subtitle}
      products={products}
      viewAllLink={viewAllLink}
      viewAllText={viewAllText}
    />
  );
}