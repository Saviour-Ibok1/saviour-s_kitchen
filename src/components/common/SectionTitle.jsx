import { Link } from "react-router-dom";

export default function SectionTitle({
  eyebrow,
  title,
  description,
  actionLabel,
  actionTo,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-sm font-medium text-[var(--color-primary)]">
            {eyebrow}
          </p>
        )}

        {title && (
          <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            {title}
          </h2>
        )}

        {description && (
          <p className="mt-2 text-sm leading-6 text-gray-500">
            {description}
          </p>
        )}
      </div>

      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="shrink-0 text-sm font-semibold text-gray-700 transition hover:text-[var(--color-primary)]"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}