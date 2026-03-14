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
    <div className="flex justify-center items-center h-screen bg-gray-100 relative">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
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
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition font-bold"
          >
            Login
          </button>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
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
