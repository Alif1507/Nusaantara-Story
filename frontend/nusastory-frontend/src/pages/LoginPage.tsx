
import React, { useState } from 'react'
import { useAuthToken } from '../auth/AuthContextToken'
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuthToken();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            <li><Link className="hover:underline" to="/about">Tentang</Link></li>
            <li><Link className="hover:underline" to="/cerita">Cerita</Link></li>
            <li><Link className="hover:underline" to="/audiobook">Audiobook</Link></li>
            <li><Link className="hover:underline" to="/">Home</Link></li>
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
            Login
          </h2>

          {/* Email */}
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />

          {/* Password */}
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-[#D72D27] px-5 py-2.5 sm:py-3 text-white font-medium hover:opacity-90 active:opacity-80 transition mt-6 sm:mt-8"
          >
            Login
          </button>

          <p className="mt-2 text-sm sm:text-base">
            Belum punya akun?{" "}
            <Link to="/register" className="text-[#D72D27] hover:underline">
              Register
            </Link>
          </p>

          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </section>
  )
}

export default LoginPage
