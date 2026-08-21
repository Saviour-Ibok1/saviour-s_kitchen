/* eslint-disable react-refresh/only-export-components */
import { createContext, useMemo } from "react";

import { calculateCartTotals } from "../utils/calculateCartTotals";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage(
    "saviours-cart",
    []
  );

  const addToCart = (product, quantity = 1) => {
    if (!product) return;

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id
      )
    );
  };

  const increaseQuantity = (id) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                item.quantity - 1
              ),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ),
    [items]
  );

  const totals = useMemo(
    () =>
      calculateCartTotals(items),
    [items]
  );

  const value = {
    items,

    itemCount,

    totals,

    addToCart,

    removeFromCart,

    increaseQuantity,

    decreaseQuantity,

    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}