export default function CheckoutForm({
  formData,
  onChange,
}) {
  return (
    <form className="mt-6 space-y-5">
      <div>
        <label
          htmlFor="fullName"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Full name
        </label>

        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={onChange}
          placeholder="Enter your full name"
          autoComplete="name"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)]"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Phone number
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          placeholder="Enter your phone number"
          autoComplete="tel"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)]"
        />
      </div>

      <div>
        <label
          htmlFor="address"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Delivery address
        </label>

        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Enter your delivery address"
          rows={3}
          autoComplete="street-address"
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)]"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="city"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            City
          </label>

          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={onChange}
            placeholder="Enter your city"
            autoComplete="address-level2"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)]"
          />
        </div>

        <div>
          <label
            htmlFor="state"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            State
          </label>

          <input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={onChange}
            placeholder="Enter your state"
            autoComplete="address-level1"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="deliveryNote"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Delivery note
          <span className="ml-1 font-normal text-gray-400">
            Optional
          </span>
        </label>

        <textarea
          id="deliveryNote"
          name="deliveryNote"
          value={formData.deliveryNote}
          onChange={onChange}
          placeholder="Add any instructions for your order"
          rows={3}
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)]"
        />
      </div>
    </form>
  );
}