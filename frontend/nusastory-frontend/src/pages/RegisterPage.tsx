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
   <section className="w-screen h-screen items-center justify-center flex">
    <div className='bg-[#D72D27] relative w-full h-full flex flex-col items-center justify-center'>
      <img src="/img/logo.png" alt="" />
      <div className='flex gap-10 absolute bottom-15 text-white'>
        <Link to="/about">Tentang</Link>
        <Link to="/cerita">Cerita</Link>
        <Link to="/audiobook">AudioBook</Link>
        <Link to="/">Home</Link>
      </div>
    </div>
    <div className="bg-white w-full h-full flex items-center justify-center">
       <form onSubmit={onSubmit} style={{ maxWidth: 420, margin: "60px auto", display: "grid", gap: 10 }}>
      <h2 className="text-5xl font-serif font-bold text-gray-900 mb-6">Register</h2>

      <input className="w-full rounded-md border border-white border-b-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" name="name" placeholder="Name" value={form.name} onChange={onChange} />
      {fieldErrors.name && <small style={{ color: "crimson" }}>{fieldErrors.name[0]}</small>}

      <input className="w-full rounded-md border border-white border-b-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" name="email" placeholder="Email" value={form.email} onChange={onChange} />
      {fieldErrors.email && <small style={{ color: "crimson" }}>{fieldErrors.email[0]}</small>}

      <input className="w-full rounded-md border border-white border-b-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
      {fieldErrors.password && <small style={{ color: "crimson" }}>{fieldErrors.password[0]}</small>}

      <input className="w-full rounded-md border border-white border-b-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" name="password_confirmation" type="password" placeholder="Confirm password" value={form.password_confirmation} onChange={onChange} />

      <button className="w-full rounded-full bg-red-600 px-5 py-2.5 text-white font-medium hover:bg-red-700 active:bg-red-800 transition mt-10" type="submit">Register</button>
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <p style={{ marginTop: 8 }}>Sudah Punya Akun? <Link to="/login" className="text-[#D72D27]">login</Link></p>
    </form>
    </div>
   </section>
  );
}
