import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

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

// Fetch credentials from the vault
export const fetchVaultCredentials = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/vault`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch vault credentials");
    }
    throw new Error("Failed to fetch vault credentials");
  }
};

// Add new credential to the vault
export const addVaultCredential = async (token: string, credential: { platform: string; username: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/vault`, credential, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 && error.response.data?.error === "Platform already exists for this user") {
        throw new Error("The platform already exists for this user. Please use a different platform.");
      }
      throw new Error(error.response?.data?.message || "Failed to add vault credential");
    }
    throw new Error("Failed to add vault credential");
  }
};

// Delete a credential from the vault by platform
export const deleteVaultCredential = async (token: string, platform: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/vault/${platform}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to delete vault credential");
    }
    throw new Error("Failed to delete vault credential");
  }
};
