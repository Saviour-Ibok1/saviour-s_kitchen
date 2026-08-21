export default function LoadingSpinner({
  size = "md",
  label = "Loading",
}) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-5 w-5 border-2",
    lg: "h-7 w-7 border-3",
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-gray-200 border-t-[var(--color-primary)] animate-spin ${sizeClasses[size] || sizeClasses.md}`}
      role="status"
      aria-label={label}
    />
  );
}