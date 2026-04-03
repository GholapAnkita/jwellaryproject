import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 md:p-8 mt-10">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent mb-2">
            HandCrafted Jewelry by Ankita
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-6">
          <div className="text-center">
            <div className="text-2xl mb-2">💎</div>
            <h4 className="font-semibold mb-1">Premium Quality</h4>
            <p className="text-sm text-gray-400">Finest materials</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🎨</div>
            <h4 className="font-semibold mb-1">Handcrafted</h4>
            <p className="text-sm text-gray-400">Made with love</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">📞</div>
            <h4 className="font-semibold mb-1">Contact Us</h4>
            <p className="text-sm text-gray-400">9322779404</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">
            © 2025 HandCrafted Jewelry by Ankita. All rights reserved. Made with 💜
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
