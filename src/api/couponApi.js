const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong."
    );
  }

  return data;
}

export async function getCouponByCode(code) {
  const normalizedCode = code
    .trim()
    .toUpperCase();

  const response = await fetch(
    `${API_BASE_URL}/coupons/${encodeURIComponent(
      normalizedCode
    )}`,
    {
      method: "GET",
    }
  );

  return handleResponse(response);
}