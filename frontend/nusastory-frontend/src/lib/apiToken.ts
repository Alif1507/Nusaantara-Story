// src/api/api.ts
import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE, // -> http://localhost:8000/api
  headers: { Accept: "application/json" },
  withCredentials: false,                 // pakai Bearer token, bukan cookie
});

// token helper (opsional)
let token: string | null = null;
export function setAuthToken(next?: string | null) {
  token = next ?? null;
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}
export function loadTokenFromStorage() {
  const t = sessionStorage.getItem("auth_token");
  if (t) setAuthToken(t);
}
loadTokenFromStorage();

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


export function persistToken(next?: string | null) {
  if (next) sessionStorage.setItem("auth_token", next);
  else sessionStorage.removeItem("auth_token");
}


