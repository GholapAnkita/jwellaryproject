import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdminLoggedIn, logoutAdmin } = useContext(ShopContext);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <nav className="backdrop-blur-md bg-gray-950/90 text-white border-b border-yellow-500/20 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
      <Link to="/" className="flex items-center space-x-3 group">
        <img 
          src={logo} 
          alt="HandCrafted Jewellery Logo" 
          className="w-10 h-10 object-contain rounded-full border border-yellow-500/40 bg-gray-900 group-hover:scale-105 transition duration-300"
        />
        <span className="font-serif text-lg sm:text-xl md:text-2xl font-semibold tracking-wide bg-linear-to-r from-yellow-500 via-amber-300 to-yellow-600 bg-clip-text text-transparent transition">
          HandCrafted by Ankita
        </span>
      </Link>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden flex flex-col space-y-1.5 focus:outline-none p-1 z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center space-x-8 font-sans">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`transition-all duration-300 tracking-wider text-sm font-medium hover:text-yellow-400 relative py-1 ${
                isActive ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              {link.name}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
        
        {isAdminLoggedIn && (
          <>
            <Link 
              to="/admin-dashboard" 
              className="hover:bg-yellow-600 hover:text-gray-900 border border-yellow-500/50 text-yellow-500 transition duration-300 text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase bg-transparent"
            >
              Dashboard
            </Link>
            <button 
              onClick={logoutAdmin}
              className="hover:bg-red-650 hover:text-white border border-red-500/50 text-red-500 transition duration-300 text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase bg-transparent"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-950/95 border-b border-yellow-500/20 backdrop-blur-lg md:hidden animate-fade-in">
          <div className="flex flex-col p-6 space-y-4 font-sans text-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`py-2 text-base tracking-wider hover:text-yellow-400 transition ${
                    isActive ? "text-yellow-500 font-semibold" : "text-gray-300"
                  }`} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {isAdminLoggedIn && (
              <>
                <Link 
                  to="/admin-dashboard" 
                  className="hover:bg-yellow-600 hover:text-gray-900 border border-yellow-500/50 text-yellow-500 transition text-sm font-semibold py-2 rounded-full tracking-widest uppercase bg-transparent w-2/3 mx-auto" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    logoutAdmin();
                    setIsMenuOpen(false);
                  }}
                  className="hover:bg-red-650 hover:text-white border border-red-500/50 text-red-500 transition text-sm font-semibold py-2 rounded-full tracking-widest uppercase bg-transparent w-2/3 mx-auto" 
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
