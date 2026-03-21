import axios from "axios";

// 1. Определяем, где мы находимся (на сервере или в браузере)
const isServer = typeof window === "undefined";

// 2. Настраиваем baseURL:
// - Если в браузере: используем относительный путь '/api' (прокси через Next.js)
// - Если на сервере (внутри Route Handler): используем полный путь к Express бэкенду
const baseURL = isServer
  ? process.env.NEXT_PUBLIC_API_URL // http://localhost:5000 (внутренний адрес)
  : "/api"; // относительный адрес для браузера

export const api = axios.create({
  baseURL,
  withCredentials: true, // Критично для передачи кук
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
