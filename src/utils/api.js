import axios from "axios";

const API_BASE_URL = "https://ideal-tribble-alpha.vercel.app";

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/admin`);
    return response.data.orders; // Assuming your API returns { success: true, orders: [...] }
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
