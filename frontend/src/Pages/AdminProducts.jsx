import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import ImagePreviewModal from "../Components/ImagePreviewModal";

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, logoutAdmin, settings, updateSettings } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });

  const [promoForm, setPromoForm] = useState({
    promoEnabled: true,
    promoText: "",
    promoTheme: "gold",
    theme: "gold"
  });
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    if (settings) {
      setPromoForm({
        promoEnabled: settings.promoEnabled ?? true,
        promoText: settings.promoText ?? "",
        promoTheme: settings.promoTheme ?? "gold",
        theme: settings.theme ?? "gold"
      });
    }
  }, [settings]);

  const handlePromoSubmit = async (e) => {
    e.preventDefault();
    setSaveStatus("Publishing updates to live store...");
    const success = await updateSettings(promoForm);
    if (success) {
      setSaveStatus("Live store settings updated successfully! ✨");
      setTimeout(() => setSaveStatus(""), 4000);
    } else {
      setSaveStatus("Failed to update settings. Please try again.");
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openAddModal = () => {
    setFormData({ name: "", price: "", image: "", category: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setFormData(product);
    setCurrentProduct(product);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleImageClick = (imageSrc) => {
    setPreviewImage(imageSrc);
    setShowPreviewModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct(currentProduct.id, {
        ...formData,
        price: Number(formData.price),
      });
    } else {
      addProduct({ ...formData, price: Number(formData.price) });
    }
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100/40 to-yellow-50/15 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-yellow-700 bg-yellow-500/10 px-3 py-1 rounded-full inline-block mb-2 border border-yellow-500/10">
              Management Portal
            </span>
            <h1 className="font-serif text-3xl font-bold text-gray-950">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-transparent border border-red-500/50 hover:bg-red-500 hover:text-white text-red-500 transition px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            Logout
          </button>
        </div>

        <div className="bg-white border border-yellow-500/10 rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-stone-100">
            <div className="flex flex-wrap gap-2.5 items-center">
              <h2 className="font-serif text-xl font-bold text-gray-950 mr-4">Manage Products</h2>
              <button
                onClick={() => navigate("/admin-orders")}
                className="bg-stone-900 text-white hover:bg-stone-800 transition px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider"
              >
                View Orders
              </button>
              <button
                onClick={() => navigate("/admin-enquiries")}
                className="bg-amber-600/10 text-amber-700 border border-amber-600/20 hover:bg-amber-600/20 transition px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider"
              >
                Enquiries
              </button>
            </div>
            <button
              onClick={openAddModal}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-950 px-5 py-2.5 rounded-xl hover:from-yellow-600 hover:to-amber-700 transition font-bold uppercase tracking-widest text-xs border border-yellow-500/10 shadow-md w-full sm:w-auto"
            >
              + Add Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-stone-100 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-100 text-stone-700 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-4 px-6 text-left">Preview</th>
                  <th className="py-4 px-6 text-left">Name</th>
                  <th className="py-4 px-6 text-left">Price</th>
                  <th className="py-4 px-6 text-left">Category</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-stone-100 hover:bg-stone-50/50 transition">
                    <td className="py-4 px-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg border border-stone-100 cursor-pointer hover:scale-105 transition duration-300"
                        onClick={() => handleImageClick(product.image)}
                      />
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-950 text-sm">{product.name}</td>
                    <td className="py-4 px-6 text-yellow-700 font-bold text-sm">₹{product.price.toLocaleString('en-IN')}</td>
                    <td className="py-4 px-6">
                      <span className="bg-stone-100 text-stone-600 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-stone-200/50">
                        {product.category || "General"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center space-x-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="bg-stone-100 hover:bg-yellow-500 hover:text-gray-950 text-stone-600 transition duration-300 text-xs font-semibold px-3 py-1.5 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="bg-red-50 hover:bg-red-500 hover:text-white text-red-500 transition duration-300 text-xs font-semibold px-3 py-1.5 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-stone-400 font-light text-sm">
                      No products available. Get started by adding some!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Website Settings & Theme Control Widget */}
        <div className="bg-white border border-yellow-500/10 rounded-2xl shadow-xl p-6 md:p-8 mt-10">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
            <span className="text-2xl">⚙️</span>
            <div>
              <h2 className="font-serif text-xl font-bold text-gray-950">Website Settings & Themes</h2>
              <p className="text-stone-400 text-[10px] uppercase tracking-wider font-bold">Control site header announcements and color theme</p>
            </div>
          </div>

          <form onSubmit={handlePromoSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end">
            <div className="lg:col-span-3 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-stone-750 text-[10px] font-bold uppercase tracking-wider mb-2">
                    Announcement Banner Text
                  </label>
                  <input
                    type="text"
                    value={promoForm.promoText}
                    onChange={(e) => setPromoForm({ ...promoForm, promoText: e.target.value })}
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300 font-medium"
                    placeholder="e.g. ✨ Special Festive Offer: 15% OFF on premium pearl collections! Use code: FESTIVE15 💖"
                    required
                  />
                </div>
                
                <div className="w-full md:w-48">
                  <label className="block text-stone-750 text-[10px] font-bold uppercase tracking-wider mb-2">
                    Banner Theme
                  </label>
                  <select
                    value={promoForm.promoTheme}
                    onChange={(e) => setPromoForm({ ...promoForm, promoTheme: e.target.value })}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300 font-bold text-stone-600 cursor-pointer"
                  >
                    <option value="gold">👑 Luxury Amber Gold</option>
                    <option value="maroon">🏮 Festive Royal Maroon</option>
                    <option value="red">🌹 Romantic Crimson Red</option>
                    <option value="black">🖤 Sleek Premium Charcoal</option>
                  </select>
                </div>

                <div className="w-full md:w-48">
                  <label className="block text-stone-750 text-[10px] font-bold uppercase tracking-wider mb-2">
                    Website Color Theme
                  </label>
                  <select
                    value={promoForm.theme}
                    onChange={(e) => setPromoForm({ ...promoForm, theme: e.target.value })}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300 font-bold text-stone-600 cursor-pointer"
                  >
                    <option value="gold">👑 Luxury Amber Gold</option>
                    <option value="pink">🌸 Soft Rose Pink</option>
                    <option value="colorful">🔮 Vibrant Royal Violet</option>
                    <option value="emerald">🍃 Sleek Emerald Mint</option>
                    <option value="cosmic">🌌 Vibrant Cosmic Neon</option>
                    <option value="sunset">🌅 Sunset Coral Glow</option>
                    <option value="lavender">🎆 Midnight Lavender</option>
                    <option value="ruby">🌹 Romantic Ruby Red</option>
                    <option value="hotpink">💖 Vibrant Hot Pink</option>
                    <option value="pastel">🦄 Pastel Candy Dream</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-between lg:justify-end">
              <div className="flex items-center gap-3 bg-stone-50 border border-stone-200/60 px-4 py-2.5 rounded-xl w-full sm:w-auto justify-center sm:justify-start">
                <input
                  type="checkbox"
                  id="promoEnabled"
                  checked={promoForm.promoEnabled}
                  onChange={(e) => setPromoForm({ ...promoForm, promoEnabled: e.target.checked })}
                  className="w-4 h-4 rounded accent-yellow-600 cursor-pointer"
                />
                <label htmlFor="promoEnabled" className="text-stone-700 text-[10px] font-bold uppercase tracking-wider cursor-pointer select-none">
                  Show Banner
                </label>
              </div>

              <button
                type="submit"
                className="bg-stone-900 text-white hover:bg-stone-800 px-6 py-2.5 rounded-xl transition duration-300 font-bold uppercase tracking-widest text-[10px] border border-stone-800 shadow-md w-full sm:w-auto"
              >
                Save Settings
              </button>
            </div>
          </form>
          
          {saveStatus && (
            <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-700 mt-4 flex items-center gap-1.5 animate-pulse">
              ✨ {saveStatus}
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-yellow-500/20 animate-scale-up">
            <h2 className="font-serif text-2xl font-bold text-gray-950 mb-6 pb-2 border-b border-stone-100">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-stone-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300"
                  placeholder="e.g. Elegance Diamond Ring"
                  required
                />
              </div>
              
              <div>
                <label className="block text-stone-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300"
                  placeholder="e.g. 15000"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  placeholder="e.g. Ring, Necklace"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300"
                />
              </div>

              <div>
                <label className="block text-stone-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                  Product Image
                </label>
                
                {/* File Input */}
                <input
                  type="file"
                  name="imageFile"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs focus:outline-none mb-2"
                  accept="image/*"
                />
                
                {typeof formData.image === "object" && formData.image && (
                  <div className="mt-2 p-2 bg-stone-50 border border-stone-150 rounded-xl flex items-center space-x-3">
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Selected preview"
                      className="w-12 h-12 object-cover rounded-lg border border-stone-100 cursor-pointer"
                      onClick={() => handleImageClick(URL.createObjectURL(formData.image))}
                    />
                    <div>
                      <p className="text-[10px] text-green-700 font-semibold">✅ Image selected</p>
                      <p className="text-[9px] text-stone-400 truncate max-w-[150px]">{formData.image.name}</p>
                    </div>
                  </div>
                )}
                
                <div className="text-center text-[10px] text-stone-400 font-semibold tracking-wider my-2 uppercase">- OR -</div>
                
                {/* URL Input */}
                <input
                  type="text"
                  name="image"
                  value={
                    typeof formData.image === "string" ? formData.image : ""
                  }
                  onChange={handleInputChange}
                  placeholder="Paste Image URL (http://...)"
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-stone-500 hover:text-stone-700 text-xs font-bold uppercase tracking-wider transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-950 px-6 py-2.5 rounded-xl hover:from-yellow-600 hover:to-amber-700 transition font-bold uppercase tracking-widest text-xs border border-yellow-500/10 shadow-lg"
                >
                  {isEditing ? "Update Product" : "Save Product"}
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

export default AdminProducts;
