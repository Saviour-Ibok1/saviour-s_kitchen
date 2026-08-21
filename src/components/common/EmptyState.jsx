import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionTo,
  children,
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
      {Icon && (
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
          <Icon className="text-2xl text-gray-400" />
        </div>
      )}

      {title && (
        <h2 className="mt-6 text-xl font-bold text-gray-900">
          {title}
        </h2>
      )}

      {description && (
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
          {description}
        </p>
      )}

      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          {actionLabel}
          <FaArrowRight className="text-xs" />
        </Link>
      )}

      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  );
}