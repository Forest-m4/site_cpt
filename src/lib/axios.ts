import axios from "axios";

// Для TypeScript нужно добавить типы для import.meta.env
const api = axios.create({
  baseURL: "http://localhost:3000/api", // ← укажите явно URL пока
  // или
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
