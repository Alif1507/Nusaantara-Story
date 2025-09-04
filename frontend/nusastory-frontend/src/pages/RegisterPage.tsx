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
   <section className="min-h-screen grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-2">
      {/* Left / Hero */}
      <div className="bg-[#D72D27] relative flex items-center justify-center p-6 md:p-10">
        <img
          src="/img/logo.png"
          alt="Logo"
          className="w-28 sm:w-36 md:w-44 lg:w-52 select-none"
          draggable={false}
        />

        {/* Bottom nav */}
        <nav className="absolute inset-x-0 bottom-4 md:bottom-8 text-white">
          <ul className="mx-auto flex justify-center gap-6 md:gap-10 text-sm md:text-base">
            <li>
              <Link className="hover:underline" to="/about">Tentang</Link>
            </li>
            <li>
              <Link className="hover:underline" to="/cerita">Cerita</Link>
            </li>
            <li>
              <Link className="hover:underline" to="/audiobook">Audiobook</Link>
            </li>
            <li>
              <Link className="hover:underline" to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Right / Form */}
      <div className="bg-white flex items-center justify-center p-4 sm:p-8">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm sm:max-w-md grid gap-3 sm:gap-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-2 sm:mb-4">
            Register
          </h2>

          {/* Name */}
          <label htmlFor="name" className="sr-only">Name</label>
          <input
            id="name"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={onChange}
            autoComplete="name"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
          {fieldErrors.name && (
            <small className="text-red-600">{fieldErrors.name[0]}</small>
          )}

          {/* Email */}
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            autoComplete="email"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
          {fieldErrors.email && (
            <small className="text-red-600">{fieldErrors.email[0]}</small>
          )}

          {/* Password */}
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            autoComplete="new-password"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
          {fieldErrors.password && (
            <small className="text-red-600">{fieldErrors.password[0]}</small>
          )}

          {/* Confirm */}
          <label htmlFor="password_confirmation" className="sr-only">
            Confirm password
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            placeholder="Confirm password"
            value={form.password_confirmation}
            onChange={onChange}
            autoComplete="new-password"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-[#D72D27] px-5 py-2.5 sm:py-3 text-white font-medium hover:opacity-90 active:opacity-80 transition mt-6 sm:mt-8"
          >
            Register
          </button>

          {error && <p className="text-red-600">{error}</p>}

          <p className="mt-2 text-sm sm:text-base">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-[#D72D27] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
