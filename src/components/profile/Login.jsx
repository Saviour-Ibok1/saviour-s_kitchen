import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight, FaLock } from "react-icons/fa6";

import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectTo =
    location.state?.from?.pathname || "/";

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

    if (!formData.email || !formData.password) {
      setError(
        "Email and password are required."
      );
      return;
    }

    try {
      setLoading(true);

      await login(formData);

      navigate(redirectTo, {
        replace: true,
      });
    } catch (requestError) {
      setError(
        requestError.message ||
          "Failed to login."
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
            <FaLock className="text-xl text-[var(--color-primary)]" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Sign in to continue to your account.
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
              htmlFor="login-email"
              className="text-sm font-semibold text-gray-900"
            >
              Email
            </label>

            <input
              id="login-email"
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
              htmlFor="login-password"
              className="text-sm font-semibold text-gray-900"
            >
              Password
            </label>

            <input
              id="login-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              placeholder="Enter your password"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}

            {!loading && <FaArrowRight />}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[var(--color-primary)] hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}