import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaHeart,
  FaRightFromBracket,
  FaUser,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import {
  getUserProfile,
  updateUserProfile,
} from "../api/userApi";

const INITIAL_PROFILE = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
};

export default function Profile() {
  const {
    user,
    token,
    isAuthenticated,
    loading: authLoading,
    logout,
  } = useAuth();

  const [profile, setProfile] =
    useState(INITIAL_PROFILE);

  const [isEditing, setIsEditing] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setProfile(INITIAL_PROFILE);
      return;
    }

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getUserProfile(token);

        setProfile((current) => ({
          ...current,
          fullName:
            response.user.name || "",
          phone:
            response.user.phone || "",
          email:
            response.user.email || "",
        }));
      } catch (requestError) {
        setError(
          requestError.message ||
            "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated, token]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response =
        await updateUserProfile(token, {
          name: profile.fullName,
          phone: profile.phone,
        });

      setProfile((current) => ({
        ...current,
        fullName:
          response.user.name || "",
        phone:
          response.user.phone || "",
        email:
          response.user.email || "",
      }));

      setIsEditing(false);
      setSuccess(
        "Profile updated successfully."
      );
    } catch (requestError) {
      setError(
        requestError.message ||
          "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              Loading your profile...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500">
            Account
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            Profile
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <FaUser className="text-3xl text-gray-400" />
              </div>

              <h2 className="mt-5 text-lg font-bold text-gray-900">
                {isAuthenticated
                  ? user?.name || "Customer"
                  : "Guest customer"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {isAuthenticated
                  ? user?.email
                  : "Your account"}
              </p>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-between rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    <span>Sign in</span>
                    <FaArrowRight className="text-xs" />
                  </Link>

                  <Link
                    to="/register"
                    className="mt-2 flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    <span>Create account</span>
                    <FaArrowRight className="text-xs text-gray-400" />
                  </Link>
                </>
              ) : (
                <button
                  type="button"
                  onClick={logout}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <span className="flex items-center gap-3">
                    <FaRightFromBracket className="text-gray-400" />
                    Log out
                  </span>

                  <FaArrowRight className="text-xs text-gray-400" />
                </button>
              )}

              <Link
                to="/wishlist"
                className="mt-1 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <span className="flex items-center gap-3">
                  <FaHeart className="text-gray-400" />
                  Wishlist
                </span>

                <FaArrowRight className="text-xs text-gray-400" />
              </Link>

              <Link
                to="/"
                className="mt-1 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <span>Browse foods</span>
                <FaArrowRight className="text-xs text-gray-400" />
              </Link>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Personal details
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-gray-900">
                    Your information
                  </h2>
                </div>

                {isAuthenticated &&
                  !isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setSuccess("");
                        setIsEditing(true);
                      }}
                      className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      Edit profile
                    </button>
                  )}
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-600"
                >
                  {success}
                </div>
              )}

              {!isAuthenticated ? (
                <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Sign in to manage your profile
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                    Create an account or sign in to
                    manage your account.
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Sign in
                      <FaArrowRight className="text-xs" />
                    </Link>

                    <Link
                      to="/register"
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      Create account
                    </Link>
                  </div>
                </div>
              ) : isEditing ? (
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-5"
                >
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
                      value={profile.fullName}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[var(--color-primary)] disabled:bg-gray-50"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
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
                        value={profile.phone}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[var(--color-primary)] disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>

                      <input
                        id="email"
                        type="email"
                        value={profile.email}
                        disabled
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading
                        ? "Saving..."
                        : "Save changes"}
                    </button>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        setIsEditing(false)
                      }
                      className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Full name
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {profile.fullName ||
                        "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Phone number
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {profile.phone ||
                        "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Email address
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {profile.email ||
                        "Not provided"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-medium text-gray-500">
                Order history
              </p>

              <h2 className="mt-1 text-lg font-bold text-gray-900">
                Your orders
              </h2>

              <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center">
                <h3 className="text-sm font-semibold text-gray-900">
                  No orders yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Your completed orders will appear
                  here once order processing is connected.
                </p>

                <Link
                  to="/"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Start shopping
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}