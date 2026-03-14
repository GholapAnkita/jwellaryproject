import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import AdminLogin from "./Pages/AdminLogin";
import AdminProducts from "./Pages/AdminProducts";
import OrderManagement from "./Pages/OrderManagement";
import AdminEnquiries from "./Pages/AdminEnquiries";
import { ShopProvider, ShopContext } from "./Context/ShopContext";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAdminLoggedIn } = useContext(ShopContext);
  return isAdminLoggedIn ? children : <Navigate to="/admin" />;
};

function App() {
  return (
    <ShopProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-orders"
            element={
              <ProtectedRoute>
                <OrderManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-enquiries"
            element={
              <ProtectedRoute>
                <AdminEnquiries />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </ShopProvider>
  );
}

export default App;
