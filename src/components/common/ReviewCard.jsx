import { FaUser } from "react-icons/fa6";

import RatingStars from "./RatingStars";

export default function ReviewCard({
  review,
}) {
  if (!review) {
    return null;
  }

  const {
    name = "Customer",
    rating = 0,
    comment = "",
    date = "",
  } = review;

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
            <FaUser className="text-sm text-gray-400" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {name}
            </h3>

            {date && (
              <p className="mt-0.5 text-xs text-gray-400">
                {date}
              </p>
            )}
          </div>
        </div>

        <RatingStars
          rating={rating}
          size="xs"
        />
      </div>

      {comment && (
        <p className="mt-4 text-sm leading-6 text-gray-600">
          {comment}
        </p>
      )}
    </article>
  );
}