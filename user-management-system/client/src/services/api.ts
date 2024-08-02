// src/services/api.ts
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const login = (email: string, password: string) =>
  api.post("/login", { email, password });

export const register = (name: string, email: string, password: string) =>
  api.post("/register", { name, email, password });

export const getProfile = () => api.get("/profile");

export const updateProfile = (data: { name?: string; bio?: string }) =>
  api.put("/profile/edit", data);

export const getUsers = () => api.get("/users");

export const getUserById = (id: string) => api.get(`/users/${id}`);

export default api;
