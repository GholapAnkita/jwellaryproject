import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const About = () => {
  const itemsList = [
    "Nath (नथ)",
    "Choker (चोकर)",
    "Earcuffs (इयरकफ)",
    "Rings (अंगठी)",
    "Mangalsutra (मंगळसूत्र)",
    "Bangles (बांगड्या)",
    "Hair Gajra (हेअर गजरा)"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100/40 to-yellow-50/15 py-12 sm:py-20 px-4 font-sans relative overflow-hidden">
      {/* Background elegant gold decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-44 h-44 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase tracking-widest font-bold text-yellow-750 bg-yellow-500/10 px-4 py-1.5 rounded-full inline-block mb-3 border border-yellow-500/20">
            About Us
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-yellow-700 via-amber-600 to-yellow-800 bg-clip-text text-transparent py-1">
            HandCrafted by Ankita
          </h1>
          <div className="w-16 h-[2px] bg-gradient-to-r from-yellow-600 to-amber-500 mx-auto rounded-full mt-3"></div>
        </div>

        {/* Story Section */}
        <div className="bg-white/90 border border-yellow-500/15 p-6 sm:p-10 rounded-3xl shadow-xl backdrop-blur-sm mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src={logo} 
              alt="HandCrafted Jewellery Logo" 
              className="w-24 h-24 object-contain rounded-full border border-yellow-500/30 bg-gray-950 p-1.5 shadow-md"
            />
          </div>

          <div className="space-y-6 text-stone-750 text-sm sm:text-base leading-relaxed">
            <p className="text-center font-serif italic text-amber-900 text-lg font-medium">
              "Beautiful, handcrafted pearl jewellery with excellent finishing, at affordable prices!"
            </p>
            
            <p>
              Hello! I am <strong>Ankita</strong>. I love making beautiful, handcrafted pearl jewellery by hand. I design and create every single piece myself with care and passion.
            </p>

            <p>
              Here is what I make using high-quality materials and with a very neat and clean finishing:
            </p>

            {/* List of Jewelry items */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 bg-stone-50 p-4 rounded-2xl border border-stone-200/50 my-4">
              {itemsList.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-stone-800 text-xs sm:text-sm font-medium">
                  <span className="text-yellow-600">✨</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p>
              <strong>Why choose my jewellery?</strong><br />
              1. <strong>Excellent Finishing:</strong> Every item is made with extreme care so that it looks neat, clean, and beautiful.<br />
              2. <strong>Affordable Prices:</strong> The jewellery is highly budget-friendly and not too expensive.<br />
              3. <strong>Customization:</strong> If you want to customize any piece to match your dress or preference, I can easily make it for you.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-950 px-8 py-3 rounded-full hover:from-yellow-600 hover:to-amber-700 transition font-bold uppercase tracking-widest text-xs border border-yellow-500/10 shadow-lg"
          >
            ✉️ Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
