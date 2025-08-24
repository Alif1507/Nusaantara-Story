import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000",
});

let token: string | null = null;

export function setAuthToken(next?: string | null) {
  token = next ?? null;
  if (token) api.defaults.headers.common.Authorization = `Bearer  ${token}`
  else delete api.defaults.headers.common.Authorization;
}

export function loadTokenFromStorage() {
  const t = sessionStorage.getItem("auth_token");
  if (t) setAuthToken(t);
}
export function persistToken(next?: string | null) {
  if (next) sessionStorage.setItem("auth_token", next);
  else sessionStorage.removeItem("auth_token");
}

