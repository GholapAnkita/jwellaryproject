import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import ImagePreviewModal from "../Components/ImagePreviewModal";

const Products = () => {
  const { products } = useContext(ShopContext);

  // Order Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleImageClick = (imageSrc) => {
    setPreviewImage(imageSrc);
    setShowPreviewModal(true);
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowOrderModal(true);
    setOrderMessage("");
  };

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
        productPrice: selectedProduct.price,
        productId: selectedProduct.id
      });

      if (response.data.success) {
        setOrderMessage("Order placed successfully! We will contact you soon.");
        setTimeout(() => {
          setShowOrderModal(false);
          setCustomerName("");
          setCustomerMobile("");
          setSelectedProduct(null);
        }, 2000);
      }
    } catch (error) {
      setOrderMessage("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8 sm:py-10 px-4 bg-gradient-to-br from-pink-50 via-yellow-50 to-purple-50 min-h-screen">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
          Our Exclusive Collection
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">Discover our handcrafted jewelry pieces, each made with love and attention to detail</p>
      </div>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition"
                onClick={() => handleImageClick(product.image)}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.category}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-yellow-600">₹{product.price}</span>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Place Order</h3>
            <p className="mb-4 text-gray-600 text-sm md:text-base">Product: <span className="font-semibold">{selectedProduct.name}</span> (₹{selectedProduct.price})</p>

            <form onSubmit={handlePlaceOrder}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Your Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Mobile Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg text-sm md:text-base"
                  value={customerMobile}
                  onChange={(e) => setCustomerMobile(e.target.value)}
                  required
                />
              </div>

              {orderMessage && (
                <p className={`mb-4 text-sm ${orderMessage.includes("success") ? "text-green-600" : "text-red-500"}`}>
                  {orderMessage}
                </p>
              )}

              <div className="flex justify-end gap-2 flex-col sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 text-sm md:text-base mb-2 sm:mb-0"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 text-sm md:text-base"
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
