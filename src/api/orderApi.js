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

export async function createOrder(
  token,
  orderData
) {
  const response = await fetch(
    `${API_BASE_URL}/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    }
  );

  return handleResponse(response);
}

export async function getMyOrders(token) {
  const response = await fetch(
    `${API_BASE_URL}/orders`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return handleResponse(response);
}

export async function getOrderById(
  token,
  orderId
) {
  const response = await fetch(
    `${API_BASE_URL}/orders/${orderId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return handleResponse(response);
}