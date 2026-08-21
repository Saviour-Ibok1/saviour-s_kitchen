import {
  FaBoxOpen,
  FaClipboardList,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa6";

const stats = [
  {
    label: "Total orders",
    value: "0",
    icon: FaClipboardList,
  },
  {
    label: "Total sales",
    value: "₦0",
    icon: FaMoneyBillWave,
  },
  {
    label: "Products",
    value: "0",
    icon: FaBoxOpen,
  },
  {
    label: "Customers",
    value: "0",
    icon: FaUsers,
  },
];

export default function AdminDashboard() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div>
        <p className="text-sm font-medium text-gray-500">
          Administration
        </p>

        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          Admin dashboard
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Manage your store and monitor order activity.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50">
                  <Icon className="text-lg text-gray-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">
            Recent orders
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Recent customer orders will appear here.
          </p>

          <div className="mt-6 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center">
            <p className="text-sm text-gray-500">
              No recent orders.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">
            Store overview
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Store activity and management tools will appear here.
          </p>

          <div className="mt-6 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center">
            <p className="text-sm text-gray-500">
              Dashboard data will be connected next.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}