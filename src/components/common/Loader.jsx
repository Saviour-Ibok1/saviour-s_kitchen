export default function Loader({
  label = "Loading...",
}) {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center px-4"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="flex flex-col items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--color-primary)]" />

        <p className="mt-4 text-sm font-medium text-gray-500">
          {label}
        </p>
      </div>
    </div>
  );
}