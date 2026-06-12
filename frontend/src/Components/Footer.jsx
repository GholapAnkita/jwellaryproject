import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-950 to-black text-gray-400 border-t border-yellow-500/20 py-12 md:py-16 mt-20 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-12">
          {/* Brand Identity */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logo} 
                alt="HandCrafted Jewellery Logo" 
                className="w-12 h-12 object-contain rounded-full border border-yellow-500/30 bg-gray-900"
              />
              <span className="font-serif text-lg md:text-xl font-semibold text-white tracking-wide">
                HandCrafted by Ankita
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Discover beautiful, handcrafted jewellery pieces made with meticulous detail, high-quality materials, and artistic love. Designed to make you shine on every occasion.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-serif text-white font-medium text-lg tracking-wider mb-4 border-b border-yellow-500/20 pb-1 w-20">
              Links
            </h4>
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <Link to="/" className="hover:text-yellow-500 transition duration-300">Home</Link>
              <Link to="/products" className="hover:text-yellow-500 transition duration-300">Our Collection</Link>
              <Link to="/about" className="hover:text-yellow-500 transition duration-300">Our Story</Link>
              <Link to="/contact" className="hover:text-yellow-500 transition duration-300">Get In Touch</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-serif text-white font-medium text-lg tracking-wider mb-4 border-b border-yellow-500/20 pb-1 w-28">
              Contact Ankita
            </h4>
            <div className="flex flex-col space-y-3 text-sm">
             
              <div className="flex items-center space-x-2 justify-center md:justify-start">
                <span className="text-yellow-500">✉️</span>
                <span className="text-gray-300">ankitagholap100@gamil.com</span>
              </div>
              <div className="flex items-center space-x-2 justify-center md:justify-start">
                <span className="text-yellow-500">📍</span>
                <span className="text-gray-300">Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copywrite Section */}
        <div className="border-t border-gray-900 pt-8 text-center flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© 2026 HandCrafted Jewellery by Ankita. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="flex items-center justify-center">
              Handcrafted with <span className="text-red-500 mx-1">♥</span> and precision.
            </p>
            <span className="hidden sm:inline text-gray-800">|</span>
            <Link to="/admin" className="text-gray-600 hover:text-yellow-500/80 transition duration-300 font-medium py-1 px-2">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
