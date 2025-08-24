import { api, setAuthToken, persistToken } from "./apiToken";
import type { User } from "../types";

export async function loginWithToken(email: string, password: string): Promise<User> {
  const { data } = await api.post<{ token: string; user: User }>("/api/auth/login", { email, password });
  setAuthToken(data.token);       // <-- wajib, set header Authorization
  persistToken(data.token);       // <-- supaya survive refresh
  return data.user;
}

export async function register(input:{
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Promise<User> {
  const { data } = await api.post<{token: string; user: User}>("/api/auth/register", input);
  setAuthToken(data.token);
  persistToken(data.token);
  return data.user;
}

export async function logoutWithToken(): Promise<void> {
  await api.post("/api/auth/logout");
  setAuthToken(null);
  persistToken(null);
}

export async function fetchMeWithToken(): Promise<User | null> {
  // Jangan call kalau belum ada header Authorization
  const hdr = (api.defaults.headers.common as any)?.Authorization;
  if (!hdr) return null;
  try {
    const { data } = await api.get<User>("/api/user");
    return data;
  } catch {
    return null;
  }
}
