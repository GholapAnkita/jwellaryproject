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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-stone-50 via-stone-100/40 to-yellow-50/15 relative p-6 font-sans">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-yellow-500/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md border border-yellow-500/10">
            <span className="text-2xl">🔑</span>
          </div>
          <h2 className="font-serif text-2xl font-bold bg-gradient-to-r from-stone-900 to-stone-700 bg-clip-text text-transparent">
            Admin Portal
          </h2>
          <p className="text-xs text-stone-500 mt-2 tracking-wide">HandCrafted Jewelry by Ankita</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-stone-700 text-[10px] font-bold uppercase tracking-wider mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div>
            <label className="block text-stone-700 text-[10px] font-bold uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-xs text-yellow-700 hover:text-amber-800 font-semibold transition"
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-500 rounded-xl text-xs text-center border border-red-100">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-950 py-3.5 rounded-xl hover:from-yellow-600 hover:to-amber-700 transition duration-300 font-bold uppercase tracking-wider text-xs shadow-lg border border-yellow-500/15"
          >
            🔐 Log In
          </button>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-yellow-500/20">
            <h3 className="font-serif text-xl font-bold text-gray-950 mb-1">Reset Password</h3>
            <p className="text-xs text-stone-500 mb-6 pb-2 border-b border-stone-100">Enter your administrator email to proceed.</p>

            <div className="space-y-4">
              {forgotStep === 1 ? (
                <>
                  <div>
                    <label className="block text-stone-700 text-[10px] font-bold uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300"
                      placeholder="e.g. name@domain.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleSendOTP}
                    className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 font-bold uppercase tracking-wider text-xs transition border border-yellow-500/15"
                  >
                    Send OTP
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-stone-700 text-[10px] font-bold uppercase tracking-wider mb-2">One-Time Password (OTP)</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300 mb-4"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 text-[10px] font-bold uppercase tracking-wider mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300 mb-4"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleResetPassword}
                    className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-bold uppercase tracking-wider text-xs transition border border-green-500/15"
                  >
                    Reset Password
                  </button>
                </>
              )}

              {forgotMessage && (
                <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 leading-relaxed border border-stone-100">
                  {forgotMessage}
                </div>
              )}

              <button
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotStep(1);
                  setForgotMessage("");
                  setForgotEmail("");
                }}
                className="w-full bg-stone-100 text-stone-600 py-3 rounded-xl hover:bg-stone-200 font-bold uppercase tracking-wider text-xs transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
