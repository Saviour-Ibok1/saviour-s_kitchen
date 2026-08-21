import { useNavigate } from "react-router-dom";

import SectionTitle from "../common/SectionTitle";
import { CATEGORIES } from "../../constants/categories";

export default function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(
      `/search?category=${encodeURIComponent(category.name)}`
    );
  };

  return (
    <section
      id="categories"
      className="mx-auto max-w-7xl px-4 py-12 lg:px-6"
    >
      <SectionTitle
        title="Browse Categories"
        description="Find your favorite meals by category."
      />

      <div
        className="
          grid
          grid-cols-2
          gap-4
          sm:grid-cols-3
          lg:grid-cols-6
        "
      >
        {CATEGORIES.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() =>
                handleCategoryClick(category)
              }
              className="
                group
                flex
                flex-col
                items-center
                justify-center
                gap-4
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[var(--color-primary)]
                hover:shadow-lg
              "
            >
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--color-primary-light)]
                  transition-colors
                  duration-300
                  group-hover:bg-[var(--color-primary)]
                "
              >
                <Icon
                  className="
                    text-2xl
                    text-[var(--color-primary)]
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                />
              </div>

              <span className="text-center font-semibold text-gray-800">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}