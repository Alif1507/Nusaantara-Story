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
   <section className='w-screen h-screen items-center justify-center flex'>
    <div className='bg-[#D72D27] relative w-full h-full flex flex-col items-center justify-center'>
      <img src="/img/logo.png" alt="" />
      <div className='flex gap-10 absolute bottom-15 text-white'>
        <Link to="/about">Tentang</Link>
        <Link to="/cerita">Cerita</Link>
        <Link to="/audio">AudioBook</Link>
        <Link to="/">Home</Link>
      </div>
    </div>
    <div className='bg-white w-full h-full flex items-center justify-center'>
       <form onSubmit={onSubmit} style={{ maxWidth: 360, margin: "80px auto", display: "grid", gap: 8 }} className=''>
      <h2 className='text-5xl font-serif font-bold text-gray-900 mb-6'>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className='w-full rounded-md border border-white border-b-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900'  />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className='w-full rounded-md border border-white border-b-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900' />
      <button className='w-full rounded-full bg-red-600 px-5 py-2.5 text-white font-medium hover:bg-red-700 active:bg-red-800 transition mt-10' type="submit">Login</button>
      <p style={{ marginTop: 8 }}>Belum Punya Akun? <Link to="/register" className="text-[#D72D27]">Register</Link></p>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </form>
    </div>
   </section>
  )
}

export default LoginPage
