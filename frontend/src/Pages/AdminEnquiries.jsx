import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const AdminEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { logoutAdmin } = useContext(ShopContext);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "/api/enquiries");
            setEnquiries(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching enquiries:", error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logoutAdmin();
        navigate("/admin");
    };

    // Computations
    const totalEnquiries = enquiries.length;
    const uniqueSenders = new Set(enquiries.map(e => e.email?.toLowerCase().trim())).size;

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100/40 to-yellow-50/15 p-6 md:p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                
                {/* Executive Header */}
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

                {/* Main Card Container */}
                <div className="bg-white border border-yellow-500/10 rounded-2xl shadow-xl p-6 md:p-8">
                    
                    {/* Navigation tabs & section title */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-stone-100">
                        <div className="flex flex-wrap gap-2.5 items-center w-full">
                            <h2 className="font-serif text-xl font-bold text-gray-950 mr-4">Customer Enquiries</h2>
                            <button
                                onClick={() => navigate("/admin-dashboard")}
                                className="bg-stone-900 text-white hover:bg-stone-800 transition px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider"
                            >
                                Manage Products
                            </button>
                            <button
                                onClick={() => navigate("/admin-orders")}
                                className="bg-stone-100 hover:bg-stone-200 text-stone-700 transition px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider"
                            >
                                View Orders
                            </button>
                            <button
                                onClick={() => navigate("/admin-enquiries")}
                                className="bg-amber-600/15 text-amber-800 border border-amber-500/30 transition px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider"
                            >
                                Enquiries
                            </button>
                        </div>
                    </div>

                    {/* Analytics Row */}
                    {!loading && enquiries.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white p-5 rounded-2xl shadow-md border border-stone-800 relative overflow-hidden">
                                <div className="absolute right-3 bottom-1 text-5xl opacity-10">✉️</div>
                                <p className="text-[10px] uppercase tracking-widest text-amber-400 font-bold mb-1">Total Enquiries</p>
                                <p className="text-3xl font-serif font-bold">{totalEnquiries}</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl shadow-md border border-stone-150 relative overflow-hidden">
                                <div className="absolute right-3 bottom-1 text-5xl opacity-10 text-yellow-600">👥</div>
                                <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1">Unique Clients Interested</p>
                                <p className="text-3xl font-serif font-bold text-yellow-700">{uniqueSenders}</p>
                            </div>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-3">
                            <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-600 rounded-full animate-spin"></div>
                            <p className="text-stone-500 text-sm font-medium animate-pulse">Loading mailbox securely...</p>
                        </div>
                    ) : enquiries.length === 0 ? (
                        <div className="text-center py-16">
                            <span className="text-4xl block mb-3">📬</span>
                            <p className="text-stone-400 font-light text-sm">Your mailbox is currently empty. No enquiries submitted yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enquiries.slice().reverse().map((enquiry) => (
                                <div 
                                    key={enquiry.id} 
                                    className="bg-stone-50/50 border border-stone-200/60 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 relative flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-4 gap-2">
                                            <div className="min-w-0">
                                                <h3 className="font-serif font-bold text-base text-gray-950 truncate">{enquiry.name}</h3>
                                                <p className="text-[11px] text-stone-500 truncate select-all">{enquiry.email}</p>
                                            </div>
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-yellow-700 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/10 whitespace-nowrap shrink-0">
                                                {new Date(enquiry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                        
                                        <div className="bg-white border border-stone-150 p-4 rounded-xl shadow-inner min-h-[100px] flex flex-col justify-between">
                                            <p className="text-stone-700 text-xs sm:text-sm font-light leading-relaxed whitespace-pre-line italic">
                                                "{enquiry.message}"
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between items-center text-[10px]">
                                        <span className="text-stone-400 font-mono">ID: #{enquiry.id}</span>
                                        <a 
                                            href={`mailto:${enquiry.email}?subject=Reply from HandCrafted by Ankita`}
                                            className="text-yellow-700 hover:text-yellow-950 font-bold uppercase tracking-wider flex items-center gap-1 transition"
                                        >
                                            ✉️ Send Reply
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminEnquiries;
