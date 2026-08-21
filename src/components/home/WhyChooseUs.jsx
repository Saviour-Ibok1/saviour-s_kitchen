import {
  FaLeaf,
  FaTruckFast,
  FaShieldHalved,
  FaUtensils,
} from "react-icons/fa6";

const FEATURES = [
  {
    title: "Fresh Ingredients",
    description:
      "Every meal is prepared using carefully selected fresh ingredients.",
    icon: FaLeaf,
  },
  {
    title: "Fast Delivery",
    description:
      "Orders are prepared quickly for timely delivery or pickup.",
    icon: FaTruckFast,
  },
  {
    title: "Secure Payments",
    description:
      "Payments will be processed through trusted and secure payment providers.",
    icon: FaShieldHalved,
  },
  {
    title: "Quality Meals",
    description:
      "Meals are prepared with attention to quality and consistency.",
    icon: FaUtensils,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Why Choose Saviour's Kitchen
        </h2>

        <p className="mx-auto mt-3 max-w-3xl text-gray-600">
          We focus on quality meals, reliable service, and a smooth ordering
          experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.title}
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-8
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
                <Icon className="text-2xl text-[var(--color-primary)]" />
              </div>

              <h3 className="text-lg font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {feature.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}