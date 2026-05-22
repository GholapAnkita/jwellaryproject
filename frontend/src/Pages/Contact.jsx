import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100/40 to-yellow-50/15 flex items-center justify-center p-6 md:p-12 font-sans">
      <div className="bg-white/80 border border-yellow-500/15 p-8 md:p-12 rounded-2xl shadow-xl backdrop-blur-sm max-w-lg w-full">
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase tracking-widest font-bold text-yellow-700 bg-yellow-500/10 px-3 py-1 rounded-full inline-block mb-3 border border-yellow-500/10">
            Get in touch
          </span>
          <h1 className="font-serif text-3xl font-bold bg-gradient-to-r from-yellow-700 via-amber-600 to-yellow-800 bg-clip-text text-transparent">
            Contact Ankita
          </h1>
          <div className="w-12 h-[2px] bg-gradient-to-r from-yellow-600 to-amber-500 mx-auto rounded-full mt-3"></div>
        </div>

        {submitted && (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl text-xs text-center mb-6 border border-green-100 animate-pulse">
            ✨ Your message was sent successfully! We will connect with you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-stone-700 text-[10px] font-bold uppercase tracking-wider mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300 bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-stone-700 text-[10px] font-bold uppercase tracking-wider mb-2">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300 bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-stone-700 text-[10px] font-bold uppercase tracking-wider mb-2">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you are looking for..."
              className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition duration-300 bg-white"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-950 px-8 py-3.5 rounded-xl hover:from-yellow-600 hover:to-amber-700 transition duration-300 font-bold uppercase tracking-widest text-[10px] w-full shadow-lg border border-yellow-500/15 mt-4"
          >
            ✉️ Send Message to Ankita
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
