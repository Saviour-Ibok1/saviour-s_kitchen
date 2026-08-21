import { FaStar } from "react-icons/fa6";

export default function RatingStars({
  rating = 0,
  maxRating = 5,
  size = "sm",
  interactive = false,
  onChange,
}) {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const starSize =
    sizeClasses[size] || sizeClasses.sm;

  const handleRatingChange = (value) => {
    if (!interactive || !onChange) {
      return;
    }

    onChange(value);
  };

  return (
    <div
      className="inline-flex items-center gap-1"
      role={interactive ? "radiogroup" : undefined}
      aria-label={
        interactive
          ? "Select rating"
          : `Rating: ${rating} out of ${maxRating}`
      }
    >
      {Array.from(
        { length: maxRating },
        (_, index) => {
          const value = index + 1;
          const isActive = value <= rating;

          if (interactive) {
            return (
              <button
                key={value}
                type="button"
                onClick={() =>
                  handleRatingChange(value)
                }
                role="radio"
                aria-checked={value === rating}
                aria-label={`${value} star${
                  value === 1 ? "" : "s"
                }`}
                className={`${starSize} transition ${
                  isActive
                    ? "text-yellow-400"
                    : "text-gray-200"
                } hover:text-yellow-400`}
              >
                <FaStar />
              </button>
            );
          }

          return (
            <FaStar
              key={value}
              className={`${starSize} ${
                isActive
                  ? "text-yellow-400"
                  : "text-gray-200"
              }`}
              aria-hidden="true"
            />
          );
        }
      )}
    </div>
  );
}