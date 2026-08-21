import { FaRegCommentDots } from "react-icons/fa6";

export default function ReviewEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center sm:p-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
        <FaRegCommentDots className="text-2xl text-[var(--color-primary)]" />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-gray-900">
        No Reviews Yet
      </h3>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-600">
        This product has not received any reviews yet.
        Once customers begin leaving reviews, they will
        appear here.
      </p>
    </div>
  );
}