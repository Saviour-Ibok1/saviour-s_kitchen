/* eslint-disable react-refresh/only-export-components */
import { createContext, useMemo } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

export const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useLocalStorage(
    "saviours-wishlist",
    []
  );

  const toggleFavourite = (productId) => {
    if (!productId) return;

    setWishlist((currentWishlist) => {
      const exists =
        currentWishlist.includes(productId);

      if (exists) {
        return currentWishlist.filter(
          (id) => id !== productId
        );
      }

      return [
        ...currentWishlist,
        productId,
      ];
    });
  };

  const isFavourite = (productId) => {
    return wishlist.includes(productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const wishlistCount = useMemo(
    () => wishlist.length,
    [wishlist]
  );

  const value = {
    wishlist,

    wishlistCount,

    toggleFavourite,

    isFavourite,

    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}