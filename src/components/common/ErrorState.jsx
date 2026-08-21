import { FaArrowRotateRight, FaTriangleExclamation } from "react-icons/fa6";

export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
  retryLabel = "Try again",
  children,
}) {
  return (
    <div
      className="rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10"
      role="alert"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
        <FaTriangleExclamation className="text-2xl text-gray-400" />
      </div>

      <h2 className="mt-6 text-xl font-bold text-gray-900">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
        {description}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <FaArrowRotateRight className="text-xs" />
          {retryLabel}
        </button>
      )}

      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  );
}