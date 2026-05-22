import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center py-12 sm:py-20 md:py-32 px-4 bg-gradient-to-br from-stone-50 via-stone-100/40 to-yellow-50/15 min-h-screen flex flex-col justify-center relative overflow-hidden font-sans">
      {/* Background elegant gold and amber decorative rings */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-yellow-500/5 rounded-full blur-2xl animate-pulse"></div>
      
      {/* Decorative vertical gold thread */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-yellow-600/0 via-yellow-600/10 to-yellow-600/0 hidden md:block"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest font-semibold text-yellow-700 bg-yellow-500/10 px-4 py-1.5 rounded-full inline-block mb-4 border border-yellow-500/10 animate-pulse">
            Trending Handcrafted Pearl Jewelry
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-yellow-700 via-amber-600 to-yellow-800 bg-clip-text text-transparent py-1">
            HandCrafted Jewelry by Ankita
          </h1>
          <div className="w-20 h-[2px] bg-gradient-to-r from-yellow-600 to-amber-500 mx-auto rounded-full mt-4"></div>
        </div>
        
        <p className="mb-10 text-sm sm:text-base md:text-lg text-stone-600 px-4 max-w-2xl mx-auto leading-relaxed tracking-wide font-light">
          ✨ Elevate your elegance with our custom, handcrafted pearl jewelry. We specialize in high-quality, trending pearl designs that are both exceptionally beautiful and perfectly affordable. ✨
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            to="/products"
            className="bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-950 px-8 py-4 rounded-full hover:from-yellow-600 hover:to-amber-700 transition duration-300 transform hover:scale-105 shadow-xl font-bold uppercase tracking-widest text-xs w-full sm:w-auto border border-yellow-500/15"
          >
            🛍️ Browse Collection
          </Link>
          <Link
            to="/about"
            className="border border-yellow-600 text-yellow-900 px-8 py-4 rounded-full hover:bg-yellow-50/50 transition duration-300 transform hover:scale-105 font-bold uppercase tracking-widest text-xs w-full sm:w-auto"
          >
            📖 Our Story
          </Link>
        </div>
        
        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16 px-4">
          <div className="bg-white/80 border border-yellow-500/15 p-6 rounded-2xl shadow-lg backdrop-blur-sm hover:-translate-y-1.5 transition duration-300">
            <div className="text-3xl mb-3">🦪</div>
            <h3 className="font-serif font-semibold text-gray-950 text-base mb-1">Trending Pearls</h3>
            <p className="text-xs text-stone-500 leading-relaxed">Top-tier, high-quality pearls (मोती) styled for modern, trending looks.</p>
          </div>
          <div className="bg-white/80 border border-yellow-500/15 p-6 rounded-2xl shadow-lg backdrop-blur-sm hover:-translate-y-1.5 transition duration-300">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-serif font-semibold text-gray-950 text-base mb-1">Artisan Handcrafted</h3>
            <p className="text-xs text-stone-500 leading-relaxed">Each ornament is uniquely custom-created with love and precision.</p>
          </div>
          <div className="bg-white/80 border border-yellow-500/15 p-6 rounded-2xl shadow-lg backdrop-blur-sm hover:-translate-y-1.5 transition duration-300">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-serif font-semibold text-gray-950 text-base mb-1">Affordable Luxury</h3>
            <p className="text-xs text-stone-500 leading-relaxed">Exquisite artisan masterpieces crafted to be friendly to your budget.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
