import React, { useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginAdmin } = useContext(ShopContext);
  const navigate = useNavigate();

  // Forgot Password State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/auth/login",
        {
          username,
          password,
        }
      );
      if (response.data.success) {
        loginAdmin();
        navigate("/admin-dashboard");
      }
    } catch (err) {
      setError("Invalid credentials! Please try again.");
    }
  };

  const handleSendOTP = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/auth/forgot-password",
        {
          email: forgotEmail,
        }
      );
      if (response.data.success) {
        setForgotStep(2);
        setForgotMessage(
          "OTP sent to your email. (Check server console for demo)"
        );
      }
    } catch (err) {
      setForgotMessage("User not found or error sending OTP.");
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/auth/reset-password",
        {
          email: forgotEmail,
          otp,
          newPassword,
        }
      );
      if (response.data.success) {
        alert("Password reset successful! Please login.");
        setShowForgotModal(false);
        setForgotStep(1);
        setForgotEmail("");
        setOtp("");
        setNewPassword("");
      }
    } catch (err) {
      setForgotMessage("Invalid OTP or Error resetting password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 relative p-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">👑</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Admin Portal
          </h2>
          <p className="text-sm text-gray-600 mt-2">HandCrafted Jewelry by Ankita</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="text-right mb-6">
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-sm text-yellow-600 hover:text-yellow-700"
            >
              Forgot Password?
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 text-white py-3 rounded-lg hover:from-yellow-600 hover:to-pink-600 transition duration-300 font-bold shadow-lg transform hover:scale-105"
          >
            🔐 Login to Admin
          </button>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Reset Password</h3>

            {forgotStep === 1 ? (
              <>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg mb-4"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
                <button
                  onClick={handleSendOTP}
                  className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 mb-2"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg mb-2"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg mb-4"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  onClick={handleResetPassword}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mb-2"
                >
                  Reset Password
                </button>
              </>
            )}

            {forgotMessage && (
              <p className="text-sm text-gray-600 mb-2">{forgotMessage}</p>
            )}

            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
