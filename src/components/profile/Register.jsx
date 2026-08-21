import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaUserPlus,
} from "react-icons/fa6";

import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      setError(
        "Name, email, and password are required."
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      navigate("/", {
        replace: true,
      });
    } catch (requestError) {
      setError(
        requestError.message ||
          "Failed to create account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-12 lg:px-6 lg:py-16">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
            <FaUserPlus className="text-xl text-[var(--color-primary)]" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Create an account to manage your orders.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="register-name"
              className="text-sm font-semibold text-gray-900"
            >
              Full Name
            </label>

            <input
              id="register-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              placeholder="Enter your full name"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="text-sm font-semibold text-gray-900"
            >
              Email
            </label>

            <input
              id="register-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="Enter your email"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="register-phone"
              className="text-sm font-semibold text-gray-900"
            >
              Phone Number
            </label>

            <input
              id="register-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              placeholder="Enter your phone number"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="text-sm font-semibold text-gray-900"
            >
              Password
            </label>

            <input
              id="register-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Create a password"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="register-confirm-password"
              className="text-sm font-semibold text-gray-900"
            >
              Confirm Password
            </label>

            <input
              id="register-confirm-password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Confirm your password"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating account..."
              : "Create Account"}

            {!loading && <FaArrowRight />}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[var(--color-primary)] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}