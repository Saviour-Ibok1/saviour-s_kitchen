import { NavLink } from "react-router-dom";
import {
  FaHeart,
  FaHouse,
  FaBagShopping,
  FaUser,
  FaShieldHalved,
} from "react-icons/fa6";

import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

const baseNavItems = [
  {
    label: "Home",
    path: "/",
    icon: FaHouse,
  },
  {
    label: "Wishlist",
    path: "/wishlist",
    icon: FaHeart,
    countKey: "wishlist",
  },
  {
    label: "Cart",
    path: "/cart",
    icon: FaBagShopping,
    countKey: "cart",
  },
  {
    label: "Profile",
    path: "/profile",
    icon: FaUser,
  },
];

export default function MobileBottomNav() {
  const { user, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  const getCount = (countKey) => {
    if (countKey === "cart") {
      return itemCount;
    }

    if (countKey === "wishlist") {
      return wishlistCount;
    }

    return 0;
  };

  // Dynamically insert Admin link before Profile if user is admin
  const navItems = [...baseNavItems];
  if (isAuthenticated && user?.role === "admin") {
    navItems.splice(3, 0, {
      label: "Admin",
      path: "/admin",
      icon: FaShieldHalved,
    });
  }

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white lg:hidden"
    >
      <div className="mx-auto flex max-w-2xl items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const count = getCount(item.countKey);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex min-w-12 flex-col items-center gap-1 rounded-xl px-2 py-1 text-xs font-medium transition ${
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-gray-500 hover:text-gray-900"
                }`
              }
            >
              <span className="relative">
                <Icon className="text-lg" />

                {count > 0 && (
                  <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[9px] font-bold text-white">
                    {count}
                  </span>
                )}
              </span>

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}