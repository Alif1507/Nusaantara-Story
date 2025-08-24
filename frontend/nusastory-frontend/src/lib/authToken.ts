import { api, persistToken, setAuthToken } from "./apiToken.ts";
import type { User } from "../types.ts";

export async function loginWithToken(email:string, password: string): Promise<User> {
  const { data } = await api.post<{ token: string; user: User }>("/api/auth/login", {
    email, password
  })
    setAuthToken(data.token);
    persistToken(data.token);
    return data.user
}

export async function logoutWithToken(): Promise<void> {
  setAuthToken(null)
  persistToken(null)
}

export async function fetchMeWithToken(): Promise<User | null> {
  try {
    const { data } = await api.get<User>("/api/user");
    return data;
  } catch {
    return null;
  }
}