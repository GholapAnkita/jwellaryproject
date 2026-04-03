import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl md:text-2xl font-bold">HandCrafted jewelry</div>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden flex flex-col space-y-1"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

      {/* Desktop menu */}
      <div className="hidden md:flex space-x-6 font-semibold">
        <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
        <Link to="/products" className="hover:text-yellow-400 transition">Products</Link>
        <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
        <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
        <Link to="/admin" className="hover:text-yellow-400 transition text-sm bg-gray-700 px-3 py-1 rounded">Admin</Link>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-800 md:hidden">
          <div className="flex flex-col p-4 space-y-3 font-semibold">
            <Link to="/" className="hover:text-yellow-400 transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/products" className="hover:text-yellow-400 transition" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link to="/about" className="hover:text-yellow-400 transition" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className="hover:text-yellow-400 transition" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link to="/admin" className="hover:text-yellow-400 transition text-sm bg-gray-700 px-3 py-1 rounded" onClick={() => setIsMenuOpen(false)}>Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
