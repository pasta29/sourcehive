// src/api/auth.ts
import axios from 'axios';

const API_BASE_URL = `http://localhost:3000/api/auth`;

export const signup = async (userID: string, masterPassword: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, { userID, masterPassword });
    return response.data; // { message: "User created successfully" }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Signup failed");
  }
};

export const login = async (userID: string, masterPassword: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { userID, masterPassword });
    return response.data; // { token: "JWT_TOKEN" }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Signup failed");
  }
};