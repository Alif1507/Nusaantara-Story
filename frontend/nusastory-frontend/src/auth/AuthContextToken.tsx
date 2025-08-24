import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types.ts";
import { loadTokenFromStorage } from "../lib/apiToken.ts";
import { fetchMeWithToken, loginWithToken, logoutWithToken } from "../lib/authToken";

type Ctx = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};


const AuthCtx = createContext<Ctx | undefined>(undefined);
export const useAuthToken = () => {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error("useAuthToken must be used within <AuthProviderToken>");
  return ctx;
}

export function AuthProviderToken({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadTokenFromStorage();
    (async () => {
      setUser(await fetchMeWithToken());
      setReady(true);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const u = await loginWithToken(email, password);
    setUser(u);
  }

  const logout = async () => {
    await logoutWithToken();
    setUser(null)
  }

  return <AuthCtx.Provider value={{ user, login, logout }}>{ready ? children : <div>Loading....</div>}</AuthCtx.Provider>;

}