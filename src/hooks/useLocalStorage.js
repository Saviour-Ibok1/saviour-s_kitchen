import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      return item
        ? JSON.parse(item)
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(storedValue)
      );
    } catch (error) {
      console.error(
        "Unable to save data to local storage.",
        error
      );
    }
  }, [key, storedValue]);

  return [
    storedValue,
    setStoredValue,
  ];
}