import { useEffect } from "react";
import { gsap } from "gsap";
import "@fontsource/inknut-antiqua/300.css";
import "@fontsource/poppins/500.css";
import { Link } from "react-router-dom";
import { useAuthToken } from "../auth/AuthContextToken";

const Navbar = () => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        gsap.to(".navbar", {
          backgroundColor: "#A02F1F",
          duration: 0.5,
        });
        gsap.to(".nav-link", {
          color: "#fff",
          duration: 0.5,
        });
        gsap.to(".logo-text", {
          color: "#F4D78F",
          duration: 0.5,
        });
        gsap.to(".login-btn", {
          backgroundColor: "#fff",
          color: "#A02F1F",
          duration: 0.5,
        });
      } else {
        gsap.to(".navbar", {
          backgroundColor: "transparent",
          duration: 0.5,
        });
        gsap.to(".nav-link", {
          color: "#A02F1F",
          duration: 0.5,
        });
        gsap.to(".logo-text", {
          color: "#825D00",
          duration: 0.5,
        });
        gsap.to(".login-btn", {
          backgroundColor: "#A02F1F",
          color: "#fff",
          duration: 0.5,
        });
      }
    };

    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { user, ready } = useAuthToken()
  if (!ready) return null
  
  return (
    <div className="navbar w-full py-2 flex justify-around items-center fixed top-0 left-0 z-100">
      <div
        onClick={() => (window.location.href = "/")}
        style={{ fontFamily: "Inknut Antiqua, serif",}}
        className="flex items-end cursor-pointer"
      >
        <img src="/gambar/Logo.png" alt="logo" />
        <p className="logo-text text-[13px] text-[#825D00] mb-2">
          Nusantara<br />Story
        </p>
      </div>

      <div
        style={{ fontFamily: "Inknut Antiqua, serif" }}
        className="flex gap-10 text-md"
      >
        <Link to="/about" className="nav-link text-[#A02F1F]">Tentang</Link>
        <Link to="/cerita" className="nav-link text-[#A02F1F]">Cerita</Link>
        <Link to="/audiobook" className="nav-link text-[#A02F1F]">AudioBook</Link>
        <Link to="/dashboard" className="nav-link text-[#A02F1F]">TambahCerita</Link>
      </div>

      <div>
      <Link
        to={user ? "/dashboard" : "/login"}
        style={{ fontFamily: "Poppins, sans-serif" }}
        className="login-btn bg-[#A02F1F] text-white h-[35px] w-[120px] rounded-lg font-medium flex items-center justify-center"
      >
        {user ? "Dashboard" : "Login"}
      </Link>
    </div>
    </div>
  );
};

export default Navbar;
