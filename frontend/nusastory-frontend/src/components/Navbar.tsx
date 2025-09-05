import { useEffect, useState } from "react";
import { gsap } from "gsap";
import "@fontsource/inknut-antiqua/300.css";
import "@fontsource/poppins/500.css";
import { Link } from "react-router-dom";
import { useAuthToken } from "../auth/AuthContextToken";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
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
         gsap.to(".hamburger-button", {
          color: "#fff",
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
        gsap.to("#hamburger", {
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
        gsap.to(".hamburger-button", {
          color: "#A02F1F",
          duration: 0.5,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  const { user, ready } = useAuthToken();
  if (!ready) return null;
  
  return (
    <>
      <div className="navbar w-full py-2 px-4 md:px-0 flex justify-between md:justify-around items-center fixed top-0 left-0 z-100">
        <div
          onClick={() => (window.location.href = "/")}
          style={{ fontFamily: "Inknut Antiqua, serif" }}
          className="flex items-end cursor-pointer"
        >
          <img src="/gambar/Logo.png" alt="logo" />
          <p className="logo-text text-[13px] text-[#825D00] mb-2">
            Nusantara<br />Story
          </p>
        </div>

        {/* Desktop Navigation */}
        <div
          style={{ fontFamily: "Inknut Antiqua, serif" }}
          className="hidden md:flex gap-10 text-md"
        >
          <Link to="/about" className="nav-link text-[#A02F1F]">Tentang</Link>
          <Link to="/cerita" className="nav-link text-[#A02F1F]">Cerita</Link>
          <Link to="/audiobook" className="nav-link text-[#A02F1F]">AudioBook</Link>
          <Link to="/dashboard" className="nav-link text-[#A02F1F]">TambahCerita</Link>
        </div>

        <div className="hidden md:block">
          <Link
            to={user ? "/dashboard" : "/login"}
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="login-btn bg-[#A02F1F] text-white h-[35px] w-[120px] rounded-lg font-medium flex items-center justify-center"
          >
            {user ? "Dashboard" : "Login"}
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#A02F1F] focus:outline-none z-50 hamburger-button"
          id="hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu className="" size={24} />}
        </button>
      </div>
      
      {/* Mobile Sidebar */}
      <div 
        className={`fixed  inset-0 bg-black bg-opacity-50 z-100 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      
      <div 
        className={`fixed top-0 right-0 h-full z-110 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-lg md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <div className="flex flex-col gap-6" style={{ fontFamily: "Inknut Antiqua, serif" }}>
            <Link 
              to="/about" 
              className="text-[#A02F1F] text-lg hover:text-[#D72D27] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Tentang
            </Link>
            <Link 
              to="/cerita" 
              className="text-[#A02F1F] text-lg hover:text-[#D72D27] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Cerita
            </Link>
            <Link 
              to="/audiobook" 
              className="text-[#A02F1F] text-lg hover:text-[#D72D27] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              AudioBook
            </Link>
            <Link 
              to="/dashboard" 
              className="text-[#A02F1F] text-lg hover:text-[#D72D27] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              TambahCerita
            </Link>
          </div>
          
          <div className="mt-8">
            <Link
              to={user ? "/dashboard" : "/login"}
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="bg-[#A02F1F] text-white h-[40px] w-full rounded-lg font-medium flex items-center justify-center"
              onClick={() => setIsOpen(false)}
            >
              {user ? "Dashboard" : "Login"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
