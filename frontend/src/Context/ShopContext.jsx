import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
        return localStorage.getItem("isAdminLoggedIn") === "true";
    });
    const [settings, setSettings] = useState({
        promoEnabled: true,
        promoText: "✨ Special Festive Sale: 15% OFF on our premium pearl collections! Use code: FESTIVE15 💖",
        promoTheme: "gold"
    });

    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch products and settings from backend
    useEffect(() => {
        fetchProducts();
        fetchSettings();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchSettings = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/settings`);
            if (response.data && !Array.isArray(response.data)) {
                setSettings(response.data);
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
        }
    };

    useEffect(() => {
        localStorage.setItem("isAdminLoggedIn", isAdminLoggedIn);
    }, [isAdminLoggedIn]);

    const addProduct = async (product) => {
        try {
            const formData = new FormData();
            formData.append("name", product.name);
            formData.append("price", product.price);
            formData.append("category", product.category);
            if (product.image instanceof File) {
                formData.append("image", product.image);
            } else {
                formData.append("image", product.image);
            }

            const response = await axios.post(`${API_URL}/api/products`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setProducts(prev => [...prev, response.data]);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
            const formData = new FormData();
            formData.append("name", updatedProduct.name);
            formData.append("price", updatedProduct.price);
            formData.append("category", updatedProduct.category);

            // Only append image if it's changed/new
            if (updatedProduct.image instanceof File) {
                formData.append("image", updatedProduct.image);
            } else if (typeof updatedProduct.image === 'string') {
                formData.append("image", updatedProduct.image);
            }

            const response = await axios.put(`${API_URL}/api/products/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setProducts((prev) =>
                prev.map((item) => (item.id === id ? response.data : item))
            );
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/products/${id}`);
            setProducts((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const updateSettings = async (newSettings) => {
        try {
            const response = await axios.post(`${API_URL}/api/settings`, newSettings);
            if (response.data.success) {
                setSettings(newSettings);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error updating settings:", error);
            return false;
        }
    };

    const loginAdmin = () => setIsAdminLoggedIn(true);
    const logoutAdmin = () => setIsAdminLoggedIn(false);

    const contextValue = {
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        settings,
        updateSettings,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};
