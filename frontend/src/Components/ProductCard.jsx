import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 float bg-white">
      <img
       src={product.image?.replace('http://localhost:5000', import.meta.env.VITE_API_URL)}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 text-center">
        <h2 className="font-bold text-lg">{product.name}</h2>
        <p className="mt-2 font-semibold text-yellow-600">₹{product.price}</p>
        <button className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
