import { STORAGE_KEYS } from "@/shared/constants/constants";
import axios from "axios";

export const appApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

appApiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

appApiInstance.interceptors.response.use((config) => {
  console.log("status", config.status);

  return config;
});
