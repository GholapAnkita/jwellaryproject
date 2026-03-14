import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center py-28 bg-gradient-to-r from-pink-100 to-yellow-100">
      <h1 className="text-5xl font-bold mb-4 animate-bounce">Welcome to HandCrafted JewelryStore</h1>
      <p className="mb-6 text-lg text-gray-700">Beautiful handcrafted jewelry for every occasion</p>
      <Link
        to="/products"
        className="bg-yellow-500 text-white px-8 py-4 rounded-lg hover:bg-yellow-600 transition duration-300"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default Home;
