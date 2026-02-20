import axios, { AxiosInstance } from "axios";
import { useAuthStore } from "../stores/authStore";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const createApiClient = (token: string | null): AxiosInstance => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // cookies if needed
  });

  // Add token automatically to headers
  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return api;
};

export const useApiClient = (): AxiosInstance => {
  const { token } = useAuthStore();
  return createApiClient(token);
};
