// src/routes/GuestRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthToken } from "../auth/AuthContextToken";

export default function GuestRoute({ children }: { children: React.ReactElement }) {
  const { user, ready } = useAuthToken();
  const location = useLocation();

  if (!ready) return <div />;              // tunggu dulu biar nggak flicker
  if (user) {
    // sudah login -> lempar ke home (atau ke state.from kalau mau)
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
}
