import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center py-12 md:py-28 px-4 bg-gradient-to-r from-pink-100 to-yellow-100 min-h-screen flex flex-col justify-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-bounce">Welcome to HandCrafted JewelryStore</h1>
      <p className="mb-6 text-base md:text-lg text-gray-700 px-4">Beautiful handcrafted jewelry for every occasion</p>
      <Link
        to="/products"
        className="bg-yellow-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-yellow-600 transition duration-300 mx-auto"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default Home;
