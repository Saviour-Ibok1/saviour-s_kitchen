import { FaChartColumn } from "react-icons/fa6";

export default function StatisticsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
          <FaChartColumn className="text-2xl text-[var(--color-primary)]" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          Restaurant Statistics
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-600">
          Restaurant statistics such as total orders, meals served, customer
          count, and delivery coverage will appear here once real data becomes
          available from the backend.
        </p>
      </div>
    </section>
  );
}