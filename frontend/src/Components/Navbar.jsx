import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold">HandCrafted jewelry</div>
      {/* <Link to="/" className="flex items-center space-x-2">
        <img src="/images/logo.png" alt="JewelryStore Logo" className="h-10 w-10" />
        <span className="text-2xl font-bold">HandCrafted jewelry</span>
      </Link> */}
      <div className="space-x-6 font-semibold">
        <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
        <Link to="/products" className="hover:text-yellow-400 transition">Products</Link>
        <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
        <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
        <Link to="/admin" className="hover:text-yellow-400 transition text-sm bg-gray-700 px-3 py-1 rounded">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
