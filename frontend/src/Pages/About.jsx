import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const About = () => {
  const highlights = [
    {
      icon: "✨",
      title: "100% Handcrafted",
      desc: "Every single piece is made by hand with absolute love, care, and precision."
    },
    {
      icon: "🦪",
      title: "Premium Pearls (मोती)",
      desc: "We use high-quality, beautiful, hand-selected pearls for a timeless, elegant look."
    },
    {
      icon: "💖",
      title: "Affordable Luxury",
      desc: "Exquisite, trending designs that look premium but fit perfectly in your budget."
    },
    {
      icon: "🌸",
      title: "Customized For You",
      desc: "Want something unique? We design custom jewellery tailored entirely to your style."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100/40 to-yellow-50/15 py-12 sm:py-20 px-4 font-sans relative overflow-hidden">
      {/* Background elegant gold decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-44 h-44 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Header Section */}
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-widest font-bold text-yellow-750 bg-yellow-500/10 px-4 py-1.5 rounded-full inline-block mb-3 border border-yellow-500/20">
            About Us
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-yellow-700 via-amber-600 to-yellow-800 bg-clip-text text-transparent py-1">
            HandCrafted by Ankita
          </h1>
          <div className="w-16 h-[2px] bg-gradient-to-r from-yellow-600 to-amber-500 mx-auto rounded-full mt-3"></div>
        </div>

        {/* Narrative Section with Brand Logo */}
        <div className="bg-white/80 border border-yellow-500/15 p-6 sm:p-10 rounded-3xl shadow-xl backdrop-blur-sm mb-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <img 
                src={logo} 
                alt="HandCrafted Jewellery Logo" 
                className="relative w-24 h-24 object-contain rounded-full border-2 border-yellow-500/40 bg-gray-950 p-2 shadow-lg"
              />
            </div>
          </div>
          
          <h2 className="font-serif text-lg sm:text-xl italic text-amber-900 mb-4 font-medium">
            "Jewellery is not just an accessory—it's a way to express yourself."
          </h2>
          
          <p className="text-stone-600 leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
            Welcome to <span className="font-bold text-gray-950">HandCrafted by Ankita</span>! We specialize in creating beautiful, modern, and traditional pearl (मोती) jewellery. Our mission is simple: to make premium-quality designs accessible to everyone at highly budget-friendly prices.
          </p>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 text-left">
          {highlights.map((item, index) => (
            <div 
              key={index} 
              className="bg-white/90 border border-stone-200/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300 hover:border-yellow-500/20"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-serif text-base font-bold text-gray-950 mb-1">{item.title}</h3>
              <p className="text-xs text-stone-550 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action Widget */}
        <div className="relative overflow-hidden rounded-3xl bg-gray-950 p-8 border border-yellow-500/30 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-36 h-36 bg-yellow-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 max-w-lg mx-auto text-center">
            <span className="text-[9px] uppercase tracking-widest text-yellow-400 font-bold mb-2 block">
              Custom Orders
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight mb-2 text-gradient-to-r from-yellow-300 via-amber-200 to-yellow-500">
              Want a customized design?
            </h2>
            <p className="text-gray-300 text-xs font-light mb-5 max-w-sm mx-auto">
              Get in touch to design custom rings, necklaces, or bracelets styled exactly how you want.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-950 px-6 py-2.5 rounded-full hover:from-yellow-600 hover:to-amber-700 transition font-bold uppercase tracking-widest text-[10px] border border-yellow-400/20 shadow-lg"
            >
              ✉️ Contact Ankita
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
