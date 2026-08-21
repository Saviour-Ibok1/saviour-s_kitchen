import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaMagnifyingGlass,
  FaBagShopping,
  FaUser,
  FaUserGear, // Admin Icon
} from "react-icons/fa6";
import { useState } from "react";

import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { useAuth } from "../../hooks/useAuth"; // Ensure path matches your project structure

export default function Header() {
  const navigate = useNavigate();

  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, user } = useAuth();

  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const searchTerm = searchValue.trim();

    if (!searchTerm) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setSearchValue("");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex min-h-20 items-center gap-4">
          <Link to="/" className="shrink-0">
            <span className="block text-xl font-bold text-gray-900">
              Saviour's Kitchen
            </span>

            <span className="hidden text-xs text-gray-500 sm:block">
              Order your foods fresh and delicious.
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-gray-600 hover:text-[var(--color-primary)]"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-gray-600 hover:text-[var(--color-primary)]"
                }`
              }
            >
              About
            </NavLink>
          </nav>

          <form
            onSubmit={handleSearchSubmit}
            className="ml-auto flex-1 lg:max-w-md"
          >
            <div className="relative">
              <FaMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

              <input
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search for food..."
                aria-label="Search for food"
                className="
                  w-full
                  rounded-full
                  border
                  border-gray-200
                  bg-gray-50
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-[var(--color-primary)]
                  focus:bg-white
                "
              />
            </div>
          </form>

          <div className="hidden items-center gap-2 md:flex">
            {/* Admin Dashboard Icon Link */}
            {isAuthenticated && user?.role === "admin" && (
              <Link
                to="/admin"
                aria-label="Admin Dashboard"
                title="Admin Dashboard"
                className="flex h-11 w-11 items-center justify-center rounded-full text-amber-600 transition hover:bg-amber-50 hover:text-amber-700"
              >
                <FaUserGear className="text-lg" />
              </Link>
            )}

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-50 hover:text-[var(--color-primary)]"
            >
              <FaHeart />

              {wishlistCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              aria-label="Shopping cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-50 hover:text-[var(--color-primary)]"
            >
              <FaBagShopping />

              {itemCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              aria-label="Profile"
              className="flex h-11 w-11 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-50 hover:text-[var(--color-primary)]"
            >
              <FaUser />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}