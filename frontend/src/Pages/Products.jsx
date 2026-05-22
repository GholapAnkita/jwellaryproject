import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import ImagePreviewModal from "../Components/ImagePreviewModal";

const Products = () => {
  const { products, settings } = useContext(ShopContext);

  // Order Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Coupon State
  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Extract dynamic coupon code and discount percentage from settings promoText
  const getPromoDetails = () => {
    if (!settings || !settings.promoEnabled || !settings.promoText) {
      return { code: "", discountPercent: 0 };
    }
    
    // Extract code e.g. "Use code: FESTIVE15" or "Code FESTIVE15"
    const codeMatch = settings.promoText.match(/code:\s*(\w+)/i) || settings.promoText.match(/code\s+(\w+)/i);
    const code = codeMatch ? codeMatch[1].toUpperCase() : "";
    
    // Extract percentage e.g. "15% OFF" or "15% discount"
    const percentMatch = settings.promoText.match(/(\d+)\s*%/);
    const discountPercent = percentMatch ? parseInt(percentMatch[1], 10) : 10; // Default to 10%
    
    return { code, discountPercent };
  };

  const { code: systemCouponCode, discountPercent: systemDiscountPercent } = getPromoDetails();

  const handleImageClick = (imageSrc) => {
    setPreviewImage(imageSrc);
    setShowPreviewModal(true);
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowOrderModal(true);
    setOrderMessage("");
    setCouponInput("");
    setCouponApplied(false);
    setCouponError("");
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) {
      setCouponError("Please enter a coupon code.");
      setCouponApplied(false);
      return;
    }
    
    if (systemCouponCode && couponInput.trim().toUpperCase() === systemCouponCode) {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Please try again.");
      setCouponApplied(false);
    }
  };

  // Price Calculations
  const originalPrice = selectedProduct ? selectedProduct.price : 0;
  const discountAmount = couponApplied ? Math.round((originalPrice * systemDiscountPercent) / 100) : 0;
  const finalPrice = originalPrice - discountAmount;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!customerName || !customerMobile) {
      setOrderMessage("Please fill in all details.");
      return;
    }

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + "/api/orders", {
        customerName,
        customerMobile,
        productName: selectedProduct.name,
        productPrice: originalPrice,
        discountApplied: discountAmount,
        finalPrice: finalPrice,
        promoCodeUsed: couponApplied ? systemCouponCode : "",
        productId: selectedProduct.id
      });

      if (response.data.success) {
        setOrderMessage("Order placed successfully! We will contact you soon.");
        setTimeout(() => {
          setShowOrderModal(false);
          setCustomerName("");
          setCustomerMobile("");
          setSelectedProduct(null);
          setCouponInput("");
          setCouponApplied(false);
          setCouponError("");
        }, 2000);
      }
    } catch (error) {
      setOrderMessage("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-12 sm:py-16 px-6 bg-gradient-to-br from-stone-50 via-stone-100/40 to-yellow-50/15 min-h-screen font-sans">
      <div className="text-center mb-12 max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-semibold text-yellow-700 bg-yellow-500/10 px-3 py-1 rounded-full inline-block mb-3 border border-yellow-500/10">
          Handmade Treasures
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-700 via-amber-500 to-yellow-800 bg-clip-text text-transparent">
          Our Exclusive Collection
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-yellow-600 to-amber-500 mx-auto rounded-full mb-4"></div>
        <p className="text-sm text-stone-500 leading-relaxed font-light">
          Discover our finest handcrafted jewellery pieces, each designed with artistic passion and meticulously finished for luxurious beauty.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">🛍️</div>
          <p className="text-stone-400 font-light text-sm">No products found. New arrivals coming soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl border border-yellow-500/10 shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-stone-50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition duration-500 group-hover:scale-105"
                  onClick={() => handleImageClick(product.image)}
                />
                <div className="absolute top-3 right-3 bg-gray-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-yellow-500/15">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-yellow-500">{product.category}</span>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-gray-950 leading-tight mb-1">{product.name}</h3>
                  <p className="text-[10px] text-stone-400 font-light tracking-wide mb-4">Fine handcrafted ornament</p>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-stone-100">
                  <span className="text-base font-bold text-yellow-700">₹{product.price.toLocaleString('en-IN')}</span>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="bg-gray-950 text-white hover:bg-yellow-600 hover:text-gray-950 transition duration-300 font-semibold uppercase tracking-wider text-[10px] px-4 py-2 rounded-lg shadow-sm"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-yellow-500/20 overflow-y-auto max-h-[90vh]">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-950 mb-1">Place Order</h3>
            <p className="text-xs text-stone-500 mb-6 pb-2 border-b border-stone-100">
              Product: <span className="font-semibold text-yellow-700">{selectedProduct.name}</span>
            </p>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-stone-700 text-xs font-semibold uppercase tracking-wider mb-2">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 text-xs font-semibold uppercase tracking-wider mb-2">Mobile Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300"
                  value={customerMobile}
                  onChange={(e) => setCustomerMobile(e.target.value)}
                  placeholder="Enter your contact number"
                  required
                />
              </div>

              {/* Coupon Section (Only if promo settings are active and a coupon code is parsed) */}
              {systemCouponCode && (
                <div className="pt-2">
                  <label className="block text-stone-700 text-xs font-semibold uppercase tracking-wider mb-2">Promotional Code (Optional)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300 font-mono uppercase tracking-wider placeholder:normal-case placeholder:font-sans"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        if (couponError) setCouponError("");
                      }}
                      placeholder="Paste promo code here"
                      disabled={couponApplied}
                    />
                    {couponApplied ? (
                      <button
                        type="button"
                        onClick={() => {
                          setCouponApplied(false);
                          setCouponInput("");
                        }}
                        className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition border border-red-200/30"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="bg-stone-950 text-white hover:bg-yellow-600 hover:text-gray-950 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  
                  {couponApplied && (
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1.5 flex items-center gap-1 animate-fade-in">
                      ✨ Success! "{systemCouponCode}" applied. You got {systemDiscountPercent}% OFF!
                    </p>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1.5 flex items-center gap-1 animate-fade-in">
                      ❌ {couponError}
                    </p>
                  )}
                </div>
              )}

              {/* Price Calculation breakdown */}
              <div className="bg-stone-50 border border-stone-150 p-4 rounded-xl space-y-2 mt-4">
                <div className="flex justify-between text-xs text-stone-500 font-medium">
                  <span>Product Original Price</span>
                  <span>₹{originalPrice.toLocaleString('en-IN')}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                    <span>Festival Coupon Discount ({systemDiscountPercent}%)</span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="w-full h-[1px] bg-stone-250 my-1"></div>
                <div className="flex justify-between items-center text-sm font-bold text-gray-950">
                  <span>Total Payable Price</span>
                  <span className="text-yellow-700 text-base font-serif font-bold">₹{finalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {orderMessage && (
                <div className={`p-3 rounded-lg text-xs leading-relaxed text-center ${orderMessage.includes("successfully") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-500"}`}>
                  {orderMessage}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="bg-stone-100 text-stone-600 px-5 py-2.5 rounded-lg hover:bg-stone-200 transition text-xs font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-950 px-6 py-2.5 rounded-lg hover:from-yellow-600 hover:to-amber-700 transition text-xs font-bold uppercase tracking-widest border border-yellow-500/15"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      <ImagePreviewModal
        show={showPreviewModal}
        imageSrc={previewImage}
        alt="Product Image Preview"
        onClose={() => setShowPreviewModal(false)}
      />
    </div>
  );
};

export default Products;
