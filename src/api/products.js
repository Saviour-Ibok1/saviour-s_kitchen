const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading products:", error);
    throw error;
  }
};