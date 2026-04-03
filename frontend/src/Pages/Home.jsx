import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center py-8 sm:py-12 md:py-28 px-4 bg-gradient-to-br from-pink-50 via-yellow-50 to-purple-50 min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300 rounded-full opacity-20 animate-pulse"></div>
      
      {/* Main content */}
      <div className="relative z-10">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 animate-bounce bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            HandCrafted Jewelry by Ankita
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto rounded-full"></div>
        </div>
        
        <p className="mb-6 text-sm sm:text-base md:text-lg text-gray-700 px-4 max-w-2xl mx-auto">
          ✨ Beautiful handcrafted jewelry for every occasion ✨
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            to="/products"
            className="bg-gradient-to-r from-yellow-500 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-yellow-600 hover:to-pink-600 transition duration-300 transform hover:scale-105 shadow-lg font-semibold"
          >
            🛍️ Shop Now
          </Link>
          <Link
            to="/about"
            className="border-2 border-pink-500 text-pink-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-pink-50 transition duration-300 transform hover:scale-105 font-semibold"
          >
            📖 About Us
          </Link>
        </div>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12">
          <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md backdrop-blur-sm">
            <div className="text-2xl mb-2">💎</div>
            <h3 className="font-semibold text-gray-800">Premium Quality</h3>
            <p className="text-sm text-gray-600">Finest materials</p>
          </div>
          <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md backdrop-blur-sm">
            <div className="text-2xl mb-2">🎨</div>
            <h3 className="font-semibold text-gray-800">Handcrafted</h3>
            <p className="text-sm text-gray-600">Made with love</p>
          </div>
          <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md backdrop-blur-sm">
            <div className="text-2xl mb-2">🚚</div>
            <h3 className="font-semibold text-gray-800">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Quick shipping</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
