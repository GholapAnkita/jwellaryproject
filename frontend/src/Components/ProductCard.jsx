import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 bg-white w-full max-w-sm mx-auto hover:shadow-2xl group">
      <div className="relative overflow-hidden">
        <img
         src={product.image?.replace('http://localhost:5000', import.meta.env.VITE_API_URL)}
          alt={product.name}
          className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition duration-500"
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full">
          <span className="text-xs font-semibold text-pink-600">{product.category}</span>
        </div>
      </div>
      <div className="p-4 md:p-5 text-center">
        <h2 className="font-bold text-base md:text-lg text-gray-800 mb-2">{product.name}</h2>
        <div className="flex items-center justify-center mb-3">
          <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-600 to-pink-600 bg-clip-text text-transparent">₹{product.price}</span>
        </div>
        <button className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 text-white px-4 py-2 md:py-3 rounded-full hover:from-yellow-600 hover:to-pink-600 transition duration-300 transform hover:scale-105 font-semibold shadow-md">
          🛍️ Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
