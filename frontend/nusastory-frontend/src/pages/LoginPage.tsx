import React, { useState } from 'react'
import { useAuthToken } from '../auth/AuthContextToken'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuthToken();
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("")
    try {
      await login(email, password);
      nav("/");
    } catch (err:any) {
      setError(err?.response?.data?.message || "login failed")
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360, margin: "80px auto", display: "grid", gap: 8 }}>
      <h2>Sign in</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button type="submit">Login</button>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </form>
  )
}

export default LoginPage
