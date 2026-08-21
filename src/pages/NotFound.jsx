import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-[#C8A44D]">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-lg bg-[#C8A44D] px-6 py-3 font-medium text-white transition hover:opacity-90"
      >
        Return Home
      </Link>
    </section>
  );
}