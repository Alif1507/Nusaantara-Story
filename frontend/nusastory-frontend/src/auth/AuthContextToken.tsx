// src/auth/AuthContextToken.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types";
import { loginWithToken, logoutWithToken, fetchMeWithToken, register as registerApi } from "../lib/authToken";
import { loadTokenFromStorage } from "../lib/apiToken";

type RegisterInput = { name: string; email: string; password: string; password_confirmation: string; };

type Ctx = {
  user: User | null;
  ready: boolean;                           // <-- expose 'ready'
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
};

const AuthCtx = createContext<Ctx | undefined>(undefined);
export const useAuthToken = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuthToken must be used within <AuthProviderToken>");
  return ctx;
};

export function AuthProviderToken({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadTokenFromStorage();                  // rehydrate token -> set header Authorization
    (async () => {
      setUser(await fetchMeWithToken());     // kalau token valid -> dapet user
      setReady(true);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const u = await loginWithToken(email, password);
    setUser(u);
  };

  const register = async (input: RegisterInput) => {
    const u = await registerApi(input);
    setUser(u);
  };

  const logout = async () => {
    await logoutWithToken();
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, ready, login, logout, register }}>
      {ready ? children : <div>Loading…</div>}
    </AuthCtx.Provider>
  );
}
