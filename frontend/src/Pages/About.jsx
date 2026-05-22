import React from "react";
import logo from "../assets/logo.png";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100/40 to-yellow-50/15 py-16 sm:py-24 px-4 font-sans relative overflow-hidden">
      {/* Background elegant gold decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-44 h-44 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Header Section */}
        <div className="mb-12">
          <span className="text-[10px] uppercase tracking-widest font-bold text-yellow-700 bg-yellow-500/10 px-4 py-1.5 rounded-full inline-block mb-4 border border-yellow-500/20">
            Our Story & Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-yellow-700 via-amber-600 to-yellow-800 bg-clip-text text-transparent py-1">
            HandCrafted by Ankita
          </h1>
          <div className="w-20 h-[2px] bg-gradient-to-r from-yellow-600 to-amber-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Narrative Section with Brand Logo */}
        <div className="bg-white/80 border border-yellow-500/15 p-8 sm:p-12 rounded-3xl shadow-xl backdrop-blur-sm mb-12">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <img 
                src={logo} 
                alt="HandCrafted Jewellery Logo" 
                className="relative w-28 h-28 object-contain rounded-full border-2 border-yellow-500/40 bg-gray-950 p-2 shadow-lg"
              />
            </div>
          </div>
          
          <p className="font-serif text-xl italic text-amber-900 mb-6 font-medium">
            "Every ornament has a story to tell, and every handcrafted detail is a step closer to perfection."
          </p>
          
          <div className="space-y-6 text-stone-600 leading-relaxed font-light text-base sm:text-lg">
            <p>
              Welcome to <span className="font-semibold text-gray-900">HandCrafted Jewellery by Ankita</span>, where tradition meets contemporary sophistication. Established with a vision to create bespoke art, our boutique specializes in custom ornaments designed with care, passion, and meticulous craftsmanship.
            </p>
            <p>
              Our founder, Ankita, is highly passionate about crafting exquisite, trending pearl (मोती) jewellery. She believes that premium pearls are timeless treasures of elegance that should be accessible to all. By blending top-quality, hand-selected pearls with incredibly affordable pricing, she designs masterpieces that are both highly popular and budget-friendly. Each piece in our collection is thoughtfully designed and created by hand, ensuring that no two pieces are exactly identical, making your chosen adornment truly unique to you.
            </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/95 border border-yellow-500/10 p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="text-3xl mb-3 text-amber-600">✍️</div>
            <h3 className="font-serif font-bold text-gray-900 text-base mb-2">Bespoke Artistry</h3>
            <p className="text-stone-500 text-xs leading-relaxed">
              We design specifically around your dreams, blending heritage techniques with modern aesthetic palettes.
            </p>
          </div>
          <div className="bg-white/95 border border-yellow-500/10 p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="text-3xl mb-3 text-amber-600">🌱</div>
            <h3 className="font-serif font-bold text-gray-900 text-base mb-2">Ethical & Conscious</h3>
            <p className="text-stone-500 text-xs leading-relaxed">
              We carefully source each gemstone and metal alloy responsibly, preserving the purity of nature's elements.
            </p>
          </div>
          <div className="bg-white/95 border border-yellow-500/10 p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition duration-300">
            <div className="text-3xl mb-3 text-amber-600">✨</div>
            <h3 className="font-serif font-bold text-gray-900 text-base mb-2">Artisan Heritage</h3>
            <p className="text-stone-500 text-xs leading-relaxed">
              By supporting local skills and custom hand-weaving, we keep beautiful traditional jewellery techniques alive.
            </p>
          </div>
        </div>

        {/* Closing Quote Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gray-950 p-8 sm:p-12 border border-yellow-500/30 text-white shadow-2xl">
          {/* Subtle design gradients */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-yellow-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <span className="text-[10px] uppercase tracking-widest text-yellow-400 font-bold mb-3 block">
              Designed For You
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-gradient-to-r from-yellow-300 via-amber-200 to-yellow-500">
              Ready to create your dream heirloom?
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm font-light mb-6 max-w-lg mx-auto">
              Get in touch with us to design customized rings, necklaces, or bracelets tailored entirely to your style preferences.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-950 px-6 py-3 rounded-full hover:from-yellow-600 hover:to-amber-700 transition font-bold uppercase tracking-widest text-xs border border-yellow-400/20 shadow-lg"
            >
              ✉️ Contact Ankita
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

