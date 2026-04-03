import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 bg-white w-full max-w-sm mx-auto">
      <img
       src={product.image?.replace('http://localhost:5000', import.meta.env.VITE_API_URL)}
        alt={product.name}
        className="w-full h-48 md:h-64 object-cover"
      />
      <div className="p-3 md:p-4 text-center">
        <h2 className="font-bold text-base md:text-lg">{product.name}</h2>
        <p className="mt-2 font-semibold text-yellow-600 text-sm md:text-base">₹{product.price}</p>
        <button className="mt-3 bg-yellow-500 text-white px-3 py-2 md:px-4 rounded hover:bg-yellow-600 transition text-sm md:text-base">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
