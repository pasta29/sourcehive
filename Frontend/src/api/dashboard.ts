import axios from "axios";

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchDashboardData = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch dashboard data");
    }
    throw new Error("Failed to fetch dashboard data");
  }
};
