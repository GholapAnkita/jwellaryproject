import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { logoutAdmin } = useContext(ShopContext);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "/api/orders");
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logoutAdmin();
        navigate("/admin");
    };

    // Advanced analytics computed from orders
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((acc, curr) => acc + (Number(curr.productPrice) || 0), 0);
    const pendingOrders = orders.filter(o => {
        const s = o.status?.toLowerCase() || '';
        return s.includes('pending') || s.includes('ordered') || s.includes('new');
    }).length;

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

                {/* Dashboard Card container */}
                <div className="bg-white border border-yellow-500/10 rounded-2xl shadow-xl p-6 md:p-8">
                    
                    {/* Navigation tabs & section title */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-stone-100">
                        <div className="flex flex-wrap gap-2.5 items-center w-full">
                            <h2 className="font-serif text-xl font-bold text-gray-950 mr-4">Order Logs</h2>
                            <button
                                onClick={() => navigate("/admin-dashboard")}
                                className="bg-stone-900 text-white hover:bg-stone-800 transition px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider"
                            >
                                Manage Products
                            </button>
                            <button
                                onClick={() => navigate("/admin-orders")}
                                className="bg-amber-600/15 text-amber-800 border border-amber-500/30 transition px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider"
                            >
                                View Orders
                            </button>
                            <button
                                onClick={() => navigate("/admin-enquiries")}
                                className="bg-stone-100 hover:bg-stone-200 text-stone-700 transition px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider"
                            >
                                Enquiries
                            </button>
                        </div>
                    </div>

                    {/* Analytics Row */}
                    {!loading && orders.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white p-5 rounded-2xl shadow-md border border-stone-800 relative overflow-hidden">
                                <div className="absolute right-3 bottom-1 text-5xl opacity-10">📦</div>
                                <p className="text-[10px] uppercase tracking-widest text-amber-400 font-bold mb-1">Total Orders</p>
                                <p className="text-3xl font-serif font-bold">{totalOrders}</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl shadow-md border border-stone-150 relative overflow-hidden">
                                <div className="absolute right-3 bottom-1 text-5xl opacity-10 text-yellow-600">✨</div>
                                <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1">Estimated Revenue</p>
                                <p className="text-3xl font-serif font-bold text-yellow-700">₹{totalRevenue.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl shadow-md border border-stone-150 relative overflow-hidden">
                                <div className="absolute right-3 bottom-1 text-5xl opacity-10 text-amber-500">⏳</div>
                                <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1">Pending Fulfillment</p>
                                <p className="text-3xl font-serif font-bold text-amber-600">{pendingOrders}</p>
                            </div>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-3">
                            <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-600 rounded-full animate-spin"></div>
                            <p className="text-stone-500 text-sm font-medium animate-pulse">Loading secure order bank...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-16">
                            <span className="text-4xl block mb-3">📭</span>
                            <p className="text-stone-400 font-light text-sm">No orders have been recorded in the database yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-xl border border-stone-100 shadow-sm">
                            <table className="min-w-full bg-white overflow-hidden">
                                <thead>
                                    <tr className="bg-stone-50 border-b border-stone-150 text-stone-700 uppercase text-[10px] tracking-wider font-bold">
                                        <th className="py-4 px-6 text-left">Order ID</th>
                                        <th className="py-4 px-6 text-left">Customer Name</th>
                                        <th className="py-4 px-6 text-left">Mobile</th>
                                        <th className="py-4 px-6 text-left">Purchased Product</th>
                                        <th className="py-4 px-6 text-left">Price</th>
                                        <th className="py-4 px-6 text-left">Date Placed</th>
                                        <th className="py-4 px-6 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-stone-600 text-xs font-light divide-y divide-stone-100">
                                    {orders.map((order) => {
                                        const isPending = (order.status?.toLowerCase() || '').includes('pending') || (order.status?.toLowerCase() || '').includes('ordered');
                                        return (
                                            <tr key={order.id} className="hover:bg-stone-50/50 transition border-b border-stone-100">
                                                <td className="py-4 px-6 font-mono text-[11px] text-stone-400 font-semibold">#{order.id}</td>
                                                <td className="py-4 px-6 font-semibold text-gray-950 text-sm">{order.customerName}</td>
                                                <td className="py-4 px-6 text-stone-600 text-sm">{order.customerMobile}</td>
                                                <td className="py-4 px-6 text-gray-900 font-medium text-sm">{order.productName}</td>
                                                <td className="py-4 px-6 text-yellow-800 font-bold text-sm">₹{Number(order.productPrice).toLocaleString('en-IN')}</td>
                                                <td className="py-4 px-6 text-stone-500 text-xs">{new Date(order.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className={`inline-block py-1 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                        isPending 
                                                        ? "bg-amber-100 text-amber-800 border border-amber-200/50" 
                                                        : "bg-emerald-100 text-emerald-800 border border-emerald-200/50"
                                                    }`}>
                                                        {order.status || "Completed"}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderManagement;
