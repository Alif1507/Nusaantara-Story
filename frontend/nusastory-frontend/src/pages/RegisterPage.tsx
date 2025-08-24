import React, { useState } from "react";
import { useAuthToken } from "../auth/AuthContextToken";
import { useNavigate, Link } from "react-router-dom";

type Errors = Record<string, string[]>;

export default function RegisterPage() {
  const { register } = useAuthToken();
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Errors>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setFieldErrors({});
    try {
      await register(form);
      nav("/"); // langsung masuk ke halaman protected
    } catch (err: any) {
      const status = err?.response?.status;
      const data = err?.response?.data;
      if (status === 422 && data?.errors) setFieldErrors(data.errors as Errors);
      else setError(data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 420, margin: "60px auto", display: "grid", gap: 10 }}>
      <h2>Create account</h2>

      <input name="name" placeholder="Name" value={form.name} onChange={onChange} />
      {fieldErrors.name && <small style={{ color: "crimson" }}>{fieldErrors.name[0]}</small>}

      <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
      {fieldErrors.email && <small style={{ color: "crimson" }}>{fieldErrors.email[0]}</small>}

      <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
      {fieldErrors.password && <small style={{ color: "crimson" }}>{fieldErrors.password[0]}</small>}

      <input name="password_confirmation" type="password" placeholder="Confirm password" value={form.password_confirmation} onChange={onChange} />

      <button type="submit">Register</button>
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <p style={{ marginTop: 8 }}>Already have an account? <Link to="/login">Sign in</Link></p>
    </form>
  );
}
