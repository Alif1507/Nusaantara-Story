// src/api/api.ts
import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ORIGIN ?? "http://localhost:8000",
  headers: { Accept: "application/json" },
});

export const TOKEN_KEY = "auth_token";

export function setAuthToken(next?: string | null) {
  if (next) {
    sessionStorage.setItem(TOKEN_KEY, next);
    api.defaults.headers.common.Authorization = `Bearer ${next}`;
  } else {
    sessionStorage.removeItem(TOKEN_KEY);
    delete api.defaults.headers.common.Authorization;
  }
}

export function loadTokenFromStorage() {
  const t = sessionStorage.getItem(TOKEN_KEY);
  if (t) api.defaults.headers.common.Authorization = `Bearer ${t}`;
  return t;
}

// Request interceptor: pastikan Content-Type benar
api.interceptors.request.use((config) => {
  // kalau FormData, biarkan browser set boundary
  if (config.data instanceof FormData) {
    delete (config.headers as any)["Content-Type"];
  } else if (!config.headers?.["Content-Type"]) {
    (config.headers as any)["Content-Type"] = "application/json";
  }
  return config;
});

// Response interceptor: rapikan pesan error
api.interceptors.response.use(
  (r) => r,
  (err: AxiosError<any>) => {
    const msg = err.response?.data?.message || err.message || "Request error";
    return Promise.reject(new Error(msg));
  }
);

// auto-load token saat file ini di-import
loadTokenFromStorage();

export function persistToken(next?: string | null) {
  if (next) sessionStorage.setItem("auth_token", next);
  else sessionStorage.removeItem("auth_token");
}


