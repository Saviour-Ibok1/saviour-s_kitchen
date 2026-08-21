import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa6"; // Import the admin icon

import { NAV_LINKS } from "../../constants/navLinks";
import { useAuth } from "../../hooks/useAuth";

export default function DesktopNavbar({ cartCount = 0 }) {
  const { user, isAuthenticated } = useAuth();

  const navLinkClasses = ({ isActive }) =>
    [
      "transition-colors duration-200",
      "font-medium",
      isActive
        ? "text-[var(--color-primary)]"
        : "text-gray-700 hover:text-[var(--color-primary)]",
    ].join(" ");

  return (
    <nav
      className="hidden items-center gap-8 lg:flex"
      aria-label="Desktop Navigation"
    >
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={navLinkClasses}
        >
          {link.label}
        </NavLink>
      ))}

      {/* Conditional Admin Link with Icon */}
      {isAuthenticated && user?.role === "admin" && (
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            [
              "flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-200",
              isActive
                ? "bg-[var(--color-primary)] text-white"
                : "bg-amber-100 text-amber-800 hover:bg-amber-200",
            ].join(" ")
          }
          aria-label="Admin Dashboard"
        >
          <FaUserSecret className="text-sm" />
          <span>Admin</span>
        </NavLink>
      )}

      <NavLink
        to="/cart"
        className="relative transition-colors duration-200 hover:text-[var(--color-primary)]"
        aria-label="Shopping Cart"
      >
        <FaShoppingCart className="text-xl" />

        {cartCount > 0 && (
          <span
            className="
              absolute
              -right-2
              -top-2
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-[var(--color-primary)]
              text-[10px]
              font-semibold
              text-white
            "
          >
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          [
            "transition-colors duration-200",
            isActive
              ? "text-[var(--color-primary)]"
              : "text-gray-700 hover:text-[var(--color-primary)]",
          ].join(" ")
        }
        aria-label="Profile"
      >
        <FaUserCircle className="text-2xl" />
      </NavLink>
    </nav>
  );
}