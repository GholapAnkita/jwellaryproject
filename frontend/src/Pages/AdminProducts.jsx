import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import ImagePreviewModal from "../Components/ImagePreviewModal";

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, logoutAdmin } =
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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4 items-center">
            <h2 className="text-xl font-semibold">Manage Products</h2>
            <button
              onClick={() => navigate("/admin-orders")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
            >
              View Orders
            </button>
            <button
              onClick={() => navigate("/admin-enquiries")}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition text-sm"
            >
              Enquiries
            </button>
          </div>
          <button
            onClick={openAddModal}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Add New Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">Image</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Price (₹)</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded cursor-pointer hover:scale-110 transition"
                      onClick={() => handleImageClick(product.image)}
                    />
                  </td>
                  <td className="py-2 px-4 font-medium">{product.name}</td>
                  <td className="py-2 px-4">{product.price}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4 text-center space-x-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No products available. Add some!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  placeholder="e.g. Ring, Necklace"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Product Image
                </label>
                {/* File Input */}
                <input
                  type="file"
                  name="imageFile"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-2"
                  accept="image/*"
                />
                {typeof formData.image === "object" && formData.image && (
                  <div className="mt-2">
                    <p className="text-xs text-green-600 mb-1">
                      ✅ Image selected: {formData.image.name}
                    </p>
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Selected preview"
                      className="w-20 h-20 object-cover rounded cursor-pointer hover:scale-110 transition"
                      onClick={() => handleImageClick(URL.createObjectURL(formData.image))}
                    />
                  </div>
                )}
                <p className="text-center text-sm text-gray-500 my-1">- OR -</p>
                {/* URL Input */}
                <input
                  type="text"
                  name="image"
                  value={
                    typeof formData.image === "string" ? formData.image : ""
                  }
                  onChange={handleInputChange}
                  placeholder="Image URL (http://...)"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {typeof formData.image === "object" && formData.image && (
                  <p className="text-xs text-green-600 mt-1">
                    Selected File: {formData.image.name}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 font-bold"
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
