import { FaRegPenToSquare } from "react-icons/fa6";

import SectionTitle from "../common/SectionTitle";
import ReviewCard from "../common/ReviewCard";
import ReviewEmptyState from "./ReviewEmptyState";

export default function ProductReviews({
  reviews = [],
  onWriteReview,
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionTitle
          title="Customer Reviews"
          description="Read what customers are saying about this meal."
        />

        {onWriteReview && (
          <button
            type="button"
            onClick={onWriteReview}
            className="
              inline-flex
              items-center
              gap-2
              self-start
              rounded-xl
              border
              border-[var(--color-primary)]
              px-5
              py-3
              text-sm
              font-medium
              text-[var(--color-primary)]
              transition
              hover:bg-[var(--color-primary-light)]
            "
          >
            <FaRegPenToSquare />

            Write a Review
          </button>
        )}
      </div>

      {reviews.length === 0 ? (
        <ReviewEmptyState
          onWriteReview={onWriteReview}
        />
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={{
                name: review.userName,
                rating: review.rating,
                comment: review.comment,
                date: review.createdAt,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}