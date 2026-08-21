import { useState } from "react";
import RatingStars from "../common/RatingStars";

export default function ReviewForm({
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedComment = comment.trim();

    if (!rating || !trimmedComment || loading) {
      return;
    }

    if (onSubmit) {
      onSubmit({
        rating,
        comment: trimmedComment,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <h3 className="text-xl font-bold text-gray-900">
          Write a Review
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Share your experience with this meal.
        </p>
      </div>

      <div className="mt-6">
        <label className="text-sm font-semibold text-gray-900">
          Your Rating
        </label>

        <div className="mt-3">
          <RatingStars
            rating={rating}
            interactive
            onChange={setRating}
            size="lg"
          />
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="review-comment"
          className="text-sm font-semibold text-gray-900"
        >
          Your Review
        </label>

        <textarea
          id="review-comment"
          value={comment}
          onChange={(event) =>
            setComment(event.target.value)
          }
          placeholder="Tell us what you thought about this meal..."
          rows={5}
          maxLength={1000}
          className="mt-3 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white"
        />

        <div className="mt-2 flex justify-end">
          <span className="text-xs text-gray-400">
            {comment.length}/1000
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={
            loading ||
            rating === 0 ||
            !comment.trim()
          }
          className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Submitting..."
            : "Submit Review"}
        </button>
      </div>
    </form>
  );
}